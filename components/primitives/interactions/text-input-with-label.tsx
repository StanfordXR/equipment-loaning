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
    description?: string;
    autoFocus?: boolean;
    onEnter?: () => void;
}

export function TextInputWithLabel({
    label,
    inputID,
    placeholder,
    value,
    onChange,
    isRequired = true,
    description,
    autoFocus = false,
    onEnter
}: TextInputWithLabelProps) {
    return (
        <InputLabel
            label={label}
            inputID={inputID}
            isRequired={isRequired}
            description={description}
        >
            <Input
                id={inputID}
                placeholder={placeholder}
                value={value}
                autoFocus={autoFocus}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key == 'Enter' && onEnter) {
                        onEnter();
                    }
                }}
            />
        </InputLabel>
    )
}