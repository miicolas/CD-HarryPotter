export function hashPassword(password) {
    let hash = 0; // Initialise le hash

    if (password.length === 0) { // Si le mot de passe est vide, renvoie le hash
        return hash;
    }

    for (let i = 0; i < password.length; i++) { // Parcours le mot de passe
        hash = (hash << 5) - hash + password.charCodeAt(i); // Multiplie le hash par 32 et y ajoute le code ASCII du caractère
        hash = hash & hash; // Convertit en entier 32 bits
    }

    return hash.toString(16); // Convertit en hexadécimal
}