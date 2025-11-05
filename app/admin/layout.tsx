import { Children } from '@/components/types';
import getAuthState from '../utils/get-auth-state';
import { redirect } from 'next/navigation';
import NoAdminAccessAlert from '@/components/auth/no-admin-access-alert';
import AdminSidebar from '@/components/menus/admin-sidebar';

export default async function RequestLayout({ children }: Children) {
    const { isUserAdmin, isUserAuthenticated } = await getAuthState();

    if (!isUserAuthenticated) {
        redirect('/login');
    }

    if (isUserAdmin) {
        return (
            <AdminSidebar>
                {children}
            </AdminSidebar>
        );
    }

    return <NoAdminAccessAlert />;
}