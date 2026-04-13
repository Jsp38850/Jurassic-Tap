// Fichier JavaScript pour Jurassic Tap
console.log("Bienvenue dans Jurassic Tap !");

// Gestion de la version
const versionElement = document.getElementById('version');
let currentVersion = '0.0.0';

// Fonction pour charger la version depuis le fichier JSON
async function loadVersion() {
    try {
        const response = await fetch('version.json?t=' + Date.now()); // Cache buster
        const data = await response.json();
        const newVersion = data.version;
        
        // Mettre à jour si la version a changé
        if (newVersion !== currentVersion) {
            currentVersion = newVersion;
            versionElement.textContent = 'V.' + newVersion;
            console.log('Version mise à jour: V.' + newVersion);
        }
    } catch (error) {
        console.error('Erreur lors du chargement de la version:', error);
    }
}

// Charger la version au démarrage
loadVersion();

// Vérifier les mises à jour toutes les 2 secondes
setInterval(loadVersion, 2000);

// Easter egg : 5 clics sur la version affichent une image pendant 3 secondes
let versionClickCount = 0;
let versionClickResetTimer = null;
const easterEggOverlay = document.getElementById('easterEggOverlay');

function showEasterEgg() {
    if (!easterEggOverlay) return;
    easterEggOverlay.classList.add('show');
    setTimeout(() => {
        easterEggOverlay.classList.remove('show');
    }, 3000);
}

versionElement.addEventListener('click', () => {
    versionClickCount += 1;
    clearTimeout(versionClickResetTimer);
    versionClickResetTimer = setTimeout(() => {
        versionClickCount = 0;
    }, 2000);

    if (versionClickCount >= 5) {
        versionClickCount = 0;
        showEasterEgg();
    }
});

// Compteur simple
let compteur = 0;
const compteurElement = document.getElementById('compteur');

// Bouton auto-incrémentation
const autoIncrementBtn = document.getElementById('autoIncrementBtn');
let autoIncrementInterval = null;
let isAutoIncrementing = false;



// Fonction pour vérifier si le bouton doit être visible
function updateAutoIncrementBtnVisibility() {
    if (compteur >= 15 && !isAutoIncrementing) {
        autoIncrementBtn.style.display = 'block';
    } else if (!isAutoIncrementing) {
        autoIncrementBtn.style.display = 'none';
    }
}

// Fonction pour démarrer l'auto-incrémentation
function startAutoIncrement() {
    if (isAutoIncrementing) return;
    
    isAutoIncrementing = true;
    autoIncrementBtn.classList.add('active');
    autoIncrementBtn.style.display = 'block';
    
    autoIncrementInterval = setInterval(() => {
        compteur++;
        compteurElement.textContent = compteur;
    }, 1000);
}

// Fonction pour arrêter l'auto-incrémentation
function stopAutoIncrement() {
    if (!isAutoIncrementing) return;
    
    isAutoIncrementing = false;
    autoIncrementBtn.classList.remove('active');
    clearInterval(autoIncrementInterval);
    autoIncrementInterval = null;
    updateAutoIncrementBtnVisibility();
}

// Gestionnaire d'événement pour le bouton auto-incrémentation
autoIncrementBtn.addEventListener('click', () => {
    if (compteur >= 15 && !isAutoIncrementing) {
        compteur -= 15;
        compteurElement.textContent = compteur;
        startAutoIncrement();
    }
});

// Images cliquables pour incrémenter
const image1 = document.getElementById('image1');
const image2 = document.getElementById('image2');
const image3 = document.getElementById('image3');

image1.addEventListener('click', () => {
    compteur +=2;
    compteurElement.textContent = compteur;
    updateAutoIncrementBtnVisibility();
    updateProteinBtnVisibility();
});

image2.addEventListener('click', () => {
    compteur++;
    compteurElement.textContent = compteur;
    updateAutoIncrementBtnVisibility();
    updateProteinBtnVisibility();
});

image3.addEventListener('click', () => {
    compteur++;
    compteurElement.textContent = compteur;
    updateAutoIncrementBtnVisibility();
    updateProteinBtnVisibility();
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
                    updateAutoIncrementBtnVisibility();
                    updateProteinBtnVisibility();
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