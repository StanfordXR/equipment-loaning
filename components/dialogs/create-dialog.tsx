'use client'

import { ReactNode } from 'react';
import CRUDDialog from './crud-dialog';

interface CreateDialogProps {
    name: string;
    description?: string;
    children: ReactNode;
    onSubmit: () => Promise<boolean>;  // bool denotes if creation was successful
    canSubmit: boolean;
}

export default function CreateDialog({ name, description, children, onSubmit, canSubmit }: CreateDialogProps) {
    return <CRUDDialog
        title={`Create ${name}`}
        description={description}
        submitButtonLabel='Create'
        successMessage={`New ${name.toLowerCase()} created (reload page to see updates)`}
        children={children}
        onSubmit={onSubmit}
        canSubmit={canSubmit}
    />
}