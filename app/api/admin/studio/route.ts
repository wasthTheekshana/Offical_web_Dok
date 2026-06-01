import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { query, queryOne } from '@/lib/db';

export async function GET() {
  const rows = await query('SELECT * FROM studio_notes ORDER BY display_order');
  return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { title, category, image_url } = await req.json();
  const max = await queryOne<{ max: number }>('SELECT COALESCE(MAX(display_order),-1) AS max FROM studio_notes');
  const row = await queryOne(
    `INSERT INTO studio_notes (title, category, image_url, display_order) VALUES ($1,$2,$3,$4) RETURNING *`,
    [title, category ?? 'Insight', image_url ?? '', (max?.max ?? -1) + 1]
  );
  return NextResponse.json(row, { status: 201 });
}
