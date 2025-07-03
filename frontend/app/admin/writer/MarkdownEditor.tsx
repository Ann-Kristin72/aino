"use client";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function MarkdownEditor({ value, onChange }: MarkdownEditorProps) {
  return (
    <div className="border border-gray-300 rounded-xl overflow-hidden">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Skriv markdown innhold her..."
        className="w-full h-96 p-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        style={{ minHeight: '400px' }}
      />
    </div>
  );
} 