import { describe, expect, test } from '@jest/globals';
import generateAutoMatch, { PeriodAutoMatchProps } from './generate-auto-match';
import { Assignment } from '@/app/admin/periods/[period_id]/requests/requests';

describe('generateAutoMatch', () => {
    test('one request, one equipment', async () => {
        const equipmentTypeId = 'equipment-type-1';
        const eqiupmentId = 'equipment-1';
        const requestId = 'request-1';

        const input: PeriodAutoMatchProps = {
            availableEquipment: [
                { equipmentTypeId: equipmentTypeId, equipmentId: eqiupmentId }
            ],
            requests: [
                {
                    requestId: requestId,
                    equipmentTypeRequests: [
                        { equipmentTypeId: equipmentTypeId, rank: 1 }
                    ]
                }
            ]
        };

        const expectedOutput: Assignment[] = [
            { equipmentId: eqiupmentId, requestId: requestId }
        ];

        expect((await generateAutoMatch(input)).sort()).toEqual(expectedOutput.sort());
    });

    test('two requests, one equipment (different ranks)', async () => {
        const equipmentTypeId1 = 'equipment-type-1';
        const eqiupmentId1 = 'equipment-1';

        const requestId1 = 'request-1';
        const requestId2 = 'request-2';

        const input: PeriodAutoMatchProps = {
            availableEquipment: [
                { equipmentTypeId: equipmentTypeId1, equipmentId: eqiupmentId1 }
            ],
            requests: [
                {
                    requestId: requestId1,
                    equipmentTypeRequests: [
                        { equipmentTypeId: equipmentTypeId1, rank: 1 }
                    ]
                },
                {
                    requestId: requestId2,
                    equipmentTypeRequests: [
                        { equipmentTypeId: equipmentTypeId1, rank: 2 }
                    ]
                }
            ]
        };

        const expectedOutput: Assignment[] = [
            { equipmentId: eqiupmentId1, requestId: requestId1 }
        ];

        expect((await generateAutoMatch(input)).sort()).toEqual(expectedOutput.sort());
    });

    test('one request, two equipments (different types, different ranks)', async () => {
        const equipmentTypeId1 = 'equipment-type-1';
        const eqiupmentId1 = 'equipment-1';
        const equipmentTypeId2 = 'equipment-type-2';
        const eqiupmentId2 = 'equipment-2';

        const requestId1 = 'request-1';

        const input: PeriodAutoMatchProps = {
            availableEquipment: [
                { equipmentTypeId: equipmentTypeId1, equipmentId: eqiupmentId1 },
                { equipmentTypeId: equipmentTypeId2, equipmentId: eqiupmentId2 }
            ],
            requests: [
                {
                    requestId: requestId1,
                    equipmentTypeRequests: [
                        { equipmentTypeId: equipmentTypeId1, rank: 2 },
                        { equipmentTypeId: equipmentTypeId2, rank: 1 }
                    ]
                }
            ]
        };

        const expectedOutput: Assignment[] = [
            { equipmentId: eqiupmentId2, requestId: requestId1 }
        ];

        expect((await generateAutoMatch(input)).sort()).toEqual(expectedOutput.sort());
    });

    test('one request, two equipments (same types, different ranks)', async () => {
        const equipmentTypeId = 'equipment-type-';
        const eqiupmentId1 = 'equipment-1';
        const eqiupmentId2 = 'equipment-2';

        const requestId1 = 'request-1';

        const input: PeriodAutoMatchProps = {
            availableEquipment: [
                { equipmentTypeId: equipmentTypeId, equipmentId: eqiupmentId1 },
                { equipmentTypeId: equipmentTypeId, equipmentId: eqiupmentId2 }
            ],
            requests: [
                {
                    requestId: requestId1,
                    equipmentTypeRequests: [
                        { equipmentTypeId: equipmentTypeId, rank: 1 },
                    ]
                }
            ]
        };

        const result = await generateAutoMatch(input);

        expect(result.length == 0);
        expect(result[0].requestId).toEqual(requestId1);
        // Matching should be either equipmentId1 or equipmentId2 (arbitrary)
        expect([eqiupmentId1, eqiupmentId2]).toContain(result[0].equipmentId);
    });

    test('rank <1 fails', async () => {
        const equipmentTypeId = 'equipment-type-1';
        const eqiupmentId = 'equipment-1';
        const requestId = 'request-1';

        const input: PeriodAutoMatchProps = {
            availableEquipment: [
                { equipmentTypeId: equipmentTypeId, equipmentId: eqiupmentId }
            ],
            requests: [
                {
                    requestId: requestId,
                    equipmentTypeRequests: [
                        { equipmentTypeId: equipmentTypeId, rank: 0 }
                    ]
                }
            ]
        };

        await expect(generateAutoMatch(input)).rejects.toThrow();
    });

    test('two requests, one equipment (equal rank)', async () => {
        const equipmentTypeId = 'equipment-type';
        const equipment = 'equipment';
        const requestId1 = 'request-id-1';
        const requestId2 = 'request-id-2';

        const input: PeriodAutoMatchProps = {
            availableEquipment: [{ equipmentTypeId: equipmentTypeId, equipmentId: equipment }],
            requests: [
                {
                    requestId: requestId1,
                    equipmentTypeRequests: [
                        { equipmentTypeId: equipmentTypeId, rank: 1 }
                    ]
                },
                {
                    requestId: requestId2,
                    equipmentTypeRequests: [
                        { equipmentTypeId: equipmentTypeId, rank: 1 }
                    ]
                },
            ]
        };

        const result = await generateAutoMatch(input);
        expect(result.length).toBe(1);
        expect(result[0].equipmentId).toBe(equipment);
        expect([requestId1, requestId2]).toContain(result[0].requestId);
    });

    test('two requests, two equipments (same type, equal rank)', async () => {
        const equipmentTypeId = 'equipment-type';
        const equipmentId1 = 'equipment-id-1';
        const equipmentId2 = 'equipment-id-2';
        const requestId1 = 'request-id-1';
        const requestId2 = 'request-id-2';

        const input: PeriodAutoMatchProps = {
            availableEquipment: [
                { equipmentTypeId: equipmentTypeId, equipmentId: equipmentId1 },
                { equipmentTypeId: equipmentTypeId, equipmentId: equipmentId2 },
            ],
            requests: [
                {
                    requestId: requestId1,
                    equipmentTypeRequests: [
                        { equipmentTypeId: equipmentTypeId, rank: 1 }
                    ]
                },
                {
                    requestId: requestId2,
                    equipmentTypeRequests: [
                        { equipmentTypeId: equipmentTypeId, rank: 1 }
                    ]
                },
            ],
        };

        const result = await generateAutoMatch(input);
        expect(result.length).toBe(2);
        expect(result.map(r => r.equipmentId).sort()).toEqual([equipmentId1, equipmentId2].sort());
        expect(result.map(r => r.requestId).sort()).toEqual([requestId1, requestId2].sort());
    });

    test('two requests, two equipments (different types, different rank)', async () => {
        const equipmentTypeId1 = 'equipment-type-1';
        const equipmentTypeId2 = 'equipment-type-2';
        const equipmentId1 = 'equipment-id-1';
        const equipmentId2 = 'equipment-id-2';
        const requestId1 = 'request-id-1';
        const requestId2 = 'request-id-2';

        const input: PeriodAutoMatchProps = {
            availableEquipment: [
                { equipmentTypeId: equipmentTypeId1, equipmentId: equipmentId1 },
                { equipmentTypeId: equipmentTypeId2, equipmentId: equipmentId2 },
            ],
            requests: [
                {
                    requestId: requestId1,
                    equipmentTypeRequests: [
                        { equipmentTypeId: equipmentTypeId1, rank: 3 },
                        { equipmentTypeId: equipmentTypeId2, rank: 4 }
                    ]
                },
                {
                    requestId: requestId2,
                    equipmentTypeRequests: [
                        { equipmentTypeId: equipmentTypeId1, rank: 1 },
                        { equipmentTypeId: equipmentTypeId2, rank: 2 }
                    ]
                },
            ],
        };

        const expectedOutput: Assignment[] = [
            { requestId: requestId1, equipmentId: equipmentId2 },
            { requestId: requestId2, equipmentId: equipmentId1 }
        ];

        expect((await generateAutoMatch(input)).sort()).toEqual(expectedOutput.sort());
    });

    test('three requests, two equipment (third undesirable equipment)', async () => {
        // a, b and c both want equipment type 1; because c is ok with equipment type 2,
        // they'll get that. Then, a should be prioritized since it has a higher ranking.
        const equipmentTypeId1 = 'equipment-type-1';
        const eqiupmentId1 = 'equipment-1';
        const equipmentTypeId2 = 'equipment-type-2';
        const eqiupmentId2 = 'equipment-2';

        const requestId1 = 'request-1';
        const requestId2 = 'request-2';
        const requestId3 = 'request-3';

        const input: PeriodAutoMatchProps = {
            availableEquipment: [
                { equipmentTypeId: equipmentTypeId1, equipmentId: eqiupmentId1 },
                { equipmentTypeId: equipmentTypeId2, equipmentId: eqiupmentId2 }
            ],
            requests: [
                {
                    requestId: requestId1,
                    equipmentTypeRequests: [
                        { equipmentTypeId: equipmentTypeId1, rank: 4 }
                    ]
                },
                {
                    requestId: requestId2,
                    equipmentTypeRequests: [
                        { equipmentTypeId: equipmentTypeId1, rank: 5 }
                    ]
                },
                {
                    requestId: requestId3,
                    equipmentTypeRequests: [
                        { equipmentTypeId: equipmentTypeId1, rank: 1 },
                        { equipmentTypeId: equipmentTypeId2, rank: 999 }
                    ]
                }
            ]
        };

        const expectedOutput: Assignment[] = [
            { equipmentId: eqiupmentId1, requestId: requestId1 },
            { equipmentId: eqiupmentId2, requestId: requestId3 }
        ];

        expect((await generateAutoMatch(input)).sort()).toEqual(expectedOutput.sort());
    });

    test('no available equipment returns empty', async () => {
        const input: PeriodAutoMatchProps = {
            availableEquipment: [],
            requests: [
                {
                    requestId: 'request-1',
                    equipmentTypeRequests: [
                        { equipmentTypeId: 't1', rank: 1 }
                    ]
                }
            ]
        };
        await expect(generateAutoMatch(input)).rejects.toThrow();
    });

    test('no requests returns empty', async () => {
        const input: PeriodAutoMatchProps = {
            availableEquipment: [
                { equipmentId: 'equipment-1', equipmentTypeId: 'equipment-type-1' }
            ],
            requests: []
        };
        await expect(generateAutoMatch(input)).rejects.toThrow();
    });

    test('no equipment type requests fails', async () => {
        const equipmentTypeId = 'equipment-type-1';
        const eqiupmentId = 'equipment-1';
        const requestId = 'request-1';

        const input: PeriodAutoMatchProps = {
            availableEquipment: [
                { equipmentTypeId: equipmentTypeId, equipmentId: eqiupmentId }
            ],
            requests: [
                {
                    requestId: requestId,
                    equipmentTypeRequests: []
                }
            ]
        };

        await expect(generateAutoMatch(input)).rejects.toThrow();
    });

    test('potential pairings without explicit equipment type request are ignored', async () => {
        const equipmentTypeId1 = 'equipment-type-1';
        const eqiupmentId1 = 'equipment-1';
        const equipmentTypeId2 = 'equipment-type-2';
        const eqiupmentId2 = 'equipment-2';

        const requestId1 = 'request-1';
        const requestId2 = 'request-2';

        const input: PeriodAutoMatchProps = {
            availableEquipment: [
                { equipmentTypeId: equipmentTypeId1, equipmentId: eqiupmentId1 },
                { equipmentTypeId: equipmentTypeId2, equipmentId: eqiupmentId2 }
            ],
            requests: [
                {
                    requestId: requestId1,
                    equipmentTypeRequests: [
                        { equipmentTypeId: equipmentTypeId1, rank: 1 }
                    ]
                },
                {
                    requestId: requestId2,
                    equipmentTypeRequests: [
                        { equipmentTypeId: equipmentTypeId1, rank: 2 }
                    ]
                }
            ]
        };

        // requestId2 is left unmatched
        const expectedOutput: Assignment[] = [
            { equipmentId: eqiupmentId1, requestId: requestId1 }
        ];

        expect((await generateAutoMatch(input)).sort()).toEqual(expectedOutput.sort());
    });

    test('NaN rank throws', async () => {
        const input: PeriodAutoMatchProps = {
            availableEquipment: [{ equipmentTypeId: 'equipment-type-1', equipmentId: 'equipment-1' }],
            requests: [
                {
                    requestId: 'request-1',
                    equipmentTypeRequests: [{
                        equipmentTypeId: 'equipment-type-1',
                        rank: NaN
                    }]
                }
            ]
        };
        await expect(generateAutoMatch(input)).rejects.toThrow();
    });

    test('duplicate rank values throws', async () => {
        const equipmentTypeId1 = 'equipment-type-1';
        const eqiupmentId1 = 'equipment-1';
        const equipmentTypeId2 = 'equipment-type-2';
        const eqiupmentId2 = 'equipment-2';

        const requestId1 = 'request-1';

        const input: PeriodAutoMatchProps = {
            availableEquipment: [
                { equipmentTypeId: equipmentTypeId1, equipmentId: eqiupmentId1 },
                { equipmentTypeId: equipmentTypeId2, equipmentId: eqiupmentId2 }
            ],
            requests: [
                {
                    requestId: requestId1,
                    equipmentTypeRequests: [
                        { equipmentTypeId: equipmentTypeId1, rank: 1 },
                        { equipmentTypeId: equipmentTypeId2, rank: 1 }
                    ]
                }
            ]
        };

        await expect(generateAutoMatch(input)).rejects.toThrow();
    });
});