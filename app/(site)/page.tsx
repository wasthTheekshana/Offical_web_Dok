import type { Metadata } from 'next';
import Hero          from '@/components/home/Hero';
import Stats         from '@/components/home/Stats';
import AboutSnapshot from '@/components/home/AboutSnapshot';
import ServicesGrid  from '@/components/home/ServicesGrid';
import WhyChooseUs   from '@/components/home/WhyChooseUs';
import Testimonials  from '@/components/home/Testimonials';
import ClientLogos   from '@/components/home/ClientLogos';
import NewsSection   from '@/components/home/NewsSection';
import CertsBar      from '@/components/home/CertsBar';
import CTABanner     from '@/components/home/CTABanner';
import { getSiteImages } from '@/lib/site-images';

export const metadata: Metadata = {
  title: 'DOK Solutions Lanka — Journey Towards A Smart Era',
  description: "Sri Lanka's leading document management & BPO company. Part of the Abans Group. ISO 9001 | ISO 27001 | ISO 45001 certified.",
};

export default async function HomePage() {
  const imgs = await getSiteImages();
  return (
    <>
      <Hero imgs={imgs} />
      <Stats imgs={imgs} />
      <AboutSnapshot />
      <ServicesGrid />
      <WhyChooseUs />
      <Testimonials />
      <ClientLogos />
      <NewsSection />
      <CertsBar />
      <CTABanner />
    </>
  );
}
