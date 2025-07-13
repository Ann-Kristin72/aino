"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import MarkdownEditor from "../writer/MarkdownEditor";
import PreviewPane from "../writer/PreviewPane";
import MetadataPanel from "../writer/MetadataPanel";
import ImportExportPanel from "../writer/ImportExportPanel";
import { titleCase } from "../../../lib/utils";

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

export default function WriterTab() {
  const searchParams = useSearchParams();
  const [markdownText, setMarkdownText] = useState("# Velkommen til Aino Writer\n\nStart å skrive din artikkel her...");
  const [courseMeta, setCourseMeta] = useState<CourseMeta>({
    title: "",
    category: "",
    location: "",
    targetUser: "",
    language: "nb-NO",
    audience: "",
    author: "",
    reviewInterval: "12",
    keywords: ""
  });
  const [showWriter, setShowWriter] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [saveStatus, setSaveStatus] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Håndter URL-parametere for kategori, lokasjon og målbruker
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    const locationParam = searchParams.get('location');
    const targetUserParam = searchParams.get('targetUser');
    
    if (categoryParam || locationParam || targetUserParam) {
      setCourseMeta(prev => ({
        ...prev,
        category: categoryParam ? titleCase(categoryParam) : prev.category,
        location: locationParam ? titleCase(locationParam) : prev.location,
        targetUser: targetUserParam ? titleCase(targetUserParam) : prev.targetUser
      }));
      
      // Automatisk gå til writer-visningen hvis parametere er satt
      setShowWelcome(false);
      setShowWriter(true);
    }
  }, [searchParams]);

  // Debug logging for metadata changes
  useEffect(() => {
    console.log('📊 WriterTab - courseMeta updated:', courseMeta);
  }, [courseMeta]);

  const handleSave = async () => {
    try {
      const keywordsArray = typeof courseMeta.keywords === "string"
        ? courseMeta.keywords.split(",").map(k => k.trim()).filter(Boolean)
        : Array.isArray(courseMeta.keywords) ? courseMeta.keywords : [];

      const response = await fetch('/api/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: courseMeta.title,
          content: markdownText,
          category: courseMeta.category,
          location: courseMeta.location,
          targetUser: courseMeta.targetUser,
          language: courseMeta.language,
          audience: courseMeta.audience,
          author: courseMeta.author,
          revisionInterval: courseMeta.reviewInterval,
          keywords: keywordsArray
        }),
      });

      if (response.ok) {
        setSaveStatus("✅ Lagret!");
        setTimeout(() => setSaveStatus(""), 3000);
      } else {
        setSaveStatus("❌ Feil ved lagring");
        setTimeout(() => setSaveStatus(""), 3000);
      }
    } catch {
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
        
        // Ekstraher metadata fra innholdet
        const extractMetadata = (content: string): { content: string; metadata: Partial<CourseMeta> } => {
          let cleanContent = content;
          const metadata: Partial<CourseMeta> = {};

          // Sjekk for YAML frontmatter (--- ... ---)
          const frontmatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
          
          if (frontmatterMatch) {
            const frontmatter = frontmatterMatch[1];
            cleanContent = frontmatterMatch[2];
            
            // Parse YAML frontmatter
            const lines = frontmatter.split('\n');
            lines.forEach(line => {
              const [key, ...valueParts] = line.split(':');
              if (key && valueParts.length > 0) {
                const value = valueParts.join(':').trim();
                const cleanKey = key.trim().toLowerCase();
                
                switch (cleanKey) {
                  case 'title':
                    metadata.title = value;
                    break;
                  case 'category':
                    metadata.category = value;
                    break;
                  case 'location':
                    metadata.location = value;
                    break;
                  case 'targetuser':
                  case 'target_user':
                    metadata.targetUser = value;
                    break;
                  case 'language':
                    metadata.language = value;
                    break;
                  case 'audience':
                  case 'targetuser':
                  case 'target_user':
                    metadata.audience = value;
                    break;
                  case 'author':
                    metadata.author = value;
                    break;
                  case 'reviewinterval':
                  case 'review_interval':
                    metadata.reviewInterval = value;
                    break;
                  case 'keywords':
                    metadata.keywords = value;
                    break;
                }
              }
            });
          }

          // Hvis ingen tittel i frontmatter, prøv å hente fra første overskrift
          if (!metadata.title) {
            const titleMatch = cleanContent.match(/^#\s+(.+)$/m);
            if (titleMatch) {
              metadata.title = titleMatch[1].trim();
            }
          }

          // Hvis ingen forfatter, prøv å hente fra andre overskrift eller spesielle kommentarer
          if (!metadata.author) {
            const authorMatch = cleanContent.match(/^##\s+Forfatter[:\s]+(.+)$/mi) || 
                               cleanContent.match(/<!--\s*author[:\s]+(.+?)\s*-->/i);
            if (authorMatch) {
              metadata.author = authorMatch[1].trim();
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
            }
          }

          // Hvis ingen kategori, prøv å hente fra kommentarer eller spesielle tags
          if (!metadata.category) {
            const categoryMatch = cleanContent.match(/<!--\s*category[:\s]+(.+?)\s*-->/i) ||
                                 cleanContent.match(/^##\s+Kategori[:\s]+(.+)$/mi);
            if (categoryMatch) {
              metadata.category = categoryMatch[1].trim();
            }
          }

          // Hvis ingen lokasjon, prøv å hente fra kommentarer eller spesielle tags
          if (!metadata.location) {
            const locationMatch = cleanContent.match(/<!--\s*location[:\s]+(.+?)\s*-->/i) ||
                                 cleanContent.match(/^##\s+Lokasjon[:\s]+(.+)$/mi);
            if (locationMatch) {
              metadata.location = locationMatch[1].trim();
            }
          }

          // Hvis ingen målbruker, prøv å hente fra kommentarer eller spesielle tags
          if (!metadata.targetUser) {
            const targetUserMatch = cleanContent.match(/<!--\s*targetuser[:\s]+(.+?)\s*-->/i) ||
                                   cleanContent.match(/^##\s+Målbruker[:\s]+(.+)$/mi) ||
                                   cleanContent.match(/^##\s+Target User[:\s]+(.+)$/mi);
            if (targetUserMatch) {
              metadata.targetUser = targetUserMatch[1].trim();
            }
          }

          return { content: cleanContent, metadata };
        };

        const { content: cleanContent, metadata } = extractMetadata(content);
        
        // Sett innholdet
        setMarkdownText(cleanContent);
        
        // Sett metadata
        setCourseMeta({
          title: metadata.title || "",
          category: metadata.category || "",
          location: metadata.location || "",
          targetUser: metadata.targetUser || "",
          language: metadata.language || "nb-NO",
          audience: metadata.audience || "",
          author: metadata.author || "",
          reviewInterval: metadata.reviewInterval || "",
          keywords: metadata.keywords || ""
        });
      };
      reader.readAsText(file);
    }
  };

  if (showWelcome) {
    return (
      <div className="flex flex-col md:flex-row items-start justify-start min-h-[80vh] w-full bg-transparent gap-y-8 md:gap-y-0 md:gap-x-16 p-6 pt-12">
        {/* Eira */}
        <div className="flex flex-col items-center md:items-end flex-1 min-w-[340px] md:min-w-[520px]">
          <div className="relative">
            <div className="w-[300px] md:w-[520px] h-[300px] md:h-[520px]">
              <Image
                src="/design-guide/eria-skrivestue.png"
                alt="Eira - AI Assistant"
                width={520}
                height={520}
                className="w-full h-full object-contain"
              />
              {/* Snakkeboble - spesialversjon for WriterTab med liggende layout og korrekt hale */}
              <div className="absolute top-[15%] left-[70%] md:left-[85%] z-20 max-w-xs md:max-w-md">
                <div className="relative bg-white/95 text-gray-800 rounded-xl shadow-lg py-3 px-4 text-sm md:text-base leading-snug whitespace-pre-line border-2 border-[#3D897D] animate-fade-pop transition-opacity duration-500 ease-out max-w-md">
                  {/* Halen */}
                  <div
                    className="absolute w-4 h-4 bg-white/95 border-l-2 border-b-2 border-[#3D897D] rounded-sm"
                    style={{
                      left: -8, // venstre kant
                      top: '50%', // midt på høyden
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 1,
                    }}
                  />
                  <div className="font-sans">
                    <span className="block font-semibold mb-1 text-[#1F2937]">Velkommen til SkriveStuen! 🎉</span>
                    <span className="block text-gray-700">Jeg er din AI-skriveassistent.{"\n"}La oss skape innhold sammen!</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* PC med knapp */}
        <div className="flex-1 flex flex-col items-center justify-center w-full mt-8">
          <div className="relative w-[450px] md:w-[900px] h-[280px] md:h-[560px] mx-auto md:-ml-4">
            <Image
              src="/design-guide/Skrivestue-bakgrunn-writer.png"
              alt="SkriveStue PC bakgrunn"
              width={900}
              height={560}
              className="w-full h-full object-contain drop-shadow-xl"
            />
            {/* Knapp midt på PC-skjermen */}
            <button
              onClick={() => {
                setShowWelcome(false);
                setShowWriter(true);
              }}
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-[700px]">
            {/* Editor */}
            <div className="lg:col-span-1 flex flex-col">
              <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col h-full min-h-[600px] max-h-[80vh]">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">📝 Markdown Editor</h3>
                <div className="flex-1 min-h-0">
                  <MarkdownEditor
                    value={markdownText}
                    onChange={setMarkdownText}
                  />
                </div>
              </div>
            </div>

            {/* Preview */}
            <div className="lg:col-span-1 flex flex-col">
              <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col h-full min-h-[600px] max-h-[80vh]">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">👁️ Forhåndsvis</h3>
                <div className="flex-1 min-h-0">
                  <PreviewPane
                    markdownText={markdownText}
                  />
                </div>
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
                  setCourseMeta={setCourseMeta}
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