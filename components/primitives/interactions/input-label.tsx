import { Label } from '@/components/ui/label'
import { ReactNode } from 'react';

interface LabelProps {
    label: string;
    description?: string;
    inputID?: string;
    isRequired?: boolean;
    children: ReactNode;
}

export default function InputLabel({ label, inputID, isRequired = true, children, description }: LabelProps) {
    return (
        <div className='grid w-full gap-2'>
            <Label htmlFor={inputID}>
                <div>
                    <div className={description ? 'mb-1' : ''}>
                        {label} {isRequired && <span className='text-red-500'>*</span>}
                    </div>
                    {description &&
                        <p className='font-normal text-muted-foreground leading-tight'>
                            {description}
                        </p>
                    }
                </div>
            </Label>
            {children}
        </div>
    );
}