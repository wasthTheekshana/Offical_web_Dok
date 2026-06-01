import type { Metadata } from 'next';
import { query } from '@/lib/db';
import ServicesClient from './ServicesClient';

export const metadata: Metadata = {
  title: 'Services',
  description: "Explore DOK Solutions Lanka's comprehensive document management and BPO services.",
};

const tagColors: Record<string, string> = {
  'physical-archiving':   '#003B8E',
  'document-digitizing':  '#0072CE',
  'data-entry':           '#003B8E',
  'auradocs':             '#F5A623',
  'insurance':            '#0072CE',
};

export default async function ServicesPage() {
  const rows = await query<{
    id: string; slug: string; title: string; description: string;
    hero_image_url: string; features: string[]; display_order: number;
  }>('SELECT * FROM services WHERE published = true ORDER BY display_order, title');

  const services = rows.map((s, i) => ({
    num: String(i + 1).padStart(2, '0'),
    title: s.title,
    tag: s.title,
    tagColor: tagColors[s.slug] ?? '#003B8E',
    desc: s.description,
    features: Array.isArray(s.features) ? s.features : [],
    img: s.hero_image_url || '/images/warehouse-main.jpg',
    href: `/services/${s.slug}`,
  }));

  return <ServicesClient services={services} />;
}
