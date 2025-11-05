import { Children } from '@/components/types';
import getAuthState from '../utils/get-auth-state';
import { redirect } from 'next/navigation';
import NoAdminAccessAlert from './no-admin-access-alert';

export default async function RequestLayout({ children }: Children) {
    const { isUserAdmin, isUserAuthenticated } = await getAuthState();

    if (!isUserAuthenticated) {
        redirect('/login');
    }

    if (isUserAdmin) {
        return children;
    }

    return <NoAdminAccessAlert />;
}