import { prisma } from "../prismaClient.js";

// Recipes waiting approval
export const getPendingRecettes = async (req, res) => {
  try {
    const recettes = await prisma.recette.findMany({
      where: { statut: "EN_ATTENTE" },
      include: { auteur: true },
    });

    res.json(recettes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Approve recipe
export const approveRecette = async (req, res) => {
  try {
    const recette = await prisma.recette.update({
      where: { id: Number(req.params.id) },
      data: { statut: "VALIDEE" },
    });

    res.json(recette);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Reject recipe
export const rejectRecette = async (req, res) => {
  try {
    const recette = await prisma.recette.update({
      where: { id: Number(req.params.id) },
      data: { statut: "REFUSEE" },
    });

    res.json(recette);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete user
export const deleteUserByAdmin = async (req, res) => {
  try {
    await prisma.user.delete({
      where: { id: Number(req.params.id) },
    });

    res.json({ message: "User deleted by admin" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};