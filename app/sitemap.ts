import { MetadataRoute } from 'next';
import { query } from '@/lib/db';

const BASE = process.env.NEXTAUTH_URL || 'https://doksolutions.lk';

const staticRoutes: { path: string; priority: number; changeFreq: MetadataRoute.Sitemap[0]['changeFrequency'] }[] = [
  { path: '/',                            priority: 1.0, changeFreq: 'weekly' },
  { path: '/about',                       priority: 0.9, changeFreq: 'monthly' },
  { path: '/services',                    priority: 0.9, changeFreq: 'monthly' },
  { path: '/services/physical-archiving', priority: 0.8, changeFreq: 'monthly' },
  { path: '/services/document-digitizing',priority: 0.8, changeFreq: 'monthly' },
  { path: '/services/data-entry',         priority: 0.8, changeFreq: 'monthly' },
  { path: '/services/auradocs',           priority: 0.8, changeFreq: 'monthly' },
  { path: '/services/insurance',          priority: 0.8, changeFreq: 'monthly' },
  { path: '/news',                        priority: 0.7, changeFreq: 'weekly' },
  { path: '/careers',                     priority: 0.6, changeFreq: 'weekly' },
  { path: '/contact',                     priority: 0.7, changeFreq: 'yearly' },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await query<{ slug: string; published_at: string }>(
    'SELECT slug, published_at FROM blog_posts WHERE published = true ORDER BY published_at DESC'
  );

  const blogEntries: MetadataRoute.Sitemap = posts.map(p => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: new Date(p.published_at),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map(r => ({
    url: `${BASE}${r.path}`,
    lastModified: new Date(),
    changeFrequency: r.changeFreq,
    priority: r.priority,
  }));

  return [...staticEntries, ...blogEntries];
}
