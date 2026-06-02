import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

const BASE = process.env.NEXTAUTH_URL || 'https://doksolutions.lk';

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: { default: 'DOK Solutions Lanka — Journey Towards A Smart Era', template: '%s | DOK Solutions Lanka' },
  description: "DOK Solutions Lanka (Pvt) Ltd is Sri Lanka's leading records management and BPO company, specializing in document archiving, digitization, data entry, and workflow management since 2010. Part of the Abans Group. ISO 9001 | ISO 27001 | ISO 45001 certified.",
  keywords: [
    'document management Sri Lanka', 'records management Sri Lanka', 'BPO Sri Lanka',
    'business process outsourcing Sri Lanka', 'physical document archiving',
    'document digitizing Sri Lanka', 'data entry services Sri Lanka',
    'auraDOCS DMS', 'document management system Sri Lanka', 'Abans Group',
    'AB Securitas', 'ISO 9001 ISO 27001 ISO 45001', 'document storage Sri Lanka',
  ],
  authors: [{ name: 'DOK Solutions Lanka (Pvt) Ltd' }],
  creator: 'DOK Solutions Lanka',
  publisher: 'DOK Solutions Lanka',
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  alternates: { canonical: BASE },
  openGraph: {
    siteName: 'DOK Solutions Lanka',
    locale: 'en_LK',
    type: 'website',
    url: BASE,
    title: 'DOK Solutions Lanka — Journey Towards A Smart Era',
    description: "Sri Lanka's leading records management and BPO company. Document archiving, digitization, data entry, and auraDOCS DMS — serving 200+ elite corporate clients since 2010.",
    images: [{ url: '/hero-warehouse.png', width: 1200, height: 630, alt: 'DOK Solutions Lanka' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DOK Solutions Lanka — Journey Towards A Smart Era',
    description: "Sri Lanka's leading records management and BPO company.",
    images: ['/hero-warehouse.png'],
  },
};

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'DOK Solutions Lanka (Pvt) Ltd',
  url: BASE,
  logo: `${BASE}/favicon.ico`,
  sameAs: [
    'https://www.linkedin.com/company/dok-solutions-lanka',
    'https://www.facebook.com/doksolutionslanka',
  ],
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'No. 141, Kirula Road',
    addressLocality: 'Colombo 05',
    addressCountry: 'LK',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+94-11-2-508-508',
    contactType: 'customer service',
    areaServed: 'LK',
    availableLanguage: ['English', 'Sinhala'],
  },
  foundingDate: '2010',
  parentOrganization: { '@type': 'Organization', name: 'AB Securitas (Pvt) Ltd' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-LK" className={`h-full antialiased ${inter.variable} ${playfair.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-brand-cream text-[#1C1C1C] transition-colors duration-500">
        {children}
      </body>
    </html>
  );
}
