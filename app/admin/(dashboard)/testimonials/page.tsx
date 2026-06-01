'use client';

import { useEffect, useState } from 'react';
import { Pencil, Trash2, Plus, X, Upload } from 'lucide-react';

type Testimonial = { id: string; name: string; role: string; quote: string; photo_url: string };
const empty: Omit<Testimonial, 'id'> = { name: '', role: '', quote: '', photo_url: '' };

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [form, setForm] = useState<Omit<Testimonial, 'id'>>(empty);
  const [editId, setEditId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  async function load() {
    const res = await fetch('/api/admin/testimonials');
    setItems(await res.json());
  }
  useEffect(() => { load(); }, []);

  async function uploadPhoto(file: File): Promise<string> {
    const fd = new FormData();
    fd.append('file', file);
    const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
    const { url } = await res.json();
    return url;
  }

  async function handleSave() {
    setSaving(true);
    if (editId) {
      await fetch(`/api/admin/testimonials/${editId}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form),
      });
    } else {
      await fetch('/api/admin/testimonials', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form),
      });
    }
    setSaving(false);
    setShowForm(false);
    load();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Testimonials</h1>
          <p className="text-gray-400 text-sm mt-1">{items.length} testimonials</p>
        </div>
        <button onClick={() => { setForm(empty); setEditId(null); setShowForm(true); }}
          className="flex items-center gap-2 bg-[#003B8E] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#002d6e] transition-colors">
          <Plus size={15} /> Add Testimonial
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {items.map(t => (
          <div key={t.id} className="bg-white rounded-2xl border border-gray-100 p-4 flex gap-4 items-start">
            {t.photo_url ? (
              <img src={t.photo_url} alt={t.name} className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
            ) : (
              <div className="w-12 h-12 rounded-xl bg-gray-100 flex-shrink-0 flex items-center justify-center text-gray-400 font-serif text-lg">{t.name[0]}</div>
            )}
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 text-sm">{t.name} <span className="text-gray-400 font-normal">· {t.role}</span></p>
              <p className="text-gray-500 text-xs mt-1 line-clamp-2">"{t.quote}"</p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button onClick={() => { setForm({ name: t.name, role: t.role, quote: t.quote, photo_url: t.photo_url }); setEditId(t.id); setShowForm(true); }}
                className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#003B8E] border border-gray-200 hover:border-[#003B8E]/30 px-3 py-1.5 rounded-lg transition-colors">
                <Pencil size={12} /> Edit
              </button>
              <button onClick={() => setDeleteId(t.id)}
                className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-red-600 border border-gray-200 hover:border-red-200 px-3 py-1.5 rounded-lg transition-colors">
                <Trash2 size={12} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Delete confirm */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
            <h3 className="font-semibold text-gray-900 mb-2">Delete testimonial?</h3>
            <p className="text-gray-400 text-sm mb-6">This cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 border border-gray-200 text-gray-600 py-2 rounded-xl text-sm">Cancel</button>
              <button onClick={async () => { await fetch(`/api/admin/testimonials/${deleteId}`, { method: 'DELETE' }); setDeleteId(null); load(); }}
                className="flex-1 bg-red-600 text-white py-2 rounded-xl text-sm font-medium hover:bg-red-700">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Form modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-semibold text-gray-900">{editId ? 'Edit Testimonial' : 'Add Testimonial'}</h3>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600"><X size={18} /></button>
            </div>
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Name</label>
                  <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#003B8E]/20 focus:border-[#003B8E]" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Role / Company</label>
                  <input value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#003B8E]/20 focus:border-[#003B8E]" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Quote</label>
                <textarea value={form.quote} onChange={e => setForm(f => ({ ...f, quote: e.target.value }))} rows={3}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#003B8E]/20 focus:border-[#003B8E] resize-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Photo</label>
                {form.photo_url && <img src={form.photo_url} alt="" className="w-16 h-16 rounded-xl object-cover mb-2" />}
                <label className={`flex items-center gap-2 w-fit border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-500 hover:text-[#003B8E] hover:border-[#003B8E]/30 transition-colors ${uploading ? 'opacity-50 pointer-events-none' : 'cursor-pointer'}`}>
                  <Upload size={14} />
                  {uploading ? 'Uploading…' : 'Upload photo'}
                  <input type="file" accept="image/*" className="hidden" disabled={uploading}
                    onChange={async e => { const f = e.target.files?.[0]; if (!f) return; setUploading(true); const url = await uploadPhoto(f); setForm(v => ({ ...v, photo_url: url })); setUploading(false); }} />
                </label>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowForm(false)} className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-xl text-sm">Cancel</button>
              <button onClick={handleSave} disabled={saving || uploading}
                className="flex-1 bg-[#003B8E] text-white py-2.5 rounded-xl text-sm font-semibold disabled:opacity-60 hover:bg-[#002d6e] transition-colors">
                {saving ? 'Saving…' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
