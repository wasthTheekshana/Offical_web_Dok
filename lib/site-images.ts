import { cache } from 'react';
import { createClient } from './supabase/server';

export const getSiteImages = cache(async (): Promise<Record<string, string>> => {
  const supabase = await createClient();
  const { data } = await supabase.from('site_images').select('key,url');
  if (!data) return {};
  return Object.fromEntries(data.filter(r => r.url).map(r => [r.key, r.url]));
});

export function si(imgs: Record<string, string>, key: string, fallback: string): string {
  return imgs[key] || fallback;
}
