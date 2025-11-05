'use client'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { signOut } from 'aws-amplify/auth';
import { AlertCircleIcon } from 'lucide-react';
import useAmplify from '../hooks/use-amplify';

export default function NoAdminAccessAlert() {
    useAmplify();

    return (
        <div className='flex items-center justify-center h-full'>
            <Alert className='max-w-md'>
                <AlertCircleIcon />
                <AlertTitle>You must be an admin to view this page</AlertTitle>
                <AlertDescription>
                    <div className='mb-1'>Please reach out if you believe this is an error.</div>
                    <Button
                        variant='default'
                        size='sm'
                        onClick={async () => {
                            await signOut();
                        }}
                    >Sign out</Button>
                </AlertDescription>
            </Alert>
        </div>
    )
}