"use client";

import { useState, useEffect, useRef } from "react";
import MarkdownEditor from "../writer/MarkdownEditor";
import PreviewPane from "../writer/PreviewPane";
import MetadataPanel from "../writer/MetadataPanel";
import ImportExportPanel from "../writer/ImportExportPanel";

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
      <div className="p-6">
        <div className="flex items-center justify-center min-h-[600px] p-8">
          {/* Eira Section - Left Side */}
          <div className="flex-1 flex justify-center items-center relative">
            <div className="relative">
              {/* Eira Image */}
              <div className="w-80 h-80 relative">
                <img 
                  src="/design-guide/eria-skrivestue.png" 
                  alt="Eira - AI Assistant" 
                  className="w-full h-full object-contain"
                />
              </div>
              
              {/* Speech Bubble */}
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-lg p-4 max-w-xs border-2 border-[#FF9F6B]">
                <div className="relative">
                  <p className="text-gray-800 text-sm leading-relaxed">
                    Velkommen til SkriveStuen! ✨<br/>
                    Jeg er Eira, din AI-assistent. La oss sammen skape fantastisk innhold for Aino-plattformen.
                  </p>
                  {/* Speech bubble tail */}
                  <div className="absolute -bottom-2 left-8 w-4 h-4 bg-white border-b-2 border-r-2 border-[#FF9F6B] transform rotate-45"></div>
                </div>
              </div>
            </div>
          </div>

          {/* PC Section - Right Side */}
          <div className="flex-1 flex justify-center items-center relative">
            <div className="relative">
              {/* PC Background */}
              <div className="w-96 h-80 relative">
                <img 
                  src="/design-guide/Skrivestue-bakgrunn-writer.png" 
                  alt="PC Background" 
                  className="w-full h-full object-contain"
                />
                
                {/* "Lag nytt innhold" Button inside PC */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={() => {
                      setShowWriter(true);
                      setShowWelcome(false);
                    }}
                    className="bg-gradient-to-r from-[#3D897D] to-[#3D897D]/80 hover:from-[#3D897D]/90 hover:to-[#3D897D] text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                  >
                    💻 Lag nytt innhold
                  </button>
                </div>
              </div>
            </div>
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