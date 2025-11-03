import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import FormLabel from './input-label';
import InputLabel from './input-label';

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
        <InputLabel
            label={label}
            inputID={inputID}
            isRequired={isRequired}
        >
            <Input
                id={inputID}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </InputLabel>
    )
}