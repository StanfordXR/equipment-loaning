'use client'

import { TextInputWithLabel } from '@/components/primitives/interactions/text-input-with-label'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { ReactNode, useEffect, useState } from 'react';
import { toast } from 'sonner';

interface CreateDialogProps {
    name: string;
    description: string;
    children: ReactNode;
    onSubmit: () => Promise<void>;
    canSubmit: boolean;
}

export default function CreateDialog({ name, description, children, onSubmit, canSubmit }: CreateDialogProps) {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const submit = async () => {
        setIsLoading(true);
        try {
            await onSubmit();
            setOpen(false);
        } catch (err) {
            console.error(err);
            toast.error('Something went wrong, see debug console.');
        }
        setIsLoading(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant='secondary'>Create {name}</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create {name}</DialogTitle>
                    <DialogDescription className='flex flex-col gap-1'>
                        <div>{description}</div>

                        <div>
                            <span className='text-red-500'>*</span> indicates a required field
                        </div>
                    </DialogDescription>
                </DialogHeader>

                {children}

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant='secondary'>Cancel</Button>
                    </DialogClose>
                    <Button
                        disabled={isLoading || !canSubmit}
                        type='submit'
                        onClick={submit}
                    >
                        {isLoading ? 'Loading...' : 'Create'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}