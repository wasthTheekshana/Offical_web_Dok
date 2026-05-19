import type { Metadata } from 'next';
import ServicesClient from './ServicesClient';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Explore DOK Solutions Lanka\'s comprehensive document management and BPO services.',
};

export default function ServicesPage() {
  return <ServicesClient />;
}
