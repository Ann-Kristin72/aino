"use client";

import React from "react";

interface ModuleCardProps {
  title: string;
  description: string;
}

export default function ModuleCard({ title, description }: ModuleCardProps) {
  return (
    <div
      className="cursor-pointer rounded-xl border p-6 shadow-card hover:shadow-md transition bg-white hover:bg-softpink"
    >
      <h2 className="text-xl font-slab text-warmbrown">{title}</h2>
      <p className="text-skifer mt-2">{description}</p>
    </div>
  );
} 