"use client";

import { useState, useEffect, useRef } from "react";
import MarkdownEditor from "../writer/MarkdownEditor";
import PreviewPane from "../writer/PreviewPane";
import MetadataPanel from "../writer/MetadataPanel";
import ImportExportPanel from "../writer/ImportExportPanel";
import SnakkebobleSoft from "../../../components/SnakkebobleSoft";

interface CourseMeta {
  title: string;
  category: string;
  language: string;
  audience: string;
  author: string;
  reviewInterval: string;
  keywords: string;
}

export default function WriterTab() {
  const [markdownText, setMarkdownText] = useState("# Velkommen til Aino Writer\n\nStart å skrive din artikkel her...");
  const [courseMeta, setCourseMeta] = useState<CourseMeta>({
    title: "",
    category: "",
    language: "nb-NO",
    audience: "",
    author: "",
    reviewInterval: "",
    keywords: ""
  });
  const [showWriter, setShowWriter] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [saveStatus, setSaveStatus] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = async () => {
    try {
      const response = await fetch('/api/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: courseMeta.title,
          content: markdownText,
          category: courseMeta.category,
          language: courseMeta.language,
          audience: courseMeta.audience,
          author: courseMeta.author,
          reviewInterval: courseMeta.reviewInterval,
          keywords: courseMeta.keywords
        }),
      });

      if (response.ok) {
        setSaveStatus("✅ Lagret!");
        setTimeout(() => setSaveStatus(""), 3000);
      } else {
        setSaveStatus("❌ Feil ved lagring");
        setTimeout(() => setSaveStatus(""), 3000);
      }
    } catch (error) {
      setSaveStatus("❌ Feil ved lagring");
      setTimeout(() => setSaveStatus(""), 3000);
    }
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setMarkdownText(content);
      };
      reader.readAsText(file);
    }
  };

  if (showWelcome) {
    return (
      <div className="flex flex-col md:flex-row items-start justify-start min-h-[80vh] w-full bg-transparent gap-y-8 md:gap-y-0 md:gap-x-16 p-6 pt-12">
        {/* Eira */}
        <div className="flex flex-col items-center md:items-end flex-1 min-w-[320px] md:min-w-[400px]">
          <div className="relative">
            <div className="w-[220px] md:w-[400px] h-[220px] md:h-[400px]">
              <img
                src="/design-guide/eria-skrivestue.png"
                alt="Eira - AI Assistant"
                className="w-full h-full object-contain"
              />
              {/* Snakkeboble - liten absolute-justering for halen */}
              <div className="absolute top-[-1.5rem] left-[60%] md:left-[90%] z-20 max-w-xs md:max-w-sm">
                <SnakkebobleSoft>
                  <div className="py-2 px-4">
                    <span className="block text-lg font-semibold mb-1">Velkommen til SkriveStuen!</span>
                    <span className="block text-base">Jeg er din AI-skriveassistent.<br/>La oss skape innhold sammen!</span>
                  </div>
                </SnakkebobleSoft>
              </div>
            </div>
          </div>
        </div>
        {/* PC med knapp */}
        <div className="flex-1 flex flex-col items-center justify-center w-full -mt-24">
          <div className="relative w-[450px] md:w-[900px] h-[280px] md:h-[560px] mx-auto md:ml-12">
            <img
              src="/design-guide/Skrivestue-bakgrunn-writer.png"
              alt="SkriveStue PC bakgrunn"
              className="w-full h-full object-contain drop-shadow-xl"
            />
            {/* Knapp midt på PC-skjermen */}
            <button
              onClick={() => setShowWelcome(false)}
              className="absolute top-[40%] left-[55%] transform -translate-x-1/2 px-6 py-3 bg-[#3D897D] text-white rounded-xl font-semibold text-base shadow-2xl hover:scale-110 transition-all duration-300 flex items-center gap-2 group border-2 border-white/20 hover:border-white/40 animate-pulse"
              style={{ minWidth: 180 }}
            >
              Lag nytt innhold
              <span className="ml-2 text-xl group-hover:animate-bounce">→</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showWriter) {
    return (
      <div className="p-6">
        <div>
          {/* Top Bar */}
          <div className="border-b border-gray-200 p-6 flex justify-between items-center bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl shadow-lg mb-6">
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setShowWriter(false);
                  setShowWelcome(true);
                }}
                className="px-6 py-3 bg-[#FDBD5D] hover:bg-[#FDBD5D]/80 text-gray-800 rounded-xl transition-colors font-medium"
              >
                ← Tilbake
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".md,.markdown"
                onChange={handleImport}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-6 py-3 bg-[#FF9F6B] hover:bg-[#FF9F6B]/80 text-white rounded-xl transition-colors font-medium"
              >
                📁 Last inn fil
              </button>
            </div>
            <div className="flex items-center space-x-4">
              {saveStatus && (
                <span className="text-sm font-medium text-gray-600">{saveStatus}</span>
              )}
              <button
                onClick={handleSave}
                className="px-6 py-3 bg-gradient-to-r from-[#3D897D] to-[#3D897D]/80 hover:from-[#3D897D]/90 hover:to-[#3D897D] text-white rounded-xl transition-colors font-medium"
              >
                💾 Lagre
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Editor */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6 h-[600px]">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">📝 Markdown Editor</h3>
                <MarkdownEditor
                  value={markdownText}
                  onChange={setMarkdownText}
                />
              </div>
            </div>

            {/* Preview */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6 h-[600px]">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">👁️ Forhåndsvis</h3>
                <PreviewPane
                  markdownText={markdownText}
                />
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Metadata */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">📋 Metadata</h3>
                <MetadataPanel
                  courseMeta={courseMeta}
                  setCourseMeta={setCourseMeta}
                />
              </div>

              {/* Import/Export */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">📤 Import/Export</h3>
                <ImportExportPanel
                  markdownText={markdownText}
                  setMarkdownText={setMarkdownText}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
} 