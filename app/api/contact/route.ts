export const dynamic = 'force-dynamic';
import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';
import { rateLimit } from '@/lib/rate-limit';

// Escape HTML special chars to prevent email HTML injection
function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

// Validate email format
function isValidEmail(e: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}

export async function POST(req: NextRequest) {
  // 5 submissions per IP per 10 minutes
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (!rateLimit(`contact:${ip}`, 5, 10 * 60 * 1000)) {
    return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
  }

  const body = await req.json();
  const name    = String(body.name    ?? '').trim().slice(0, 200);
  const email   = String(body.email   ?? '').trim().slice(0, 200);
  const phone   = String(body.phone   ?? '').trim().slice(0, 50);
  const company = String(body.company ?? '').trim().slice(0, 200);
  const service = String(body.service ?? '').trim().slice(0, 100);
  const message = String(body.message ?? '').trim().slice(0, 5000);

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
  }

  const row = (label: string, value: string) =>
    `<tr><td style="padding:8px 0;font-size:13px;color:#64748B;width:130px">${label}</td><td style="padding:8px 0;font-size:14px;font-weight:600">${esc(value)}</td></tr>`;

  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: 'DOK Website <noreply@doksolutions.net>',
    to: 'enquiries@doksolutions.net',
    replyTo: email,
    subject: `Website Enquiry – ${esc(service || 'General')} from ${esc(name)}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1A1A2E">
        <div style="background:#003B8E;padding:24px 32px;border-radius:12px 12px 0 0">
          <h2 style="color:#fff;margin:0;font-size:20px">New Website Enquiry</h2>
        </div>
        <div style="background:#F8FAFF;padding:32px;border:1px solid #E8EDF5;border-top:none;border-radius:0 0 12px 12px">
          <table style="width:100%;border-collapse:collapse">
            ${row('Name', name)}
            <tr><td style="padding:8px 0;font-size:13px;color:#64748B">Email</td><td style="padding:8px 0;font-size:14px;font-weight:600"><a href="mailto:${esc(email)}" style="color:#003B8E">${esc(email)}</a></td></tr>
            ${phone   ? row('Phone',   phone)   : ''}
            ${company ? row('Company', company) : ''}
            ${service ? row('Service', service) : ''}
          </table>
          <hr style="border:none;border-top:1px solid #E8EDF5;margin:20px 0" />
          <p style="font-size:13px;color:#64748B;margin:0 0 8px">Message</p>
          <p style="font-size:14px;white-space:pre-wrap;margin:0">${esc(message)}</p>
        </div>
      </div>
    `,
  });

  if (error) return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  return NextResponse.json({ success: true });
}
