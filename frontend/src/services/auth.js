import axios from "axios";

// Authentifier l'utilisateur (Login)
export const authenticateUser = async ({ email, password }) => {
  try {
    const { data } = await axios.post(
      "/api/auth/login",
      { email, password },
      { withCredentials: true }
    );

    return data;
  } 
};

// Créer un nouveau compte utilisateur (Register)
export const registerNewUser = async ({ username, email, password, imageProfile }) => {
  try {
    const { data } = await axios.post(
      "/api/auth/register",
      { username, email, password, imageProfile },
      { withCredentials: true }
    );

    return data;
  } 
};

// Récupérer le profil de l'utilisateur connecté
export const fetchUserProfile = async (token) => {
  try {
    const { data } = await axios.get("/api/auth/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    return data;
  
}