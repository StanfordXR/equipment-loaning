import { Children } from '@/components/types';
import getAuthState from '../utils/get-auth-state';
import { redirect } from 'next/navigation';

export default async function LoginLayout({ children }: Children) {
    const { isUserAuthenticated } = await getAuthState();

    if (isUserAuthenticated) {
        redirect('/');
    } else {
        return children;
    }
}