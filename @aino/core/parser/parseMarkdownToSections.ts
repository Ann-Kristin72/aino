import matter from 'gray-matter';

export interface Section {
  title: string;
  content: string;
  order: number;
}

export interface ParsedContent {
  metadata: {
    title: string;
    description: string;
    category: string;
    role: string;
    market: string;
    language: string;
  };
  sections: Section[];
}

export function parseMarkdownToSections(markdown: string): ParsedContent {
  const { data, content } = matter(markdown);
  
  // Split content into sections based on headers
  const sections = content
    .split(/^#{2,3}\s+/m)
    .filter(Boolean)
    .map((section: string, index: number) => {
      const [title, ...contentParts] = section.split('\n');
      return {
        title: title.trim(),
        content: contentParts.join('\n').trim(),
        order: index,
      };
    });

  return {
    metadata: {
      title: data.title || '',
      description: data.description || '',
      category: data.category || '',
      role: data.role || '',
      market: data.market || '',
      language: data.language || '',
    },
    sections,
  };
} 