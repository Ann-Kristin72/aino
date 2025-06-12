"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseMarkdownToSections = parseMarkdownToSections;
async function parseMarkdownToSections(slug) {
    const response = await fetch(`/api/content/${encodeURIComponent(slug)}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch content for ${slug}`);
    }
    const data = await response.json();
    return data;
}
