'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const news = [
  {
    title: 'Certified Great Place to Work® Three Years Running',
    img: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=500&h=600&fit=crop',
    category: 'Culture',
    tall: true,
  },
  {
    title: 'Textures of Modern Document Security',
    img: 'https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=500&h=300&fit=crop',
    category: 'Technology',
    tall: false,
  },
  {
    title: 'Light as a Digital Asset',
    img: null,
    category: 'Insight',
    tall: false,
  },
  {
    title: 'The Beauty of Organised Information',
    img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&h=400&fit=crop',
    category: 'Design',
    tall: false,
  },
];

export default function NewsSection() {
  return (
    <section className="bg-brand-cream py-24 px-6 lg:px-12">
      <div className="max-w-[1400px] mx-auto">

        {/* Header exactly like screenshot 5 */}
        <div className="text-center mb-16">
          <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-brand-navy/40 block mb-4">Journal</span>
          <h2 className="font-serif text-5xl lg:text-7xl text-brand-navy leading-tight">
            Notes From The <em>Studio</em>
          </h2>
        </div>

        {/* Staggered grid like screenshot 5 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-start">

          {/* First card is the large "Spaces That Breathe" style card with text overlay */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:row-span-2 rounded-4xl overflow-hidden relative h-[550px] lg:h-auto bg-brand-beige group"
          >
            <img src={news[0].img!} alt={news[0].title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <span className="text-[10px] font-bold tracking-widest uppercase text-brand-gold block mb-3">{news[0].category}</span>
              <h3 className="font-serif text-2xl text-white font-semibold uppercase leading-tight mb-4">
                {news[0].title}
              </h3>
              <p className="text-white/60 text-xs font-light leading-relaxed mb-6">
                Designing workplaces that invite slow living, gentle movement, mindful rituals, and intentional presence.
              </p>
              <Link href="/news" className="inline-flex items-center gap-2 text-white text-xs font-bold tracking-widest uppercase hover:text-brand-gold transition-colors">
                Read More <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>

          {/* Second card - image with short caption */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="rounded-4xl overflow-hidden h-64 lg:h-72 bg-brand-beige group"
          >
            <img src={news[1].img!} alt={news[1].title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </motion.div>
          <div className="px-2 py-4">
            <span className="text-[10px] font-bold tracking-widest uppercase text-brand-navy/40">{news[1].category}</span>
            <h3 className="font-serif text-xl text-brand-navy mt-2 leading-tight uppercase">{news[1].title}</h3>
          </div>

          {/* Third card: text only, matching "Light as a Material" */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:col-start-3 px-2 py-4"
          >
            <span className="text-[10px] font-bold tracking-widest uppercase text-brand-navy/40">{news[2].category}</span>
            <h3 className="font-serif text-xl text-brand-navy/30 mt-2 leading-tight uppercase">{news[2].title}</h3>
          </motion.div>

          {/* Fourth card - image bottom right like screenshot 5 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="rounded-4xl overflow-hidden h-48 lg:h-64 bg-brand-beige group"
          >
            <img src={news[3].img!} alt={news[3].title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </motion.div>
          <div className="lg:col-start-4 px-2 py-4">
            <span className="text-[10px] font-bold tracking-widest uppercase text-brand-navy/40">{news[3].category}</span>
            <h3 className="font-serif text-xl text-brand-navy mt-2 leading-tight uppercase">{news[3].title}</h3>
          </div>

        </div>

      </div>
    </section>
  );
}
