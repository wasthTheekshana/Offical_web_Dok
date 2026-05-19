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
