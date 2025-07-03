"use client";

import { useState, useEffect } from "react";
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
    reviewInterval: "6m",
    keywords: ""
  });
  const [activeTab, setActiveTab] = useState<'preview' | 'metadata' | 'import'>('preview');
  const [isLoaded, setIsLoaded] = useState(false);
  const [saveStatus, setSaveStatus] = useState<null | 'success' | 'error'>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Enkel markdown til HTML konvertering (samme som PreviewPane)
  const convertMarkdownToHtml = (markdown: string) => {
    return markdown
      .replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold mb-2">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold mb-3">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mb-4">$1</h1>')
      .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*(.*)\*/gim, '<em>$1</em>')
      .replace(/\n/gim, '<br />');
  };

  const handleSave = async () => {
    setSaveStatus(null);
    
    // Validering av påkrevde felter
    if (!courseMeta.title.trim()) {
      setSaveStatus('error');
      return;
    }
    if (!courseMeta.category.trim()) {
      setSaveStatus('error');
      return;
    }
    if (!markdownText.trim()) {
      setSaveStatus('error');
      return;
    }
    
    const payload = {
      title: courseMeta.title,
      category: courseMeta.category,
      content_md: markdownText,
    };
    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.status === 200) {
        setSaveStatus('success');
      } else {
        setSaveStatus('error');
      }
    } catch (e) {
      setSaveStatus('error');
    }
  };

  if (!isLoaded) {
    return (
      <div className="p-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Laster writer...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div>
        {/* Top Bar */}
        <div className="border-b border-gray-200 p-6 flex justify-between items-center bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl shadow-lg mb-6">
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                activeTab === 'preview' 
                  ? 'bg-teal-600 text-white shadow-md' 
                  : 'text-gray-600 hover:text-teal-600 hover:bg-teal-50'
              }`}
            >
              👁️ Forhåndsvis
            </button>
            <button
              onClick={() => setActiveTab('metadata')}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                activeTab === 'metadata' 
                  ? 'bg-teal-600 text-white shadow-md' 
                  : 'text-gray-600 hover:text-teal-600 hover:bg-teal-50'
              }`}
            >
              📋 Metadata
            </button>
            <button
              onClick={() => setActiveTab('import')}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                activeTab === 'import' 
                  ? 'bg-teal-600 text-white shadow-md' 
                  : 'text-gray-600 hover:text-teal-600 hover:bg-teal-50'
              }`}
            >
              📤 Import/Export
            </button>
          </div>
          
          <div className="flex space-x-3">
            <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium">
              👁️ Forhåndsvis
            </button>
            <button
              className="px-6 py-3 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white rounded-xl transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
              onClick={handleSave}
            >
              💾 Lagre
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
          {/* Left Panel - Markdown Editor */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">✍️</div>
              <h3 className="text-xl font-bold text-gray-900">Markdown Editor</h3>
            </div>
            <MarkdownEditor 
              value={markdownText}
              onChange={setMarkdownText}
            />
          </div>

          {/* Right Panel - Dynamic Content */}
          <div className="space-y-6">
            {activeTab === 'preview' && (
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="text-2xl">👁️</div>
                  <h3 className="text-xl font-bold text-gray-900">Forhåndsvis</h3>
                </div>
                <PreviewPane markdownText={markdownText} />
              </div>
            )}
            
            {activeTab === 'metadata' && (
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="text-2xl">📋</div>
                  <h3 className="text-xl font-bold text-gray-900">Metadata</h3>
                </div>
                <MetadataPanel 
                  courseMeta={courseMeta}
                  setCourseMeta={setCourseMeta}
                />
              </div>
            )}
            
            {activeTab === 'import' && (
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="text-2xl">📤</div>
                  <h3 className="text-xl font-bold text-gray-900">Import/Export</h3>
                </div>
                <ImportExportPanel 
                  markdownText={markdownText}
                  setMarkdownText={setMarkdownText}
                />
              </div>
            )}
          </div>
        </div>

        {/* Eira Panel */}
        <div className="border-t border-gray-200 p-6 bg-gradient-to-r from-purple-50 to-pink-50">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">E</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Eira analyserer teksten...</p>
              <p className="text-xs text-gray-500">AI-forbedringer kommer snart</p>
            </div>
          </div>
        </div>

        {/* Save status feedback */}
        {saveStatus === 'success' && (
          <div className="p-6 text-green-700 bg-green-50 border border-green-200 rounded-xl m-6 text-center">
            <div className="text-2xl mb-2">✅</div>
            <p className="font-medium">Artikkel lagret!</p>
          </div>
        )}
        {saveStatus === 'error' && (
          <div className="p-6 text-red-700 bg-red-50 border border-red-200 rounded-xl m-6 text-center">
            <div className="text-2xl mb-2">❌</div>
            <p className="font-medium">Kunne ikke lagre artikkel. Prøv igjen.</p>
          </div>
        )}
      </div>
    </div>
  );
} 