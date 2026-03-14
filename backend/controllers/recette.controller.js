import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();

// Récupérer toutes les recettes approuvées
export const getAllRecettes = async (req, res) => {
  try {
    const recettes = await prisma.recipe.findMany({
      where: { status: "APPROVED" },
      include: { author: true, category: true },
    });
    res.json(recettes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// Récupérer une recette par son id
export const getRecetteById = async (req, res) => {
  try {
    const recette = await prisma.recipe.findUnique({
      where: { id: req.params.id },
      include: { author: true, category: true }
    });
    res.json(recette);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Créer une nouvelle recette
export const createRecette = async (req, res) => {
  try {
    const recette = await prisma.recipe.create({
      data: { ...req.body, authorId: req.user.id, status: "PENDING" }
    });
    res.status(201).json(recette);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Modifier une recette
export const updateRecette = async (req, res) => {
  try {
    const recette = await prisma.recipe.findUnique({ where: { id: req.params.id } });

    if (req.user.role !== "ADMIN" && recette.authorId !== req.user.id)
      return res.status(403).json({ message: "Accès non autorisé" });

    const updated = await prisma.recipe.update({
      where: { id: req.params.id },
      data: req.body
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Supprimer une recette
export const deleteRecette = async (req, res) => {
  try {
    const recette = await prisma.recipe.findUnique({ where: { id: req.params.id } });
    if (!recette) return res.status(404).json({ message: "Recette introuvable" });

    if (recette.authorId !== req.user.id)
      return res.status(403).json({ message: "Accès non autorisé" });

    await prisma.recipe.delete({ where: { id: req.params.id } });
    res.json({ message: "Recette supprimée avec succès" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Récupérer les recettes de l'utilisateur connecté
export const getMesRecettes = async (req, res) => {
  try {
    const recettes = await prisma.recipe.findMany({
      where: { authorId: req.user.id }
    });
    res.json(recettes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};