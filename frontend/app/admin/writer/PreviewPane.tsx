"use client";

interface PreviewPaneProps {
  markdownText: string;
}

export default function PreviewPane({ markdownText }: PreviewPaneProps) {
  // Enkel markdown til HTML konvertering
  const convertMarkdownToHtml = (markdown: string) => {
    return markdown
      .replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold mb-2">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold mb-3">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mb-4">$1</h1>')
      .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*(.*)\*/gim, '<em>$1</em>')
      .replace(/\n/gim, '<br />');
  };

  const htmlContent = convertMarkdownToHtml(markdownText);

  return (
    <div className="border border-gray-300 rounded-xl p-4 bg-white min-h-96">
      {markdownText ? (
        <div 
          className="prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      ) : (
        <div className="text-gray-500 text-center py-8">
          <p>Forhåndsvis vil vises her når du skriver markdown...</p>
        </div>
      )}
    </div>
  );
} 