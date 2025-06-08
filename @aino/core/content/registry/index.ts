import path from "path";
import fs from "fs";
import { parseMarkdown } from "../parser/parseMarkdown";
import { ContentMeta } from "@aino/core/types/ContentMeta";

const contentDir = path.join(process.cwd(), "content");

export function getAllContentMeta(): ContentMeta[] {
  const files = fs.readdirSync(contentDir);
  return files
    .filter(file => file.endsWith(".md"))
    .map(file => parseMarkdown(path.join(contentDir, file)).meta);
} 