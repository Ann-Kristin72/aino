import { parseMarkdownToSections } from "./core/content/parseMarkdownToSections";

async function testParser() {
  try {
    const result = await parseMarkdownToSections("e2c769fc-9b10-4bc0-ae0f-0cecad7fde23");
    console.log("✅ Parsing successful!");
    console.log("Result:", JSON.stringify(result, null, 2));
  } catch (error) {
    console.error("❌ Error parsing markdown:", error);
  }
}

testParser(); 