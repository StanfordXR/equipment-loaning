'use client'

import EquipmentSelect, { EquipmentSelectItem } from '../components/equipment-select';
import { RequestMatchingItem } from '../components/request-matching-item';
import { PeriodRequests } from './period-requests-config';
import { Assignment } from './requests';
import { Button } from '@/components/ui/button';
import Subtext from '@/components/primitives/text/subtext';
import { useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircleIcon } from 'lucide-react';
import generateClient from '@/app/utils/generate-client';
import handleError from '@/app/utils/handle-error';
import { toast } from 'sonner';

interface UnassignedRequestsProps {
    period: PeriodRequests;
    newAssignments: Assignment[];
    setNewAssignments: (assignments: Assignment[]) => void;
}

export default function UnassignedRequests({ period, newAssignments, setNewAssignments }: UnassignedRequestsProps) {
    const client = generateClient();
    const [isLoading, setIsLoading] = useState(false);

    // Here, unassigned requests denote requests that are unassigned at the time of page load --
    // that is, selecting a value from EquipmentSelect will not move the request to Assigned Requests
    const unassignedRequests = period.requests.filter(r => !r.assignment);
    const equipmentItems: EquipmentSelectItem[] = period.loanableEquipment
        .map(l => l.equipment)
        .map(equipment => {
            return {
                eqiupmentTypeName: equipment.equipmentType.name,
                equipmentTypeId: equipment.equipmentTypeId,
                equipmentId: equipment.id,
                isAvailable: !equipment.assignment && !newAssignments.some(assignment => assignment.equipmentId == equipment.id)
            };
        });

    const addNewAssignment = (equipmentId: string, requestId: string) => {
        const existingAssignmentIndex = newAssignments.findIndex(
            assignment => assignment.requestId == requestId
        );
        if (existingAssignmentIndex != -1) {
            let result = [...newAssignments];
            result[existingAssignmentIndex].equipmentId = equipmentId;
            setNewAssignments(result);
        } else {
            setNewAssignments(newAssignments.concat([
                { equipmentId, requestId }
            ]));
        }
    }

    const removeNewAssignment = (requestId: string) => {
        setNewAssignments(newAssignments.filter(a => a.requestId != requestId));
    }

    const updateAssignments = async () => {
        setIsLoading(true);
        const results = await Promise.all(newAssignments.map((assignment) => {
            return client.models.Request.update({
                id: assignment.requestId,
                assignmentId: assignment.equipmentId
            });
        }));

        let hasErrors = false;
        results.map(({ errors }) => {
            if (errors) {
                hasErrors = true;
                handleError(errors);
            }
        });

        if (!hasErrors) {
            toast.success('Assignments updated (reload page to see updates)')
        }
        setIsLoading(false);
    }

    if (unassignedRequests.length == 0) {
        return (
            <div className='text-center'>
                <Subtext>No unassigned requests</Subtext>
            </div>
        );
    }

    return (
        <div className='flex flex-col gap-8'>
            <div className='flex flex-col gap-2'>
                {unassignedRequests.map(request =>
                    <RequestMatchingItem
                        requestId={request.id}
                        key={request.id}
                    >
                        <EquipmentSelect
                            items={equipmentItems}
                            value={
                                newAssignments.find(assignment => assignment.requestId == request.id)?.equipmentId || ''
                            }
                            onChange={(equipmentId) => {
                                addNewAssignment(equipmentId, request.id)
                            }}
                            onClearValue={() => removeNewAssignment(request.id)}
                        />
                    </RequestMatchingItem>
                )}
            </div>
            <div className='flex flex-col gap-4'>
                <Alert>
                    <AlertCircleIcon />
                    <AlertTitle>
                        Confirm that request assignments are correct before submitting
                    </AlertTitle>
                    <AlertDescription>
                        Once given an assignment, any further changes to a request&apos;s equipment assignment will need to
                        be performed manually on the AWS console.
                    </AlertDescription>
                </Alert>
                <div className='flex flex-col gap-2'>
                    <Button
                        disabled={newAssignments.length == 0 || isLoading}
                        onClick={updateAssignments}
                    >
                        {isLoading ? 'Loading...' : 'Save Assignments'}
                    </Button>
                    <Subtext className='text-center'>
                        Request/equipment matches will only be propagated to users once you select Save Assignments.
                    </Subtext>
                </div>
            </div>
        </div>
    );
}