import { cn } from '@/lib/utils';
import { ChildrenAndClassName } from '../types';

export default function Container({ children, className }: ChildrenAndClassName) {
    return (
        <div className={cn('container mx-auto max-w-6xl', className)}>
            {children}
        </div>
    )
}