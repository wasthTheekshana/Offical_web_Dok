import type { Metadata } from 'next';
import { Shield } from 'lucide-react';
import ServicePage from '@/components/shared/ServicePage';

export const metadata: Metadata = { title: 'Insurance Policy Management' };

export default function Insurance() {
  return (
    <ServicePage
      icon={Shield}
      label="Purpose-Built for Insurance"
      title="Insurance Policy Management"
      subtitle="Specialist document management for insurance companies — from proposal intake to claims archiving and regulatory compliance."
      heroImg="https://images.unsplash.com/photo-1521791055366-0d553872952f?w=1400&h=700&fit=crop&auto=format&q=80"
      color="#0072CE"
      intro="DOK Solutions has built a specialised practice serving Sri Lanka's insurance sector for over a decade. Our deep understanding of IRCSL regulations, insurance workflows, and compliance requirements makes us the natural choice for end-to-end insurance document management."
      features={[
        { title: 'Proposal Processing',       desc: 'Intake, scanning, indexing, and routing of insurance proposal forms with complete validation and QC checks.' },
        { title: 'Policy Issuance Support',   desc: 'Document preparation, printing coordination, and policy document archiving for efficient policy fulfilment operations.' },
        { title: 'Claims Document Mgmt',      desc: 'Organised, fast-retrieval claims folder management across physical and digital formats. Claims resolved faster with less effort.' },
        { title: 'Digital Policy Archives',   desc: 'Full digital archive of all active and lapsed policies with instant retrieval via auraDOCS. Zero physical search time.' },
        { title: 'Compliance Documentation',  desc: 'Maintain regulatory-compliant audit trails for IRCSL and all other relevant regulatory requirements with zero gaps.' },
        { title: 'Renewal Management',        desc: 'Document workflow support for the complete policy renewal cycle — from renewal notice to updated policy document archiving.' },
      ]}
      steps={[
        { step: '01', title: 'Proposal Intake',   desc: 'Physical proposal forms received, scanned, indexed with customer and policy data, and routed to underwriting teams digitally.' },
        { step: '02', title: 'Policy Issuance',   desc: 'Policy documents prepared, checked for accuracy, printed/generated digitally, and archived in the client\'s auraDOCS instance.' },
        { step: '03', title: 'Ongoing Management', desc: 'Policy amendments, endorsements, renewals, and correspondence managed and archived throughout the policy lifecycle.' },
        { step: '04', title: 'Claims Processing', desc: 'Claims documents received, sorted, scanned, and organised into digital claims folders for assessors — accelerating claims settlement.' },
      ]}
      industries={['Life Insurance', 'General Insurance', 'Reinsurance', 'Insurance Brokers', 'Micro-Insurance', 'Health Insurance']}
    />
  );
}
