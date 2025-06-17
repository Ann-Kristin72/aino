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
    <div>
      <h2 className="text-xl font-semibold mb-2">Last opp media</h2>
      <input placeholder="Filnavn" value={filename} onChange={e => setFilename(e.target.value)}
        className="border p-2 rounded mb-2 w-full" />
      <button onClick={upload} className="bg-blue-600 text-white px-4 py-2 rounded">Last opp</button>

      <h3 className="text-lg font-bold mt-6">Alle media</h3>
      <ul>
        {mediaList.map((m: any) => (
          <li key={m.id} className="border p-2 my-2 rounded">
            {m.filename} — {m.url}
          </li>
        ))}
      </ul>
    </div>
  );
} 