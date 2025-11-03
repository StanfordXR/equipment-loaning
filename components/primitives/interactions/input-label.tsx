import { Label } from '@/components/ui/label'
import { ReactNode } from 'react';

interface LabelProps {
    label: string;
    inputID: string;
    isRequired?: boolean;
    children: ReactNode;
}

export default function InputLabel({ label, inputID, isRequired = true, children }: LabelProps) {
    return (
        <div className='grid w-full gap-2'>
            <Label htmlFor={inputID} className='gap-1'>
                {label}
                {isRequired && <span className='text-red-500'>*</span>}
            </Label>
            {children}
        </div>
    );
}