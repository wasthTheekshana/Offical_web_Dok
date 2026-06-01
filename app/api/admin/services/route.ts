import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { query, queryOne } from '@/lib/db';

export async function GET() {
  const rows = await query('SELECT * FROM services ORDER BY display_order, title');
  return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const slug = body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const row = await queryOne(
    `INSERT INTO services (slug, title, description, hero_image_url, features, stats, published)
     VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
    [slug, body.title, body.description ?? '', body.hero_image_url ?? '',
     JSON.stringify(body.features ?? []), JSON.stringify(body.stats ?? []), body.published ?? true]
  );
  return NextResponse.json(row, { status: 201 });
}
