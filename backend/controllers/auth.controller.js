import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Inscription d'un nouvel utilisateur
export const register = async (req, res) => {
  try {
    const { username, email, password, imageProfile } = req.body;
    if (!username || !email || !password || !imageProfile)
      return res.status(400).json({ message: "Tous les champs sont obligatoires" }); 

    const userexist = await prisma.user.findUnique({ where: { email } });
    if (userexist) return res.status(400).json({ message: "Cet email existe déjà" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { username, email, password: hashedPassword, imageProfile }
    });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({ user, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Connexion de l'utilisateur
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user)
      return res.status(400).json({ message: "Email ou mot de passe incorrect" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(400).json({ message: "Email ou mot de passe incorrect" });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ user, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Récupérer les informations du profil
export const getProfile = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        username: true,
        email: true,
        imageProfile: true,
        role: true
      }
    });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};