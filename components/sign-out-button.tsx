'use client'

import { signOut } from 'aws-amplify/auth';
import { Button } from './ui/button';
import useAmplify from '@/app/hooks/use-amplify';

export default function SignOut() {
    useAmplify();

    return (
        <Button
            variant='secondary'
            onClick={async () => {
                await signOut();
            }}
        >Sign out</Button>
    );
}