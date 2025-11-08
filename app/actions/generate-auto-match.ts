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
            rank: number;  // validated by Amplify data to be integer
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
    if (availableEquipment.length == 0) {
        throw new Error('Expected availableEquipment to be of length >0, but got 0');
    }

    if (requests.length == 0) {
        throw new Error('Expected requests to be of length >0, but got 0');
    }

    let edges: BipartiteEdge[] = [];

    // For each request...
    requests.map(({ requestId, equipmentTypeRequests }) => {
        let requestEquipmentRanks: number[] = [];

        // For each equipment type request...
        equipmentTypeRequests.map(({ equipmentTypeId, rank }) => {
            // For each available equipment per equipment type...
            if (rank < 1 || isNaN(rank)) {
                throw new Error(`Expected rank >= 1 for request id ${requestId}, equipment type id ${equipmentTypeId}, but got ${rank}`);
            }

            if (requestEquipmentRanks.includes(rank)) {
                throw new Error(`Expected unique ranks for request id ${requestId}, but received duplicate EquipmentTypeRequests of rank ${rank}`);
            }
            requestEquipmentRanks.push(rank);

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

    if (edges.length == 0) {
        throw new Error('Expected at least one possible request-equipment match, but got none');
    }

    const matching = minimumWeightBipartiteMatch(edges);
    return matching.map(edge => {
        return {
            requestId: edge.left,
            equipmentId: edge.right
        };
    });
}
