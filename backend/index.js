"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const content_1 = __importDefault(require("./routes/content"));
const admins_1 = __importDefault(require("./routes/admins"));
const roles_1 = __importDefault(require("./routes/roles"));
const categories_1 = __importDefault(require("./routes/categories"));
const onboarding_1 = __importDefault(require("./routes/onboarding"));
const library_1 = __importDefault(require("./routes/library"));
const progress_1 = __importDefault(require("./routes/progress"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/content", content_1.default);
app.use("/api/admins", admins_1.default);
app.use("/api/roles", roles_1.default);
app.use("/api/categories", categories_1.default);
app.use("/api/library", library_1.default);
app.use("/api/progress", progress_1.default);
app.use("/api", onboarding_1.default);
// Ping endpoint for health check
app.get("/ping", (req, res) => {
    res.json({ message: "pong", timestamp: new Date().toISOString() });
});
// Root endpoint for main URL
app.get("/", (req, res) => {
    res.send("🎉 Aino backend is alive!");
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`✅ Server kjører på port ${PORT}`);
});
