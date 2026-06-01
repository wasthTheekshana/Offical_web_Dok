import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import AdminSidebar from './AdminSidebar';

export const metadata = { title: 'Admin — DOK Solutions' };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/admin/login');

  return (
    <>
      <style>{`body,html{cursor:auto!important}.admin-root,.admin-root *{cursor:auto!important}.admin-root a,.admin-root button,.admin-root [role=button],.admin-root input,.admin-root select,.admin-root textarea{cursor:pointer!important}.admin-root input[type=text],.admin-root input[type=email],.admin-root input[type=password],.admin-root textarea{cursor:text!important}.admin-root [style*="cursor:grab"],.admin-root [style*="cursor: grab"]{cursor:grab!important}.admin-root [style*="cursor:grabbing"],.admin-root [style*="cursor: grabbing"]{cursor:grabbing!important}`}</style>
      <div className="admin-root min-h-screen bg-gray-50">
        <AdminSidebar />
        <main className="ml-60 min-h-screen p-8">
          {children}
        </main>
      </div>
    </>
  );
}
