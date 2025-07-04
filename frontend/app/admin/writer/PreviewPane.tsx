"use client";

interface PreviewPaneProps {
  markdownText: string;
}

export default function PreviewPane({ markdownText }: PreviewPaneProps) {
  // Forbedret markdown til HTML konvertering med støtte for bilder, videoer og URL-er
  const convertMarkdownToHtml = (markdown: string) => {
    let html = markdown;
    
    // Håndter markdown-bilder: ![alt](url)
    html = html.replace(
      /!\[([^\]]*)\]\(([^)]+)\)/gim,
      '<img src="$2" alt="$1" class="max-w-full h-auto rounded-lg shadow-md my-4 mx-auto" onerror="this.style.display=\'none\'; this.nextElementSibling.style.display=\'block\';" /><div class="text-red-500 text-sm text-center mb-4" style="display:none;">⚠️ Kunne ikke laste bildet: $2</div>'
    );
    
    // Håndter overskrifter
    html = html.replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold mb-2 text-gray-800">$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold mb-3 text-gray-800">$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mb-4 text-gray-800">$1</h1>');
    
    // Håndter fet og kursiv tekst
    html = html.replace(/\*\*(.*?)\*\*/gim, '<strong class="font-semibold">$1</strong>');
    html = html.replace(/\*(.*?)\*/gim, '<em class="italic">$1</em>');
    
    // Håndter vanlige URL-er (ikke allerede i markdown-bilder)
    // Dette må gjøres etter bilder for å unngå å fange opp bilder-URL-er
    html = html.replace(
      /(?<!!\[.*?\]\()(https?:\/\/[^\s<>"{}|\\^`\[\]]+)/gim,
      (match, url) => {
        // Sjekk om det er en video-URL
        const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi', '.mkv'];
        const isVideo = videoExtensions.some(ext => url.toLowerCase().includes(ext));
        
        if (isVideo) {
          return `<div class="my-4"><video controls class="max-w-full h-auto rounded-lg shadow-md mx-auto"><source src="${url}" type="video/mp4">Din nettleser støtter ikke video-elementet.</video><div class="text-sm text-gray-600 text-center mt-2">🎥 Video: <a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 underline">${url}</a></div></div>`;
        }
        
        // Sjekk om det er et bilde (vanlige bilde-format)
        const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp'];
        const isImage = imageExtensions.some(ext => url.toLowerCase().includes(ext));
        
        if (isImage) {
          return `<img src="${url}" alt="Bilde" class="max-w-full h-auto rounded-lg shadow-md my-4 mx-auto" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';" /><div class="text-red-500 text-sm text-center mb-4" style="display:none;">⚠️ Kunne ikke laste bildet: ${url}</div>`;
        }
        
        // Vanlig URL - gjør den klikkbar
        return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 underline break-all">${url}</a>`;
      }
    );
    
    // Håndter linjeskift
    html = html.replace(/\n/gim, '<br />');
    
    return html;
  };

  const htmlContent = convertMarkdownToHtml(markdownText);

  return (
    <div className="border border-gray-300 rounded-xl p-4 bg-white flex flex-col h-full min-h-[600px] max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
      {markdownText ? (
        <div 
          className="prose prose-sm max-w-none flex-1"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      ) : (
        <div className="text-gray-500 text-center py-8 flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-lg font-medium mb-2">👁️ Forhåndsvis</p>
            <p className="text-sm">Forhåndsvis vil vises her når du skriver markdown...</p>
            <div className="mt-4 text-xs text-gray-400">
              <p>✅ Støtter bilder, videoer og klikkbare URL-er</p>
              <p>✅ Automatisk deteksjon av media-format</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 