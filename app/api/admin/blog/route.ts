export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { query, queryOne } from '@/lib/db';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const rows = await query('SELECT * FROM blog_posts ORDER BY created_at DESC');
  return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const slug = body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const published_at = body.published ? new Date().toISOString() : null;
  const row = await queryOne(
    `INSERT INTO blog_posts (slug, title, excerpt, content, cover_url, category, published, published_at)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
    [slug, body.title, body.excerpt ?? '', body.content ?? '', body.cover_url ?? '', body.category ?? 'Insight', body.published ?? false, published_at]
  );
  return NextResponse.json(row, { status: 201 });
}
