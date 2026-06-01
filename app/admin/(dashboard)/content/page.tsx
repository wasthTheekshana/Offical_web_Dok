'use client';

import { useEffect, useState } from 'react';
import { Save } from 'lucide-react';

const FIELDS: { key: string; label: string; multiline?: boolean }[] = [
  { key: 'whatwedo_title',     label: 'What We Do — Title' },
  { key: 'whatwedo_subtitle',  label: 'What We Do — Subtitle' },
  { key: 'whatwedo_body',      label: 'What We Do — Body Text', multiline: true },
  { key: 'testimonials_label', label: 'Testimonials — Label' },
  { key: 'testimonials_title', label: 'Testimonials — Title' },
  { key: 'news_label',         label: 'Notes From Studio — Label' },
  { key: 'news_title',         label: 'Notes From Studio — Title' },
];

export default function AdminContentPage() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch('/api/admin/content').then(r => r.json()).then(setValues);
  }, []);

  async function handleSave() {
    setSaving(true);
    await fetch('/api/admin/content', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Homepage Content</h1>
          <p className="text-gray-400 text-sm mt-1">Edit section titles and text across the homepage.</p>
        </div>
        <button onClick={handleSave} disabled={saving}
          className="flex items-center gap-2 bg-[#003B8E] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#002d6e] transition-colors disabled:opacity-60">
          <Save size={15} /> {saving ? 'Saving…' : saved ? 'Saved ✓' : 'Save Changes'}
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col gap-5">
        {FIELDS.map(({ key, label, multiline }) => (
          <div key={key}>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">{label}</label>
            {multiline ? (
              <textarea value={values[key] ?? ''} rows={3}
                onChange={e => setValues(v => ({ ...v, [key]: e.target.value }))}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#003B8E]/20 focus:border-[#003B8E] resize-none" />
            ) : (
              <input value={values[key] ?? ''}
                onChange={e => setValues(v => ({ ...v, [key]: e.target.value }))}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#003B8E]/20 focus:border-[#003B8E]" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
