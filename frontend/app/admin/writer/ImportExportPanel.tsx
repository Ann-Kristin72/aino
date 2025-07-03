"use client";

import { useRef } from "react";

interface ImportExportPanelProps {
  markdownText: string;
  setMarkdownText: (text: string) => void;
}

export default function ImportExportPanel({ markdownText, setMarkdownText }: ImportExportPanelProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleExport = () => {
    if (!markdownText) {
      alert('Ingen tekst å eksportere');
      return;
    }

    const blob = new Blob([markdownText], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'content.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      {/* Import Section */}
      <div className="border border-gray-300 rounded-xl p-4">
        <h4 className="text-md font-semibold text-gray-900 mb-3">Importer Markdown</h4>
        <div className="space-y-3">
          <input
            ref={fileInputRef}
            type="file"
            accept=".md,.markdown"
            onChange={handleImport}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full px-4 py-2 bg-[#4CB6B6] text-white rounded-xl hover:bg-[#379e9e] transition-colors"
          >
            Velg .md fil
          </button>
          <p className="text-sm text-gray-600">
            Velg en markdown-fil for å importere innhold
          </p>
        </div>
      </div>

      {/* Export Section */}
      <div className="border border-gray-300 rounded-xl p-4">
        <h4 className="text-md font-semibold text-gray-900 mb-3">Eksporter Markdown</h4>
        <div className="space-y-3">
          <button
            onClick={handleExport}
            disabled={!markdownText}
            className={`w-full px-4 py-2 rounded-xl transition-colors ${
              markdownText
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Last ned som .md
          </button>
          <p className="text-sm text-gray-600">
            {markdownText 
              ? 'Eksporterer nåværende innhold som markdown-fil'
              : 'Ingen tekst å eksportere'
            }
          </p>
        </div>
      </div>

      {/* File Info */}
      {markdownText && (
        <div className="border border-gray-300 rounded-xl p-4 bg-latte">
          <h4 className="text-md font-semibold text-gray-900 mb-2">Filinformasjon</h4>
          <div className="text-sm text-gray-600 space-y-1">
            <p>Antall tegn: {markdownText.length}</p>
            <p>Antall linjer: {markdownText.split('\n').length}</p>
            <p>Antall ord: {markdownText.split(/\s+/).filter(word => word.length > 0).length}</p>
          </div>
        </div>
      )}
    </div>
  );
} 