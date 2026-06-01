import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  const rows = await query('SELECT * FROM site_images ORDER BY key');
  return NextResponse.json(rows);
}
