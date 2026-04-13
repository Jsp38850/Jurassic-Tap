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

// Boutons sauvegarde et chargement
const sauvegardeBtn = document.getElementById('sauvegarde');
const chargementBtn = document.getElementById('chargement');
const fileInput = document.getElementById('fileInput');

sauvegardeBtn.addEventListener('click', () => {
    const data = { compteur: compteur };
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Save JurassicTap.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});

chargementBtn.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                if (data.compteur !== undefined) {
                    compteur = data.compteur;
                    compteurElement.textContent = compteur;
                } else {
                    alert('Fichier JSON invalide.');
                }
            } catch (error) {
                alert('Erreur lors de la lecture du fichier.');
            }
        };
        reader.readAsText(file);
    }
});

// Exemple de fonction
function demarrerJeu() {
    alert("Le jeu commence !");
}

// Vous pouvez ajouter plus de code ici