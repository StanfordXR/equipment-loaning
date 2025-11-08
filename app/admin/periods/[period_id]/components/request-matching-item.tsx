import CopyButton from '@/components/primitives/interactions/copy-button';
import { ArrowRight } from 'lucide-react';
import { ReactNode } from 'react';

interface RequestMatchingItemProps {
    requestId: string;
    children: ReactNode;
}

export function RequestMatchingItem({ requestId, children }: RequestMatchingItemProps) {
    return (
        <div className='grid grid-cols-9'>
            <div className='col-span-4 flex items-center gap-3'>
                <div className='grow whitespace-nowrap truncate'>
                    Request <span className='font-mono bg-muted p-1 rounded-sm'>{requestId}</span>
                </div>
                <CopyButton value={requestId} label='request ID' />
            </div>
            <div className='col-span-1 flex items-center justify-center'>
                <ArrowRight />
            </div>
            <div className='col-span-4 flex items-center'>
                {children}
            </div>
        </div>
    )
}