import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import Script from 'next/script';
import { safeJsonLd } from '@/lib/json-ld';
import './globals.css';

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

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
          dangerouslySetInnerHTML={{ __html: safeJsonLd(orgSchema) }}
        />

        {/* Google Tag Manager */}
        {GTM_ID && (
          <Script id="gtm-script" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
          </Script>
        )}

        {/* Meta Pixel */}
        {META_PIXEL_ID && (
          <Script id="meta-pixel" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){
n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];
t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window,document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${META_PIXEL_ID}');fbq('track','PageView');`}
          </Script>
        )}
      </head>
      <body className="min-h-full flex flex-col bg-brand-cream text-[#1C1C1C] transition-colors duration-500">
        {/* GTM noscript fallback */}
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0" width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}

        {/* Meta Pixel noscript fallback */}
        {META_PIXEL_ID && (
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              height="1" width="1"
              style={{ display: 'none' }}
              src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
        )}

        {children}
      </body>
    </html>
  );
}
