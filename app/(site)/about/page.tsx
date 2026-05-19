import type { Metadata } from 'next';
import AboutHero           from '@/components/about/AboutHero';
import AboutMarquee        from '@/components/about/AboutMarquee';
import AboutStory          from '@/components/about/AboutStory';
import AboutTimeline       from '@/components/about/AboutTimeline';
import AboutValues         from '@/components/about/AboutValues';
import AboutTeam           from '@/components/about/AboutTeam';
import AboutCertifications from '@/components/about/AboutCertifications';
import AboutAbans          from '@/components/about/AboutAbans';
import CTABanner           from '@/components/home/CTABanner';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'DOK Solutions Lanka (Pvt) Ltd is Sri Lanka\'s leading records management and BPO company. Established in 2010, part of the Abans Group, ISO 9001 | ISO 27001 | ISO 45001 certified, with 200+ employees serving 200+ elite corporate clients.',
  keywords: ['about DOK Solutions Lanka', 'records management Sri Lanka', 'document archiving company', 'Abans Group', 'BPO Sri Lanka', 'AB Securitas', 'ISO certified document management'],
  openGraph: {
    title: 'About DOK Solutions Lanka — Sri Lanka\'s Leading Document Management Company',
    description: 'Established in 2010, DOK Solutions Lanka provides end-to-end information management, archiving, digitization, and BPO services to 200+ elite corporate clients across Sri Lanka.',
  },
};

export default function AboutPage() {
  return (
    <div className="overflow-x-hidden">
      <AboutHero />
      <AboutMarquee />
      <AboutStory />
      <AboutTimeline />
      <AboutValues />
      <AboutTeam />
      <AboutCertifications />
      <AboutAbans />
      <CTABanner />
    </div>
  );
}
