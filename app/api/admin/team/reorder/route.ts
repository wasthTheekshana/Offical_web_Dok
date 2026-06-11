export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import pool from '@/lib/db';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const items: { id: string; display_order: number }[] = await req.json();
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    for (const { id, display_order } of items) {
      await client.query('UPDATE team_members SET display_order=$1 WHERE id=$2', [display_order, id]);
    }
    await client.query('COMMIT');
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
  return NextResponse.json({ ok: true });
}
