import express from "express";
import cors from "cors";
import contentRoute from "./routes/content";
import adminRoute from "./routes/admins";
import rolesRoute from "./routes/roles";
import categoriesRoute from "./routes/categories";
import onboardingRoute from "./routes/onboarding";
import libraryRoute from "./routes/library";
import progressRoute from "./routes/progress";

// Log environment variables for debugging
console.log("🔍 Environment Debug:");
console.log("PORT:", process.env.PORT);
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("DB URL (first 30 chars):", process.env.DATABASE_URL?.slice(0, 30) + "...");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/content", contentRoute);
app.use("/api/admins", adminRoute);
app.use("/api/roles", rolesRoute);
app.use("/api/categories", categoriesRoute);
app.use("/api/library", libraryRoute);
app.use("/api/progress", progressRoute);
app.use("/api", onboardingRoute);

// Ping endpoint for health check
app.get("/ping", (req, res) => {
  res.json({ message: "pong", timestamp: new Date().toISOString() });
});

// Health endpoint for health check
app.get("/health", (_req, res) => {
  res.status(200).send("OK");
});

// Root endpoint for main URL
app.get("/", (req, res) => {
  res.send("🎉 Aino backend is alive!");
});

const PORT = parseInt(process.env.PORT || '3001');

// Error handler - must be last
app.use((err: any, req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error("❌ Unhandled error:", err);
  res.status(500).send("Internal Server Error");
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server kjører på port ${PORT}`);
}).on('error', (err) => {
  console.error('❌ Server error:', err);
});