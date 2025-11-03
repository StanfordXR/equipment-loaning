import { toast } from 'sonner';

export default function handleError(err:any) {
    console.error(err);
    toast.error('An unexpected error occured, see debug console for full info.');
}