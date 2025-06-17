"use client";

import React, { useState } from "react";
import ContentTab from "./ContentTab";
import MediaTab from "./MediaTab";
import AIToolsTab from "./AIToolsTab";

export default function SkriveStue() {
  const [tab, setTab] = useState<"content" | "media" | "ai">("content");

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-4">✍️ SkriveStuen</h1>
      <div className="flex gap-4 mb-8">
        <button onClick={() => setTab("content")} className={tab === "content" ? "font-bold underline" : ""}>Innhold</button>
        <button onClick={() => setTab("media")} className={tab === "media" ? "font-bold underline" : ""}>Media</button>
        <button onClick={() => setTab("ai")} className={tab === "ai" ? "font-bold underline" : ""}>AI & Verktøy</button>
      </div>

      {tab === "content" && <ContentTab />}
      {tab === "media" && <MediaTab />}
      {tab === "ai" && <AIToolsTab />}
    </main>
  );
} 