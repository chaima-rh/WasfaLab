import express from "express";
import { getPendingRecettes, approveRecette, rejectRecette } from "../controllers/admin.controller.js";
import { verifyToken, isAdmin } from "../middleware/auth.js";

const router = express.Router();

router.use(verifyToken);
router.use(isAdmin);

router.get("/pending", getPendingRecettes);
router.put("/approve/:id", approveRecette);
router.put("/reject/:id", rejectRecette);

export default router;