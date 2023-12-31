const { query } = require("../config/queries");

async function getProfil(req, res) {
  try {
    const userId = req.user.id;

    const userInfo = await query("SELECT username, name FROM account WHERE id = ?", [userId]);
    if (userInfo.length === 0) {
      return res.redirect('login');
    }

    const cards_user = await query("SELECT * FROM cards JOIN UsersCards ON cards.id_card = UsersCards.id_card WHERE id_user = ?", [userId]);

    let message = ''; 

    if (cards_user.length === 0) {
      // If the user has no cards, set the message
      message = "Vous n'avez pas encore de cartes";
    }

    res.render('profil', {
      username: userInfo[0].username,
      name: userInfo[0].name,
      message: message, 
      cards: cards_user 
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la récupération du profil de l'utilisateur" });
  }
}
module.exports = {   getProfil, };