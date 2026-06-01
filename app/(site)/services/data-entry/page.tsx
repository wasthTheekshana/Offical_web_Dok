import type { Metadata } from 'next';
import { DatabaseZap } from 'lucide-react';
import ServicePage from '@/components/shared/ServicePage';
import { getServiceImages } from '@/lib/service-images';

export const metadata: Metadata = {
  title: 'Data Entry Services',
  description: 'DOK Solutions Lanka provides reliable and efficient data entry services with high accuracy, fast turnaround, and strict confidentiality. Backed by trained personnel and technology-driven workflows — free your team to focus on core business functions.',
  keywords: ['data entry services Sri Lanka', 'data capture outsourcing', 'data entry company Sri Lanka', 'accurate data entry', 'outsourced data processing', 'data entry BPO Sri Lanka', 'data management services'],
  openGraph: {
    title: 'Data Entry Services — DOK Solutions Lanka',
    description: 'High-accuracy data entry and data capture services for Sri Lankan organisations. Scalable, confidential, and backed by quality control procedures and technology-driven workflows.',
  },
};

export default async function DataEntry() {
  const { heroImg, whyImg } = await getServiceImages('data-entry');
  return (
    <ServicePage
      icon={DatabaseZap}
      label="Accurate. Scalable. Confidential."
      title="Data Entry Services"
      subtitle="Reliable, high-accuracy data entry and data capture services — letting your team focus on what matters most to your business."
      heroImg={heroImg || '/images/data-entry.jpg'}
      color="#003B8E"
      stats={[
        { value: '99%+',    label: 'Accuracy Rate' },
        { value: 'ISO 27001', label: 'Information Security' },
        { value: 'Scalable', label: 'Team Capacity' },
        { value: 'Multi-Format', label: 'Output Delivery' },
      ]}
      intro="DOK Solutions provides reliable and efficient data entry services designed to support organisations in managing large volumes of business information with speed, accuracy, and confidentiality. Backed by trained personnel, well-defined quality control procedures, and technology-driven workflows, we ensure consistently high data accuracy while maintaining quick turnaround times. By outsourcing data entry to DOK Solutions, organisations reduce the administrative burden on internal staff and allow their employees to focus on core business functions and strategic priorities."
      features={[
        { title: 'High-Accuracy Data Entry',  desc: 'Trained operators and multi-level QC procedures ensure consistently high accuracy rates across all data entry operations, regardless of volume or complexity.' },
        { title: 'Document Data Capture',     desc: 'Structured extraction of data from forms, invoices, applications, and other business documents into your required digital format and database structure.' },
        { title: 'Volume Scalability',        desc: 'Whether you need daily processing of hundreds or tens of thousands of records, our teams scale rapidly to meet your operational demands and deadlines.' },
        { title: 'Quality Control Process',   desc: 'Multi-level verification and validation checks on all processed data catch errors before output is delivered — ensuring clean, reliable data every time.' },
        { title: 'Strict Confidentiality',    desc: "All data handling follows DOK's ISO 27001-certified information security protocols. NDAs and data access controls are applied as standard on every engagement." },
        { title: 'Multiple Output Formats',   desc: 'Processed data delivered in your required format — Excel, CSV, direct database upload, or integrated directly with your enterprise ERP or CRM systems.' },
      ]}
      whyTitle="Your Trusted Partner for High-Volume Data Operations"
      whyBody="Accurate, timely data entry is the backbone of efficient business operations — yet managing it in-house is costly, resource-intensive, and a distraction from strategic work. DOK Solutions has built a dedicated data entry practice that combines expert human operators with technology-driven quality controls, enabling organisations across Sri Lanka to outsource their most data-intensive processes with confidence. Our ISO 27001-certified security framework ensures your data is always protected, while our scalable team structure means we can handle your peak periods without the overhead of permanent headcount. From one-off digitization projects to ongoing daily processing contracts, DOK delivers consistent quality and complete transparency."
      whyImg={whyImg || '/images/scanning-team.png'}
      steps={[
        { step: '01', title: 'Requirement Analysis', desc: 'We assess your document types, volumes, data fields, accuracy requirements, and output specifications to design the optimal processing workflow.' },
        { step: '02', title: 'Team Setup & Training', desc: 'Dedicated data entry operators are assigned and trained on your specific document formats, field validation rules, and quality standards.' },
        { step: '03', title: 'Processing & QC',       desc: 'Data is entered, verified through our multi-level QC process, and validated against defined business rules before approval for delivery.' },
        { step: '04', title: 'Delivery & Reporting',  desc: 'Completed data delivered in your specified format with accuracy and throughput reports for full operational visibility and audit capability.' },
      ]}
      industries={['Banking & Finance', 'Insurance', 'Healthcare', 'Government', 'Retail', 'Manufacturing', 'Logistics', 'Education']}
    />
  );
}
