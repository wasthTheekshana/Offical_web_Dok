import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CustomCursor from '@/components/ui/CustomCursor';
import SplashScreen from '@/components/shared/SplashScreen';

export const metadata: Metadata = {
  title: { default: 'DOK Solutions Lanka — Journey Towards A Smart Era', template: '%s | DOK Solutions Lanka' },
  description: "Sri Lanka's leading document management & BPO company. Part of the Abans Group. ISO 9001 | ISO 27001 | ISO 45001 certified.",
  keywords: ['document management Sri Lanka', 'BPO Sri Lanka', 'physical archiving', 'auraDOCS', 'Abans Group'],
  openGraph: {
    siteName: 'DOK Solutions Lanka',
    locale: 'en_LK',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`h-full antialiased ${inter.variable} ${playfair.variable}`}>
      <body className="min-h-full flex flex-col bg-brand-cream text-[#1C1C1C] transition-colors duration-500">
        <SplashScreen />
        <CustomCursor />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
