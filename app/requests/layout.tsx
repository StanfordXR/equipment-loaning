import { Children } from '@/components/types';
import getAuthState from '../utils/get-auth-state';
import { redirect } from 'next/navigation';

export default async function RequestLayout({ children }: Children) {
    const { isUserAuthenticated } = await getAuthState();

    if (!isUserAuthenticated) {
        redirect('/login');
    } else {
        return children;
    }
}