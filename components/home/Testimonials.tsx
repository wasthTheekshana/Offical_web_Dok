import { cachedQuery } from '@/lib/db';
import TestimonialsClient from './TestimonialsClient';

type T = { id: string; name: string; role: string; quote: string; photo_url: string };
type C = { key: string; value: string };

export default async function Testimonials() {
  const [items, contentRows] = await Promise.all([
    cachedQuery<T>('SELECT * FROM testimonials ORDER BY display_order, created_at', [], ['testimonials']),
    cachedQuery<C>("SELECT key,value FROM site_content WHERE key LIKE 'testimonials%'", [], ['site_content']),
  ]);
  const content: Record<string, string> = {};
  contentRows.forEach(r => { content[r.key] = r.value; });

  return (
    <TestimonialsClient
      testimonials={items}
      label={content['testimonials_label'] || 'Loved and trusted by 100+ Clients'}
      title={content['testimonials_title'] || 'What Our Happy Clients Say'}
    />
  );
}
