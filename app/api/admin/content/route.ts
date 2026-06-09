import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { query, queryOne } from '@/lib/db';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const rows = await query<{ key: string; value: string }>('SELECT key, value FROM site_content');
  const result: Record<string, string> = {};
  rows.forEach(r => { result[r.key] = r.value; });
  return NextResponse.json(result);
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body: Record<string, string> = await req.json();
  for (const [key, value] of Object.entries(body)) {
    await queryOne(
      `INSERT INTO site_content (key, value) VALUES ($1,$2)
       ON CONFLICT (key) DO UPDATE SET value=$2, updated_at=now()`,
      [key, value]
    );
  }
  return NextResponse.json({ ok: true });
}
