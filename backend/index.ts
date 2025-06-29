import express from "express";
import cors from "cors";
import contentRoute from "./routes/content";
import adminRoute from "./routes/admins";
import rolesRoute from "./routes/roles";
import categoriesRoute from "./routes/categories";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/content", contentRoute);
app.use("/api/admins", adminRoute);
app.use("/api/roles", rolesRoute);
app.use("/api/categories", categoriesRoute);

app.listen(3001, () => {
  console.log("✅ Server kjører på http://localhost:3001");
});