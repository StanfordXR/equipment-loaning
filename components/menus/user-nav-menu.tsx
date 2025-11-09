import SignOutButton from '@/components/sign-out-button';

export default function UserNavMenu() {
    return (
        <div className='flex items-center justify-between px-4 py-3 md:py-4 md:px-12'>
            <h1 className='text-md md:text-xl font-semibold tracking-tight'>StanfordXR Equipment Loaning</h1>
            <SignOutButton />
        </div >
    );
}