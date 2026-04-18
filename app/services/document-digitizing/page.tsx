import type { Metadata } from 'next';
import { ScanLine } from 'lucide-react';
import ServicePage from '@/components/shared/ServicePage';

export const metadata: Metadata = { title: 'Document Digitizing' };

export default function DocumentDigitizing() {
  return (
    <ServicePage
      icon={ScanLine}
      label="Scan. Recognise. Access."
      title="Document Digitizing"
      subtitle="Transform your paper archives into searchable digital assets with our industrial-grade scanning and OCR services."
      heroImg="https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=1400&h=700&fit=crop&auto=format&q=80"
      color="#0072CE"
      intro="DOK Solutions digitizes millions of pages annually for Sri Lanka's leading organisations. Our state-of-the-art scanning equipment combined with advanced OCR technology delivers high-quality digital assets that are fully indexed, searchable, and immediately accessible."
      features={[
        { title: 'High-Speed Bulk Scanning', desc: 'Industrial scanners processing thousands of pages per day. Handles A0 to A6 formats, bound documents, and fragile historical records.' },
        { title: 'OCR Text Recognition',     desc: 'Advanced Optical Character Recognition converts scanned images to fully searchable, indexed digital text in Sinhala, Tamil, and English.' },
        { title: 'Quality Control',           desc: 'Every scan is reviewed by trained QC specialists for clarity, completeness, and accuracy before delivery to the client.' },
        { title: 'Multiple Output Formats',   desc: 'PDF, PDF/A (archival), TIFF, JPEG — delivered to your chosen storage system, cloud drive, or loaded directly into auraDOCS.' },
        { title: 'Metadata Tagging',          desc: 'Custom metadata fields applied to every document based on your indexing requirements — enabling instant retrieval by any parameter.' },
        { title: 'Full Audit Trails',         desc: 'Complete chain-of-custody documentation for every document scanned, indexed, and delivered. Regulatory compliance guaranteed.' },
      ]}
      steps={[
        { step: '01', title: 'Preparation', desc: 'Documents are received, sorted, and prepared for scanning. Staples, clips, and bindings are removed and documents are cleaned.' },
        { step: '02', title: 'Scanning',    desc: 'High-speed industrial scanners capture every page at 300–600 DPI resolution optimised for document type and intended use.' },
        { step: '03', title: 'Processing',  desc: 'Scanned images are processed: OCR applied, metadata tagged, file formats converted, and quality checks performed.' },
        { step: '04', title: 'Delivery',    desc: 'Digital files delivered via secure transfer to your specified destination — cloud storage, FTP, or directly into auraDOCS DMS.' },
      ]}
      industries={['Banking & Finance', 'Insurance', 'Healthcare', 'Legal', 'Government', 'Education', 'Accounting', 'Human Resources']}
    />
  );
}
