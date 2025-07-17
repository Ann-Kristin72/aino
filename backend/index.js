"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var content_1 = __importDefault(require("./dist/routes/content"));
var admins_1 = __importDefault(require("./dist/routes/admins"));
var roles_1 = __importDefault(require("./dist/routes/roles"));
var categories_1 = __importDefault(require("./dist/routes/categories"));
var onboarding_1 = __importDefault(require("./dist/routes/onboarding"));
var library_1 = __importDefault(require("./dist/routes/library"));
var progress_1 = __importDefault(require("./dist/routes/progress"));

// Log environment variables for debugging
console.log("🔍 Environment Debug:");
console.log("PORT:", process.env.PORT);
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("DB URL (first 30 chars):", process.env.DATABASE_URL ? process.env.DATABASE_URL.slice(0, 30) + "..." : "undefined");

var app = (0, express_1.default)();
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
app.get("/ping", function (req, res) {
    res.json({ message: "pong", timestamp: new Date().toISOString() });
});

// Health endpoint for health check
app.get("/health", function (_req, res) {
    res.status(200).send("OK");
});

// Root endpoint for main URL
app.get("/", function (req, res) {
    res.send("🎉 Aino backend is alive!");
});

var PORT = parseInt(process.env.PORT || '3001');

// Error handler - must be last
app.use(function (err, req, res, _next) {
    console.error("❌ Unhandled error:", err);
    res.status(500).send("Internal Server Error");
});

app.listen(PORT, '0.0.0.0', function () {
    console.log("✅ Server kjører på port " + PORT);
}).on('error', function (err) {
    console.error('❌ Server error:', err);
});
