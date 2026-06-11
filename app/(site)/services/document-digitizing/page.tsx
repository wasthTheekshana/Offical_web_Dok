import type { Metadata } from 'next';
import { ScanLine } from 'lucide-react';
import ServicePage from '@/components/shared/ServicePage';
import { getServiceImages } from '@/lib/service-images';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Document Digitizing & Indexing',
  description: 'Professional document digitization and indexing services in Sri Lanka. DOK Solutions uses industrial-grade high-speed scanners and advanced OCR to transform physical records into secure, searchable digital formats.',
  keywords: ['document digitizing Sri Lanka', 'document scanning services', 'OCR scanning Sri Lanka', 'document indexing', 'paper to digital conversion', 'document digitization company Sri Lanka', 'high speed scanning'],
  openGraph: {
    title: 'Document Digitizing & Indexing — DOK Solutions Lanka',
    description: 'Transform your paper archives into searchable digital assets. Onsite or offsite scanning, OCR, metadata indexing and secure upload to any DMS or cloud platform.',
  },
};

export default async function DocumentDigitizing() {
  const { heroImg, whyImg } = await getServiceImages('document-digitizing');
  return (
    <ServicePage
      icon={ScanLine}
      label="Scan. Recognise. Access."
      title="Document Digitizing"
      subtitle="Transform your paper archives into searchable digital assets with our industrial-grade scanning and advanced OCR services."
      heroImg={heroImg || '/images/scanning.jpg'}
      color="#0072CE"
      stats={[
        { value: '300+',  label: 'DPI Resolution' },
        { value: '3',     label: 'Language OCR (EN/SI/TM)' },
        { value: '1000s', label: 'Pages Per Day' },
        { value: '100%',  label: 'Quality Checked' },
      ]}
      intro="DOK Solutions offers professional document digitization services to help organisations transform physical records into secure, searchable, and easily accessible digital formats. We utilise the latest industrial-grade high-speed scanning hardware and advanced imaging technologies to ensure accurate, efficient, and high-quality digitization of documents of all sizes and volumes — carried out either at the client's premises or at our secure scanning centre in Colombo. Every scan is quality-checked before delivery."
      features={[
        { title: 'High-Speed Bulk Scanning', desc: 'Industrial scanners processing thousands of pages per day. Handles A0 to A6 formats, bound documents, fragile historical records, and large-format drawings.' },
        { title: 'Trilingual OCR',           desc: 'Advanced Optical Character Recognition converts scanned images to fully searchable, indexed digital text in Sinhala, Tamil, and English.' },
        { title: 'Quality Assurance',        desc: 'Every scan is reviewed by trained QC specialists for image clarity, completeness, and indexing accuracy before delivery to the client.' },
        { title: 'Multiple Output Formats',  desc: 'PDF, PDF/A (archival), TIFF, JPEG — delivered to your chosen storage system, cloud drive, or loaded directly into auraDOCS.' },
        { title: 'Metadata Indexing',        desc: 'Custom metadata fields applied to every document based on your indexing specifications — enabling instant retrieval by any parameter you define.' },
        { title: 'Onsite & Offsite Options', desc: 'Deploy our scanning team at your premises for sensitive collections, or ship documents to our secure scanning centre. Full chain-of-custody both ways.' },
      ]}
      whyTitle="Sri Lanka's Leading Document Digitization Partner"
      whyBody="DOK's digitization service combines the right technology with the right people. Our scanning centre is equipped with the latest Kodak and Canon industrial scanners capable of processing thousands of pages per hour, while our QC team ensures every image meets the high standards required for regulatory and archival use. We have digitized millions of documents for some of Sri Lanka's largest banks, insurance companies, and government institutions — and our experience means we can handle the most complex, fragile, or high-volume collections with efficiency and care. From a single filing cabinet to an entire warehouse, DOK delivers."
      whyImg={whyImg || '/images/scanning-2.jpg'}
      steps={[
        { step: '01', title: 'Preparation', desc: 'Documents are received, sorted, and prepared for scanning. Staples, clips, and bindings are removed; fragile documents are assessed and treated.' },
        { step: '02', title: 'Scanning',    desc: 'High-speed industrial scanners capture every page at 300–600 DPI resolution, optimised for the document type and its intended future use.' },
        { step: '03', title: 'Processing',  desc: 'Scanned images are processed: OCR applied, metadata tagged, output formats converted, and image quality validated by our QC team.' },
        { step: '04', title: 'Delivery',    desc: 'Digital files delivered via secure transfer to your specified destination — cloud storage, FTP server, or directly into your auraDOCS instance.' },
      ]}
      industries={['Banking & Finance', 'Insurance', 'Healthcare', 'Legal', 'Government', 'Education', 'Accounting', 'Human Resources']}
    />
  );
}
