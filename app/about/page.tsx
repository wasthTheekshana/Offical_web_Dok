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
  description: 'Learn about DOK Solutions Lanka\'s 14-year journey of excellence in document management, BPO and digital transformation — backed by the Abans Group.',
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
