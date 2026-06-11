export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

const MAX_BYTES = 5 * 1024 * 1024; // 5 MB
const ALLOWED_MIME = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif']);
// Magic bytes for allowed image types
const MAGIC: [Uint8Array, string][] = [
  [new Uint8Array([0xff, 0xd8, 0xff]),              'image/jpeg'],
  [new Uint8Array([0x89, 0x50, 0x4e, 0x47]),        'image/png'],
  [new Uint8Array([0x52, 0x49, 0x46, 0x46]),        'image/webp'],  // RIFF header
  [new Uint8Array([0x47, 0x49, 0x46]),               'image/gif'],
];

function detectMime(bytes: Uint8Array): boolean {
  return MAGIC.some(([sig]) => sig.every((b, i) => bytes[i] === b));
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const formData = await req.formData();
  const file = formData.get('file') as File | null;
  if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 });

  // 1. Size check
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: 'File too large. Maximum size is 5 MB.' }, { status: 413 });
  }

  // 2. MIME type check (client-reported)
  if (!ALLOWED_MIME.has(file.type)) {
    return NextResponse.json({ error: 'Only image files are allowed.' }, { status: 415 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // 3. Magic bytes check (server-side content sniffing)
  if (!detectMime(new Uint8Array(buffer.slice(0, 12)))) {
    return NextResponse.json({ error: 'Invalid image file.' }, { status: 415 });
  }

  const ext = (file.name.split('.').pop() ?? 'bin').toLowerCase().replace(/[^a-z0-9]/g, '');
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const uploadDir = join(process.cwd(), 'public', 'uploads');

  await mkdir(uploadDir, { recursive: true });
  await writeFile(join(uploadDir, filename), buffer);

  return NextResponse.json({ url: `/uploads/${filename}` });
}
