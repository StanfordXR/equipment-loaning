import { cn } from '@/lib/utils';
import { ChildrenAndClassName } from '../types';

type AttributeGridProps = ChildrenAndClassName & {
    maxCols?: 2 | 3;
}

export default function AttributeGrid({ children, className, maxCols = 3 }: AttributeGridProps) {
    return (
        <div className={cn(
            'grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-4 md:gap-y-6',
            (maxCols == 3 && 'lg:grid-cols-3'),
            className
        )}>
            {children}
        </div>
    );

}