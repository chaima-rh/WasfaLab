import express from "express";
import {
  getAllRecettes,
  getRecetteById,
  createRecette,
  updateRecette,
  deleteRecette,
  getMesRecettes
} from "../controllers/recette.controller.js";

import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// public
router.get("/", getAllRecettes);
router.get("/:id", getRecetteById);

// private
router.use(verifyToken);
router.post("/", createRecette);
router.put("/:id", updateRecette);
router.delete("/:id", deleteRecette);
router.get("/mes-recettes", getMesRecettes);

export default router;