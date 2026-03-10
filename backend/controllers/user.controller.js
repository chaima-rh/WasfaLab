// backend/src/controllers/user.controller.js
import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();
import bcrypt from "bcryptjs";

/**
 * إنشاء مستخدم جديد
 */
export const createUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password || password.length <= 6) {
    return res.status(400).json({ message: "جميع الحقول مطلوبة" });
  }

  try {
    
    const hashedPassword = await bcrypt.hash(password, 10);

    
    const user = await prisma.user.create({
      data: { username, email, password: hashedPassword },
    });

    

    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, username: true, email: true,imageProfile: true}, 
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * تحديث مستخدم بواسطة ID
 */
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email } = req.body;

  if (!username && !email) {
    return res.status(400).json({ message: "دخل اسم المستخدم أو الإيميل للتحديث" });
  }

  try {
    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: { username, email },
    });

    const { password: _, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/**
 * حذف مستخدم بواسطة ID
 */
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.user.delete({ where: { id: Number(id) } });
    res.json({ message: "تم حذف المستخدم بنجاح" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};