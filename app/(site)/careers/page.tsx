import type { Metadata } from 'next';
import CareersClient from './CareersClient';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Careers',
  description: 'Join DOK Solutions Lanka — a Great Place to Work® certified team backed by the Alguns Group. Explore open positions.',
};

export default function CareersPage() {
  return <CareersClient />;
}
