'use client'

import EquipmentSelect, { EquipmentSelectItem } from '../components/equipment-select';
import { RequestMatchingItem } from '../components/request-matching-item';
import { PeriodRequests } from './period-requests-config';
import { Assignment } from './requests';

interface UnassignedRequestsProps {
    period: PeriodRequests;
    newAssignments: Assignment[];
    setNewAssignments: (assignments: Assignment[]) => void;
}

export default function UnassignedRequests({ period, newAssignments, setNewAssignments }: UnassignedRequestsProps) {
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

    return (
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
    );
}