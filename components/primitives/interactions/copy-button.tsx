import { Button } from '@/components/ui/button';
import { CopyIcon } from 'lucide-react';
import { toast } from 'sonner';

interface CopyButtonProps {
    value: string;
    label: string;
    hasCopyIcon?: boolean;
    buttonLabel?: string;
}

export default function CopyButton({ value, label, hasCopyIcon = true, buttonLabel }: CopyButtonProps) {
    const handleClick = () => {
        navigator.clipboard.writeText(value);
        toast.info(`Copied ${label} to clipboard`);
    };

    return (
        <Button variant='outline' size={buttonLabel ? 'sm' : 'icon-sm'} onClick={handleClick}>
            {hasCopyIcon && <CopyIcon />}
            {buttonLabel}
        </Button>
    )
}