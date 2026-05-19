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
