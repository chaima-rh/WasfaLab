import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();

// Récupérer toutes les catégories
export const getAllCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany({ include: { recipes: true } });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Créer une catégorie (Admin)
export const createCategory = async (req, res) => {
  try {
    const category = await prisma.category.create({ data: { name: req.body.name } });
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Modifier une catégorie (Admin)
export const updateCategory = async (req, res) => {
  try {
    const category = await prisma.category.update({
      where: { id: Number(req.params.id) },
      data: { name: req.body.name }
    });
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Supprimer une catégorie (Admin)
export const deleteCategory = async (req, res) => {
  try {
    await prisma.category.delete({ where: { id: Number(req.params.id) } });
    res.json({ message: "Catégorie supprimée avec succès" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};