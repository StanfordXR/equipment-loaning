'use client'

import { ReactNode } from 'react';
import CRUDDialog from './crud-dialog';

interface UpdateDialogProps {
    name: string;
    description?: string;
    children: ReactNode;
    onSubmit: () => Promise<boolean>;  // bool denotes if creation was successful
    canSubmit: boolean;
}

export default function UpdateDialog({ name, description, children, onSubmit, canSubmit }: UpdateDialogProps) {
    return <CRUDDialog
        title={`Update ${name}`}
        description={description}
        submitButtonLabel='Update'
        successMessage={`Updated ${name.toLowerCase()} (reload page to see updates)`}
        children={children}
        onSubmit={onSubmit}
        canSubmit={canSubmit}
    />
}