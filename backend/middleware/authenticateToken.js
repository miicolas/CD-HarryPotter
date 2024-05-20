// authenticateToken middleware
import jwt from "jsonwebtoken";

export default async function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Token manquant" });
  }

  // Vérification du token
  jwt.verify(token, "secretKey", (error, decodedToken) => {
    // Vérification du token avec la clé secrète qui a servi à le créer
    if (error) {
      console.log("token invalide", error);
      return res.redirect("/signin.html");
    }
    req.user = decodedToken.user;
    next();
  });
}
