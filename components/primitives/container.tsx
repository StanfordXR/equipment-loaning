import { cn } from '@/lib/utils';
import { ChildrenAndClassName } from '../types';

type ContainerProps = ChildrenAndClassName & {
    width?: 'wide' | 'tight'
}

export default function Container({ children, className, width = 'wide' }: ContainerProps) {
    return (
        <div className={cn(
            'container mx-auto pt-8',
            width == 'wide' ? 'max-w-6xl' : 'max-w-2xl',
            className
        )}>
            {children}
        </div>
    )
}