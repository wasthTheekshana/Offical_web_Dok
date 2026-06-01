'use client';

import { useEffect, useState } from 'react';
import { Pencil, Plus, X, Trash2, Upload } from 'lucide-react';

type Stat = { val: string; label: string };
type Service = { id: string; slug: string; title: string; description: string; hero_image_url: string; features: string[]; stats: Stat[]; published: boolean };
const emptyService: Omit<Service, 'id'> = { slug: '', title: '', description: '', hero_image_url: '', features: [], stats: [], published: true };

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [form, setForm] = useState<Omit<Service, 'id'>>(emptyService);
  const [editId, setEditId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [newFeature, setNewFeature] = useState('');
  const [newStat, setNewStat] = useState<Stat>({ val: '', label: '' });

  async function uploadImage(file: File): Promise<string> {
    const fd = new FormData();
    fd.append('file', file);
    const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
    const { url } = await res.json();
    return url;
  }

  async function handleImageFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const url = await uploadImage(file);
    setForm(f => ({ ...f, hero_image_url: url }));
    setUploading(false);
  }

  async function load() {
    const res = await fetch('/api/admin/services');
    setServices(await res.json());
  }

  useEffect(() => { load(); }, []);

  function openAdd() { setForm(emptyService); setEditId(null); setShowForm(true); }

  function openEdit(s: Service) {
    setForm({ slug: s.slug, title: s.title, description: s.description, hero_image_url: s.hero_image_url, features: s.features, stats: s.stats, published: s.published });
    setEditId(s.id);
    setShowForm(true);
  }

  async function handleSave() {
    setSaving(true);
    if (editId) {
      await fetch(`/api/admin/services/${editId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    } else {
      await fetch('/api/admin/services', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    }
    setSaving(false);
    setShowForm(false);
    load();
  }

  function addFeature() {
    if (!newFeature.trim()) return;
    setForm(f => ({ ...f, features: [...f.features, newFeature.trim()] }));
    setNewFeature('');
  }

  function removeFeature(i: number) {
    setForm(f => ({ ...f, features: f.features.filter((_, idx) => idx !== i) }));
  }

  function addStat() {
    if (!newStat.val.trim() || !newStat.label.trim()) return;
    setForm(f => ({ ...f, stats: [...f.stats, newStat] }));
    setNewStat({ val: '', label: '' });
  }

  function removeStat(i: number) {
    setForm(f => ({ ...f, stats: f.stats.filter((_, idx) => idx !== i) }));
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Services</h1>
          <p className="text-gray-400 text-sm mt-1">{services.length} services</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 bg-[#003B8E] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#002d6e] transition-colors">
          <Plus size={15} /> Add Service
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {services.map((s, i) => (
          <div key={s.id} className={`flex items-center gap-4 p-4 ${i !== 0 ? 'border-t border-gray-100' : ''}`}>
            {s.hero_image_url && (
              <img src={s.hero_image_url} alt={s.title} className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />
            )}
            {!s.hero_image_url && (
              <div className="w-14 h-14 rounded-xl bg-gray-100 flex-shrink-0" />
            )}
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 text-sm">{s.title}</p>
              <p className="text-gray-400 text-xs truncate mt-0.5">{s.description}</p>
            </div>
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${s.published ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
              {s.published ? 'Published' : 'Hidden'}
            </span>
            <button onClick={() => openEdit(s)} className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#003B8E] border border-gray-200 hover:border-[#003B8E]/30 px-3 py-1.5 rounded-lg transition-colors">
              <Pencil size={12} /> Edit
            </button>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-semibold text-gray-900">{editId ? 'Edit Service' : 'Add Service'}</h3>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600"><X size={18} /></button>
            </div>

            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Title</label>
                  <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#003B8E]/20 focus:border-[#003B8E]" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Slug (URL)</label>
                  <input value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#003B8E]/20 focus:border-[#003B8E]"
                    placeholder="e.g. physical-archiving" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Description</label>
                <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#003B8E]/20 focus:border-[#003B8E] resize-none" />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Hero Image</label>
                {form.hero_image_url && (
                  <img src={form.hero_image_url} alt="" className="w-full h-36 object-cover rounded-xl mb-2" />
                )}
                <label className={`flex items-center gap-2 w-fit border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-500 hover:text-[#003B8E] hover:border-[#003B8E]/30 transition-colors mb-2 ${uploading ? 'opacity-50 pointer-events-none' : 'cursor-pointer'}`}>
                  <Upload size={14} />
                  {uploading ? 'Uploading…' : 'Upload image'}
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageFile} disabled={uploading} />
                </label>
                <input value={form.hero_image_url} onChange={e => setForm(f => ({ ...f, hero_image_url: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#003B8E]/20 focus:border-[#003B8E]"
                  placeholder="or paste a URL: /images/warehouse-main.jpg or https://…" />
              </div>

              {/* Features */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Features</label>
                <div className="flex flex-col gap-1.5 mb-2">
                  {form.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-1.5 text-sm">
                      <span className="flex-1">{f}</span>
                      <button onClick={() => removeFeature(i)} className="text-gray-400 hover:text-red-500"><Trash2 size={12} /></button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input value={newFeature} onChange={e => setNewFeature(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && addFeature()}
                    placeholder="Add a feature…"
                    className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003B8E]/20 focus:border-[#003B8E]" />
                  <button onClick={addFeature} className="bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-xl text-sm transition-colors">Add</button>
                </div>
              </div>

              {/* Stats */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Stats</label>
                <div className="flex flex-col gap-1.5 mb-2">
                  {form.stats.map((s, i) => (
                    <div key={i} className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-1.5 text-sm">
                      <span className="font-semibold text-[#003B8E]">{s.val}</span>
                      <span className="flex-1 text-gray-500">{s.label}</span>
                      <button onClick={() => removeStat(i)} className="text-gray-400 hover:text-red-500"><Trash2 size={12} /></button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input value={newStat.val} onChange={e => setNewStat(s => ({ ...s, val: e.target.value }))}
                    placeholder="Value (e.g. 200+)"
                    className="w-28 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003B8E]/20 focus:border-[#003B8E]" />
                  <input value={newStat.label} onChange={e => setNewStat(s => ({ ...s, label: e.target.value }))}
                    onKeyDown={e => e.key === 'Enter' && addStat()}
                    placeholder="Label (e.g. Corporate Clients)"
                    className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003B8E]/20 focus:border-[#003B8E]" />
                  <button onClick={addStat} className="bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-xl text-sm transition-colors">Add</button>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <input type="checkbox" id="published" checked={form.published} onChange={e => setForm(f => ({ ...f, published: e.target.checked }))} className="w-4 h-4 accent-[#003B8E]" />
                <label htmlFor="published" className="text-sm text-gray-700">Published (visible on site)</label>
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
