"use client";

import React from "react";

interface LanguageSelectorProps {
  currentLanguage: "nb" | "en";
  onLanguageChange: (language: "nb" | "en") => void;
}

export default function LanguageSelector({ currentLanguage, onLanguageChange }: LanguageSelectorProps) {
  return (
    <div className="flex space-x-1">
      <button
        onClick={() => onLanguageChange("nb")}
        className={`flex items-center space-x-2 px-3 py-2 rounded-xl transition-colors ${
          currentLanguage === "nb"
            ? "bg-white/20 text-white"
            : "text-white/70 hover:text-white hover:bg-white/10"
        }`}
      >
        <span>🇳🇴</span>
        <span>Norsk</span>
      </button>
      
      <button
        onClick={() => onLanguageChange("en")}
        className={`flex items-center space-x-2 px-3 py-2 rounded-xl transition-colors ${
          currentLanguage === "en"
            ? "bg-white/20 text-white"
            : "text-white/70 hover:text-white hover:bg-white/10"
        }`}
      >
        <span>🇬🇧</span>
        <span>English</span>
      </button>
    </div>
  );
} 