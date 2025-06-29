"use client";

import { useState, useEffect } from "react";
import WriterView from "./WriterView";

export default function AdminWriterPage() {
  const [markdownText, setMarkdownText] = useState("");
  const [courseMeta, setCourseMeta] = useState({
    title: "",
    category: "",
    language: "no",
    audience: "",
    author: "",
    reviewInterval: "6",
    keywords: ""
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setIsLoaded(true);
    } catch (err) {
      setError('Feil ved lasting av admin writer');
      console.error('Admin writer error:', err);
    }
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-red-800 mb-2">Feil oppstod</h2>
            <p className="text-red-600">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Prøv igjen
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Laster Admin Writer...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Admin Writer v1.0</h1>
          <p className="text-gray-600 mt-2">Redigeringsverktøy for DH-redaktører</p>
        </div>
        
        <WriterView 
          markdownText={markdownText}
          setMarkdownText={setMarkdownText}
          courseMeta={courseMeta}
          setCourseMeta={setCourseMeta}
        />
      </div>
    </div>
  );
} 