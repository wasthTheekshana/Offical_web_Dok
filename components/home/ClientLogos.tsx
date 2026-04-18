'use client';

const clients = [
  'HNB Assurance', 'Commercial Bank', 'Sampath Bank', 'Peoples Bank',
  'Dialog Axiata', 'NSB', 'Seylan Bank', 'NDB Bank',
  'John Keells', 'Aitken Spence', 'LOLC Finance', 'Plan International',
];
const doubled = [...clients, ...clients];

export default function ClientLogos() {
  return (
    <section className="bg-brand-beige py-16 overflow-hidden">
      <div className="mb-8 px-6 lg:px-12">
        <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-brand-navy/40">Trusted Partners</span>
      </div>
      <div className="relative flex overflow-hidden">
        <div className="flex items-center gap-12 animate-[marquee_35s_linear_infinite] flex-shrink-0">
          {doubled.map((name, i) => (
            <div key={i} className="flex-shrink-0 font-serif text-2xl lg:text-3xl text-brand-navy/20 hover:text-brand-navy transition-colors duration-500 cursor-crosshair whitespace-nowrap">
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
