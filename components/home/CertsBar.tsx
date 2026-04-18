'use client';

export default function CertsBar() {
  return (
    <div className="bg-brand-navy py-4 px-6 lg:px-12 flex flex-wrap gap-6 items-center justify-center">
      {['ISO 9001:2015', 'ISO 27001', 'ISO 45001', 'Great Place to Work® ×3'].map(c => (
        <span key={c} className="text-[10px] font-semibold tracking-[0.2em] uppercase text-white/50 flex items-center gap-3">
          <span className="w-1 h-1 rounded-full bg-brand-gold inline-block" />
          {c}
        </span>
      ))}
    </div>
  );
}
