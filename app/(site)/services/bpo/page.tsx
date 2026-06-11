import type { Metadata } from 'next';
import { Users } from 'lucide-react';
import ServicePage from '@/components/shared/ServicePage';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Business Process Outsourcing (BPO)',
  description: 'DOK Solutions Lanka provides reliable BPO services including data entry, data capture, form processing, and workflow management. Reduce operational costs and let your team focus on core business functions.',
  keywords: ['BPO Sri Lanka', 'business process outsourcing Sri Lanka', 'data entry services Sri Lanka', 'data capture outsourcing', 'back office outsourcing', 'document workflow management', 'form processing services'],
  openGraph: {
    title: 'Business Process Outsourcing (BPO) — DOK Solutions Lanka',
    description: 'Dedicated BPO teams handling data entry, form processing, mailroom management, and workflow automation. High accuracy, fast turnaround, and scalable operations for Sri Lankan enterprises.',
  },
};

export default function BPO() {
  return (
    <ServicePage
      icon={Users}
      label="Extend Your Team, Amplify Efficiency"
      title="Business Process Outsourcing"
      subtitle="Dedicated BPO teams that become an extension of your organisation — handling back-office operations with precision and reliability."
      heroImg="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1400&h=700&fit=crop&auto=format&q=80"
      color="#003B8E"
      intro="DOK Solutions provides reliable and efficient data entry and BPO services designed to support organisations in managing large volumes of business information with speed, accuracy, and confidentiality. By outsourcing operations to us, organisations reduce the administrative burden on their internal staff, allowing teams to focus on core business functions and strategic activities that directly contribute to growth and productivity."
      features={[
        { title: 'Data Entry Services',    desc: 'High-accuracy data entry from forms, documents, applications, and digital sources. Average accuracy rate of 99.8% guaranteed by SLA.' },
        { title: 'Form Processing',        desc: 'End-to-end processing of application forms, claims forms, regulatory documents, and compliance submissions.' },
        { title: 'Mailroom Management',    desc: 'Complete incoming and outgoing mail handling, sorting, scanning, and digital routing to the right department or person.' },
        { title: 'Document Workflow',      desc: 'Custom document workflows designed around your specific business processes, approval chains, and compliance requirements.' },
        { title: 'Verification Services',  desc: 'Identity verification, document authenticity checks, and data validation against your internal systems and external databases.' },
        { title: 'Reporting & Analytics',  desc: 'Regular SLA performance reporting, throughput analytics, and quality dashboards for full visibility over your outsourced operations.' },
      ]}
      steps={[
        { step: '01', title: 'Discovery',   desc: 'We study your current process in detail — volumes, document types, workflows, systems, and pain points.' },
        { step: '02', title: 'Design',      desc: 'Our team designs a customised BPO model including staffing levels, workflow design, SLA targets, and technology requirements.' },
        { step: '03', title: 'Deploy',      desc: 'Trained DOK team deployed on-site or off-site. Integration with your systems completed. Parallel run to validate accuracy.' },
        { step: '04', title: 'Optimise',    desc: 'Continuous SLA monitoring, performance reviews, and process improvements based on data analytics and your feedback.' },
      ]}
      industries={['Banking & Finance', 'Insurance', 'Telecommunications', 'Healthcare', 'Government', 'Retail', 'Manufacturing', 'Logistics']}
    />
  );
}
