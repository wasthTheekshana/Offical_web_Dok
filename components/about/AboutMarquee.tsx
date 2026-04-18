'use client';

import { motion } from 'framer-motion';

const items = [
  '96 Professionals', '3 Warehouses', '14+ Years', '60+ Clients',
  'ISO 9001', 'ISO 27001', 'ISO 45001', 'GPTW® 3×',
  '96 Professionals', '3 Warehouses', '14+ Years', '60+ Clients',
  'ISO 9001', 'ISO 27001', 'ISO 45001', 'GPTW® 3×',
];

export default function AboutMarquee() {
  return (
    <div className="bg-[#F5A623] py-4 overflow-hidden">
      <div className="flex shrink-0 gap-0 animate-[marquee_25s_linear_infinite]" style={{ width: 'max-content' }}>
        {items.map((item, i) => (
          <div key={i} className="flex items-center shrink-0">
            <span className="font-serif text-[#080C1A] text-sm font-semibold px-6 tracking-wide whitespace-nowrap">{item}</span>
            <span className="text-[#080C1A]/30 text-xs">◆</span>
          </div>
        ))}
      </div>
    </div>
  );
}
