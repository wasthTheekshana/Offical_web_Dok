import { cachedQuery } from './db';

export async function getSiteImages(): Promise<Record<string, string>> {
  const rows = await cachedQuery<{ key: string; url: string }>(
    'SELECT key, url FROM site_images',
    [],
    ['site_images']
  );
  return Object.fromEntries(rows.filter(r => r.url).map(r => [r.key, r.url]));
}
