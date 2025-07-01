"use client";

import React, { useState, useEffect } from "react";

export default function MediaTab() {
  const [filename, setFilename] = useState("");
  const [mediaList, setMediaList] = useState([]);

  useEffect(() => {
    fetch("/api/media").then(res => res.json()).then(setMediaList);
  }, []);

  const upload = async () => {
    const form = new FormData();
    form.append("filename", filename);
    await fetch("/api/media", { method: "POST", body: form });
    setFilename("");
    const updated = await fetch("/api/media").then(res => res.json());
    setMediaList(updated);
  };

  return (
    <div className="p-6 space-y-8">
      {/* Upload Section */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
        <h2 className="text-2xl font-bold text-blue-800 mb-6">📤 Last opp media</h2>
        
        <div className="flex gap-4 items-end">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Filnavn</label>
            <input 
              placeholder="Skriv filnavn her..." 
              value={filename} 
              onChange={e => setFilename(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </div>
          <button 
            onClick={upload} 
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200"
          >
            📤 Last opp
          </button>
        </div>
      </section>

      {/* Media Library Section */}
      <section>
        <h3 className="text-2xl font-bold text-gray-800 mb-6">📚 Media-bibliotek</h3>
        
        {mediaList.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📁</div>
            <p className="text-gray-500 text-lg">Ingen media funnet</p>
            <p className="text-gray-400">Last opp din første fil for å komme i gang</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mediaList.map((m: any) => (
              <div key={m.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">📄</div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-800 truncate">{m.filename}</h4>
                    <p className="text-sm text-gray-500 truncate">{m.url}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
} 