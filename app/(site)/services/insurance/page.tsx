import type { Metadata } from 'next';
import { Shield } from 'lucide-react';
import ServicePage from '@/components/shared/ServicePage';
import { getServiceImages } from '@/lib/service-images';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Insurance Policy Management',
  description: 'DOK Solutions Lanka manages the full lifecycle of insurance policy documents — scanning, indexing, retrieval, and secure storage for life, motor, and health insurance companies across Sri Lanka.',
  keywords: ['insurance policy management Sri Lanka', 'insurance document management', 'policy document archiving', 'claims document management', 'insurance BPO Sri Lanka', 'IRCSL compliance', 'insurance digitization Sri Lanka'],
  openGraph: {
    title: 'Insurance Policy Management — DOK Solutions Lanka',
    description: 'End-to-end insurance document management from proposal intake to claims archiving. Specialist services for life, general, and health insurance companies in Sri Lanka.',
  },
};

export default async function Insurance() {
  const { heroImg, whyImg } = await getServiceImages('insurance');
  return (
    <ServicePage
      icon={Shield}
      label="Purpose-Built for Insurance"
      title="Insurance Policy Management"
      subtitle="Specialist document management for insurance companies — from proposal intake to claims archiving and regulatory compliance."
      heroImg={heroImg || 'https://images.unsplash.com/photo-1521791055366-0d553872952f?w=1400&h=700&fit=crop&auto=format&q=80'}
      color="#0072CE"
      stats={[
        { value: '10+',    label: 'Years in Insurance' },
        { value: 'All',    label: 'Policy Classes Covered' },
        { value: 'IRCSL',  label: 'Compliant Processes' },
        { value: 'End-to-End', label: 'Policy Lifecycle' },
      ]}
      intro="DOK Solutions manages the full lifecycle of insurance policy documents — scanning, indexing, retrieval, and secure storage for life, motor, and health insurance companies across Sri Lanka. With over a decade serving the insurance sector, our deep understanding of IRCSL regulations, insurance workflows, and compliance requirements makes us the natural choice for end-to-end insurance document management. We work as a seamless extension of your operations, handling the document-intensive back-office functions so your team can focus on underwriting, claims assessment, and customer relationships."
      features={[
        { title: 'Proposal Processing',      desc: 'Intake, scanning, indexing, and digital routing of insurance proposal forms with complete validation and multi-level quality control checks.' },
        { title: 'Policy Issuance Support',  desc: 'Document preparation, printing coordination, and policy document archiving for efficient, error-free policy fulfilment operations.' },
        { title: 'Claims Document Mgmt',     desc: 'Organised, fast-retrieval claims folder management across physical and digital formats — helping assessors resolve claims faster with less administrative friction.' },
        { title: 'Digital Policy Archives',  desc: 'Full digital archive of all active and lapsed policies with instant retrieval via auraDOCS. Zero physical search time, complete audit trail.' },
        { title: 'Compliance Documentation', desc: 'Maintain regulatory-compliant audit trails for IRCSL and all relevant regulatory requirements — with zero gaps and full traceability.' },
        { title: 'Renewal Management',       desc: 'Document workflow support for the complete policy renewal cycle — from renewal notice generation to updated policy document archiving.' },
      ]}
      whyTitle="A Decade of Insurance Sector Expertise"
      whyBody="Insurance document management is fundamentally different from generic records management. It requires an understanding of policy lifecycles, claims workflows, underwriting processes, and the specific compliance expectations set by the Insurance Regulatory Commission of Sri Lanka (IRCSL). DOK Solutions has spent over ten years building this domain expertise — working with leading life, general, and health insurers to design document workflows that are not only operationally efficient but fully audit-ready. Our teams are trained in insurance terminology, policy form types, and claims documentation requirements, ensuring that every document is handled correctly the first time. When you partner with DOK, you gain a specialist — not a generalist."
      whyImg={whyImg || 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=900&h=700&fit=crop&auto=format&q=80'}
      steps={[
        { step: '01', title: 'Proposal Intake',    desc: 'Physical proposal forms received, scanned, indexed with customer and policy data, and routed digitally to underwriting teams.' },
        { step: '02', title: 'Policy Issuance',    desc: 'Policy documents prepared, checked for accuracy, printed or generated digitally, and archived in the client\'s auraDOCS instance.' },
        { step: '03', title: 'Ongoing Management', desc: 'Policy amendments, endorsements, renewals, and correspondence managed and archived throughout the complete policy lifecycle.' },
        { step: '04', title: 'Claims Processing',  desc: 'Claims documents received, sorted, scanned, and organised into digital claims folders for assessors — accelerating claims settlement timelines.' },
      ]}
      industries={['Life Insurance', 'General Insurance', 'Reinsurance', 'Insurance Brokers', 'Micro-Insurance', 'Health Insurance']}
    />
  );
}
