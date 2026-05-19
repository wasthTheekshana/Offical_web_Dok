import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { adminClient } from '@/lib/supabase/admin';

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const items: { id: string; display_order: number }[] = await req.json();
  const updates = items.map(({ id, display_order }) =>
    adminClient.from('team_members').update({ display_order }).eq('id', id)
  );
  await Promise.all(updates);
  return NextResponse.json({ ok: true });
}
