"use client";


import { useState } from "react";

export default function TestEira() {
  const [name, setName] = useState("");

  return (
    <div className="min-h-screen bg-latte flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Eira Image */}
          <div className="flex-shrink-0">
            <div className="relative w-64 h-64">
              <img
                src="/design-guide/eira-neutral-removebg-preview.png"
                alt="Eira"
                className="object-contain w-full h-full"
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 space-y-6">
            {/* Speech Bubble */}
            <div className="bg-softpink rounded-2xl p-6 shadow-lg max-w-md">
              <p className="text-skifer text-lg font-medium">
                Hei! Jeg er Eira. Hva heter du?
              </p>
            </div>

            {/* Input */}
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Skriv navnet ditt"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full max-w-md px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-joda-teal focus:border-transparent"
              />
            </div>

            {/* Button */}
            <button
              disabled={!name.trim()}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                name.trim()
                  ? "bg-joda-teal text-white hover:bg-blue-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Neste
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 