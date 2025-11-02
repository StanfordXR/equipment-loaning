import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface TextInputWithLabelProps {
    label: string;
    inputID: string;
    placeholder?: string;
    value: string;
    onChange: (val: string) => void;
}

export function TextInputWithLabel({ label, inputID, placeholder, value, onChange }: TextInputWithLabelProps) {
    return (
        <div className='grid w-full gap-2'>
            <Label htmlFor={inputID}>{label}</Label>
            <Input
                id={inputID}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    )
}