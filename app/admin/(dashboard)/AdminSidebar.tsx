'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { Users, Settings, FileText, Image, Building2, Phone, LogOut } from 'lucide-react';

const navItems = [
  { href: '/admin/team',    label: 'Team Members', icon: Users },
  { href: '/admin/services', label: 'Services',    icon: Settings },
  { href: '/admin/blog',    label: 'Blog / News',  icon: FileText },
  { href: '/admin/images',  label: 'Site Images',  icon: Image },
  { href: '/admin/clients', label: 'Clients',      icon: Building2 },
  { href: '/admin/contact', label: 'Contact',      icon: Phone },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed top-0 left-0 h-screen w-60 bg-[#003B8E] flex flex-col z-50">
      {/* Logo */}
      <div className="px-6 py-7 border-b border-white/10">
        <span className="font-serif text-white text-xl tracking-tight">DOK Admin</span>
        <p className="text-white/40 text-[11px] mt-0.5">Content Management</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + '/');
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                active
                  ? 'bg-white/15 text-white'
                  : 'text-white/60 hover:bg-white/8 hover:text-white'
              }`}
            >
              <Icon size={16} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Sign out */}
      <div className="px-3 py-4 border-t border-white/10">
        <button
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:bg-white/8 hover:text-white transition-all duration-200"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
