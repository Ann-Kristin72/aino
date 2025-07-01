"use client";

import React from "react";

interface LanguageSelectorProps {
  currentLanguage: "nb" | "en";
  onLanguageChange: (language: "nb" | "en") => void;
}

export default function LanguageSelector({ currentLanguage, onLanguageChange }: LanguageSelectorProps) {
  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => onLanguageChange("nb")}
        className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
          currentLanguage === "nb"
            ? "bg-teal-600 text-white"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        }`}
      >
        <span className="text-lg">🇳🇴</span>
        <span className="text-sm font-medium">NO</span>
      </button>
      
      <button
        onClick={() => onLanguageChange("en")}
        className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
          currentLanguage === "en"
            ? "bg-teal-600 text-white"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        }`}
      >
        <span className="text-lg">🇬🇧</span>
        <span className="text-sm font-medium">EN</span>
      </button>
    </div>
  );
} 