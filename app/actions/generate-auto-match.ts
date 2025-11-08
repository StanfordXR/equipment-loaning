'use server'

import { minimumWeightBipartiteMatch } from 'min-cost-flow';
import { Assignment } from '@/app/admin/periods/[period_id]/requests/requests';

export interface PeriodAutoMatchProps {
    availableEquipment: {
        equipmentTypeId: string;
        equipmentId: string;
    }[];
    requests: {
        requestId: string;
        equipmentTypeRequests: {
            equipmentTypeId: string;
            rank: number;
        }[];
    }[];
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
export default async function generateAutoMatch({ availableEquipment, requests }: PeriodAutoMatchProps): Promise<Assignment[]> {
    let edges: BipartiteEdge[] = [];

    // For each request...
    requests.map(({ requestId, equipmentTypeRequests }) => {
        // For each equipment type request...
        equipmentTypeRequests.map(({ equipmentTypeId, rank }) => {
            // For each available equipment per equipment type...
            if (rank < 1) {
                throw new Error(`Expected rank >= 1 for request id ${requestId}, equipment type id ${equipmentTypeId}, but got ${rank}`);
            }
            const equipments = availableEquipment.filter(e => e.equipmentTypeId == equipmentTypeId);

            equipments.map(({ equipmentId }) => {
                edges.push({
                    left: requestId,
                    right: equipmentId,
                    weight: rank
                })
            });
        });
    });
    const matching = minimumWeightBipartiteMatch(edges);
    return matching.map(edge => {
        return {
            requestId: edge.left,
            equipmentId: edge.right
        };
    });
}
