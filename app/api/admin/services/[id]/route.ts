import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { queryOne } from '@/lib/db';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const body = await req.json();
  const row = await queryOne(
    `UPDATE services SET title=$1, description=$2, hero_image_url=$3, features=$4, stats=$5, published=$6
     WHERE id=$7 RETURNING *`,
    [body.title, body.description ?? '', body.hero_image_url ?? '',
     JSON.stringify(body.features ?? []), JSON.stringify(body.stats ?? []), body.published ?? true, id]
  );
  if (!row) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(row);
}
