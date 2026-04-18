import type { Metadata } from 'next';
import { Network } from 'lucide-react';
import ServicePage from '@/components/shared/ServicePage';

export const metadata: Metadata = { title: 'DMS & auraDOCS' };

export default function AuraDOCS() {
  return (
    <ServicePage
      icon={Network}
      label="Proprietary Document Intelligence"
      title="DMS & auraDOCS"
      subtitle="auraDOCS is DOK Solutions' proprietary Document Management System — intelligent, secure, and built specifically for Sri Lankan enterprises."
      heroImg="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1400&h=700&fit=crop&auto=format&q=80"
      color="#F5A623"
      badge="DOK's Own Platform"
      intro="auraDOCS is not a generic off-the-shelf product — it is a purpose-built document management platform designed specifically for Sri Lankan regulatory requirements, multi-language support, and the unique operational needs of local enterprises across banking, insurance, and government."
      features={[
        { title: 'Cloud or On-Premise',      desc: 'Deploy on DOK\'s secure cloud infrastructure or on your own servers. Full flexibility with no compromise on security or performance.' },
        { title: 'Role-Based Access Control', desc: 'Granular permissions for every user, team, and department. Full audit trail showing who accessed what document, when, and from where.' },
        { title: 'Workflow Automation',       desc: 'Build approval workflows, document routing rules, and automated notifications. Eliminate manual handoffs and bottlenecks.' },
        { title: 'Full-Text Search',          desc: 'Search within document content, not just file names. OCR-powered search finds any word in any document within seconds.' },
        { title: 'Version Control',           desc: 'Track every revision to every document automatically. Revert to any previous version instantly with a complete change history.' },
        { title: 'API Integration',           desc: 'Connect auraDOCS with your ERP, CRM, core banking, or insurance system via REST API. Seamless data flow across all your systems.' },
        { title: 'Mobile Access',             desc: 'Secure document access from any device, anywhere. Native-quality mobile experience for iOS and Android.' },
        { title: 'Compliance Ready',          desc: 'Built to support ISO 27001 data governance, GDPR-aligned privacy controls, and Sri Lankan regulatory requirements.' },
      ]}
      industries={['Banking & Finance', 'Insurance', 'Healthcare', 'Government', 'Legal', 'Telecommunications', 'Corporate', 'Education']}
    />
  );
}
