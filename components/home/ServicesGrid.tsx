import { query } from '@/lib/db';
import ServicesGridClient from './ServicesGridClient';

type Service = { id: string; slug: string; title: string; hero_image_url: string; display_order: number };

export default async function ServicesGrid() {
  const services = await query<Service>(
    'SELECT id, slug, title, hero_image_url, display_order FROM services WHERE published = true ORDER BY display_order, title'
  );
  return <ServicesGridClient services={services} />;
}
