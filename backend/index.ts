import express from "express";
import cors from "cors";
import contentRoute from "./routes/content";
import adminRoute from "./routes/admins";
import rolesRoute from "./routes/roles";
import categoriesRoute from "./routes/categories";
import onboardingRoute from "./routes/onboarding";
import libraryRoute from "./routes/library";
import progressRoute from "./routes/progress";

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

// Root endpoint for main URL
app.get("/", (req, res) => {
  res.send("🎉 Aino backend is alive!");
});

const PORT = parseInt(process.env.PORT || '3001');

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server kjører på port ${PORT}`);
});