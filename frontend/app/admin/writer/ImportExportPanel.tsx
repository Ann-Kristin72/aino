"use client";

import { useRef } from "react";

interface CourseMeta {
  title: string;
  category: string;
  location: string;
  targetUser: string;
  language: string;
  audience: string;
  author: string;
  reviewInterval: string;
  keywords: string;
}

interface ImportExportPanelProps {
  markdownText: string;
  setMarkdownText: (text: string) => void;
  setCourseMeta?: (meta: CourseMeta) => void;
}

export default function ImportExportPanel({ 
  markdownText, 
  setMarkdownText, 
  setCourseMeta 
}: ImportExportPanelProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Funksjon for å ekstrahere metadata fra markdown-innhold
  const extractMetadata = (content: string): { content: string; metadata: Partial<CourseMeta> } => {
    let cleanContent = content;
    const metadata: Partial<CourseMeta> = {};

    console.log('🔍 Starting metadata extraction...');

    // Sjekk for YAML frontmatter (--- ... ---)
    const frontmatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
    
    if (frontmatterMatch) {
      console.log('📋 Found YAML frontmatter');
      const frontmatter = frontmatterMatch[1];
      cleanContent = frontmatterMatch[2];
      
      // Parse YAML frontmatter
      const lines = frontmatter.split('\n');
      lines.forEach(line => {
        const [key, ...valueParts] = line.split(':');
        if (key && valueParts.length > 0) {
          const value = valueParts.join(':').trim();
          const cleanKey = key.trim().toLowerCase();
          
          console.log(`🔍 Processing key: "${cleanKey}" with value: "${value}"`);
          
          switch (cleanKey) {
            case 'title':
              metadata.title = value;
              console.log(`✅ Set title: "${value}"`);
              break;
            case 'category':
              metadata.category = value;
              console.log(`✅ Set category: "${value}"`);
              break;
            case 'location':
              metadata.location = value;
              console.log(`✅ Set location: "${value}"`);
              break;
            case 'targetuser':
            case 'target_user':
              metadata.targetUser = value;
              console.log(`✅ Set targetUser: "${value}"`);
              break;
            case 'language':
              metadata.language = value;
              console.log(`✅ Set language: "${value}"`);
              break;
            case 'audience':
            case 'targetuser':
            case 'target_user':
              metadata.audience = value;
              console.log(`✅ Set audience/targetUser: "${value}"`);
              break;
            case 'author':
              metadata.author = value;
              console.log(`✅ Set author: "${value}"`);
              break;
            case 'reviewinterval':
            case 'review_interval':
              metadata.reviewInterval = value;
              console.log(`✅ Set reviewInterval: "${value}"`);
              break;
            case 'keywords':
              metadata.keywords = value;
              console.log(`✅ Set keywords: "${value}"`);
              break;
            default:
              console.log(`❓ Unknown key: "${cleanKey}"`);
          }
        }
      });
    } else {
      console.log('📋 No YAML frontmatter found, checking other formats...');
    }

    // Hvis ingen tittel i frontmatter, prøv å hente fra første overskrift
    if (!metadata.title) {
      const titleMatch = cleanContent.match(/^#\s+(.+)$/m);
      if (titleMatch) {
        metadata.title = titleMatch[1].trim();
        console.log(`✅ Set title from heading: "${metadata.title}"`);
      }
    }

    // Hvis ingen forfatter, prøv å hente fra andre overskrift eller spesielle kommentarer
    if (!metadata.author) {
      const authorMatch = cleanContent.match(/^##\s+Forfatter[:\s]+(.+)$/mi) || 
                         cleanContent.match(/<!--\s*author[:\s]+(.+?)\s*-->/i);
      if (authorMatch) {
        metadata.author = authorMatch[1].trim();
        console.log(`✅ Set author from content: "${metadata.author}"`);
      }
    }

    // Hvis ingen målgruppe, prøv å hente fra overskrifter eller kommentarer
    if (!metadata.audience) {
      const audienceMatch = cleanContent.match(/^##\s+Target User[:\s]+(.+)$/mi) ||
                           cleanContent.match(/^##\s+Målgruppe[:\s]+(.+)$/mi) ||
                           cleanContent.match(/<!--\s*targetuser[:\s]+(.+?)\s*-->/i) ||
                           cleanContent.match(/<!--\s*audience[:\s]+(.+?)\s*-->/i);
      if (audienceMatch) {
        metadata.audience = audienceMatch[1].trim();
        console.log(`✅ Set audience from content: "${metadata.audience}"`);
      }
    }

    // Hvis ingen kategori, prøv å hente fra kommentarer eller spesielle tags
    if (!metadata.category) {
      const categoryMatch = cleanContent.match(/<!--\s*category[:\s]+(.+?)\s*-->/i) ||
                           cleanContent.match(/^##\s+Kategori[:\s]+(.+)$/mi);
      if (categoryMatch) {
        metadata.category = categoryMatch[1].trim();
        console.log(`✅ Set category from content: "${metadata.category}"`);
      }
    }

    // Hvis ingen lokasjon, prøv å hente fra kommentarer eller spesielle tags
    if (!metadata.location) {
      const locationMatch = cleanContent.match(/<!--\s*location[:\s]+(.+?)\s*-->/i) ||
                           cleanContent.match(/^##\s+Lokasjon[:\s]+(.+)$/mi);
      if (locationMatch) {
        metadata.location = locationMatch[1].trim();
        console.log(`✅ Set location from content: "${metadata.location}"`);
      }
    }

    // Hvis ingen målbruker, prøv å hente fra kommentarer eller spesielle tags
    if (!metadata.targetUser) {
      const targetUserMatch = cleanContent.match(/<!--\s*targetuser[:\s]+(.+?)\s*-->/i) ||
                             cleanContent.match(/^##\s+Målbruker[:\s]+(.+)$/mi) ||
                             cleanContent.match(/^##\s+Target User[:\s]+(.+)$/mi);
      if (targetUserMatch) {
        metadata.targetUser = targetUserMatch[1].trim();
        console.log(`✅ Set targetUser from content: "${metadata.targetUser}"`);
      }
    }

    console.log('📊 Final metadata:', metadata);
    return { content: cleanContent, metadata };
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log('📁 Importing file:', file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        console.log('📄 File content length:', content.length);
        const { content: cleanContent, metadata } = extractMetadata(content);
        
        // Sett innholdet
        setMarkdownText(cleanContent);
        
        // Sett metadata hvis funksjonen er tilgjengelig
        if (setCourseMeta) {
          const finalMeta = {
            title: metadata.title || "",
            category: metadata.category || "",
            location: metadata.location || "",
            targetUser: metadata.targetUser || "",
            language: metadata.language || "nb-NO",
            audience: metadata.audience || "",
            author: metadata.author || "",
            reviewInterval: metadata.reviewInterval || "",
            keywords: metadata.keywords || ""
          };
          console.log('🎯 Setting course metadata:', finalMeta);
          setCourseMeta(finalMeta);
        } else {
          console.log('⚠️ setCourseMeta function not available');
        }
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
            Velg en markdown-fil for å importere innhold og metadata
          </p>
          <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
            <p className="font-medium mb-1">📋 Støttede metadata-formater:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>YAML frontmatter (--- ... ---)</li>
              <li>Første overskrift (# Tittel)</li>
              <li>Overskrifter (## Target User: Gruppe)</li>
              <li>HTML-kommentarer (&lt;!-- targetuser: Gruppe --&gt;)</li>
            </ul>
          </div>
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