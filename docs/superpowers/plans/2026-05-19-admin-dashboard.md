# Admin Dashboard Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a password-protected `/admin` CMS panel that lets DOK staff manage team members, services, blog posts, site images, client names, and contact details — all stored in Supabase, no redeployment required.

**Architecture:** Next.js 15 App Router with a dedicated `app/admin/` subtree protected by Supabase Auth (email + password, session cookie via `@supabase/ssr`). Mutations go through `app/api/admin/` route handlers that verify the session before touching the DB. Public site components are updated to fetch live data from Supabase at request time.

**Tech Stack:** Next.js 15 App Router, TypeScript, Tailwind CSS, `@supabase/supabase-js`, `@supabase/ssr`, Supabase Database + Storage.

---

## Pre-flight: Supabase project setup (manual, one-time)

Before running any code, you need a free Supabase project.

- [ ] Go to https://supabase.com → New Project → name it `dok-website` → pick the Singapore region → set a strong DB password → Create.
- [ ] Once created, go to **Project Settings → API** and copy:
  - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
  - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY`
- [ ] Create a file `d:\Project\Offical_web_Dok\Offical_web_Dok\.env.local` with:
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```
- [ ] Go to **Authentication → Users** and click **Add User** → enter your email and a strong password. This will be your admin login.

---

## Task 1: Install Supabase packages

**Files:**
- Modify: `package.json`

- [ ] **Install dependencies**

Run in `d:\Project\Offical_web_Dok\Offical_web_Dok`:
```bash
npm install @supabase/supabase-js @supabase/ssr
```

Expected: `package.json` now lists both packages under `dependencies`.

- [ ] **Verify install**

Run:
```bash
node -e "require('@supabase/supabase-js'); console.log('ok')"
```
Expected output: `ok`

- [ ] **Commit**
```bash
git add package.json package-lock.json
git commit -m "deps: add supabase/supabase-js and supabase/ssr"
```

---

## Task 2: Supabase schema — run SQL migrations

**Files:** None in project (run in Supabase SQL editor)

- [ ] **Open the Supabase SQL editor** at https://supabase.com → your project → SQL Editor → New Query

- [ ] **Run the following SQL** (paste all at once and click Run):

```sql
-- Team members
create table team_members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null,
  bio text default '',
  photo_url text default '',
  display_order int default 0,
  created_at timestamptz default now()
);

-- Services
create table services (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description text default '',
  hero_image_url text default '',
  features jsonb default '[]',
  stats jsonb default '[]',
  published boolean default true
);

-- Blog posts
create table blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text default '',
  body text default '',
  cover_image_url text default '',
  published boolean default false,
  published_at timestamptz,
  created_at timestamptz default now()
);

-- Site images (key-value)
create table site_images (
  key text primary key,
  label text not null,
  url text default '',
  updated_at timestamptz default now()
);

-- Clients
create table clients (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  display_order int default 0
);

-- Contact details (key-value)
create table contact_details (
  key text primary key,
  value text default ''
);
```

Expected: "Success. No rows returned."

- [ ] **Enable Row Level Security and add policies** — paste and run:

```sql
-- Enable RLS on all tables
alter table team_members enable row level security;
alter table services enable row level security;
alter table blog_posts enable row level security;
alter table site_images enable row level security;
alter table clients enable row level security;
alter table contact_details enable row level security;

-- Anonymous SELECT (public site can read)
create policy "public read team" on team_members for select using (true);
create policy "public read services" on services for select using (true);
create policy "public read blog" on blog_posts for select using (true);
create policy "public read site_images" on site_images for select using (true);
create policy "public read clients" on clients for select using (true);
create policy "public read contact" on contact_details for select using (true);

-- Authenticated ALL (admin can do everything)
create policy "admin all team" on team_members for all using (auth.role() = 'authenticated');
create policy "admin all services" on services for all using (auth.role() = 'authenticated');
create policy "admin all blog" on blog_posts for all using (auth.role() = 'authenticated');
create policy "admin all site_images" on site_images for all using (auth.role() = 'authenticated');
create policy "admin all clients" on clients for all using (auth.role() = 'authenticated');
create policy "admin all contact" on contact_details for all using (auth.role() = 'authenticated');
```

- [ ] **Create Storage buckets** in Supabase → Storage → New Bucket:
  - Name: `team-photos`, toggle **Public bucket** ON → Create
  - Name: `site-images`, toggle **Public bucket** ON → Create

- [ ] **Seed contact details** (so the contact page works before admin is used):
```sql
insert into contact_details (key, value) values
  ('phone', '+94 11 259 7171'),
  ('email', 'info@dok.lk'),
  ('address', 'No. 10, Kirula Road, Colombo 05, Sri Lanka');
```

- [ ] **Seed site_images slots** (all the named image keys the site uses):
```sql
insert into site_images (key, label, url) values
  ('home-hero', 'Home Hero', ''),
  ('about-building', 'About — Building', '/images/building.jpg'),
  ('about-story-main', 'About Story — Main Photo', '/images/team-all.jpg'),
  ('warehouse-main', 'Warehouse Main', '/images/warehouse-main.jpg'),
  ('warehouse-shelves', 'Warehouse Shelves', '/images/warehouse-shelves.png'),
  ('warehouse-forklift', 'Warehouse Forklift', '/images/warehouse-forklift.jpg'),
  ('scanning', 'Scanning', '/images/scanning.jpg'),
  ('scanning-2', 'Scanning Close-up', '/images/scanning-2.jpg'),
  ('scanning-team', 'Scanning Team', '/images/scanning-team.png'),
  ('data-entry', 'Data Entry', '/images/data-entry.jpg');
```

---

## Task 3: Supabase client lib files

**Files:**
- Create: `lib/supabase/client.ts`
- Create: `lib/supabase/server.ts`
- Create: `lib/supabase/admin.ts`
- Create: `middleware.ts`

- [ ] **Create `lib/supabase/client.ts`** — browser-side client for admin pages:

```typescript
import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
```

- [ ] **Create `lib/supabase/server.ts`** — server-side client for route handlers and server components:

```typescript
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function createClient() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll(); },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {}
        },
      },
    }
  );
}
```

- [ ] **Create `lib/supabase/admin.ts`** — service-role client for server-only use:

```typescript
import { createClient } from '@supabase/supabase-js';

export const adminClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } }
);
```

- [ ] **Create `middleware.ts`** in project root — refreshes the auth session cookie on every request:

