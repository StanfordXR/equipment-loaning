'use client'

import { Badge } from '@/components/ui/badge';
import { RequestMatchingItem } from '../components/request-matching-item';
import { PeriodRequests } from './period-requests-config';

export default function AssignedRequests({ period }: { period: PeriodRequests }) {
    const assignedRequests = period.requests.filter(r => r.assignment);

    return (
        <div className='flex flex-col gap-2'>
            {assignedRequests.map((request) =>
                <RequestMatchingItem
                    requestId={request.id}
                    key={request.id}
                >
                    <div className='flex gap-2'>
                        <div>
                            <span className='font-bold'>{request.assignment.id}</span> ({request.assignment.equipmentType.name})
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