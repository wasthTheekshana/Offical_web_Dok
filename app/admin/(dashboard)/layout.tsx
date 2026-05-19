import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import AdminSidebar from './AdminSidebar';

export const metadata = { title: 'Admin — DOK Solutions' };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/admin/login');

  return (
    <div className="min-h-screen bg-gray-50 [&_*]:cursor-auto">
      <AdminSidebar />
      <main className="ml-60 min-h-screen p-8">
        {children}
      </main>
    </div>
  );
}
