'use client';

import { useEffect, useState } from 'react';
import { Pencil, Trash2, Plus, X } from 'lucide-react';

type Post = { id: string; slug: string; title: string; excerpt: string; body: string; cover_image_url: string; published: boolean; published_at: string | null; created_at: string };
const emptyPost: Omit<Post, 'id' | 'published_at' | 'created_at'> = { slug: '', title: '', excerpt: '', body: '', cover_image_url: '', published: false };

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [form, setForm] = useState<Omit<Post, 'id' | 'published_at' | 'created_at'>>(emptyPost);
  const [editId, setEditId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  async function load() {
    const res = await fetch('/api/admin/blog');
    setPosts(await res.json());
  }

  useEffect(() => { load(); }, []);

  function openAdd() { setForm(emptyPost); setEditId(null); setShowForm(true); }

  function openEdit(p: Post) {
    setForm({ slug: p.slug, title: p.title, excerpt: p.excerpt, body: p.body, cover_image_url: p.cover_image_url, published: p.published });
    setEditId(p.id);
    setShowForm(true);
  }

  async function handleSave() {
    setSaving(true);
    if (editId) {
      await fetch(`/api/admin/blog/${editId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    } else {
      await fetch('/api/admin/blog', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    }
    setSaving(false);
    setShowForm(false);
    load();
  }

  async function handleDelete(id: string) {
    await fetch(`/api/admin/blog/${id}`, { method: 'DELETE' });
    setDeleteId(null);
    load();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Blog / News</h1>
          <p className="text-gray-400 text-sm mt-1">{posts.length} posts</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 bg-[#003B8E] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#002d6e] transition-colors">
          <Plus size={15} /> New Post
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {posts.length === 0 && (
          <p className="text-gray-400 text-sm p-6">No posts yet. Click "New Post" to create your first article.</p>
        )}
        {posts.map((p, i) => (
          <div key={p.id} className={`flex items-center gap-4 p-4 ${i !== 0 ? 'border-t border-gray-100' : ''}`}>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 text-sm">{p.title}</p>
              <p className="text-gray-400 text-xs truncate mt-0.5">{p.excerpt}</p>
            </div>
            <span className={`text-xs px-2 py-1 rounded-full font-medium flex-shrink-0 ${p.published ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'}`}>
              {p.published ? 'Published' : 'Draft'}
            </span>
            <p className="text-xs text-gray-400 flex-shrink-0">{new Date(p.created_at).toLocaleDateString()}</p>
            <div className="flex gap-2 flex-shrink-0">
              <button onClick={() => openEdit(p)} className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#003B8E] border border-gray-200 hover:border-[#003B8E]/30 px-3 py-1.5 rounded-lg transition-colors">
                <Pencil size={12} /> Edit
              </button>
              <button onClick={() => setDeleteId(p.id)} className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-red-600 border border-gray-200 hover:border-red-200 px-3 py-1.5 rounded-lg transition-colors">
                <Trash2 size={12} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {deleteId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
            <h3 className="font-semibold text-gray-900 mb-2">Delete post?</h3>
            <p className="text-gray-400 text-sm mb-6">This cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 border border-gray-200 text-gray-600 py-2 rounded-xl text-sm">Cancel</button>
              <button onClick={() => handleDelete(deleteId)} className="flex-1 bg-red-600 text-white py-2 rounded-xl text-sm font-medium hover:bg-red-700">Delete</button>
            </div>
          </div>
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-semibold text-gray-900">{editId ? 'Edit Post' : 'New Post'}</h3>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600"><X size={18} /></button>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Title</label>
                <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#003B8E]/20 focus:border-[#003B8E]" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Excerpt (short summary)</label>
                <textarea value={form.excerpt} onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))} rows={2}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#003B8E]/20 focus:border-[#003B8E] resize-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Body (markdown)</label>
                <textarea value={form.body} onChange={e => setForm(f => ({ ...f, body: e.target.value }))} rows={10}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#003B8E]/20 focus:border-[#003B8E] resize-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Cover Image URL</label>
                <input value={form.cover_image_url} onChange={e => setForm(f => ({ ...f, cover_image_url: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#003B8E]/20 focus:border-[#003B8E]"
                  placeholder="https://…" />
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="pub" checked={form.published} onChange={e => setForm(f => ({ ...f, published: e.target.checked }))} className="w-4 h-4 accent-[#003B8E]" />
                <label htmlFor="pub" className="text-sm text-gray-700">Publish now (visible on /news)</label>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowForm(false)} className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-xl text-sm">Cancel</button>
              <button onClick={handleSave} disabled={saving}
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
