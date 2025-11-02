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
export default async function generateAutoMatch({ periodID }: PeriodAutoMatchProps): Promise<Match[]> {
    const client = generateSSRClient();

    const edges: BipartiteEdge[] = [
        {
            left: 'a',  // request
            right: 'b',  // equipment
            weight: 0
        }
    ];

    // Run bipartite matching and return
    const matching = minimumWeightBipartiteMatch(edges);
    return matching.map(edge => {
        return {
            requestID: edge.left,
            equipmentID: edge.right
        };
    });
}