```typescript
import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll(); },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  if (!user && request.nextUrl.pathname.startsWith('/admin') &&
      !request.nextUrl.pathname.startsWith('/admin/login')) {
    const url = request.nextUrl.clone();
    url.pathname = '/admin/login';
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

export const config = {
  matcher: ['/admin/:path*'],
};
```

- [ ] **Verify TypeScript compiles** — run:
```bash
npx tsc --noEmit
```
Expected: no errors (or only pre-existing unrelated errors).

- [ ] **Commit**
```bash
git add lib/supabase/ middleware.ts
git commit -m "feat: add supabase client lib and auth middleware"
```

---

## Task 4: Admin layout with sidebar

**Files:**
- Create: `app/admin/layout.tsx`
- Create: `app/admin/AdminSidebar.tsx`

- [ ] **Create `app/admin/AdminSidebar.tsx`** — client component (needs `usePathname`):

```typescript
'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Users, Settings, FileText, Image, Building2, Phone, LogOut, LayoutDashboard } from 'lucide-react';

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
  const router = useRouter();

  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/admin/login');
  }

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
          onClick={signOut}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:bg-white/8 hover:text-white transition-all duration-200"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
```

- [ ] **Create `app/admin/layout.tsx`** — server component that checks auth:

```typescript
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import AdminSidebar from './AdminSidebar';

export const metadata = { title: 'Admin — DOK Solutions' };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/admin/login');

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="ml-60 min-h-screen p-8">
        {children}
      </main>
    </div>
  );
}
```

- [ ] **Create `app/admin/page.tsx`** — redirect to team:

```typescript
import { redirect } from 'next/navigation';

export default function AdminRoot() {
  redirect('/admin/team');
}
```

- [ ] **Verify** — run `npm run dev`, visit http://localhost:3000/admin. Should redirect to `/admin/login` (login page doesn't exist yet, so you'll get a 404 — that's expected).

- [ ] **Commit**
```bash
git add app/admin/
git commit -m "feat: admin layout with sidebar and auth guard"
```

---

## Task 5: Login page

**Files:**
- Create: `app/admin/login/page.tsx`

- [ ] **Create `app/admin/login/page.tsx`**:

```typescript
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (authError) {
      setError('Invalid email or password.');
    } else {
      router.push('/admin/team');
      router.refresh();
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="mb-8 text-center">
          <span className="font-serif text-2xl text-[#003B8E]">DOK Admin</span>
          <p className="text-gray-400 text-sm mt-1">Sign in to manage content</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#003B8E]/20 focus:border-[#003B8E]"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#003B8E]/20 focus:border-[#003B8E]"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm bg-red-50 border border-red-100 rounded-lg px-3 py-2">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#003B8E] text-white rounded-xl py-3 text-sm font-semibold hover:bg-[#002d6e] transition-colors disabled:opacity-60"
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
```

- [ ] **Verify** — visit http://localhost:3000/admin/login. You should see the login card. Enter wrong credentials → error message appears. Enter correct credentials (from Pre-flight step) → redirected to `/admin/team` (404 for now).

- [ ] **Commit**
```bash
git add app/admin/login/
git commit -m "feat: admin login page with Supabase Auth"
```

---

## Task 6: Team Members — API route + admin page

**Files:**
- Create: `app/api/admin/team/route.ts`
- Create: `app/api/admin/team/[id]/route.ts`
- Create: `app/api/admin/upload-url/route.ts`
- Create: `app/admin/team/page.tsx`

- [ ] **Create `app/api/admin/team/route.ts`**:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

async function requireAuth() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  return supabase;
}

export async function GET() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('team_members')
    .select('*')
    .order('display_order');
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const supabase = await requireAuth();
  if (!supabase) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const { data, error } = await supabase
    .from('team_members')
    .insert({ name: body.name, role: body.role, bio: body.bio, photo_url: body.photo_url, display_order: body.display_order ?? 0 })
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
```

- [ ] **Create `app/api/admin/team/[id]/route.ts`**:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

async function requireAuth() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  return supabase;
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const supabase = await requireAuth();
  if (!supabase) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const body = await req.json();
  const { data, error } = await supabase
    .from('team_members')
    .update({ name: body.name, role: body.role, bio: body.bio, photo_url: body.photo_url })
    .eq('id', id)
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const supabase = await requireAuth();
  if (!supabase) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const { error } = await supabase.from('team_members').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
```

- [ ] **Create `app/api/admin/upload-url/route.ts`** — generates a signed upload URL for direct browser → Supabase Storage upload:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { adminClient } from '@/lib/supabase/admin';

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { bucket, path } = await req.json();
  const { data, error } = await adminClient.storage
    .from(bucket)
    .createSignedUploadUrl(path);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
```

- [ ] **Create `app/admin/team/page.tsx`**:

```typescript
'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Pencil, Trash2, Plus, X } from 'lucide-react';

type Member = { id: string; name: string; role: string; bio: string; photo_url: string };
const empty: Omit<Member, 'id'> = { name: '', role: '', bio: '', photo_url: '' };

