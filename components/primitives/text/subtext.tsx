import { ChildrenAndClassName } from '@/components/types';
import { cn } from '@/lib/utils';

export default function Subtext({children, className}:ChildrenAndClassName) {
    return <p className={cn('text-muted-foreground text-sm leading-normal font-normal', className)}>{children}</p>
}