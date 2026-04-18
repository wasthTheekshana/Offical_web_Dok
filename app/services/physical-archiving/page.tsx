import type { Metadata } from 'next';
import { Archive } from 'lucide-react';
import ServicePage from '@/components/shared/ServicePage';

export const metadata: Metadata = { title: 'Physical Document Archiving' };

export default function PhysicalArchiving() {
  return (
    <ServicePage
      icon={Archive}
      label="Secure Offsite Storage"
      title="Physical Document Archiving"
      subtitle="Sri Lanka's most trusted physical document storage — with climate-controlled warehouses, biometric access, and same-day retrieval."
      heroImg="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1400&h=700&fit=crop&auto=format&q=80"
      color="#003B8E"
      intro="DOK Solutions operates three state-of-the-art warehouse facilities in the Colombo region, providing secure offsite storage for millions of physical documents. Our facilities combine military-grade security with operational efficiency to give you peace of mind."
      features={[
        { title: 'Secure Warehouses',        desc: 'Three climate-controlled, access-controlled facilities with 24/7 CCTV, fire suppression, and biometric entry for maximum security.' },
        { title: 'Bar-Code Tracking',         desc: 'Every box and file assigned a unique barcode. Track location, access history, and chain-of-custody at all times via our portal.' },
        { title: 'Same-Day Retrieval',        desc: 'Request a file online or by phone before 11 AM and receive the original document at your office the same business day.' },
        { title: 'Climate Controlled',        desc: 'Optimal temperature and humidity conditions preserve the integrity of paper documents indefinitely, preventing deterioration.' },
        { title: 'Destruction Services',      desc: 'Certified secure document destruction at end-of-life with full compliance documentation and certification of destruction.' },
        { title: 'Inventory Management',      desc: 'Complete audit trail of all document movements, access events, and inventory counts available via real-time online portal.' },
      ]}
      steps={[
        { step: '01', title: 'Collection',  desc: 'We collect your documents from your premises, professionally box them, and label each box with unique barcodes and your metadata.' },
        { step: '02', title: 'Indexing',    desc: 'Each box and file is catalogued in our tracking system with your defined metadata — department, date range, document type, and more.' },
        { step: '03', title: 'Storage',     desc: 'Documents stored in the correct, designated section of our secure warehouse facility with environmental monitoring.' },
        { step: '04', title: 'Retrieval',   desc: 'Request any document online or by phone. We locate, pull, and deliver the same day — or scan and email digitally within 2 hours.' },
      ]}
      industries={['Banking & Finance', 'Insurance', 'Healthcare', 'Legal', 'Government', 'Corporate', 'Telecommunications', 'Retail']}
    />
  );
}
