// authenticateToken middleware
import jwt from 'jsonwebtoken';

 export default async function authenticateToken(req, res, next) {
  const token = req.cookies.AuthToken; // Récupération du token depuis les cookies


  if (!token) {
    return res.redirect('/signin.html'); // Redirection vers la page de connexion si le token est manquant
  }

  // Vérification du token
  jwt.verify(token, 'secretKey', (error, decodedToken) => { // Vérification du token avec la clé secrète qui a servi à le créer
    if (error) {
      console.log ('token invalide', error)
      return res.redirect('/signin.html');
    }
    req.user = decodedToken.user; 
    next();
  });

}


