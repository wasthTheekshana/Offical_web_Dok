'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

type Client = { id: string; name: string; display_order: number };

export default function AdminClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [newName, setNewName] = useState('');
  const [adding, setAdding] = useState(false);

  async function load() {
    const res = await fetch('/api/admin/clients');
    setClients(await res.json());
  }

  useEffect(() => { load(); }, []);

  async function handleAdd() {
    if (!newName.trim()) return;
    setAdding(true);
    await fetch('/api/admin/clients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newName.trim() }),
    });
    setNewName('');
    setAdding(false);
    load();
  }

  async function handleRemove(id: string) {
    await fetch(`/api/admin/clients/${id}`, { method: 'DELETE' });
    load();
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Client Names</h1>
        <p className="text-gray-400 text-sm mt-1">These appear in the scrolling marquee on the home page. {clients.length} clients.</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-4">
        <div className="flex flex-wrap gap-2">
          {clients.map(c => (
            <span key={c.id} className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-full px-3 py-1.5 text-sm text-gray-700">
              {c.name}
              <button onClick={() => handleRemove(c.id)} className="text-gray-400 hover:text-red-500 transition-colors ml-1">
                <X size={12} />
              </button>
            </span>
          ))}
          {clients.length === 0 && <p className="text-gray-400 text-sm">No clients yet.</p>}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-4">
        <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">Add Client</label>
        <div className="flex gap-2">
          <input
            value={newName}
            onChange={e => setNewName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAdd()}
            placeholder="Company name…"
            className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#003B8E]/20 focus:border-[#003B8E]"
          />
          <button
            onClick={handleAdd}
            disabled={adding || !newName.trim()}
            className="bg-[#003B8E] text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-[#002d6e] transition-colors disabled:opacity-60"
          >
            {adding ? 'Adding…' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
}
