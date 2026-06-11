import type { Metadata } from 'next';
import { Network } from 'lucide-react';
import ServicePage from '@/components/shared/ServicePage';
import { getServiceImages } from '@/lib/service-images';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'auraDOCS — Document Management System',
  description: "auraDOCS is DOK Solutions Lanka's proprietary cloud-based Document Management System (DMS). Centralized storage, advanced search, role-based access controls, audit trails, workflow automation, and seamless enterprise integration.",
  keywords: ['auraDOCS', 'document management system Sri Lanka', 'DMS Sri Lanka', 'cloud document management', 'electronic document management', 'workflow automation Sri Lanka', 'role-based access control DMS'],
  openGraph: {
    title: 'auraDOCS Document Management System — DOK Solutions Lanka',
    description: "Sri Lanka's purpose-built DMS. Centralized digital document storage with full-text search, version control, approval workflows, and integration with your existing enterprise systems.",
  },
};

export default async function AuraDOCS() {
  const { heroImg, whyImg } = await getServiceImages('auradocs');
  return (
    <ServicePage
      icon={Network}
      label="Proprietary Document Intelligence"
      title="DMS & auraDOCS"
      subtitle="auraDOCS is DOK Solutions' proprietary Document Management System — intelligent, secure, and built specifically for Sri Lankan enterprises."
      heroImg={heroImg || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&h=700&fit=crop&auto=format&q=80'}
      color="#F5A623"
      badge="DOK's Own Platform"
      stats={[
        { value: 'Cloud',   label: 'or On-Premise Deployment' },
        { value: 'Full-Text', label: 'Search Capability' },
        { value: 'Role-Based', label: 'Access Control' },
        { value: 'REST API', label: 'Enterprise Integration' },
      ]}
      intro="auraDOCS is DOK Solutions' proprietary cloud-based Document Management System — a comprehensive and secure solution designed to help organisations efficiently manage, store, retrieve, and control business information in a centralised electronic environment. The system enables organisations to transition from paper-based operations to a streamlined digital workflow, improving operational efficiency, accessibility, and information security. auraDOCS can be customised and integrated with existing enterprise applications and repositories based on each customer's unique requirements."
      features={[
        { title: 'Cloud or On-Premise',       desc: "Deploy on DOK's secure cloud infrastructure or on your own servers — full flexibility with no compromise on security or performance." },
        { title: 'Role-Based Access Control', desc: 'Granular permissions for every user, team, and department. A full audit trail shows who accessed which document, when, and from where.' },
        { title: 'Workflow Automation',       desc: 'Build approval workflows, document routing rules, and automated notifications — eliminating manual handoffs and reducing processing bottlenecks.' },
        { title: 'Full-Text Search',          desc: 'Search within document content, not just file names. OCR-powered search finds any word in any scanned document within seconds.' },
        { title: 'Version Control',           desc: 'Track every revision to every document automatically. Revert to any previous version instantly with a complete change history.' },
        { title: 'API Integration',           desc: 'Connect auraDOCS with your ERP, CRM, core banking, or insurance system via REST API for seamless data flow across your entire organisation.' },
        { title: 'Mobile Access',             desc: 'Secure document access from any device, anywhere — a native-quality mobile experience built for both iOS and Android.' },
        { title: 'Compliance Ready',          desc: 'Built to support ISO 27001 data governance, GDPR-aligned privacy controls, and the full range of Sri Lankan regulatory requirements.' },
      ]}
      whyTitle="Purpose-Built for Sri Lankan Enterprises"
      whyBody="Unlike generic international DMS platforms, auraDOCS is designed from the ground up to meet the specific workflows, compliance requirements, and language needs of Sri Lankan organisations. It supports Sinhala, Tamil, and English document management, integrates natively with the country's leading banking and insurance systems, and is backed by DOK's in-house team of software engineers and implementation specialists. When you deploy auraDOCS, you are not just buying software — you are gaining a technology partner with 15 years of domain expertise who will configure, integrate, train, and support your team throughout the entire lifecycle of the system."
      whyImg={whyImg || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&h=700&fit=crop&auto=format&q=80'}
      industries={['Banking & Finance', 'Insurance', 'Healthcare', 'Government', 'Legal', 'Telecommunications', 'Corporate', 'Education']}
    />
  );
}
