

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import recipeRoutes from "./routes/recipe.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import adminRoutes from "./routes/admin.routes.js";


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/admin", adminRoutes);


export default app;