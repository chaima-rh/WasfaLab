import { prisma } from "../prisma.js";

// Get all recipes
export const getAllRecettes = async (req, res) => {
  try {
    const recettes = await prisma.recette.findMany({
      where: { statut: "VALIDEE" },
      include: {
        auteur: true,
        categorie: true,
      },
    });

    res.json(recettes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get recipe by id
export const getRecetteById = async (req, res) => {
  try {
    const recette = await prisma.recette.findUnique({
      where: { id: Number(req.params.id) },
      include: { auteur: true, categorie: true },
    });

    res.json(recette);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create recipe
export const createRecette = async (req, res) => {
  try {
    const recette = await prisma.recette.create({
      data: {
        ...req.body,
        auteurId: req.user.id,
        statut: "EN_ATTENTE",
      },
    });

    res.status(201).json(recette);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update recipe
export const updateRecette = async (req, res) => {
  try {
    const recette = await prisma.recette.update({
      where: { id: Number(req.params.id) },
      data: req.body,
    });

    res.json(recette);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete recipe
export const deleteRecette = async (req, res) => {
  try {
    await prisma.recette.delete({
      where: { id: Number(req.params.id) },
    });

    res.json({ message: "Recipe deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get my recipes
export const getMesRecettes = async (req, res) => {
  try {
    const recettes = await prisma.recette.findMany({
      where: { auteurId: req.user.id },
    });

    res.json(recettes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};