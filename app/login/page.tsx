'use client'

import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { signInWithRedirect } from 'aws-amplify/auth'
import useAmplify from '../hooks/use-amplify'

export default function Login() {
    useAmplify();

    return (
        <div className='flex items-center justify-center h-full'>
            <Card className='w-full max-w-md'>
                <CardHeader>
                    <CardTitle>Log in to StanfordXR Equipment Loaning</CardTitle>
                </CardHeader>
                <CardContent>
                    <Button
                        className='w-full'
                        onClick={async () =>
                            await signInWithRedirect({
                                provider: 'Google'
                            })
                        }>Log in with Google</Button>
                </CardContent>
            </Card>
        </div>
    )
}