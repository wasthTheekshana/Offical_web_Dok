import type { Metadata } from 'next';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Thank You — Message Received',
  description: 'Thank you for contacting DOK Solutions Lanka. Our team will respond within 24 hours.',
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center bg-[#F8FAFF] px-6">
      <div className="text-center max-w-xl">
        <div className="w-24 h-24 rounded-full bg-green-50 border-2 border-green-200 flex items-center justify-center mx-auto mb-8">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-green-500">
            <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#003B8E]/60 block mb-4">Message Received</span>
        <h1 className="text-4xl lg:text-5xl font-black text-[#1A1A2E] mb-5 leading-tight">
          Thank You for<br />
          <span className="text-grad">Reaching Out</span>
        </h1>
        <p className="text-[#64748B] text-lg mb-10 leading-relaxed">
          Our team will review your message and get back to you within <strong className="text-[#1A1A2E]">24 business hours</strong>. For urgent enquiries, call us directly on <strong className="text-[#1A1A2E]">+94 117 717 777</strong>.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#003B8E] to-[#0072CE] text-white font-bold rounded-xl shadow-[0_8px_24px_rgba(0,59,142,0.3)] hover:shadow-[0_12px_36px_rgba(0,59,142,0.45)] transition-all text-sm"
          >
            Back to Home
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border border-[#E8EDF5] text-[#1A1A2E] font-bold rounded-xl hover:border-[#003B8E]/25 hover:shadow-card transition-all text-sm"
          >
            Explore Our Services
          </Link>
        </div>
      </div>
    </section>
  );
}
