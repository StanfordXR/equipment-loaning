'use client'

import { Badge } from '@/components/ui/badge';
import { RequestMatchingItem } from '../components/request-matching-item';
import { PeriodRequests } from './period-requests-config';
import Subtext from '@/components/primitives/text/subtext';

export default function AssignedRequests({ period }: { period: PeriodRequests }) {
    const assignedRequests = period.requests.filter(r => r.assignment);

    if (assignedRequests.length == 0) {
        return (
            <div className='text-center'>
                <Subtext>No assigned requests</Subtext>
            </div>
        );
    }

    return (
        <div className='flex flex-col gap-2'>
            {assignedRequests.map((request) =>
                <RequestMatchingItem
                    requestId={request.id}
                    key={request.id}
                >
                    <div className='flex gap-2'>
                        <div>
                            {request.assignment.id} <span className='text-muted-foreground'>({request.assignment.equipmentType.name})</span>
                        </div>
                        {request.status &&
                            <Badge variant='secondary'>
                                {request.status}
                            </Badge>
                        }
                    </div>
                </RequestMatchingItem>
            )}
        </div>
    );
}