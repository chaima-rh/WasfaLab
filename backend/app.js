import express from "express";
import cors from "cors";
import morgan from "morgan";
import "dotenv/config";

import userRoutes from "./routes/user.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/users", userRoutes);

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message });
});

export default app;