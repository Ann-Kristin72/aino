"use client";

import React from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="p-8 text-center">
      <h2 className="text-2xl font-bold mb-4">🚨 Noe gikk galt</h2>
      <p className="mb-4 text-gray-700">
        {error.message || "Ukjent feil i SuperAdminDashboard."}
      </p>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Prøv igjen
      </button>
    </div>
  );
}
