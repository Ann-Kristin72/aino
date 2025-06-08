import fs from "fs";
import matter from "gray-matter";
import { ContentMeta } from "@aino/core/types/ContentMeta";

export interface ParsedContent {
  meta: ContentMeta;
  body: string;
}

export function parseMarkdown(filePath: string): ParsedContent {
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  const meta: ContentMeta = {
    id: data.id || filePath.split("/").pop()?.replace(".md", "") || "",
    title: data.title,
    type: data.type,
    module: data.module,
    level: data.roles,
    context: data.context,
    tags: data.tags || [],
    createdBy: data.createdBy || "unknown",
    createdAt: data.createdAt || new Date().toISOString(),
    status: data.status || "active"
  };

  return { meta, body: content };
} 