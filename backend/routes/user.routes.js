// backend/src/routes/user.routes.js
import express from "express";
import {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/", createUser);       // Create
router.get("/", getUsers);          // Read
router.put("/:id", updateUser);     // Update
router.delete("/:id", deleteUser);  // Delete

export default router;