const fs = require('fs/promises');
const path = require('path');

const CONTENT_ROOT = path.join(process.cwd(), '@aino/core/content');
const OUTPUT_FILE = path.join(process.cwd(), '@aino/core/metadata-index.json');

const extractMetadata = async () => {
  const categories = await fs.readdir(CONTENT_ROOT);
  const metadataList = [];

  for (const category of categories) {
    const categoryPath = path.join(CONTENT_ROOT, category);
    // Only process directories
    if (!(await fs.stat(categoryPath)).isDirectory()) continue;
    const files = await fs.readdir(categoryPath);

    for (const file of files) {
      if (!file.endsWith('.md')) continue;
      const filePath = path.join(categoryPath, file);
      const content = await fs.readFile(filePath, 'utf-8');
      const match = content.match(/\[\/\/\]: # \((\{.*\})\)/);
      if (!match) continue;

      try {
        const json = JSON.parse(match[1]);
        metadataList.push({
          id: file,
          title: json.title || file.replace('.md', ''),
          audience: Array.isArray(json.audience) ? json.audience : [json.audience],
          context: Array.isArray(json.context) ? json.context : [json.context],
          filePath,
        });
      } catch (err) {
        console.warn(`Failed to parse metadata in ${file}:`, err);
      }
    }
  }

  await fs.writeFile(OUTPUT_FILE, JSON.stringify(metadataList, null, 2), 'utf-8');
  console.log(`✅ metadata-index.json generated at ${OUTPUT_FILE}`);
};

extractMetadata(); 