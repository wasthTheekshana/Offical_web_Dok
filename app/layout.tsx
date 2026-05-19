import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const metadata: Metadata = {
  title: { default: 'DOK Solutions Lanka — Journey Towards A Smart Era', template: '%s | DOK Solutions Lanka' },
  description: "DOK Solutions Lanka (Pvt) Ltd is Sri Lanka's leading records management and business process outsourcing company, specializing in document archiving, digitization, data entry, and workflow management since 2010. Part of the Abans Group. ISO 9001 | ISO 27001 | ISO 45001 certified.",
  keywords: [
    'document management Sri Lanka',
    'records management Sri Lanka',
    'BPO Sri Lanka',
    'business process outsourcing Sri Lanka',
    'physical document archiving',
    'document digitizing Sri Lanka',
    'data entry services Sri Lanka',
    'auraDOCS DMS',
    'document management system Sri Lanka',
    'Abans Group',
    'AB Securitas',
    'ISO 9001 ISO 27001 ISO 45001',
    'document storage Sri Lanka',
    'workflow management Sri Lanka',
  ],
  openGraph: {
    siteName: 'DOK Solutions Lanka',
    locale: 'en_LK',
    type: 'website',
    description: "Sri Lanka's leading records management and BPO company. Document archiving, digitization, data entry, and auraDOCS DMS — serving 200+ elite corporate clients since 2010.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`h-full antialiased ${inter.variable} ${playfair.variable}`}>
      <body className="min-h-full flex flex-col bg-brand-cream text-[#1C1C1C] transition-colors duration-500">
        {children}
      </body>
    </html>
  );
}
