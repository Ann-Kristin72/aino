import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getEditors } from "@/lib/api/editors";

export default function SuperAdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: editors, isLoading, error } = useQuery({
    queryKey: ["editors"],
    queryFn: getEditors,
  });

  const filteredEditors = editors?.filter((editor) =>
    editor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4 p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold text-gray-900">Redaktører</h1>
      
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Søk etter redaktør..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-aino-blue"
        />

        {isLoading && (
          <div className="flex items-center justify-center text-aino-blue">
            Laster redaktører...
          </div>
        )}

        {error && (
          <div className="bg-red-50 text-red-700 border border-red-200 p-3 rounded">
            {error instanceof Error ? error.message : "En feil oppstod"}
          </div>
        )}

        {filteredEditors && filteredEditors.length > 0 ? (
          <div className="space-y-2">
            {filteredEditors.map((editor) => (
              <div
                key={editor.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <h3 className="font-medium text-gray-900">{editor.name}</h3>
                  <p className="text-sm text-gray-500">{editor.email}</p>
                </div>
                <button
                  onClick={() => {/* TODO: Implement editor actions */}}
                  className="bg-aino-blue hover:bg-aino-blue-dark text-white px-4 py-2 rounded transition-colors"
                >
                  Administrer
                </button>
              </div>
            ))}
          </div>
        ) : (
          !isLoading && (
            <p className="text-gray-500 text-center">Ingen redaktører funnet</p>
          )
        )}
      </div>
    </div>
  );
} 