'use client'

import { Badge } from '@/components/ui/badge';
import { RequestMatchingItem } from '../components/request-matching-item';
import { PeriodRequests } from './period-requests-config';
import Subtext from '@/components/primitives/text/subtext';
import { RequestStatus } from '@/amplify/data/constants';

export default function AssignedRequests({ period }: { period: PeriodRequests }) {
    const assignedRequests = period.requests.filter(r => r.assignment || r.pastAssignment);

    if (assignedRequests.length == 0) {
        return (
            <div className='text-center'>
                <Subtext>No assigned requests</Subtext>
            </div>
        );
    }

    return (
        <div className='flex flex-col gap-2'>
            {assignedRequests.map((request) => {
                const assignment = request.assignment ?? request.pastAssignment;
                const badgeLabel = (
                    request.pastAssignment ? 'Returned' : (
                        request.status == RequestStatus.CHECKED_OUT ? 'Checked Out' : null
                    )
                );
                return (
                    <RequestMatchingItem
                        requestId={request.id}
                        key={request.id}
                    >
                        <div className='flex gap-2'>
                            <div>
                                {assignment.id} <span className='text-muted-foreground'>({assignment.equipmentType.name})</span>
                            </div>
                            {badgeLabel &&
                                <Badge variant='secondary'>{badgeLabel}</Badge>
                            }
                        </div>
                    </RequestMatchingItem>
                );
            })}
        </div>
    );
}