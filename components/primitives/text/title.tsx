import { ChildrenAndClassName } from '@/components/types';
import { cn } from '@/lib/utils';

export default function Title({ children, className }: ChildrenAndClassName) {
    return (
        <h1 className={cn('text-3xl font-semibold mb-4', className)}>
            {children}
        </h1>
    );
}