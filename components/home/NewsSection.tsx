import { query } from '@/lib/db';

type Note = { id: string; title: string; category: string; image_url: string };
type C = { key: string; value: string };

export default async function NewsSection() {
  const [notes, contentRows] = await Promise.all([
    query<Note>('SELECT id, title, category, image_url FROM studio_notes ORDER BY display_order LIMIT 4'),
    query<C>("SELECT key,value FROM site_content WHERE key LIKE 'news%'"),
  ]);
  const content: Record<string, string> = {};
  contentRows.forEach(r => { content[r.key] = r.value; });

  const label = content['news_label'] || 'Journal';
  const title = content['news_title'] || 'Notes From The Studio';

  while (notes.length < 4) {
    notes.push({ id: `ph-${notes.length}`, title: 'Coming Soon', category: 'Insight', image_url: '' });
  }
  const [first, second, third, fourth] = notes;

  const titleWords = title.split(' ');
  const lastWord = titleWords.pop();
  const restTitle = titleWords.join(' ');

  return (
    <section className="bg-brand-cream py-24 px-6 lg:px-12">
      <div className="max-w-[1400px] mx-auto">

        <div className="text-center mb-16">
          <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-brand-navy/40 block mb-4">{label}</span>
          <h2 className="font-serif text-5xl lg:text-7xl text-brand-navy leading-tight">
            {restTitle} <em>{lastWord}</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-start">

          {/* Large first card */}
          <div className="lg:row-span-2 rounded-4xl overflow-hidden relative h-[550px] lg:h-auto bg-brand-beige group">
            {first.image_url
              ? <img src={first.image_url} alt={first.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              : <div className="w-full h-full bg-brand-navy/10" />
            }
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <span className="text-[10px] font-bold tracking-widest uppercase text-brand-gold block mb-3">{first.category}</span>
              <h3 className="font-serif text-2xl text-white font-semibold uppercase leading-tight">{first.title}</h3>
            </div>
          </div>

          {/* Second */}
          <div className="rounded-4xl overflow-hidden h-64 lg:h-72 bg-brand-beige group">
            {second.image_url && <img src={second.image_url} alt={second.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />}
          </div>
          <div className="px-2 py-4">
            <span className="text-[10px] font-bold tracking-widest uppercase text-brand-navy/40">{second.category}</span>
            <h3 className="font-serif text-xl text-brand-navy mt-2 leading-tight uppercase">{second.title}</h3>
          </div>

          {/* Third */}
          <div className="lg:col-start-3 px-2 py-4">
            <span className="text-[10px] font-bold tracking-widest uppercase text-brand-navy/40">{third.category}</span>
            <h3 className="font-serif text-xl text-brand-navy/30 mt-2 leading-tight uppercase">{third.title}</h3>
          </div>

          {/* Fourth */}
          <div className="rounded-4xl overflow-hidden h-48 lg:h-64 bg-brand-beige group">
            {fourth.image_url && <img src={fourth.image_url} alt={fourth.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />}
          </div>
          <div className="lg:col-start-4 px-2 py-4">
            <span className="text-[10px] font-bold tracking-widest uppercase text-brand-navy/40">{fourth.category}</span>
            <h3 className="font-serif text-xl text-brand-navy mt-2 leading-tight uppercase">{fourth.title}</h3>
          </div>

        </div>
      </div>
    </section>
  );
}
