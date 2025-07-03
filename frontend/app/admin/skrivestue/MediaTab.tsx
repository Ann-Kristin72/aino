"use client";

import React, { useState, useEffect } from "react";

interface MediaItem {
  id: string;
  name: string;
  type: string;
  url: string;
  uploadedAt: string;
}

export default function MediaTab() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    // Simuler henting av media
    setMediaItems([
      { id: '1', name: 'bilde1.jpg', type: 'image', url: '/placeholder.jpg', uploadedAt: '2024-01-15' },
      { id: '2', name: 'dokument.pdf', type: 'document', url: '/placeholder.pdf', uploadedAt: '2024-01-14' },
    ]);
  }, []);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setUploading(true);
      // Simuler opplasting
      setTimeout(() => {
        setUploading(false);
        alert('Fil opplastet!');
      }, 2000);
    }
  };

  return (
    <div className="p-6 space-y-8">
      {/* Upload Section */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
        <h2 className="text-2xl font-bold text-blue-800 mb-6">📁 Last opp media</h2>
        
        <div className="space-y-4">
          <input
            type="file"
            multiple
            onChange={handleFileUpload}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          />
          
          <button 
            disabled={uploading}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50"
          >
            {uploading ? '🔄 Laster opp...' : '📤 Last opp filer'}
          </button>
        </div>
      </section>

      {/* Media Library */}
      <section>
        <h3 className="text-2xl font-bold text-gray-800 mb-6">📚 Mediebibliotek</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mediaItems.map((m) => (
            <div key={m.id} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  {m.type === 'image' ? '🖼️' : '📄'}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">{m.name}</h4>
                  <p className="text-sm text-gray-500">{m.uploadedAt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
} 