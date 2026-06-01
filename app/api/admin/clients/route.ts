import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { query, queryOne } from '@/lib/db';

export async function GET() {
  const rows = await query('SELECT * FROM clients ORDER BY display_order');
  return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { name, logo_url, website_url } = await req.json();
  const maxRow = await queryOne<{ max: number }>('SELECT COALESCE(MAX(display_order), -1) AS max FROM clients');
  const display_order = (maxRow?.max ?? -1) + 1;
  const row = await queryOne(
    `INSERT INTO clients (name, logo_url, website_url, display_order) VALUES ($1,$2,$3,$4) RETURNING *`,
    [name, logo_url ?? '', website_url ?? '', display_order]
  );
  return NextResponse.json(row, { status: 201 });
}
