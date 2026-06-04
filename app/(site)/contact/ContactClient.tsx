'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';
import PageHero from '@/components/shared/PageHero';

const services = [
  'Physical Archiving',
  'Document Digitizing',
  'DMS & auraDOCS',
  'Business Process Outsourcing',
  'Insurance Policy Management',
  'General Inquiry',
];

export default function ContactClient() {
  const [sent,    setSent]    = useState(false);
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({
    name: '', email: '', phone: '', company: '', service: '', message: '',
  });

  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed to send');
      setSent(true);
      setForm({ name: '', email: '', phone: '', company: '', service: '', message: '' });
      setTimeout(() => setSent(false), 5000);
    } catch {
      setError('Something went wrong. Please email us directly at enquiries@doksolutions.net');
    } finally {
      setSending(false);
    }
  };

  const inp = 'w-full bg-[#F8FAFF] border border-[#E8EDF5] rounded-xl px-4 py-3.5 text-sm text-[#1A1A2E] placeholder:text-[#94A3B8] outline-none focus:border-[#003B8E]/50 focus:ring-2 focus:ring-[#003B8E]/08 transition-all';

  const contacts = [
    { icon: MapPin, label: 'Head Office', value: '141, Kirula Road, Colombo 05, Sri Lanka', color: '#003B8E' },
    { icon: Phone,  label: 'Phone',       value: '+94 117 717 777',                         color: '#0072CE' },
    { icon: Mail,   label: 'Email',       value: 'enquiries@doksolutions.net',               color: '#003B8E' },
    { icon: Clock,  label: 'Hours',       value: 'Mon–Fri: 8:30 AM – 5:30 PM',              color: '#F5A623' },
  ];

  return (
    <>
      <PageHero
        label="Get In Touch"
        title="We're Ready When You Are"
        subtitle="Reach out to discuss your document management, BPO, or digitization needs. Our team responds within 24 hours."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
      />

      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-start">

          {/* Left — info */}
          <div>
            <span className="label-pill mb-5 inline-flex">Our Details</span>
            <h2 className="text-3xl lg:text-4xl font-black text-[#1A1A2E] mb-8 leading-tight">
              Let&apos;s Start a<br />
              <span className="text-grad">Conversation</span>
            </h2>

            <div className="flex flex-col gap-4 mb-10">
              {contacts.map(({ icon: Icon, label, value, color }) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex gap-4 p-5 rounded-2xl border border-[#E8EDF5] bg-[#F8FAFF] hover:shadow-card hover:border-transparent transition-all"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${color}12`, border: `1px solid ${color}20` }}
                  >
                    <Icon size={20} style={{ color }} />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest text-[#64748B] mb-1">{label}</div>
                    <div className="text-sm font-semibold text-[#1A1A2E]">{value}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Google Map */}
            <div className="rounded-2xl overflow-hidden h-72 border border-[#E8EDF5] shadow-sm">
              <iframe
                title="DOK Solutions Lanka location"
                src="https://www.google.com/maps?q=DOK+Solutions+Lanka+(Pvt)+Ltd,+141+Kirula+Road,+Colombo+05,+Sri+Lanka&output=embed&hl=en&z=16"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Directions link */}
            <a
              href="https://maps.google.com/?q=DOK+Solutions+Lanka,+141+Kirula+Road,+Colombo+05"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#003B8E] hover:text-[#0072CE] transition-colors"
            >
              <MapPin size={13} /> Get Directions ↗
            </a>
          </div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="bg-white rounded-3xl border border-[#E8EDF5] shadow-card p-8 lg:p-10">
              <h3 className="text-2xl font-black text-[#1A1A2E] mb-7">Send Us a Message</h3>

              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-green-50 border-2 border-green-200 flex items-center justify-center mb-5">
                    <CheckCircle size={36} className="text-green-500" />
                  </div>
                  <h4 className="text-xl font-black text-[#1A1A2E] mb-2">Message Sent!</h4>
                  <p className="text-[#64748B] text-sm">Our team will reach out within 24 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-[#64748B] uppercase tracking-wider mb-1.5 block">Full Name *</label>
                      <input
                        required value={form.name}
                        onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                        placeholder="Your full name" className={inp}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-[#64748B] uppercase tracking-wider mb-1.5 block">Email *</label>
                      <input
                        type="email" required value={form.email}
                        onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                        placeholder="email@company.com" className={inp}
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-[#64748B] uppercase tracking-wider mb-1.5 block">Phone</label>
                      <input value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} placeholder="+94 77 XXX XXXX" className={inp} />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-[#64748B] uppercase tracking-wider mb-1.5 block">Company</label>
                      <input value={form.company} onChange={e => setForm(p => ({ ...p, company: e.target.value }))} placeholder="Your company name" className={inp} />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[#64748B] uppercase tracking-wider mb-1.5 block">Service Interested In</label>
                    <select value={form.service} onChange={e => setForm(p => ({ ...p, service: e.target.value }))} className={inp}>
                      <option value="">Select a service...</option>
                      {services.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[#64748B] uppercase tracking-wider mb-1.5 block">Message *</label>
                    <textarea
                      required rows={5} value={form.message}
                      onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                      placeholder="Describe your document management or BPO needs..."
                      className={`${inp} resize-none`}
                    />
                  </div>
                  {error && (
                    <p className="text-sm text-red-500 bg-red-50 border border-red-100 rounded-xl px-4 py-3">{error}</p>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={sending}
                    className="flex items-center justify-center gap-2.5 py-4 bg-gradient-to-r from-[#003B8E] to-[#0072CE] text-white font-bold rounded-xl shadow-[0_8px_24px_rgba(0,59,142,0.3)] hover:shadow-[0_12px_36px_rgba(0,59,142,0.45)] transition-all disabled:opacity-70"
                  >
                    {sending ? (
                      <>
                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <><Send size={16} /> Send Message</>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
