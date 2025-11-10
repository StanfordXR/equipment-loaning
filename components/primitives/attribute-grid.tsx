import { cn } from '@/lib/utils';
import { ChildrenAndClassName } from '../types';

export default function AttributeGrid({ children, className }: ChildrenAndClassName) {
    return (
        <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-4 md:gap-y-6', className)}>
            {children}
        </div>
    );

}