export default function AdminTeamPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [form, setForm] = useState<Omit<Member, 'id'>>(empty);
  const [editId, setEditId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  async function load() {
    const res = await fetch('/api/admin/team');
    setMembers(await res.json());
  }

  useEffect(() => { load(); }, []);

  async function uploadPhoto(file: File): Promise<string> {
    const ext = file.name.split('.').pop();
    const path = `${Date.now()}.${ext}`;
    const res = await fetch('/api/admin/upload-url', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bucket: 'team-photos', path }),
    });
    const { signedUrl, token } = await res.json();
    await fetch(signedUrl, { method: 'PUT', body: file, headers: { 'Content-Type': file.type } });
    const supabase = createClient();
    const { data } = supabase.storage.from('team-photos').getPublicUrl(path);
    return data.publicUrl;
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const url = await uploadPhoto(file);
    setForm(f => ({ ...f, photo_url: url }));
    setUploading(false);
  }

  function openAdd() { setForm(empty); setEditId(null); setShowForm(true); }

  function openEdit(m: Member) {
    setForm({ name: m.name, role: m.role, bio: m.bio, photo_url: m.photo_url });
    setEditId(m.id);
    setShowForm(true);
  }

  async function handleSave() {
    setSaving(true);
    if (editId) {
      await fetch(`/api/admin/team/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
    } else {
      await fetch('/api/admin/team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
    }
    setSaving(false);
    setShowForm(false);
    load();
  }

  async function handleDelete(id: string) {
    await fetch(`/api/admin/team/${id}`, { method: 'DELETE' });
    setDeleteId(null);
    load();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Team Members</h1>
          <p className="text-gray-400 text-sm mt-1">{members.length} members</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-[#003B8E] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#002d6e] transition-colors"
        >
          <Plus size={15} /> Add Member
        </button>
      </div>

      {/* Member grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {members.map(m => (
          <div key={m.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            {m.photo_url && (
              <img src={m.photo_url} alt={m.name} className="w-full h-40 object-cover object-top" />
            )}
            {!m.photo_url && (
              <div className="w-full h-40 bg-gray-100 flex items-center justify-center text-gray-300 text-4xl font-serif">
                {m.name[0]}
              </div>
            )}
            <div className="p-4">
              <p className="font-semibold text-gray-900 text-sm">{m.name}</p>
              <p className="text-gray-400 text-xs mt-0.5">{m.role}</p>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => openEdit(m)}
                  className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#003B8E] border border-gray-200 hover:border-[#003B8E]/30 px-3 py-1.5 rounded-lg transition-colors"
                >
                  <Pencil size={12} /> Edit
                </button>
                <button
                  onClick={() => setDeleteId(m.id)}
                  className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-red-600 border border-gray-200 hover:border-red-200 px-3 py-1.5 rounded-lg transition-colors"
                >
                  <Trash2 size={12} /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Delete confirmation */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
            <h3 className="font-semibold text-gray-900 mb-2">Delete member?</h3>
            <p className="text-gray-400 text-sm mb-6">This cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 border border-gray-200 text-gray-600 py-2 rounded-xl text-sm">Cancel</button>
              <button onClick={() => handleDelete(deleteId)} className="flex-1 bg-red-600 text-white py-2 rounded-xl text-sm font-medium hover:bg-red-700">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit form modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-semibold text-gray-900">{editId ? 'Edit Member' : 'Add Member'}</h3>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600"><X size={18} /></button>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Name</label>
                <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#003B8E]/20 focus:border-[#003B8E]" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Role / Title</label>
                <input value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#003B8E]/20 focus:border-[#003B8E]" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Bio</label>
                <textarea value={form.bio} onChange={e => setForm(f => ({ ...f, bio: e.target.value }))} rows={4}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#003B8E]/20 focus:border-[#003B8E] resize-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Photo</label>
                {form.photo_url && (
                  <img src={form.photo_url} alt="" className="w-20 h-20 rounded-xl object-cover mb-2" />
                )}
                <input type="file" accept="image/*" onChange={handleFileChange} className="text-sm text-gray-500" />
                {uploading && <p className="text-xs text-gray-400 mt-1">Uploading…</p>}
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowForm(false)} className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-xl text-sm">Cancel</button>
              <button onClick={handleSave} disabled={saving || uploading}
                className="flex-1 bg-[#003B8E] text-white py-2.5 rounded-xl text-sm font-semibold disabled:opacity-60 hover:bg-[#002d6e] transition-colors">
                {saving ? 'Saving…' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Verify** — log in to admin, visit http://localhost:3000/admin/team. Click "Add Member", fill in name/role, upload a photo, save. Card appears. Click Edit, change name, save. Click Delete → confirm prompt → member removed.

- [ ] **Commit**
```bash
git add app/api/admin/team/ app/api/admin/upload-url/ app/admin/team/
git commit -m "feat: team members CRUD in admin panel"
```

---

## Task 7: Services — API route + admin page

**Files:**
- Create: `app/api/admin/services/route.ts`
- Create: `app/api/admin/services/[id]/route.ts`
- Create: `app/admin/services/page.tsx`

- [ ] **Create `app/api/admin/services/route.ts`**:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

async function requireAuth() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  return supabase;
}

export async function GET() {
  const supabase = await createClient();
  const { data, error } = await supabase.from('services').select('*').order('title');
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const supabase = await requireAuth();
  if (!supabase) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const slug = body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const { data, error } = await supabase
    .from('services')
    .insert({ slug: body.slug || slug, title: body.title, description: body.description, hero_image_url: body.hero_image_url, features: body.features ?? [], stats: body.stats ?? [], published: body.published ?? true })
    .select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
```

- [ ] **Create `app/api/admin/services/[id]/route.ts`**:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

async function requireAuth() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  return supabase;
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const supabase = await requireAuth();
  if (!supabase) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const body = await req.json();
  const { data, error } = await supabase
    .from('services')
    .update({ title: body.title, description: body.description, hero_image_url: body.hero_image_url, features: body.features, stats: body.stats, published: body.published })
    .eq('id', id).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
```

- [ ] **Create `app/admin/services/page.tsx`**:

```typescript
'use client';

import { useEffect, useState } from 'react';
import { Pencil, Plus, X, Trash2 } from 'lucide-react';

type Stat = { val: string; label: string };
type Service = { id: string; slug: string; title: string; description: string; hero_image_url: string; features: string[]; stats: Stat[]; published: boolean };
const emptyService: Omit<Service, 'id'> = { slug: '', title: '', description: '', hero_image_url: '', features: [], stats: [], published: true };

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [form, setForm] = useState<Omit<Service, 'id'>>(emptyService);
  const [editId, setEditId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [newFeature, setNewFeature] = useState('');
  const [newStat, setNewStat] = useState<Stat>({ val: '', label: '' });

  async function load() {
    const res = await fetch('/api/admin/services');
    setServices(await res.json());
  }

  useEffect(() => { load(); }, []);

  function openAdd() { setForm(emptyService); setEditId(null); setShowForm(true); }

  function openEdit(s: Service) {
    setForm({ slug: s.slug, title: s.title, description: s.description, hero_image_url: s.hero_image_url, features: s.features, stats: s.stats, published: s.published });
    setEditId(s.id);
    setShowForm(true);
  }

  async function handleSave() {
    setSaving(true);
    if (editId) {
      await fetch(`/api/admin/services/${editId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    } else {
      await fetch('/api/admin/services', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    }
    setSaving(false);
    setShowForm(false);
    load();
  }

  function addFeature() {
    if (!newFeature.trim()) return;
    setForm(f => ({ ...f, features: [...f.features, newFeature.trim()] }));
    setNewFeature('');
  }

  function removeFeature(i: number) {
    setForm(f => ({ ...f, features: f.features.filter((_, idx) => idx !== i) }));
  }

  function addStat() {
    if (!newStat.val.trim() || !newStat.label.trim()) return;
    setForm(f => ({ ...f, stats: [...f.stats, newStat] }));
    setNewStat({ val: '', label: '' });
  }

  function removeStat(i: number) {
    setForm(f => ({ ...f, stats: f.stats.filter((_, idx) => idx !== i) }));
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Services</h1>
          <p className="text-gray-400 text-sm mt-1">{services.length} services</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 bg-[#003B8E] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#002d6e] transition-colors">
          <Plus size={15} /> Add Service
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {services.map((s, i) => (
          <div key={s.id} className={`flex items-center gap-4 p-4 ${i !== 0 ? 'border-t border-gray-100' : ''}`}>
            {s.hero_image_url && (
              <img src={s.hero_image_url} alt={s.title} className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />
            )}
            {!s.hero_image_url && (
              <div className="w-14 h-14 rounded-xl bg-gray-100 flex-shrink-0" />
            )}
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 text-sm">{s.title}</p>
              <p className="text-gray-400 text-xs truncate mt-0.5">{s.description}</p>
            </div>
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${s.published ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
              {s.published ? 'Published' : 'Hidden'}
            </span>
            <button onClick={() => openEdit(s)} className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#003B8E] border border-gray-200 hover:border-[#003B8E]/30 px-3 py-1.5 rounded-lg transition-colors">
              <Pencil size={12} /> Edit
            </button>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-semibold text-gray-900">{editId ? 'Edit Service' : 'Add Service'}</h3>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600"><X size={18} /></button>
            </div>

            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Title</label>
                  <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#003B8E]/20 focus:border-[#003B8E]" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Slug (URL)</label>
                  <input value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#003B8E]/20 focus:border-[#003B8E]"
                    placeholder="e.g. physical-archiving" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Description</label>
                <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#003B8E]/20 focus:border-[#003B8E] resize-none" />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Hero Image URL</label>
                <input value={form.hero_image_url} onChange={e => setForm(f => ({ ...f, hero_image_url: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#003B8E]/20 focus:border-[#003B8E]"
                  placeholder="/images/warehouse-main.jpg or https://…" />
              </div>

              {/* Features */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Features</label>
                <div className="flex flex-col gap-1.5 mb-2">
                  {form.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-1.5 text-sm">
                      <span className="flex-1">{f}</span>
                      <button onClick={() => removeFeature(i)} className="text-gray-400 hover:text-red-500"><Trash2 size={12} /></button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input value={newFeature} onChange={e => setNewFeature(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && addFeature()}
                    placeholder="Add a feature…"
                    className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003B8E]/20 focus:border-[#003B8E]" />
                  <button onClick={addFeature} className="bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-xl text-sm transition-colors">Add</button>
                </div>
              </div>

              {/* Stats */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Stats</label>
                <div className="flex flex-col gap-1.5 mb-2">
                  {form.stats.map((s, i) => (
                    <div key={i} className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-1.5 text-sm">
                      <span className="font-semibold text-[#003B8E]">{s.val}</span>
                      <span className="flex-1 text-gray-500">{s.label}</span>
                      <button onClick={() => removeStat(i)} className="text-gray-400 hover:text-red-500"><Trash2 size={12} /></button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input value={newStat.val} onChange={e => setNewStat(s => ({ ...s, val: e.target.value }))}
                    placeholder="Value (e.g. 200+)"
                    className="w-28 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003B8E]/20 focus:border-[#003B8E]" />
                  <input value={newStat.label} onChange={e => setNewStat(s => ({ ...s, label: e.target.value }))}
                    onKeyDown={e => e.key === 'Enter' && addStat()}
                    placeholder="Label (e.g. Corporate Clients)"
                    className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003B8E]/20 focus:border-[#003B8E]" />
                  <button onClick={addStat} className="bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-xl text-sm transition-colors">Add</button>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <input type="checkbox" id="published" checked={form.published} onChange={e => setForm(f => ({ ...f, published: e.target.checked }))} className="w-4 h-4 accent-[#003B8E]" />
                <label htmlFor="published" className="text-sm text-gray-700">Published (visible on site)</label>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowForm(false)} className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-xl text-sm">Cancel</button>
              <button onClick={handleSave} disabled={saving}
                className="flex-1 bg-[#003B8E] text-white py-2.5 rounded-xl text-sm font-semibold disabled:opacity-60 hover:bg-[#002d6e] transition-colors">
                {saving ? 'Saving…' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Verify** — visit http://localhost:3000/admin/services. Click "Add Service", enter title/description, add 2 features and 2 stats, save. Service appears in list. Click Edit, toggle published off, save — badge changes to "Hidden".

- [ ] **Commit**
```bash
git add app/api/admin/services/ app/admin/services/
git commit -m "feat: services CRUD in admin panel"
```

---

## Task 8: Blog / News — API route + admin page

**Files:**
- Create: `app/api/admin/blog/route.ts`
- Create: `app/api/admin/blog/[id]/route.ts`
- Create: `app/admin/blog/page.tsx`

- [ ] **Create `app/api/admin/blog/route.ts`**:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

async function requireAuth() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  return supabase;
}

export async function GET() {
  const supabase = await createClient();
  const { data, error } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const supabase = await requireAuth();
  if (!supabase) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const slug = body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const published_at = body.published ? new Date().toISOString() : null;
  const { data, error } = await supabase
    .from('blog_posts')
    .insert({ slug, title: body.title, excerpt: body.excerpt, body: body.body, cover_image_url: body.cover_image_url, published: body.published ?? false, published_at })
    .select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
```

- [ ] **Create `app/api/admin/blog/[id]/route.ts`**:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

async function requireAuth() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  return supabase;
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const supabase = await requireAuth();
  if (!supabase) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const body = await req.json();
  const published_at = body.published ? new Date().toISOString() : null;
  const { data, error } = await supabase
    .from('blog_posts')
    .update({ title: body.title, excerpt: body.excerpt, body: body.body, cover_image_url: body.cover_image_url, published: body.published, published_at })
    .eq('id', id).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const supabase = await requireAuth();
  if (!supabase) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const { error } = await supabase.from('blog_posts').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
```

- [ ] **Create `app/admin/blog/page.tsx`**:

```typescript
'use client';

import { useEffect, useState } from 'react';
import { Pencil, Trash2, Plus, X } from 'lucide-react';

type Post = { id: string; slug: string; title: string; excerpt: string; body: string; cover_image_url: string; published: boolean; published_at: string | null; created_at: string };
const emptyPost: Omit<Post, 'id' | 'published_at' | 'created_at'> = { slug: '', title: '', excerpt: '', body: '', cover_image_url: '', published: false };

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [form, setForm] = useState<Omit<Post, 'id' | 'published_at' | 'created_at'>>(emptyPost);
  const [editId, setEditId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  async function load() {
    const res = await fetch('/api/admin/blog');
    setPosts(await res.json());
  }

  useEffect(() => { load(); }, []);

  function openAdd() { setForm(emptyPost); setEditId(null); setShowForm(true); }

  function openEdit(p: Post) {
    setForm({ slug: p.slug, title: p.title, excerpt: p.excerpt, body: p.body, cover_image_url: p.cover_image_url, published: p.published });
    setEditId(p.id);
    setShowForm(true);
  }

  async function handleSave() {
    setSaving(true);
    if (editId) {
      await fetch(`/api/admin/blog/${editId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    } else {
      await fetch('/api/admin/blog', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    }
    setSaving(false);
    setShowForm(false);
    load();
  }

  async function handleDelete(id: string) {
    await fetch(`/api/admin/blog/${id}`, { method: 'DELETE' });
    setDeleteId(null);
    load();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Blog / News</h1>
          <p className="text-gray-400 text-sm mt-1">{posts.length} posts</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 bg-[#003B8E] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#002d6e] transition-colors">
          <Plus size={15} /> New Post
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {posts.length === 0 && (
          <p className="text-gray-400 text-sm p-6">No posts yet. Click "New Post" to create your first article.</p>
        )}
        {posts.map((p, i) => (
          <div key={p.id} className={`flex items-center gap-4 p-4 ${i !== 0 ? 'border-t border-gray-100' : ''}`}>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 text-sm">{p.title}</p>
              <p className="text-gray-400 text-xs truncate mt-0.5">{p.excerpt}</p>
            </div>
            <span className={`text-xs px-2 py-1 rounded-full font-medium flex-shrink-0 ${p.published ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'}`}>
              {p.published ? 'Published' : 'Draft'}
            </span>
            <p className="text-xs text-gray-400 flex-shrink-0">{new Date(p.created_at).toLocaleDateString()}</p>
            <div className="flex gap-2 flex-shrink-0">
              <button onClick={() => openEdit(p)} className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#003B8E] border border-gray-200 hover:border-[#003B8E]/30 px-3 py-1.5 rounded-lg transition-colors">
                <Pencil size={12} /> Edit
              </button>
              <button onClick={() => setDeleteId(p.id)} className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-red-600 border border-gray-200 hover:border-red-200 px-3 py-1.5 rounded-lg transition-colors">
                <Trash2 size={12} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {deleteId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
            <h3 className="font-semibold text-gray-900 mb-2">Delete post?</h3>
            <p className="text-gray-400 text-sm mb-6">This cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 border border-gray-200 text-gray-600 py-2 rounded-xl text-sm">Cancel</button>
              <button onClick={() => handleDelete(deleteId)} className="flex-1 bg-red-600 text-white py-2 rounded-xl text-sm font-medium hover:bg-red-700">Delete</button>
            </div>
          </div>
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-semibold text-gray-900">{editId ? 'Edit Post' : 'New Post'}</h3>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600"><X size={18} /></button>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Title</label>
                <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#003B8E]/20 focus:border-[#003B8E]" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Excerpt (short summary)</label>
                <textarea value={form.excerpt} onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))} rows={2}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#003B8E]/20 focus:border-[#003B8E] resize-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Body (markdown)</label>
                <textarea value={form.body} onChange={e => setForm(f => ({ ...f, body: e.target.value }))} rows={10}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#003B8E]/20 focus:border-[#003B8E] resize-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Cover Image URL</label>
                <input value={form.cover_image_url} onChange={e => setForm(f => ({ ...f, cover_image_url: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#003B8E]/20 focus:border-[#003B8E]"
                  placeholder="https://…" />
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="pub" checked={form.published} onChange={e => setForm(f => ({ ...f, published: e.target.checked }))} className="w-4 h-4 accent-[#003B8E]" />
                <label htmlFor="pub" className="text-sm text-gray-700">Publish now (visible on /news)</label>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowForm(false)} className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-xl text-sm">Cancel</button>
              <button onClick={handleSave} disabled={saving}
                className="flex-1 bg-[#003B8E] text-white py-2.5 rounded-xl text-sm font-semibold disabled:opacity-60 hover:bg-[#002d6e] transition-colors">
                {saving ? 'Saving…' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Verify** — visit http://localhost:3000/admin/blog. Create a post with title and body, check "Publish now", save. Post appears with "Published" badge.

- [ ] **Commit**
```bash
git add app/api/admin/blog/ app/admin/blog/
git commit -m "feat: blog/news CRUD in admin panel"
```

---

## Task 9: Site Images — API route + admin page

**Files:**
- Create: `app/api/admin/images/route.ts`
- Create: `app/api/admin/images/[key]/route.ts`
- Create: `app/admin/images/page.tsx`

- [ ] **Create `app/api/admin/images/route.ts`**:

```typescript
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  const supabase = await createClient();
  const { data, error } = await supabase.from('site_images').select('*').order('key');
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
```

- [ ] **Create `app/api/admin/images/[key]/route.ts`**:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

async function requireAuth() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  return supabase;
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ key: string }> }) {
  const supabase = await requireAuth();
  if (!supabase) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { key } = await params;
  const { url } = await req.json();
  const { data, error } = await supabase
    .from('site_images')
    .update({ url, updated_at: new Date().toISOString() })
    .eq('key', key).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
```

- [ ] **Create `app/admin/images/page.tsx`**:

```typescript
'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

type SiteImage = { key: string; label: string; url: string; updated_at: string };

export default function AdminImagesPage() {
  const [images, setImages] = useState<SiteImage[]>([]);
  const [uploading, setUploading] = useState<string | null>(null);

  async function load() {
    const res = await fetch('/api/admin/images');
    setImages(await res.json());
  }

  useEffect(() => { load(); }, []);

  async function handleReplace(imageKey: string, file: File) {
    setUploading(imageKey);
    const ext = file.name.split('.').pop();
    const path = `${imageKey}-${Date.now()}.${ext}`;
    const res = await fetch('/api/admin/upload-url', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bucket: 'site-images', path }),
    });
    const { signedUrl } = await res.json();
    await fetch(signedUrl, { method: 'PUT', body: file, headers: { 'Content-Type': file.type } });
    const supabase = createClient();
    const { data } = supabase.storage.from('site-images').getPublicUrl(path);
    await fetch(`/api/admin/images/${imageKey}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: data.publicUrl }),
    });
    setUploading(null);
    load();
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Site Images</h1>
        <p className="text-gray-400 text-sm mt-1">Replace images shown on the public website. Changes appear immediately — no redeployment needed.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map(img => (
          <div key={img.key} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="relative h-40 bg-gray-100">
              {img.url ? (
                <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300 text-sm">No image</div>
              )}
              {uploading === img.key && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-white text-sm">Uploading…</span>
                </div>
              )}
            </div>
            <div className="p-4">
              <p className="font-medium text-gray-900 text-sm">{img.label}</p>
              <p className="text-gray-400 text-xs mt-0.5 font-mono">{img.key}</p>
              <label className="mt-3 block">
                <span className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#003B8E] border border-gray-200 hover:border-[#003B8E]/30 px-3 py-1.5 rounded-lg transition-colors cursor-pointer">
                  Replace Image
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  disabled={uploading !== null}
                  onChange={e => {
                    const file = e.target.files?.[0];
                    if (file) handleReplace(img.key, file);
                  }}
                />
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Verify** — visit http://localhost:3000/admin/images. You see all image slots from the seed data. Click "Replace Image" on one slot, pick a file → image updates in the card.

- [ ] **Commit**
```bash
git add app/api/admin/images/ app/admin/images/
git commit -m "feat: site images manager in admin panel"
```

---

## Task 10: Clients — API route + admin page

**Files:**
- Create: `app/api/admin/clients/route.ts`
- Create: `app/api/admin/clients/[id]/route.ts`
- Create: `app/admin/clients/page.tsx`

- [ ] **Create `app/api/admin/clients/route.ts`**:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

async function requireAuth() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  return supabase;
}

export async function GET() {
  const supabase = await createClient();
  const { data, error } = await supabase.from('clients').select('*').order('display_order');
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const supabase = await requireAuth();
  if (!supabase) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { name } = await req.json();
  const { data: existing } = await supabase.from('clients').select('display_order').order('display_order', { ascending: false }).limit(1).single();
  const display_order = (existing?.display_order ?? -1) + 1;
  const { data, error } = await supabase.from('clients').insert({ name, display_order }).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
```

- [ ] **Create `app/api/admin/clients/[id]/route.ts`**:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

async function requireAuth() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  return supabase;
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const supabase = await requireAuth();
  if (!supabase) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const { error } = await supabase.from('clients').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
```

- [ ] **Create `app/admin/clients/page.tsx`**:

```typescript
'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

type Client = { id: string; name: string; display_order: number };

export default function AdminClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [newName, setNewName] = useState('');
  const [adding, setAdding] = useState(false);

  async function load() {
    const res = await fetch('/api/admin/clients');
    setClients(await res.json());
  }

  useEffect(() => { load(); }, []);

  async function handleAdd() {
    if (!newName.trim()) return;
    setAdding(true);
    await fetch('/api/admin/clients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newName.trim() }),
    });
    setNewName('');
    setAdding(false);
    load();
  }

  async function handleRemove(id: string) {
    await fetch(`/api/admin/clients/${id}`, { method: 'DELETE' });
    load();
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Client Names</h1>
        <p className="text-gray-400 text-sm mt-1">These appear in the scrolling marquee on the home page. {clients.length} clients.</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-4">
        <div className="flex flex-wrap gap-2">
          {clients.map(c => (
            <span key={c.id} className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-full px-3 py-1.5 text-sm text-gray-700">
              {c.name}
              <button onClick={() => handleRemove(c.id)} className="text-gray-400 hover:text-red-500 transition-colors ml-1">
                <X size={12} />
              </button>
            </span>
          ))}
          {clients.length === 0 && <p className="text-gray-400 text-sm">No clients yet.</p>}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-4">
        <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">Add Client</label>
        <div className="flex gap-2">
          <input
            value={newName}
            onChange={e => setNewName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAdd()}
            placeholder="Company name…"
            className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#003B8E]/20 focus:border-[#003B8E]"
          />
          <button
            onClick={handleAdd}
            disabled={adding || !newName.trim()}
            className="bg-[#003B8E] text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-[#002d6e] transition-colors disabled:opacity-60"
          >
            {adding ? 'Adding…' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Verify** — visit http://localhost:3000/admin/clients. Type a company name and click Add → chip appears. Click × on a chip → removed.

- [ ] **Commit**
```bash
git add app/api/admin/clients/ app/admin/clients/
git commit -m "feat: client names management in admin panel"
```

---

## Task 11: Contact Details — API route + admin page

**Files:**
- Create: `app/api/admin/contact/route.ts`
- Create: `app/admin/contact/page.tsx`

- [ ] **Create `app/api/admin/contact/route.ts`**:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

async function requireAuth() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  return supabase;
}

export async function GET() {
  const supabase = await createClient();
  const { data, error } = await supabase.from('contact_details').select('*');
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  const result: Record<string, string> = {};
  data?.forEach(row => { result[row.key] = row.value; });
  return NextResponse.json(result);
}

export async function PUT(req: NextRequest) {
  const supabase = await requireAuth();
  if (!supabase) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body: Record<string, string> = await req.json();
  const updates = Object.entries(body).map(([key, value]) =>
    supabase.from('contact_details').upsert({ key, value }).eq('key', key)
  );
  await Promise.all(updates);
  return NextResponse.json({ ok: true });
}
```

- [ ] **Create `app/admin/contact/page.tsx`**:

```typescript
'use client';

import { useEffect, useState } from 'react';

type ContactData = { phone: string; email: string; address: string };
const empty: ContactData = { phone: '', email: '', address: '' };

export default function AdminContactPage() {
  const [data, setData] = useState<ContactData>(empty);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch('/api/admin/contact').then(r => r.json()).then(setData);
  }, []);

  async function handleSave() {
    setSaving(true);
    await fetch('/api/admin/contact', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Contact Details</h1>
        <p className="text-gray-400 text-sm mt-1">These appear in the footer and contact page.</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 max-w-lg">
        <div className="flex flex-col gap-5">
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Phone</label>
            <input value={data.phone} onChange={e => setData(d => ({ ...d, phone: e.target.value }))}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#003B8E]/20 focus:border-[#003B8E]"
              placeholder="+94 11 259 7171" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Email</label>
            <input type="email" value={data.email} onChange={e => setData(d => ({ ...d, email: e.target.value }))}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#003B8E]/20 focus:border-[#003B8E]"
              placeholder="info@dok.lk" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Address</label>
            <textarea value={data.address} onChange={e => setData(d => ({ ...d, address: e.target.value }))} rows={3}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#003B8E]/20 focus:border-[#003B8E] resize-none"
              placeholder="No. 10, Kirula Road, Colombo 05, Sri Lanka" />
          </div>
        </div>

        {saved && (
          <p className="mt-4 text-sm text-green-600 bg-green-50 border border-green-100 rounded-lg px-3 py-2">Changes saved successfully.</p>
        )}

        <button onClick={handleSave} disabled={saving}
          className="mt-6 w-full bg-[#003B8E] text-white rounded-xl py-3 text-sm font-semibold hover:bg-[#002d6e] transition-colors disabled:opacity-60">
          {saving ? 'Saving…' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}
```

- [ ] **Verify** — visit http://localhost:3000/admin/contact. The seeded phone/email/address are loaded. Change the phone number, click Save Changes → green success message appears.

- [ ] **Commit**
```bash
git add app/api/admin/contact/ app/admin/contact/
git commit -m "feat: contact details editor in admin panel"
```

---

## Task 12: Seed existing hardcoded content into Supabase

Run these in the Supabase SQL editor to seed all existing content so the public site keeps working after the next task switches it to Supabase.

- [ ] **Seed team members** (paste and run in Supabase SQL editor):

```sql
insert into team_members (name, role, bio, photo_url, display_order) values
  ('Phiroze Pestonjee', 'Managing Director', 'Managing Director of DOK Solutions Lanka and part of the ABANS Group leadership. Has steered DOK into Sri Lanka''s most trusted record management and BPO services company, earning consecutive Great Place to Work Awards in 2022, 2023, and 2024.', '/Managing-Director.jpg', 0),
  ('Rusi Pestonjee', 'Director', 'Director with extensive expertise in strategy, tax, and financial planning across logistics, fintech, and financial services. Brings decades of Pestonjee family business leadership and multi-sector governance experience to DOK Solutions Lanka.', '/Rusi-Pestonjee.jpg', 1),
  ('Prabodhanie Wanigasundara', 'Chief Operating Officer', 'COO with 22+ years in sales, marketing, and strategic management. Grew DOK''s revenue sevenfold over her tenure. Holds CIM (UK) qualifications and serves as Visiting Lecturer at SLIM and the University of Kelaniya.', '/Prabodini.jpg', 2);
```

- [ ] **Seed clients** (both rows of the marquee):

```sql
insert into clients (name, display_order) values
  ('HNB Assurance', 0), ('Commercial Bank', 1), ('Sampath Bank', 2),
  ('Peoples Bank', 3), ('Dialog Axiata', 4), ('NSB', 5),
  ('Seylan Bank', 6), ('NDB Bank', 7), ('John Keells', 8),
  ('Aitken Spence', 9), ('LOLC Finance', 10), ('Plan International', 11),
  ('Cargills', 12), ('Pan Asia Bank', 13), ('BOC Sri Lanka', 14),
  ('Hatton National Bank', 15), ('Lanka Hospitals', 16), ('Ministry of Finance', 17),
  ('Hemas Holdings', 18), ('MAS Holdings', 19), ('Brandix', 20),
  ('Sri Lanka Insurance', 21), ('Nations Trust Bank', 22), ('Softlogic Group', 23);
```

---

## Task 13: Wire public site to Supabase

Update the public-facing components to fetch live data from Supabase instead of hardcoded arrays.

**Files:**
- Modify: `components/about/AboutTeam.tsx`
- Modify: `components/home/ClientLogos.tsx`
- Modify: `components/layout/Footer.tsx`

- [ ] **Update `components/about/AboutTeam.tsx`** — convert to async server component that fetches from Supabase:

At the top of the file, remove the `'use client'` directive and the hardcoded `team` array. Replace the top of the file with:

```typescript
import { createClient } from '@/lib/supabase/server';
// ... keep the TeamCard component as-is (it's 'use client' itself — extract it)
```

Because `AboutTeam.tsx` is currently a client component with the `team` array and `TeamCard` both in the same file, split it:

**Step 1 — Create `components/about/TeamCard.tsx`** (client component):

```typescript
'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';

export type TeamMember = { id: string; name: string; role: string; bio: string; photo_url: string };

export default function TeamCard({ member, i }: { member: TeamMember; i: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotX = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), { stiffness: 120, damping: 18 });
  const rotY = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), { stiffness: 120, damping: 18 });

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - left) / width - 0.5);
    y.set((e.clientY - top) / height - 0.5);
  }
  function handleLeave() { x.set(0); y.set(0); setHovered(false); }

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: i * 0.12, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={cardRef}
        style={{ rotateX: rotX, rotateY: rotY }}
        onMouseMove={handleMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleLeave}
        className="group relative rounded-[2rem] overflow-hidden bg-brand-beige cursor-pointer"
      >
        <div className="relative h-[380px] overflow-hidden">
          <img
            src={member.photo_url}
            alt={member.role}
            className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-brand-navy/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
            <p className="text-white/75 text-xs leading-relaxed">{member.bio}</p>
          </div>
        </div>
        <div className="p-6 flex items-start justify-between">
          <div>
            <div className="font-serif text-xl text-brand-navy">{member.role}</div>
            <div className="text-[11px] tracking-widest uppercase text-brand-navy/40 mt-1">{member.name}</div>
          </div>
          <div className="w-9 h-9 rounded-full bg-brand-navy/08 flex items-center justify-center group-hover:bg-brand-navy group-hover:text-white transition-all duration-300 text-brand-navy">
            <svg viewBox="0 0 16 16" fill="none" width="12" height="12" stroke="currentColor" strokeWidth="1.5">
              <path d="M2.5 8h11M9.5 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
```

**Step 2 — Rewrite `components/about/AboutTeam.tsx`** as a server component:

```typescript
import { createClient } from '@/lib/supabase/server';
import { motion } from 'framer-motion';
import TeamCard from './TeamCard';

export default async function AboutTeam() {
  const supabase = await createClient();
  const { data: team } = await supabase
    .from('team_members')
    .select('*')
    .order('display_order');

  return (
    <section className="bg-white py-28 lg:py-40">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-px bg-brand-navy/30" />
          <span className="text-[10px] font-semibold tracking-[0.35em] uppercase text-brand-navy/40">The People Behind DOK</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <h2 className="font-serif text-5xl lg:text-6xl text-brand-navy leading-tight">
            Our Leadership<br />
            <span className="text-brand-navy/25">Team</span>
          </h2>
          <p className="max-w-xs text-brand-navy/50 font-light text-sm leading-relaxed">
            Seasoned professionals who turned a bold vision into Sri Lanka's most trusted document management enterprise.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {(team ?? []).map((m, i) => <TeamCard key={m.id} member={m} i={i} />)}
        </div>

        <div className="mt-16 grid md:grid-cols-2 gap-4">
          <div className="relative rounded-[2rem] overflow-hidden h-72">
            <img src="/images/team-group.jpg" alt="DOK Solutions management team" className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <span className="text-white font-serif text-lg">Management Team</span>
              <p className="text-white/60 text-xs mt-1">The team driving day-to-day excellence</p>
            </div>
          </div>
          <div className="relative rounded-[2rem] overflow-hidden h-72">
            <img src="/images/team-all.jpg" alt="DOK Solutions full team" className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <span className="text-white font-serif text-lg">200+ Professionals</span>
              <p className="text-white/60 text-xs mt-1">Our full team — Colombo, Sri Lanka</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

**Note:** `motion.h2` and `motion.p` become plain `h2` and `p` since this is now a server component. The animations are in `TeamCard` which stays client.

- [ ] **Update `components/home/ClientLogos.tsx`** — fetch clients from Supabase and split into two rows dynamically:

Replace the file content with:

```typescript
import { createClient } from '@/lib/supabase/server';

const Separator = () => (
  <span className="mx-6 text-brand-gold font-bold text-lg select-none">✦</span>
);

function Row({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const doubled = [...items, ...items];
  const animClass = reverse
    ? 'animate-[marquee-reverse_40s_linear_infinite]'
    : 'animate-[marquee_38s_linear_infinite]';

  return (
    <div className="relative flex overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none bg-gradient-to-r from-brand-navy to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none bg-gradient-to-l from-brand-navy to-transparent" />
      <div className={`flex items-center flex-shrink-0 ${animClass}`}>
        {doubled.map((name, i) => (
          <span key={i} className="flex items-center flex-shrink-0">
            <span className="font-serif text-2xl lg:text-3xl text-white/70 hover:text-white hover:text-brand-gold transition-colors duration-400 whitespace-nowrap cursor-default select-none tracking-tight">
              {name}
            </span>
            <Separator />
          </span>
        ))}
      </div>
    </div>
  );
}

export default async function ClientLogos() {
  const supabase = await createClient();
  const { data: clients } = await supabase.from('clients').select('name').order('display_order');
  const names = (clients ?? []).map(c => c.name);
  const mid = Math.ceil(names.length / 2);
  const row1 = names.slice(0, mid);
  const row2 = names.slice(mid);

  return (
    <section className="bg-brand-navy py-16 overflow-hidden">
      <div className="mb-10 px-6 lg:px-12 flex items-center gap-4">
        <div className="w-8 h-px bg-white/20" />
        <span className="text-[10px] font-semibold tracking-[0.35em] uppercase text-white/40">
          Trusted by Sri Lanka's Leading Organisations
        </span>
      </div>
      <div className="flex flex-col gap-5">
        <Row items={row1.length ? row1 : ['Loading…']} />
        <Row items={row2.length ? row2 : ['Loading…']} reverse />
      </div>
    </section>
  );
}
```

- [ ] **Update `components/layout/Footer.tsx`** — fetch contact details from Supabase. Open the file and replace the hardcoded contact section:

Find the footer's contact values (phone, email, address) which are currently hardcoded strings. Replace them by:

1. Remove `'use client'` from the top of Footer.tsx.
2. Add import: `import { createClient } from '@/lib/supabase/server';`
3. Change `export default function Footer()` to `export default async function Footer()`
4. At the top of the function body, add:
```typescript
const supabase = await createClient();
const { data: contactRows } = await supabase.from('contact_details').select('*');
const contact: Record<string, string> = {};
contactRows?.forEach(r => { contact[r.key] = r.value; });
```
5. Replace hardcoded contact strings: `+94 11 259 7171` → `{contact.phone}`, `info@dok.lk` → `{contact.email}`, `No. 10, Kirula Road, Colombo 05, Sri Lanka` → `{contact.address}`

**Note:** If Footer.tsx uses `usePathname` or other client-only hooks, extract those parts into a small `FooterNavLink` client component first, keeping Footer itself as a server component.

- [ ] **Verify** — run `npm run build` (not just dev) to catch any server component errors. Fix TypeScript errors if any. Then run `npm run dev` and check:
  - `/about` → team cards load from Supabase
  - Home page → client marquee loads from Supabase
  - Footer → phone/email/address from Supabase

- [ ] **Commit**
```bash
git add components/about/AboutTeam.tsx components/about/TeamCard.tsx components/home/ClientLogos.tsx components/layout/Footer.tsx
git commit -m "feat: wire public site components to fetch live data from Supabase"
```

---

## Self-Review

**Spec coverage check:**
- ✅ Auth: Supabase email+password login (Task 5)
- ✅ Middleware session redirect (Task 3)
- ✅ Admin layout with sidebar (Task 4)
- ✅ Team Members CRUD + photo upload (Task 6)
- ✅ Services CRUD with features/stats (Task 7)
- ✅ Blog/News CRUD with publish toggle (Task 8)
- ✅ Site Images replace via Storage (Task 9)
- ✅ Clients add/remove chips (Task 10)
- ✅ Contact details save (Task 11)
- ✅ RLS policies (Task 2)
- ✅ Service role key server-only (lib/supabase/admin.ts)
- ✅ Signed upload URLs for images (Task 6 + 9)
- ✅ Public site integration (Task 13)
- ✅ Seed data (Task 12)

**Placeholder scan:** No TBDs or incomplete steps. All code blocks are complete. ✅

**Type consistency:**
- `TeamMember` type defined in `TeamCard.tsx` and used in `AboutTeam.tsx` ✅
- `params` type `Promise<{ id: string }>` consistent across all `[id]` route handlers ✅
- `contact_details` upsert uses same `key`/`value` columns as schema ✅
