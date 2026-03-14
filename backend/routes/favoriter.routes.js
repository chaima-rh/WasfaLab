import express from "express";
import { toggleFavorite, getUserFavorites } from "../controllers/favoris.controller.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.use(verifyToken);

router.get("/", getUserFavorites);
router.post("/:id/toggle", toggleFavorite); // id ديال الوصفة

export default router;