"use client";

import React, { useState } from "react";
import WriterTab from "./WriterTab";
import ContentTab from "./ContentTab";
import MediaTab from "./MediaTab";
import AIToolsTab from "./AIToolsTab";
import LanguageSelector from "@/components/LanguageSelector";

type TabType = "writer" | "existing" | "media" | "ai";

export default function SkriveStueLayout() {
  const [activeTab, setActiveTab] = useState<TabType>("writer");
  const [language, setLanguage] = useState<"nb" | "en">("nb");

  const tabs = [
    { id: "writer" as TabType, label: "✍️ Writer", component: WriterTab },
    { id: "existing" as TabType, label: "📚 Eksisterende", component: ContentTab },
    { id: "media" as TabType, label: "🧩 Media", component: MediaTab },
    { id: "ai" as TabType, label: "🤖 AI-verktøy", component: AIToolsTab },
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || WriterTab;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-teal-600 to-teal-700 text-white shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">✍️ SkriveStuen</h1>
              <p className="text-teal-100 mt-2">Innholdsstyring og redigering</p>
            </div>
            <LanguageSelector 
              currentLanguage={language} 
              onLanguageChange={setLanguage} 
            />
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6">
          <div className="flex space-x-1 py-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  px-6 py-3 rounded-lg font-medium transition-all duration-200
                  ${activeTab === tab.id
                    ? "bg-teal-600 text-white shadow-md"
                    : "text-gray-600 hover:text-teal-600 hover:bg-teal-50"
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Content Area */}
      <main className="container mx-auto px-6 py-8">
        <div className="bg-white rounded-xl shadow-sm border">
          <ActiveComponent />
        </div>
      </main>
    </div>
  );
} 