export type QAEntry = {
  id: string;
  category: 'Services' | 'Navigation' | 'Company' | 'Contact' | 'Careers' | 'auraDOCS';
  buttonLabel?: string;
  keywords: string[];
  question: string;
  answer: string;
  link?: { label: string; href: string };
};

export const qaEntries: QAEntry[] = [
  // ── Services ──────────────────────────────────────────────────────────────
  {
    id: 'physical-archiving',
    category: 'Services',
    buttonLabel: '📦 Physical Archiving',
    keywords: ['archiv', 'physical', 'storage', 'warehouse', 'store', 'document', 'box', 'record'],
    question: 'What is Physical Archiving?',
    answer:
      'DOK stores your physical documents in secure, climate-controlled warehouses with barcoded retrieval and full chain-of-custody tracking. We serve banks, insurers, and government bodies across Sri Lanka.',
    link: { label: 'Learn more →', href: '/services/physical-archiving' },
  },
  {
    id: 'digitizing',
    category: 'Services',
    buttonLabel: '📄 Document Digitizing',
    keywords: ['digit', 'scan', 'ocr', 'electronic', 'convert', 'image', 'pdf'],
    question: 'What is Document Digitizing?',
    answer:
      'We scan and digitize physical documents into searchable electronic formats using high-speed scanners and OCR technology. Ideal for reducing physical storage and enabling instant retrieval.',
    link: { label: 'Learn more →', href: '/services/document-digitizing' },
  },
  {
    id: 'data-entry',
    category: 'Services',
    buttonLabel: '🗂️ Data Entry',
    keywords: ['data entry', 'data captur', 'keyin', 'typing', 'input', 'form', 'accurac', 'outsourc'],
    question: 'What are Data Entry Services?',
    answer:
      'DOK provides reliable and efficient data entry services — high accuracy, fast turnaround, and strict confidentiality. Backed by trained personnel and quality control procedures, we free your team from administrative burden so they can focus on core business functions.',
    link: { label: 'Learn more →', href: '/services/data-entry' },
  },
  {
    id: 'insurance',
    category: 'Services',
    keywords: ['insur', 'policy', 'claim', 'life', 'motor', 'health'],
    question: 'What is Insurance Policy Management?',
    answer:
      'DOK manages the full lifecycle of insurance policy documents — scanning, indexing, retrieval, and secure storage — for life, motor, and health insurance companies across Sri Lanka.',
    link: { label: 'Learn more →', href: '/services/insurance' },
  },

  // ── auraDOCS ───────────────────────────────────────────────────────────────
  {
    id: 'auradocs',
    category: 'auraDOCS',
    buttonLabel: '🖥 auraDOCS',
    keywords: ['aura', 'auradoc', 'dms', 'cloud', 'software', 'system', 'platform', 'digital manage'],
    question: 'What is auraDOCS?',
    answer:
      'auraDOCS is DOK\'s proprietary cloud-based Document Management System. It lets you store, search, retrieve, and manage documents digitally with role-based access controls and audit trails.',
    link: { label: 'Explore auraDOCS →', href: '/services/auradocs' },
  },
  {
    id: 'auradocs-access',
    category: 'auraDOCS',
    keywords: ['access', 'login', 'user', 'role', 'permission', 'who can'],
    question: 'Who can access auraDOCS?',
    answer:
      'auraDOCS supports role-based access — administrators, managers, and standard users each have defined permissions. Your IT team sets up user accounts and DOK provides onboarding support.',
    link: { label: 'Explore auraDOCS →', href: '/services/auradocs' },
  },
  {
    id: 'auradocs-retrieval',
    category: 'auraDOCS',
    keywords: ['retriev', 'search', 'find', 'fetch', 'look up', 'locate'],
    question: 'How does document retrieval work in auraDOCS?',
    answer:
      'Documents are indexed with metadata tags. You can search by document type, date, reference number, or custom fields and retrieve any file within seconds — no manual searching required.',
    link: { label: 'Explore auraDOCS →', href: '/services/auradocs' },
  },

  // ── Company ────────────────────────────────────────────────────────────────
  {
    id: 'about-dok',
    category: 'Company',
    buttonLabel: '🏢 About DOK',
    keywords: ['about', 'who', 'company', 'dok', 'history', 'established', 'founded', 'group'],
    question: 'Who is DOK Solutions Lanka?',
    answer:
      'DOK Solutions Lanka (Pvt) Ltd is Sri Lanka\'s leading document management and BPO company, established in 2010. We are a member of the ABANS Group of Companies and operate three secure warehouse facilities.',
    link: { label: 'Learn about us →', href: '/about' },
  },
  {
    id: 'certifications',
    category: 'Company',
    keywords: ['iso', 'certif', 'standard', 'quality', 'security', '9001', '27001', '45001', 'award'],
    question: 'What certifications does DOK hold?',
    answer:
      'DOK Solutions Lanka is certified ISO 9001 (Quality Management), ISO 27001 (Information Security), and ISO 45001 (Occupational Health & Safety). We have also received the Great Place to Work Award in 2022, 2023, and 2024.',
  },
  {
    id: 'abans-group',
    category: 'Company',
    keywords: ['abans', 'group', 'parent', 'conglomer', 'belong', 'part of'],
    question: 'Is DOK part of the Abans Group?',
    answer:
      'Yes. DOK Solutions Lanka is a member of the ABANS Group of Companies — one of Sri Lanka\'s largest and most respected conglomerates with interests across retail, engineering, and services.',
    link: { label: 'About us →', href: '/about' },
  },

  // ── Contact ────────────────────────────────────────────────────────────────
  {
    id: 'contact',
    category: 'Contact',
    buttonLabel: '📞 Contact',
    keywords: ['contact', 'reach', 'phone', 'call', 'email', 'enquir', 'touch', 'speak', 'talk'],
    question: 'How do I contact DOK?',
    answer:
      'You can reach us at +94 117 717 777 or enquiries@doksolutions.net. Our office is at 141 Kirula Road, Colombo 05. We\'re open Mon–Fri 8:30 AM – 5:30 PM.',
    link: { label: 'Go to Contact →', href: '/contact' },
  },
  {
    id: 'quote',
    category: 'Contact',
    keywords: ['quot', 'price', 'cost', 'rate', 'fee', 'how much', 'pricing', 'proposal'],
    question: 'How do I get a quote?',
    answer:
      'Fill in our contact form with your requirements and one of our consultants will get back to you within 24 hours with a tailored proposal.',
    link: { label: 'Request a quote →', href: '/contact' },
  },

  // ── Careers ────────────────────────────────────────────────────────────────
  {
    id: 'careers',
    category: 'Careers',
    keywords: ['career', 'job', 'hire', 'hiring', 'work', 'join', 'vacanci', 'opportunit', 'employ', 'position'],
    question: 'Are there job openings at DOK?',
    answer:
      'DOK Solutions Lanka is always looking for talented people to join our team. Check our Careers page for current openings.',
    link: { label: 'View Careers →', href: '/careers' },
  },

  // ── Navigation ─────────────────────────────────────────────────────────────
  {
    id: 'nav-services',
    category: 'Navigation',
    keywords: ['service', 'what do you offer', 'offering', 'product'],
    question: 'Where can I see all services?',
    answer: 'Here\'s our full services page:',
    link: { label: 'Go to Services →', href: '/services' },
  },
  {
    id: 'nav-blog',
    category: 'Navigation',
    keywords: ['blog', 'article', 'news', 'post', 'update', 'insight'],
    question: 'Where is the blog?',
    answer: 'Our blog and news section is here:',
    link: { label: 'Go to Blog →', href: '/blog' },
  },
  {
    id: 'nav-about',
    category: 'Navigation',
    keywords: ['about page', 'team', 'leadership', 'people', 'staff', 'director', 'managing'],
    question: 'Where can I learn about the team?',
    answer: 'Meet our leadership team on the About page:',
    link: { label: 'Go to About →', href: '/about' },
  },
];

// Quick-topic entries (those with buttonLabel), in display order
export const quickTopics = qaEntries.filter((e) => e.buttonLabel);

// Keyword matching — returns best QAEntry or null (triggers fallback)
export function findBestMatch(userMessage: string): QAEntry | null {
  const msg = userMessage.toLowerCase();
  let bestScore = 0;
  let bestEntry: QAEntry | null = null;

  for (const entry of qaEntries) {
    const score = entry.keywords.filter((kw) => msg.includes(kw)).length;
    if (score > bestScore) {
      bestScore = score;
      bestEntry = entry;
    }
  }

  return bestScore >= 1 ? bestEntry : null;
}
