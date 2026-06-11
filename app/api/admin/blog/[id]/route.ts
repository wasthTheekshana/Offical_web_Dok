export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { queryOne } from '@/lib/db';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const body = await req.json();
  const published_at = body.published ? new Date().toISOString() : null;
  const row = await queryOne(
    `UPDATE blog_posts SET title=$1, excerpt=$2, content=$3, cover_url=$4, category=$5, published=$6, published_at=$7
     WHERE id=$8 RETURNING *`,
    [body.title, body.excerpt ?? '', body.content ?? '', body.cover_url ?? '', body.category ?? 'Insight', body.published, published_at, id]
  );
  if (!row) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(row);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  await queryOne('DELETE FROM blog_posts WHERE id=$1', [id]);
  return NextResponse.json({ ok: true });
}
