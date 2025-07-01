"use client";

import React from "react";

interface ModuleCardProps {
  title: string;
  description: string;
}

export default function ModuleCard({ title, description }: ModuleCardProps) {
  // Define color schemes for each module
  const getModuleColors = (title: string) => {
    const lowerTitle = title.toLowerCase();
    
    if (lowerTitle.includes("skrivestue")) {
      return {
        bg: "bg-teal-600",
        hover: "hover:bg-teal-700",
        text: "text-white"
      };
    }
    if (lowerTitle.includes("kvalitet")) {
      return {
        bg: "bg-orange-500",
        hover: "hover:bg-orange-600",
        text: "text-white"
      };
    }
    if (lowerTitle.includes("oppgave")) {
      return {
        bg: "bg-green-400",
        hover: "hover:bg-green-500",
        text: "text-white"
      };
    }
    if (lowerTitle.includes("veiledning") || lowerTitle.includes("tekno")) {
      return {
        bg: "bg-teal-800",
        hover: "hover:bg-teal-900",
        text: "text-white"
      };
    }
    if (lowerTitle.includes("kommunikasjon")) {
      return {
        bg: "bg-yellow-500",
        hover: "hover:bg-yellow-600",
        text: "text-white"
      };
    }
    if (lowerTitle.includes("tilgang") || lowerTitle.includes("kunde")) {
      return {
        bg: "bg-orange-400",
        hover: "hover:bg-orange-500",
        text: "text-white"
      };
    }
    
    // Default fallback
    return {
      bg: "bg-gray-600",
      hover: "hover:bg-gray-700",
      text: "text-white"
    };
  };

  const colors = getModuleColors(title);

  return (
    <div
      className={`cursor-pointer rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-200 ${colors.bg} ${colors.hover} ${colors.text}`}
    >
      <h2 className="text-xl font-bold mb-3">{title}</h2>
      <p className="opacity-90 text-sm leading-relaxed">{description}</p>
    </div>
  );
} 