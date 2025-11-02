import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface TextInputWithLabelProps {
    label: string;
    inputID: string;
    placeholder?: string;
    value: string;
    onChange: (val: string) => void;
    isRequired?: boolean;
}

export function TextInputWithLabel({ label, inputID, placeholder, value, onChange, isRequired = true }: TextInputWithLabelProps) {
    return (
        <div className='grid w-full gap-2'>
            <Label htmlFor={inputID} className='gap-1'>
                {label}
                {isRequired && <span className='text-red-500'>*</span>}
            </Label>
            <Input
                id={inputID}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    )
}