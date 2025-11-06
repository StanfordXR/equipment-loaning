'use server'

import generateSSRClient from '@/app/utils/generate-ssr-client'
import { minimumWeightBipartiteMatch } from 'min-cost-flow';

interface PeriodAutoMatchProps {
    periodID: string;
}

interface Match {
    requestID: string;
    equipmentID: string;
}

interface BipartiteEdge {
    left: string;
    right: string;
    weight: number;
}

/**
 * Return a list of matched loanable equipment to equipment requests for a given periodID.
 * This function uses min-cost-flow formulated as a bipartite matching algorithm.
 * 
 * Notes:
 * - The matching algorithm will only take into consideration Equipment objects that are
 *      referenced in at least one Request
 */
export default async function generateAutoMatch({ periodID }: PeriodAutoMatchProps) {
    // export default async function generateAutoMatch({ periodID }: PeriodAutoMatchProps): Promise<Match[]> {
    const client = generateSSRClient();

    const { data, errors } = await client.models.Period.get({ id: periodID }, {
        selectionSet: [
            'loanableEquipment.equipment.id',
            'loanableEquipment.equipment.equipmentTypeId',
            'loanableEquipment.equipment.assignment.id',

            'requests.equipmentTypeRequests.equipmentTypeId',
            'requests.equipmentTypeRequests.requestId',
            'requests.equipmentTypeRequests.rank',
        ]
    });

    if (errors) {
        throw new Error(JSON.stringify(errors));
    }

    if (!data) {
        throw 'Expected nonnull data, but got null';
    }

    // Get loanable (non-assigned) equipment for this period, grouped by type
    let equipments = data.loanableEquipment.map(
        (loanableEquipment) => loanableEquipment.equipment
    );
    if (equipments.length == 0) {
        throw 'Expected at least one Equipment, but got 0';
    }
    let equipmentByType: { [equipmentTypeId: string]: string[] } = {};
    equipments
        .filter((e) => !e.assignment)
        .map((e) => {
            // We assume that there cannot be multiple Equipments with the same id
            // since Amplify data dedups
            equipmentByType[e.equipmentTypeId].push(e.id)
        });

    // Get equipment type requests for this period
    const equipmentTypeRequests = data.requests.map(
        (request) => request.equipmentTypeRequests
    ).flat();
    if (equipmentTypeRequests.length == 0) {
        throw 'Expected at least one EquipmentTypeRequest, but got 0';
    }

    const edges: BipartiteEdge[] = equipmentTypeRequests.map((equipmentTypeRequest) => {
        // For each EquipmentTypeRequest...
        return equipmentByType[equipmentTypeRequest.equipmentTypeId]
            .map((equipmentId) => {
                if (!equipmentTypeRequest.rank || equipmentTypeRequest.rank < 0) {
                    throw `EquipmentTypeRequest with request_id ${equipmentTypeRequest.requestId}, equipment_type_id
                    ${equipmentTypeRequest.equipmentTypeId} has invalid rank: ${equipmentTypeRequest.rank}`;
                }
                // Add a bipartite edge for every piece of equipment in the requested equipment type
                return {
                    left: equipmentTypeRequest.requestId,  // request
                    right: equipmentId,  // equipment
                    weight: equipmentTypeRequest.rank  // ranking
                }
            })
    }).flat();

    console.log(edges);

    // Run bipartite matching and return
    const matching = minimumWeightBipartiteMatch(edges);
    return matching.map(edge => {
        return {
            requestID: edge.left,
            equipmentID: edge.right
        };
    });
}
