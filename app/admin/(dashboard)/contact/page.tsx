'use client';

import { useEffect, useState } from 'react';

type ContactData = { phone: string; email: string; address: string };
const empty: ContactData = { phone: '', email: '', address: '' };

export default function AdminContactPage() {
  const [data, setData] = useState<ContactData>(empty);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch('/api/admin/contact').then(r => r.json()).then(setData);
  }, []);

  async function handleSave() {
    setSaving(true);
    await fetch('/api/admin/contact', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Contact Details</h1>
        <p className="text-gray-400 text-sm mt-1">These appear in the footer and contact page.</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 max-w-lg">
        <div className="flex flex-col gap-5">
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Phone</label>
            <input value={data.phone} onChange={e => setData(d => ({ ...d, phone: e.target.value }))}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#003B8E]/20 focus:border-[#003B8E]"
              placeholder="+94 11 259 7171" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Email</label>
            <input type="email" value={data.email} onChange={e => setData(d => ({ ...d, email: e.target.value }))}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#003B8E]/20 focus:border-[#003B8E]"
              placeholder="info@dok.lk" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Address</label>
            <textarea value={data.address} onChange={e => setData(d => ({ ...d, address: e.target.value }))} rows={3}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#003B8E]/20 focus:border-[#003B8E] resize-none"
              placeholder="No. 10, Kirula Road, Colombo 05, Sri Lanka" />
          </div>
        </div>

        {saved && (
          <p className="mt-4 text-sm text-green-600 bg-green-50 border border-green-100 rounded-lg px-3 py-2">Changes saved successfully.</p>
        )}

        <button onClick={handleSave} disabled={saving}
          className="mt-6 w-full bg-[#003B8E] text-white rounded-xl py-3 text-sm font-semibold hover:bg-[#002d6e] transition-colors disabled:opacity-60">
          {saving ? 'Saving…' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}
