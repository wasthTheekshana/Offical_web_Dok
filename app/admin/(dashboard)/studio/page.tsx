'use client';

import { useEffect, useState } from 'react';
import { Pencil, Trash2, Plus, X, Upload } from 'lucide-react';

type Note = { id: string; title: string; category: string; image_url: string };
const empty: Omit<Note, 'id'> = { title: '', category: 'Insight', image_url: '' };
const CATEGORIES = ['Culture', 'Technology', 'Insight', 'Design', 'News', 'Awards'];

export default function AdminStudioPage() {
  const [items, setItems] = useState<Note[]>([]);
  const [form, setForm] = useState<Omit<Note, 'id'>>(empty);
  const [editId, setEditId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  async function load() {
    const res = await fetch('/api/admin/studio');
    setItems(await res.json());
  }
  useEffect(() => { load(); }, []);

  async function uploadImage(file: File): Promise<string> {
    const fd = new FormData();
    fd.append('file', file);
    const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
    const { url } = await res.json();
    return url;
  }

  async function handleSave() {
    setSaving(true);
    if (editId) {
      await fetch(`/api/admin/studio/${editId}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form),
      });
    } else {
      await fetch('/api/admin/studio', {
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
          <h1 className="text-2xl font-semibold text-gray-900">Notes From The Studio</h1>
          <p className="text-gray-400 text-sm mt-1">{items.length} notes · first 4 shown on homepage</p>
        </div>
        <button onClick={() => { setForm(empty); setEditId(null); setShowForm(true); }}
          className="flex items-center gap-2 bg-[#003B8E] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#002d6e] transition-colors">
          <Plus size={15} /> Add Note
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((n, i) => (
          <div key={n.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="relative h-36 bg-gray-100">
              {n.image_url
                ? <img src={n.image_url} alt={n.title} className="w-full h-full object-cover" />
                : <div className="w-full h-full flex items-center justify-center text-gray-300 text-sm">No image</div>
              }
              {i < 4 && (
                <span className="absolute top-2 left-2 bg-[#003B8E] text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">Live</span>
              )}
            </div>
            <div className="p-3">
              <span className="text-[9px] font-bold tracking-widest uppercase text-gray-400">{n.category}</span>
              <p className="text-sm font-medium text-gray-900 mt-0.5 line-clamp-2">{n.title}</p>
              <div className="flex gap-2 mt-3">
                <button onClick={() => { setForm({ title: n.title, category: n.category, image_url: n.image_url }); setEditId(n.id); setShowForm(true); }}
                  className="flex items-center gap-1 text-xs text-gray-500 hover:text-[#003B8E] border border-gray-200 hover:border-[#003B8E]/30 px-2.5 py-1 rounded-lg transition-colors">
                  <Pencil size={11} /> Edit
                </button>
                <button onClick={() => setDeleteId(n.id)}
                  className="flex items-center gap-1 text-xs text-gray-500 hover:text-red-600 border border-gray-200 hover:border-red-200 px-2.5 py-1 rounded-lg transition-colors">
                  <Trash2 size={11} /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Delete confirm */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
            <h3 className="font-semibold text-gray-900 mb-2">Delete note?</h3>
            <p className="text-gray-400 text-sm mb-6">This cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 border border-gray-200 text-gray-600 py-2 rounded-xl text-sm">Cancel</button>
              <button onClick={async () => { await fetch(`/api/admin/studio/${deleteId}`, { method: 'DELETE' }); setDeleteId(null); load(); }}
                className="flex-1 bg-red-600 text-white py-2 rounded-xl text-sm font-medium hover:bg-red-700">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Form modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-semibold text-gray-900">{editId ? 'Edit Note' : 'Add Note'}</h3>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600"><X size={18} /></button>
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Title</label>
                <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#003B8E]/20 focus:border-[#003B8E]" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Category</label>
                <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#003B8E]/20 focus:border-[#003B8E]">
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Image</label>
                {form.image_url && <img src={form.image_url} alt="" className="w-full h-32 object-cover rounded-xl mb-2" />}
                <label className={`flex items-center gap-2 w-fit border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-500 hover:text-[#003B8E] hover:border-[#003B8E]/30 transition-colors ${uploading ? 'opacity-50 pointer-events-none' : 'cursor-pointer'}`}>
                  <Upload size={14} />
                  {uploading ? 'Uploading…' : 'Upload image'}
                  <input type="file" accept="image/*" className="hidden" disabled={uploading}
                    onChange={async e => { const f = e.target.files?.[0]; if (!f) return; setUploading(true); const url = await uploadImage(f); setForm(v => ({ ...v, image_url: url })); setUploading(false); }} />
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
