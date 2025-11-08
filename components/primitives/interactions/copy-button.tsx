import { Button } from '@/components/ui/button';
import { CopyIcon } from 'lucide-react';
import { toast } from 'sonner';

export default function CopyButton({ value, label }: { value: string, label: string }) {
    const handleClick = () => {
        navigator.clipboard.writeText(value);
        toast.info(`Copied ${label} to clipboard`);
    };
    
    return (
        <Button variant='outline' size='icon-sm' onClick={handleClick}>
            <CopyIcon />
        </Button>
    )
}