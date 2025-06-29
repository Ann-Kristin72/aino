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

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Laster writer...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg">
      {/* Top Bar */}
      <div className="border-b border-gray-200 p-4 flex justify-between items-center">
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'preview' 
                ? 'bg-blue-100 text-blue-700' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Forhåndsvis
          </button>
          <button
            onClick={() => setActiveTab('metadata')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'metadata' 
                ? 'bg-blue-100 text-blue-700' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Metadata
          </button>
          <button
            onClick={() => setActiveTab('import')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'import' 
                ? 'bg-blue-100 text-blue-700' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Import/Export
          </button>
        </div>
        
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            Forhåndsvis
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Lagre
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
        {/* Left Panel - Markdown Editor */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Markdown Editor</h3>
          <MarkdownEditor 
            value={markdownText}
            onChange={setMarkdownText}
          />
        </div>

        {/* Right Panel - Dynamic Content */}
        <div className="space-y-4">
          {activeTab === 'preview' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Forhåndsvis</h3>
              <PreviewPane markdownText={markdownText} />
            </div>
          )}
          
          {activeTab === 'metadata' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Metadata</h3>
              <MetadataPanel 
                courseMeta={courseMeta}
                setCourseMeta={setCourseMeta}
              />
            </div>
          )}
          
          {activeTab === 'import' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Import/Export</h3>
              <ImportExportPanel 
                markdownText={markdownText}
                setMarkdownText={setMarkdownText}
              />
            </div>
          )}
        </div>
      </div>

      {/* Eira Panel */}
      <div className="border-t border-gray-200 p-4 bg-gray-50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-blue-600 font-bold">E</span>
          </div>
          <div>
            <p className="text-sm text-gray-600">Eira analyserer teksten...</p>
            <p className="text-xs text-gray-500">AI-forbedringer kommer snart</p>
          </div>
        </div>
      </div>
    </div>
  );
} 