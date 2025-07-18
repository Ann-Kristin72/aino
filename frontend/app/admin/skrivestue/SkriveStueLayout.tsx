"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import WriterTab from "./WriterTab";
import ContentTab from "./ContentTab";
import MediaTab from "./MediaTab";
import AIToolsTab from "./AIToolsTab";
import LanguageSelector from "../../../components/LanguageSelector";

type TabType = "writer" | "existing" | "media" | "ai";

export default function SkriveStueLayout() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>("writer");
  const [language, setLanguage] = useState<"nb" | "en">("nb");

  const tabs = [
    { id: "writer" as TabType, label: "✍️ Lag nytt innhold", component: WriterTab },
    { id: "existing" as TabType, label: "📚 Eksisterende", component: ContentTab },
    { id: "media" as TabType, label: "🧩 Media", component: MediaTab },
    { id: "ai" as TabType, label: "🤖 AI-verktøy", component: AIToolsTab },
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || WriterTab;

  return (
    <>
      {/* Gradient background always covering the viewport */}
      <div className="fixed inset-0 w-full h-full z-[-1] bg-gradient-to-br from-[#76BBB9] via-[#AEE6E6] to-[#F6FBFA]" />
      <div className="min-h-screen w-full relative">
        {/* Header */}
        <header className="w-full bg-[#76BBB9] text-white px-6 py-4 mx-4 mt-4 rounded-xl shadow-lg">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              {/* SkriveStuen-ikonet (samme som i Min Aino) */}
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="6" y="10" width="24" height="4" rx="2" fill="white"/>
                <rect x="6" y="18" width="18" height="4" rx="2" fill="white"/>
                <rect x="6" y="26" width="12" height="4" rx="2" fill="white"/>
              </svg>
              <div>
                <h1 className="text-3xl font-bold font-atkinson">SkriveStuen</h1>
                <p className="text-white text-base font-inter mt-1">Innholdsredigering og forfatterskap</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/min-aino')}
                className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all duration-200 font-medium"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 12H5M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Tilbake til Min Aino
              </button>
              <LanguageSelector 
                currentLanguage={language} 
                onLanguageChange={setLanguage} 
              />
            </div>
          </div>
        </header>

        {/* Tab Navigation */}
        <nav className="w-full bg-transparent px-6">
          <div className="flex space-x-1 py-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  px-6 py-3 rounded-xl font-medium transition-all duration-200
                  ${activeTab === tab.id
                    ? "bg-gradient-to-r from-teal-600 to-teal-700 text-white shadow-lg"
                    : "bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white shadow-md hover:shadow-lg"
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </nav>

        {/* Content Area */}
        <main className="w-full px-8 py-6">
          <ActiveComponent />
        </main>
      </div>
    </>
  );
} 