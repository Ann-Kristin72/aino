"use client";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function MarkdownEditor({ value, onChange }: MarkdownEditorProps) {
  return (
    <div className="border border-gray-300 rounded-xl overflow-hidden bg-white flex flex-col h-full min-h-[600px] max-h-[80vh]">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Skriv markdown innhold her..."
        className="w-full flex-1 p-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
        style={{ minHeight: '500px' }}
      />
    </div>
  );
} 