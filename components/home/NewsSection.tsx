import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { query } from '@/lib/db';

type Post = { id: string; slug: string; title: string; excerpt: string; cover_url: string; category: string };
type C = { key: string; value: string };

export default async function NewsSection() {
  const [posts, contentRows] = await Promise.all([
    query<Post>('SELECT id, slug, title, excerpt, cover_url, category FROM blog_posts WHERE published = true ORDER BY published_at DESC LIMIT 4'),
    query<C>("SELECT key,value FROM site_content WHERE key LIKE 'news%'"),
  ]);
  const content: Record<string, string> = {};
  contentRows.forEach(r => { content[r.key] = r.value; });

  const label = content['news_label'] || 'Journal';
  const title = content['news_title'] || 'Notes From The Studio';

  // Pad with placeholder if fewer than 4 posts
  const items = [...posts];
  while (items.length < 4) {
    items.push({ id: `placeholder-${items.length}`, slug: '', title: 'Coming Soon', excerpt: '', cover_url: '', category: 'Insight' });
  }

  const [first, second, third, fourth] = items;

  return (
    <section className="bg-brand-cream py-24 px-6 lg:px-12">
      <div className="max-w-[1400px] mx-auto">

        <div className="text-center mb-16">
          <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-brand-navy/40 block mb-4">{label}</span>
          <h2 className="font-serif text-5xl lg:text-7xl text-brand-navy leading-tight">
            {title.split(' ').slice(0, -1).join(' ')}{' '}
            <em>{title.split(' ').slice(-1)}</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-start">

          {/* Large first card */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="lg:row-span-2 rounded-4xl overflow-hidden relative h-[550px] lg:h-auto bg-brand-beige group">
            {first.cover_url && <img src={first.cover_url} alt={first.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <span className="text-[10px] font-bold tracking-widest uppercase text-brand-gold block mb-3">{first.category}</span>
              <h3 className="font-serif text-2xl text-white font-semibold uppercase leading-tight mb-4">{first.title}</h3>
              {first.excerpt && <p className="text-white/60 text-xs font-light leading-relaxed mb-6">{first.excerpt}</p>}
              {first.slug && (
                <Link href={`/blog/${first.slug}`} className="inline-flex items-center gap-2 text-white text-xs font-bold tracking-widest uppercase hover:text-brand-gold transition-colors">
                  Read More <ArrowRight size={14} />
                </Link>
              )}
            </div>
          </motion.div>

          {/* Second card */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="rounded-4xl overflow-hidden h-64 lg:h-72 bg-brand-beige group">
            {second.cover_url && <img src={second.cover_url} alt={second.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />}
          </motion.div>
          <div className="px-2 py-4">
            <span className="text-[10px] font-bold tracking-widest uppercase text-brand-navy/40">{second.category}</span>
            <h3 className="font-serif text-xl text-brand-navy mt-2 leading-tight uppercase">{second.title}</h3>
          </div>

          {/* Third card */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="lg:col-start-3 px-2 py-4">
            <span className="text-[10px] font-bold tracking-widest uppercase text-brand-navy/40">{third.category}</span>
            <h3 className="font-serif text-xl text-brand-navy/30 mt-2 leading-tight uppercase">{third.title}</h3>
          </motion.div>

          {/* Fourth card */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
            className="rounded-4xl overflow-hidden h-48 lg:h-64 bg-brand-beige group">
            {fourth.cover_url && <img src={fourth.cover_url} alt={fourth.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />}
          </motion.div>
          <div className="lg:col-start-4 px-2 py-4">
            <span className="text-[10px] font-bold tracking-widest uppercase text-brand-navy/40">{fourth.category}</span>
            <h3 className="font-serif text-xl text-brand-navy mt-2 leading-tight uppercase">{fourth.title}</h3>
          </div>

        </div>
      </div>
    </section>
  );
}
