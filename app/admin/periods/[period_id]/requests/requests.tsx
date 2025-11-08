'use client'

import { PeriodRequests } from './period-requests-config';
import Container from '@/components/primitives/container';
import Title from '@/components/primitives/text/title';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Item, ItemContent, ItemDescription, ItemTitle } from '@/components/ui/item';
import { Button } from '@/components/ui/button';
import UnassignedRequests from './unassigned-requests';
import AssignedRequests from './assigned-requests';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Header from '@/components/primitives/text/header';
import { useState } from 'react';
import generateAutoMatch from '@/app/actions/generate-auto-match';
import handleError from '@/app/utils/handle-error';
import { ADMIN_PERIODS_MATCHMAKER_DEFAULT_RANK } from '@/app/utils/constants';
import { toast } from 'sonner';

export interface Assignment {
    equipmentId: string;
    requestId: string;
}

export default function Requests({ period }: { period: PeriodRequests }) {
    const [newAssignments, setNewAssignments] = useState<Assignment[]>([]);

    return (
        <Container>
            <Title>{period.name} Requests</Title>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                <div className='col-span1 lg:col-span-2'>
                    <Accordion type='multiple' defaultValue={['unassigned-requests']}>
                        {/* Assigned requests */}
                        <AccordionItem value='assigned-requests'>
                            <AccordionTrigger>
                                <Header className='mb-0'>
                                    Assigned Requests
                                </Header>
                            </AccordionTrigger>
                            <AccordionContent>
                                <AssignedRequests period={period} />
                            </AccordionContent>
                        </AccordionItem>

                        {/* Unassigned requests */}
                        <AccordionItem value='unassigned-requests'>
                            <AccordionTrigger>
                                <Header className='mb-0'>
                                    Unassigned Requests
                                </Header>
                            </AccordionTrigger>
                            <AccordionContent>
                                <UnassignedRequests
                                    period={period}
                                    newAssignments={newAssignments}
                                    setNewAssignments={setNewAssignments}
                                />
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
                <div className='col-span-1 flex flex-col gap-4'>
                    <Matchmaker period={period} setNewAssignments={setNewAssignments} />
                    <AvailableEquipment period={period} newAssignments={newAssignments} />
                </div>
            </div>
        </Container>
    );
}

function Matchmaker({ period, setNewAssignments }: { period: PeriodRequests, setNewAssignments: (assignments: Assignment[]) => void }) {
    const [isLoading, setIsLoading] = useState(false);

    const handleMatch = async () => {
        const availableEquipment = period.loanableEquipment
            .map(e => e.equipment)
            .filter(e => !e.assignment)
            .map(e => ({
                equipmentTypeId: e.equipmentTypeId,
                equipmentId: e.id
            }));

        const requests = period.requests
            .filter(request => !request.assignment)
            .map(request => ({
                requestId: request.id,
                equipmentTypeRequests: request.equipmentTypeRequests.map(equipmentTypeRequest => ({
                    equipmentTypeId: equipmentTypeRequest.equipmentType.id,
                    rank: equipmentTypeRequest.rank ?? ADMIN_PERIODS_MATCHMAKER_DEFAULT_RANK
                }))
            }));

        setIsLoading(true);
        try {
            const newAssignments = await generateAutoMatch({
                availableEquipment,
                requests
            });
            setNewAssignments(newAssignments);
            toast.info('Populated assignments with matchmaker results');
        } catch (err: any) {
            handleError(err);
        }
        setIsLoading(false);
    }

    return (
        <Card className='gap-4'>
            <CardHeader>
                <CardTitle>
                    Matching Algorithm
                </CardTitle>
                <CardDescription>
                    Populates Unassigned Requests with the optimal request/equipment matches based on user rankings.
                    Running the algorithm does not propagate matches to users until you select Save Assignments.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Button
                    className='w-full'
                    disabled={isLoading}
                    onClick={handleMatch}
                >
                    {isLoading ? 'Loading...' : 'Run matching algorithm'}
                </Button>
            </CardContent>
        </Card>
    )
}

function AvailableEquipment({ period, newAssignments }: { period: PeriodRequests, newAssignments: Assignment[] }) {
    const availableEquipment = period.loanableEquipment
        .map(l => l.equipment)
        .filter(equipment =>
            !equipment.assignment && !newAssignments.some(assignment => assignment.equipmentId == equipment.id)
        )
        .map(equipment => {
            return {
                equipmentTypeName: equipment.equipmentType.name,
                equipmentId: equipment.id
            };
        });

    return (
        <Card className='gap-4'>
            <CardHeader>
                <CardTitle>Available Equipment</CardTitle>
            </CardHeader>
            <CardContent className='flex flex-col gap-3 max-h-[350px] overflow-auto'>
                {
                    availableEquipment.map(({ equipmentTypeName, equipmentId }) => {
                        return (
                            <Item variant='outline' className='p-3' key={equipmentId}>
                                <ItemContent>
                                    <ItemTitle>{equipmentId}</ItemTitle>
                                    <ItemDescription>{equipmentTypeName}</ItemDescription>
                                </ItemContent>
                            </Item>
                        );
                    })
                }
            </CardContent>
        </Card>
    )
}