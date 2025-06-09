"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseMarkdown = parseMarkdown;
const fs_1 = __importDefault(require("fs"));
const gray_matter_1 = __importDefault(require("gray-matter"));
function parseMarkdown(filePath) {
    const raw = fs_1.default.readFileSync(filePath, "utf-8");
    const { data, content } = (0, gray_matter_1.default)(raw);
    const meta = {
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
