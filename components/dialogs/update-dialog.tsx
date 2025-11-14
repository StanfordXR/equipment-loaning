'use client'

import { ReactNode } from 'react';
import CRUDDialog from './crud-dialog';

interface UpdateDialogProps {
    name: string;
    description?: string;
    showIndicatesRequiredField?: boolean;
    children: ReactNode;
    onSubmit: () => Promise<boolean>;  // bool denotes if creation was successful
    canSubmit: boolean;
}

export default function UpdateDialog({ name, description, showIndicatesRequiredField, children, onSubmit, canSubmit }: UpdateDialogProps) {
    return <CRUDDialog
        title={`Update ${name}`}
        description={description}
        submitButtonLabel='Update'
        successMessage={`Updated ${name.toLowerCase()} (reload page to see updates)`}
        showIndicatesRequiredField={showIndicatesRequiredField}
        children={children}
        onSubmit={onSubmit}
        canSubmit={canSubmit}
    />
}