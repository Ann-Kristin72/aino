"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllContentMeta = getAllContentMeta;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const parseMarkdown_1 = require("../parser/parseMarkdown");
const contentDir = path_1.default.join(process.cwd(), "..", "content");
function getAllContentMeta() {
    console.log('📂 Leter etter innhold i:', contentDir);
    try {
        const files = fs_1.default.readdirSync(contentDir);
        console.log(`📑 Fant ${files.length} filer`);
        return files
            .filter(file => file.endsWith(".md"))
            .map(file => {
            console.log(`🔍 Leser fil: ${file}`);
            return (0, parseMarkdown_1.parseMarkdown)(path_1.default.join(contentDir, file)).meta;
        });
    }
    catch (error) {
        console.error('❌ Feil ved lesing av innholdskatalog:', error);
        return [];
    }
}
