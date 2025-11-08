'use client'

import { PeriodRequests } from './period-requests-config';
import Container from '@/components/primitives/container';
import Title from '@/components/primitives/text/title';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Item, ItemContent, ItemDescription, ItemTitle } from '@/components/ui/item';
import { Button } from '@/components/ui/button';
import UnassignedRequests from './unassigned-requests';
import AssignedRequests from './assigned-requests';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Header from '@/components/primitives/text/header';
import { useState } from 'react';

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
                    <Matchmaker period={period} />
                    <AvailableEquipment period={period} newAssignments={newAssignments} />
                </div>
            </div>
        </Container>
    );
}

function Matchmaker({ period }: { period: PeriodRequests }) {
    return (
        <Card className='gap-4'>
            <CardHeader>
                <CardTitle>
                    Matching Algorithm
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Button className='w-full'>Run matching algorithm</Button>
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