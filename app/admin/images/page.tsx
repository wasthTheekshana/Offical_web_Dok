'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

type SiteImage = { key: string; label: string; url: string; updated_at: string };

export default function AdminImagesPage() {
  const [images, setImages] = useState<SiteImage[]>([]);
  const [uploading, setUploading] = useState<string | null>(null);

  async function load() {
    const res = await fetch('/api/admin/images');
    setImages(await res.json());
  }

  useEffect(() => { load(); }, []);

  async function handleReplace(imageKey: string, file: File) {
    setUploading(imageKey);
    const ext = file.name.split('.').pop();
    const path = `${imageKey}-${Date.now()}.${ext}`;
    const res = await fetch('/api/admin/upload-url', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bucket: 'site-images', path }),
    });
    const { signedUrl } = await res.json();
    await fetch(signedUrl, { method: 'PUT', body: file, headers: { 'Content-Type': file.type } });
    const supabase = createClient();
    const { data } = supabase.storage.from('site-images').getPublicUrl(path);
    await fetch(`/api/admin/images/${imageKey}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: data.publicUrl }),
    });
    setUploading(null);
    load();
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Site Images</h1>
        <p className="text-gray-400 text-sm mt-1">Replace images shown on the public website. Changes appear immediately — no redeployment needed.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map(img => (
          <div key={img.key} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="relative h-40 bg-gray-100">
              {img.url ? (
                <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300 text-sm">No image</div>
              )}
              {uploading === img.key && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-white text-sm">Uploading…</span>
                </div>
              )}
            </div>
            <div className="p-4">
              <p className="font-medium text-gray-900 text-sm">{img.label}</p>
              <p className="text-gray-400 text-xs mt-0.5 font-mono">{img.key}</p>
              <label className="mt-3 block">
                <span className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#003B8E] border border-gray-200 hover:border-[#003B8E]/30 px-3 py-1.5 rounded-lg transition-colors cursor-pointer">
                  Replace Image
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  disabled={uploading !== null}
                  onChange={e => {
                    const file = e.target.files?.[0];
                    if (file) handleReplace(img.key, file);
                  }}
                />
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
