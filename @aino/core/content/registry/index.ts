import path from "path";
import fs from "fs";
import { parseMarkdown } from "../parser/parseMarkdown";
import { ContentMeta } from "@aino/core/types/ContentMeta";

const contentDir = path.join(process.cwd(), "..", "content");

export function getAllContentMeta(): ContentMeta[] {
  console.log('📂 Leter etter innhold i:', contentDir);
  
  try {
    const files = fs.readdirSync(contentDir);
    console.log(`📑 Fant ${files.length} filer`);
    
    return files
      .filter(file => file.endsWith(".md"))
      .map(file => {
        console.log(`🔍 Leser fil: ${file}`);
        return parseMarkdown(path.join(contentDir, file)).meta;
      });
  } catch (error) {
    console.error('❌ Feil ved lesing av innholdskatalog:', error);
    return [];
  }
} 