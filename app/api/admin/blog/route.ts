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
