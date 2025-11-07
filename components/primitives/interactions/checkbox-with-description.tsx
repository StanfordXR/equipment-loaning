import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { CheckedState } from '@radix-ui/react-checkbox';

interface CheckboxWithLabelProps {
    inputID: string;
    label: string;
    description: string;
    value: CheckedState;
    onChange: (val: CheckedState) => void;
    isRequired?: boolean;
    className?: string;
}

export default function CheckboxWithDescription({
    inputID, label, description,
    value, onChange, isRequired = false,
    className
}: CheckboxWithLabelProps) {
    return (
        <div className={cn('flex items-start gap-3', className)}>
            <Checkbox
                id={inputID}
                checked={value}
                onCheckedChange={onChange}
            />
            <div>
                <Label htmlFor={inputID} className="grid gap-2">
                    <div>
                        {label} {isRequired && <span className='text-red-500'>*</span>}
                    </div>
                    <div className="text-muted-foreground text-sm">
                        {description}
                    </div>
                </Label>
            </div>
        </div>
    );
}