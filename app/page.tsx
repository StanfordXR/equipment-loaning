import { redirect } from 'next/navigation';
import getAuthState from './utils/get-auth-state';

export default async function App() {
  const { isUserAdmin, isUserAuthenticated } = await getAuthState();

  if (!isUserAuthenticated) {
    redirect('/login');
  }

  if (isUserAdmin) {
    redirect('/admin/inventory');
  } else {
    redirect('/requests');
  }
}