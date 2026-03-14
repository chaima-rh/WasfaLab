import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "Accès non autorisé" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Accès non autorisé" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, role }
    next();
  } catch (err) {
    return res.status(403).json({ message: "Token invalide" });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user.role !== "ADMIN")
    return res.status(403).json({ message: "Accès non autorisé" });
  next();
};