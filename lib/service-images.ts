import { queryOne } from './db';

export async function getServiceImages(slug: string): Promise<{ heroImg?: string; whyImg?: string }> {
  const row = await queryOne<{ hero_image_url: string; why_image_url: string }>(
    'SELECT hero_image_url, why_image_url FROM services WHERE slug = $1',
    [slug]
  );
  return {
    heroImg: row?.hero_image_url || undefined,
    whyImg:  row?.why_image_url  || undefined,
  };
}
