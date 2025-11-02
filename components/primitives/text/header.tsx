import { ChildrenAndClassName } from '@/components/types';
import { cn } from '@/lib/utils';

export default function Header({ children, className }: ChildrenAndClassName) {
    return (
        <h2 className={cn('text-2xl font-medium mb-2', className)}>
            {children}
        </h2>
    )
}