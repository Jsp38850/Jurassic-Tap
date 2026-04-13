// Fichier JavaScript pour Jurassic Tap
console.log("Bienvenue dans Jurassic Tap !");

// Compteur simple
let compteur = 0;
const compteurElement = document.getElementById('compteur');

// Images cliquables pour incrémenter
const image1 = document.getElementById('image1');
const image2 = document.getElementById('image2');
const image3 = document.getElementById('image3');

image1.addEventListener('click', () => {
    compteur++;
    compteurElement.textContent = compteur;
});

image2.addEventListener('click', () => {
    compteur++;
    compteurElement.textContent = compteur;
});

image3.addEventListener('click', () => {
    compteur++;
    compteurElement.textContent = compteur;
});

// Exemple de fonction
function demarrerJeu() {
    alert("Le jeu commence !");
}

// Vous pouvez ajouter plus de code ici