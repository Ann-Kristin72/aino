"use client";

import React from "react";

interface ModuleCardProps {
  title: string;
  description: string;
  onClick: () => void;
}

export default function ModuleCard({ title, description, onClick }: ModuleCardProps) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer rounded-xl border p-6 shadow-sm hover:shadow-md transition bg-white hover:bg-blue-50"
    >
      <h2 className="text-xl font-semibold text-blue-900">{title}</h2>
      <p className="text-gray-600 mt-2">{description}</p>
    </div>
  );
} 