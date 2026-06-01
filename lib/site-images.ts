import { cache } from 'react';
import { query } from './db';

export const getSiteImages = cache(async (): Promise<Record<string, string>> => {
  const rows = await query<{ key: string; url: string }>('SELECT key, url FROM site_images');
  return Object.fromEntries(rows.filter(r => r.url).map(r => [r.key, r.url]));
});
