import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from '@/components/ui/navigation-menu';
import SignOutButton from '@/components/sign-out-button';

export default function UserNavMenu() {
    return (
        <NavigationMenu className='w-full max-w-[initial]'>
            <NavigationMenuList className='w-screen justify-between px-4 py-3 md:py-4 md:px-12'>
                <NavigationMenuItem>
                    <h1 className='text-md md:text-xl font-semibold tracking-tight'>StanfordXR Equipment Loaning</h1>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <SignOutButton />
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
}