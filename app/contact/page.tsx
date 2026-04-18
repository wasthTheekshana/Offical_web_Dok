import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with DOK Solutions Lanka. Head Office: 141, Kirula Road, Colombo 05. Phone: +94 117 717 777.',
};

export default function ContactPage() {
  return <ContactClient />;
}
