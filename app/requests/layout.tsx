import { Children } from '@/components/types';
import getAuthState from '../utils/get-auth-state';
import { redirect } from 'next/navigation';
import UserNavMenu from '@/components/menus/user-nav-menu';

export default async function RequestLayout({ children }: Children) {
    const { isUserAuthenticated } = await getAuthState();

    if (!isUserAuthenticated) {
        redirect('/login');
    } else {
        return (
            <>
                <UserNavMenu />
                <div className='px-4 md:px-12'>
                    {children}
                </div>
            </>
        );
    }
}