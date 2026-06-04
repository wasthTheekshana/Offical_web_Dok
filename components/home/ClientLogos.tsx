import { cachedQuery } from '@/lib/db';

const Separator = () => (
  <span className="mx-6 text-brand-gold font-bold text-lg select-none">✦</span>
);

function Row({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const doubled = [...items, ...items];
  const animClass = reverse
    ? 'animate-[marquee-reverse_40s_linear_infinite]'
    : 'animate-[marquee_38s_linear_infinite]';

  return (
    <div className="relative flex overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none bg-gradient-to-r from-brand-navy to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none bg-gradient-to-l from-brand-navy to-transparent" />
      <div className={`flex items-center flex-shrink-0 ${animClass}`}>
        {doubled.map((name, i) => (
          <span key={i} className="flex items-center flex-shrink-0">
            <span className="font-serif text-2xl lg:text-3xl text-white/70 hover:text-white hover:text-brand-gold transition-colors duration-400 whitespace-nowrap cursor-default select-none tracking-tight">
              {name}
            </span>
            <Separator />
          </span>
        ))}
      </div>
    </div>
  );
}

export default async function ClientLogos() {
  const clients = await cachedQuery<{ name: string }>('SELECT name FROM clients ORDER BY display_order', [], ['clients']);
  const names = clients.map(c => c.name);
  const mid = Math.ceil(names.length / 2);
  const row1 = names.slice(0, mid);
  const row2 = names.slice(mid);

  return (
    <section className="bg-brand-navy py-16 overflow-hidden">
      <div className="mb-10 px-6 lg:px-12 flex items-center gap-4">
        <div className="w-8 h-px bg-white/20" />
        <span className="text-[10px] font-semibold tracking-[0.35em] uppercase text-white/40">
          Trusted by Sri Lanka's Leading Organisations
        </span>
      </div>
      <div className="flex flex-col gap-5">
        <Row items={row1.length ? row1 : ['DOK Solutions Lanka']} />
        <Row items={row2.length ? row2 : ['DOK Solutions Lanka']} reverse />
      </div>
    </section>
  );
}
