'use client'

import useAmplify from '@/app/hooks/use-amplify'
import 'aws-amplify/auth/enable-oauth-listener';
import { Hub } from 'aws-amplify/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { useRouter } from 'next/navigation';
import handleError from '@/app/utils/handle-error';

export default function LoginRedirect() {
    useAmplify();
    const router = useRouter();

    Hub.listen('auth', async ({ payload }) => {
        switch (payload.event) {
            case 'signInWithRedirect':
                router.push('/');
                break;
            case 'signInWithRedirect_failure':
                handleError(payload);
                break;
            default:
                break;
        }
    });

    return (
        <div className='flex items-center justify-center h-full'>
            <Card className='w-full max-w-md'>
                <CardContent>
                    <div className='flex justify-center items-center gap-2'>
                        <Spinner />
                        <div>Logging in...</div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}