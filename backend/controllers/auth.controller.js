import { prisma } from "../prisma.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


// ==============================
// REGISTER
// ==============================
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // 1 vérifier les champs
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Tous les champs sont obligatoires" });
    }

    // 2 vérifier si email existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({ message: "Email déjà utilisé" });
    }

    // 3 hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4 créer user
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      }
    });

    // 5 créer token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // 6 remove password
    const { password: _, ...userWithoutPassword } = user;

    res.status(201).json({
      user: userWithoutPassword,
      token
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ==============================
// LOGIN
// ==============================
export const login = async (req, res) => {
  try {

    const { email, password } = req.body;

    // 1 chercher user
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(400).json({ message: "Email ou mot de passe incorrect" });
    }

    // 2 comparer password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Email ou mot de passe incorrect" });
    }

    // 3 créer token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // 4 remove password
    const { password: _, ...userWithoutPassword } = user;

    res.json({
      user: userWithoutPassword,
      token
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ==============================
// GET PROFILE
// ==============================
export const getProfile = async (req, res) => {
  try {

    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        username: true,
        email: true,
        profile: true
      }
    });

    res.json(user);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};