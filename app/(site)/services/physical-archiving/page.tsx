import type { Metadata } from 'next';
import { Archive } from 'lucide-react';
import ServicePage from '@/components/shared/ServicePage';

export const metadata: Metadata = {
  title: 'Physical Document Archiving',
  description: 'DOK Solutions Lanka provides comprehensive physical document archiving services — secure climate-controlled warehouses, barcode tracking, same-day retrieval, and certified document destruction for organisations across Sri Lanka.',
  keywords: ['physical document archiving Sri Lanka', 'offsite document storage', 'records management', 'secure document storage', 'document retrieval Sri Lanka', 'barcode tracking documents', 'document destruction Sri Lanka'],
  openGraph: {
    title: 'Physical Document Archiving — DOK Solutions Lanka',
    description: 'Secure offsite document storage with climate-controlled warehouses, biometric access, CCTV surveillance, and same-day retrieval. Serving BFSI, healthcare, government and more across Sri Lanka.',
  },
};

export default function PhysicalArchiving() {
  return (
    <ServicePage
      icon={Archive}
      label="Secure Offsite Storage"
      title="Physical Document Archiving"
      subtitle="Sri Lanka's most trusted physical document storage — with climate-controlled warehouses, biometric access, and same-day retrieval."
      heroImg="/images/warehouse-main.jpg"
      color="#003B8E"
      stats={[
        { value: '3',      label: 'Secure Warehouses' },
        { value: '200+',   label: 'Corporate Clients' },
        { value: '15+',    label: 'Years Operating' },
        { value: 'Same Day', label: 'Document Retrieval' },
      ]}
      intro="DOK Solutions provides comprehensive physical document archiving services to help organisations securely manage, store, retrieve, and preserve critical business records. Our facilities are equipped with modern storage infrastructure, advanced security systems, 24/7 CCTV surveillance, controlled access mechanisms, fire detection and protection systems, and environmentally monitored conditions — ensuring long-term preservation and confidentiality of your documents across three purpose-built, climate-controlled warehouses."
      features={[
        { title: 'Secure Warehouses',        desc: 'Three climate-controlled, access-controlled facilities with 24/7 CCTV, fire suppression, and biometric entry — purpose-built for long-term document preservation.' },
        { title: 'Barcode Tracking',         desc: 'Every box and file is assigned a unique barcode. Track location, access history, and full chain-of-custody at any time via our secure online portal.' },
        { title: 'Same-Day Retrieval',       desc: 'Request a file online or by phone before 11 AM and receive the original document at your office the same business day — or a digital scan within 2 hours.' },
        { title: 'Climate Controlled',       desc: 'Optimal temperature and humidity conditions preserve the integrity of paper documents indefinitely, preventing yellowing, mould, and deterioration.' },
        { title: 'Certified Destruction',    desc: 'Secure end-of-life document destruction with full compliance documentation and a certificate of destruction — meeting all regulatory requirements.' },
        { title: 'Real-Time Inventory',      desc: 'Complete audit trail of all document movements, access events, and inventory counts available 24/7 via our real-time online management portal.' },
      ]}
      whyTitle="The Trusted Choice for Physical Records Management in Sri Lanka"
      whyBody="With over 15 years serving Sri Lanka's most demanding institutions — banks, insurers, government agencies, and healthcare providers — DOK Solutions has built an unparalleled reputation for reliability, security, and operational excellence. Our physical archiving infrastructure is unmatched: three dedicated warehouse facilities with state-of-the-art environmental controls, biometric access management, and ISO 9001, ISO 27001, and ISO 45001 certifications backing every operation. When your organisation entrusts us with its most critical records, you can be certain they are in the safest hands in the country."
      whyImg="/images/warehouse-shelves.png"
      steps={[
        { step: '01', title: 'Collection',  desc: 'We collect your documents from your premises, professionally box them, and label each box with unique barcodes linked to your metadata specifications.' },
        { step: '02', title: 'Indexing',    desc: 'Each box and file is catalogued in our tracking system with your defined metadata — department, date range, document type, reference number, and more.' },
        { step: '03', title: 'Storage',     desc: 'Documents are stored in the designated section of our secure, climate-controlled warehouse with continuous environmental monitoring and fire protection.' },
        { step: '04', title: 'Retrieval',   desc: 'Request any document online or by phone. We locate, pull, and deliver the same business day — or scan and email digitally within 2 hours of your request.' },
      ]}
      industries={['Banking & Finance', 'Insurance', 'Healthcare', 'Legal & Law Firms', 'Government', 'Corporate', 'Telecommunications', 'Retail']}
    />
  );
}
