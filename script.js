// Fichier JavaScript pour Jurassic Tap
console.log("Bienvenue dans Jurassic Tap !");

// Compteur simple
let compteur = 0;
const compteurElement = document.getElementById('compteur');

compteurElement.addEventListener('click', () => {
    compteur++;
    compteurElement.textContent = compteur;
});

// Exemple de fonction
function demarrerJeu() {
    alert("Le jeu commence !");
}

// Vous pouvez ajouter plus de code ici