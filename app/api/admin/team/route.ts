import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { query, queryOne } from '@/lib/db';

export async function GET() {
  const rows = await query('SELECT * FROM team_members ORDER BY display_order, created_at');
  return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { name, role, bio, photo_url, display_order } = await req.json();
  const row = await queryOne(
    `INSERT INTO team_members (name, role, bio, photo_url, display_order)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [name, role ?? '', bio ?? '', photo_url ?? '', display_order ?? 0]
  );
  return NextResponse.json(row, { status: 201 });
}
