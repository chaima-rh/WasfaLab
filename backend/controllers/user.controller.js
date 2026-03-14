// backend/src/controllers/user.controller.js
import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();
import bcrypt from "bcryptjs";

export const createUser = async (req, res) => {
  const { username, email, password, imageProfile } = req.body;

  if (!username || !email || !password || password.length <= 6) {
    return res.status(400).json({ message: "Tous les champs sont obligatoires" });
  }

  try {

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { username, email, password: hashedPassword, imageProfile },
    });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, username: true, email: true, imageProfile: true },
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, imageProfile } = req.body;

 

  try {
    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: { username, email,imageProfile },
    });

    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
      select: { id: true, username: true, email: true, imageProfile: true },
    });
    if (!user) return res.status(404).json({ message: "Utilisateur introuvable" });
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.user.delete({ where: { id: Number(id) } });
    res.json({ message: "Utilisateur supprimé avec succès" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};