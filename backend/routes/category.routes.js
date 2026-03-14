import express from "express";
import { getAllCategories, createCategory, updateCategory, deleteCategory } from "../controllers/category.controller.js";
import { verifyToken, isAdmin } from "../middleware/auth.js";

const router = express.Router();

// public
router.get("/", getAllCategories);

// private admin
router.use(verifyToken);
router.use(isAdmin);

router.post("/", createCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

export default router;