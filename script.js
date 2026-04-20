//Fonction pour naviguer vers une page (nouvelle zone)
function goPage(page) {
  window.location.href = page;
}

console.log('Script chargé');

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

// Variable pour tracker l'amélioration auto-increment
let autoIncrementBought = false;
let autoIncrementInterval = null;






// Images cliquables pour incrémenter
const image1 = document.getElementById('image1');
const image2 = document.getElementById('image2');
const image3 = document.getElementById('image3');

image1.addEventListener('click', () => {
    console.log('Clic sur glucide');
    compteur +=2;
    compteurElement.textContent = compteur;
});

image2.addEventListener('click', () => {
    console.log('Clic sur proteine');
    compteur++;
    compteurElement.textContent = compteur;
});

image3.addEventListener('click', () => {
    console.log('Clic sur lipide');
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

function showZone6Modal() {
    const modal = new bootstrap.Modal(document.getElementById('zone6Modal'));
    modal.show();
}

function handleZone6Click() {
    const zone6 = document.getElementById('ZoneTraining');
    if (zone6.classList.contains('zone-lock')) {
        if (compteur >= 10) {
            zone6.classList.remove('zone-lock');
            zone6.classList.add('zone');
            const textSpan = zone6.querySelector('.zone-text');
            if (textSpan) textSpan.style.display = 'none';
            compteur -= 10;
            compteurElement.textContent = compteur;
            console.log('Zone 6 déverrouillée !');
        } else {
            console.log('Pas assez de points pour déverrouiller la zone 6');
        }
    } else {
        // Zone déverrouillée, ouvrir le modal
        showZone6Modal();
    }
}

// Fonction pour acheter l'amélioration auto-increment
function buyAutoIncrement() {
    if (autoIncrementBought) {
        alert('Amélioration déjà achetée !');
        return;
    }

    if (compteur >= 150) {
        // Déduire 150 du compteur
        compteur -= 150;
        compteurElement.textContent = compteur;
        autoIncrementBought = true;

        // Mettre à jour l'interface
        document.getElementById('autoIncrementBtn').style.display = 'none';
        document.getElementById('autoIncrementStatus').style.display = 'block';

        // Lancer l'auto-increment
        startAutoIncrement();
        console.log('Amélioration auto-increment achetée !');
    } else {
        
    }
}

// Fonction pour lancer l'auto-increment
function startAutoIncrement() {
    if (autoIncrementInterval) clearInterval(autoIncrementInterval);
    
    autoIncrementInterval = setInterval(() => {
        compteur += 1;
        compteurElement.textContent = compteur;
    }, 1000); // 1000ms = 1 seconde
}




