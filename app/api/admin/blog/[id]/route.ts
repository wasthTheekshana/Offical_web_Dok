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
