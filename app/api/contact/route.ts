import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { name, email, phone, company, service, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const { error } = await resend.emails.send({
    from: 'DOK Website <noreply@doksolutions.net>',
    to: 'enquiries@doksolutions.net',
    replyTo: email,
    subject: `Website Enquiry – ${service || 'General'} from ${name}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1A1A2E">
        <div style="background:#003B8E;padding:24px 32px;border-radius:12px 12px 0 0">
          <h2 style="color:#fff;margin:0;font-size:20px">New Website Enquiry</h2>
        </div>
        <div style="background:#F8FAFF;padding:32px;border:1px solid #E8EDF5;border-top:none;border-radius:0 0 12px 12px">
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px 0;font-size:13px;color:#64748B;width:130px">Name</td><td style="padding:8px 0;font-size:14px;font-weight:600">${name}</td></tr>
            <tr><td style="padding:8px 0;font-size:13px;color:#64748B">Email</td><td style="padding:8px 0;font-size:14px;font-weight:600"><a href="mailto:${email}" style="color:#003B8E">${email}</a></td></tr>
            ${phone ? `<tr><td style="padding:8px 0;font-size:13px;color:#64748B">Phone</td><td style="padding:8px 0;font-size:14px;font-weight:600">${phone}</td></tr>` : ''}
            ${company ? `<tr><td style="padding:8px 0;font-size:13px;color:#64748B">Company</td><td style="padding:8px 0;font-size:14px;font-weight:600">${company}</td></tr>` : ''}
            ${service ? `<tr><td style="padding:8px 0;font-size:13px;color:#64748B">Service</td><td style="padding:8px 0;font-size:14px;font-weight:600">${service}</td></tr>` : ''}
          </table>
          <hr style="border:none;border-top:1px solid #E8EDF5;margin:20px 0" />
          <p style="font-size:13px;color:#64748B;margin:0 0 8px">Message</p>
          <p style="font-size:14px;white-space:pre-wrap;margin:0">${message}</p>
        </div>
      </div>
    `,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
