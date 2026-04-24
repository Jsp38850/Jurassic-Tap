//Fonction pour naviguer vers une page (nouvelle zone)
function goPage(page) {
  window.location.href = page;
}

// Fonction pour ouvrir le modal des paramètres
function openSettingsModal() {
  const settingsModal = new bootstrap.Modal(document.getElementById('settingsModal'));
  settingsModal.show();
}

console.log('Script chargé');

// Gestion de la version
const versionElement = document.getElementById('version');
let currentVersion = '0.0.0';
const VERSION_POLL_INTERVAL_MS = 10000;
const IS_FILE_PROTOCOL = window.location.protocol === 'file:';
let hasWarnedVersionFileMode = false;

// Fonction pour charger la version depuis le fichier JSON
async function loadVersion() {
    if (!versionElement) return;

    // En ouvrant index.html en file://, le navigateur bloque fetch(version.json)
    if (IS_FILE_PROTOCOL) {
        if (!hasWarnedVersionFileMode) {
            console.warn('Mode file:// détecté : chargement de version.json désactivé (CORS navigateur). Lance le jeu via un serveur local (http://) pour activer la version dynamique.');
            hasWarnedVersionFileMode = true;
        }
        versionElement.textContent = 'V.local';
        return;
    }

    try {
        const response = await fetch('version.json?t=' + Date.now()); // Cache buster
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        const newVersion = typeof data.version === 'string' ? data.version.trim() : '';
        if (!newVersion) {
            throw new Error('Champ "version" manquant ou invalide dans version.json');
        }
        
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

// Vérifier les mises à jour régulièrement
if (!IS_FILE_PROTOCOL) {
    setInterval(loadVersion, VERSION_POLL_INTERVAL_MS);
}


// Compteur simple
let compteur = 0;
const compteurElement = document.getElementById('compteur');

// Compteurs individuels pour chaque nutriment
let proteineCounter = 0;
let glucideCounter = 0;
let lipideCounter = 0;
const proteineCounterElement = document.getElementById('proteine-counter');
const glucideCounterElement = document.getElementById('glucide-counter');
const lipideCounterElement = document.getElementById('lipide-counter');

// Variable pour tracker l'amélioration auto-increment
let autoIncrementBought = false;
let autoIncrementInterval = null;

// Jauge de progression
let gaugeLevel = 1;
let gaugeCounter = 0;
let gaugeMax = 100;
const gaugeLevelElement = document.getElementById('gauge-level');
const gaugeCounterElement = document.getElementById('gauge-counter');
const gaugeFillElement = document.getElementById('gauge-fill');
const gaugeProgressElement = document.getElementById('gauge-progress');

// Fonction pour mettre à jour l'affichage de la jauge
function updateGauge() {
    const percentage = (gaugeCounter / gaugeMax) * 100;
    gaugeFillElement.style.width = percentage + '%';
    gaugeProgressElement.textContent = gaugeCounter + ' / ' + gaugeMax;
    gaugeLevelElement.textContent = '+' + (gaugeLevel - 1);
}

// Fonction pour incrémenter la jauge
function incrementGauge() {
    gaugeCounter++;
    if (gaugeCounter >= gaugeMax) {
        // La jauge est pleine, on réinitialise et on augmente le niveau
        gaugeCounter = 0;
        gaugeLevel++;
        // Augmenter la capacité de 20% (arrondi)
        gaugeMax = Math.round(gaugeMax * 1.2);
        console.log('Jauge pleine ! Niveau ' + gaugeLevel + ' - Capacité: ' + gaugeMax);
    }
    updateGauge();
}






// Images cliquables pour incrémenter
const image1 = document.getElementById('image1');
const image2 = document.getElementById('image2');
const image3 = document.getElementById('image3');

image1.addEventListener('click', () => {
    console.log('Clic sur glucide');
    compteur += 2;
    glucideCounter++;
    compteurElement.textContent = compteur;
    glucideCounterElement.textContent = glucideCounter;
    incrementGauge();
});

image2.addEventListener('click', () => {
    console.log('Clic sur proteine');
    compteur++;
    proteineCounter++;
    compteurElement.textContent = compteur;
    proteineCounterElement.textContent = proteineCounter;
    incrementGauge();
});

image3.addEventListener('click', () => {
    console.log('Clic sur lipide');
    compteur++;
    lipideCounter++;
    compteurElement.textContent = compteur;
    lipideCounterElement.textContent = lipideCounter;
    incrementGauge();
});

// Boutons sauvegarde et chargement
const sauvegardeBtn = document.getElementById('sauvegarde');
const chargementBtn = document.getElementById('chargement');
const debugResetSaveBtn = document.getElementById('debugResetSave');
const fileInput = document.getElementById('fileInput');

sauvegardeBtn.addEventListener('click', () => {
    const data = {
        compteur: compteur,
        proteineCounter: proteineCounter,
        glucideCounter: glucideCounter,
        lipideCounter: lipideCounter,
        autoIncrementBought: autoIncrementBought,
        zonesUnlocked: zonesUnlocked,
        gaugeLevel: gaugeLevel,
        gaugeCounter: gaugeCounter,
        gaugeMax: gaugeMax
    };
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Save JurassicTap.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeURL(url);
});

chargementBtn.addEventListener('click', () => {
    fileInput.click();
});

// Fonction globale appelée par le bouton debug (onclick dans le HTML)
function debugResetLocalSave() {
    const confirmed = confirm('DEBUG: supprimer la sauvegarde locale et recommencer le jeu depuis le début ?');
    if (!confirmed) return;

    try {
        isDebugResetInProgress = true;
        localStorage.removeItem('jurassicTapSave');
        console.log('DEBUG: localStorage reset effectué');
        window.location.reload();
    } catch (e) {
        console.error('DEBUG: erreur lors du reset localStorage:', e);
    }
}

// Exposer la fonction au scope global pour l'attribut onclick HTML
window.debugResetLocalSave = debugResetLocalSave;

fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                if (data.compteur !== undefined) {
                    // Restaurer le compteur principal
                    compteur = data.compteur;
                    compteurElement.textContent = compteur;
                    
                    // Restaurer les compteurs individuels
                    if (data.proteineCounter !== undefined) {
                        proteineCounter = data.proteineCounter;
                        proteineCounterElement.textContent = proteineCounter;
                    }
                    if (data.glucideCounter !== undefined) {
                        glucideCounter = data.glucideCounter;
                        glucideCounterElement.textContent = glucideCounter;
                    }
                    if (data.lipideCounter !== undefined) {
                        lipideCounter = data.lipideCounter;
                        lipideCounterElement.textContent = lipideCounter;
                    }
                    
                    // Restaurer l'amélioration auto-increment
                    if (data.autoIncrementBought !== undefined) {
                        autoIncrementBought = data.autoIncrementBought;
                        if (autoIncrementBought) {
                            document.getElementById('autoIncrementBtn').style.display = 'none';
                            document.getElementById('autoIncrementStatus').style.display = 'block';
                            startAutoIncrement();
                        }
                    }
                    
                    // Restaurer les zones déverrouillées
                    if (data.zonesUnlocked !== undefined) {
                        zonesUnlocked = data.zonesUnlocked;
                        restoreZonesState();
                    }
                    
                    // Restaurer la jauge de progression
                    if (data.gaugeLevel !== undefined) {
                        gaugeLevel = data.gaugeLevel;
                        gaugeCounter = data.gaugeCounter || 0;
                        gaugeMax = data.gaugeMax || 100;
                        updateGauge();
                    }
                    
                    console.log('Sauvegarde chargée avec succès !');
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

// ==================== SAUVEGARDE AUTOMATIQUE ====================

// Empêche une re-sauvegarde juste avant un reset debug
let isDebugResetInProgress = false;

// Fonction pour sauvegarder dans le localStorage
function saveToLocalStorage() {
    if (isDebugResetInProgress) return;

    const saveData = {
        compteur: compteur,
        proteineCounter: proteineCounter,
        glucideCounter: glucideCounter,
        lipideCounter: lipideCounter,
        autoIncrementBought: autoIncrementBought,
        zonesUnlocked: zonesUnlocked,
        gaugeLevel: gaugeLevel,
        gaugeCounter: gaugeCounter,
        gaugeMax: gaugeMax,
        timestamp: Date.now()
    };
    try {
        localStorage.setItem('jurassicTapSave', JSON.stringify(saveData));
        console.log('Sauvegarde automatique dans localStorage');
    } catch (e) {
        console.error('Erreur lors de la sauvegarde automatique:', e);
    }
}

// Fonction pour charger depuis le localStorage
function loadFromLocalStorage() {
    try {
        const savedData = localStorage.getItem('jurassicTapSave');
        if (savedData) {
            const data = JSON.parse(savedData);
            if (data.compteur !== undefined) {
                // Restaurer le compteur principal
                compteur = data.compteur;
                compteurElement.textContent = compteur;
                
                // Restaurer les compteurs individuels
                if (data.proteineCounter !== undefined) {
                    proteineCounter = data.proteineCounter;
                    proteineCounterElement.textContent = proteineCounter;
                }
                if (data.glucideCounter !== undefined) {
                    glucideCounter = data.glucideCounter;
                    glucideCounterElement.textContent = glucideCounter;
                }
                if (data.lipideCounter !== undefined) {
                    lipideCounter = data.lipideCounter;
                    lipideCounterElement.textContent = lipideCounter;
                }
                
                // Restaurer l'amélioration auto-increment
                if (data.autoIncrementBought !== undefined) {
                    autoIncrementBought = data.autoIncrementBought;
                    if (autoIncrementBought) {
                        document.getElementById('autoIncrementBtn').style.display = 'none';
                        document.getElementById('autoIncrementStatus').style.display = 'block';
                        startAutoIncrement();
                    }
                }
                
                // Restaurer les zones déverrouillées
                if (data.zonesUnlocked !== undefined) {
                    zonesUnlocked = data.zonesUnlocked;
                    restoreZonesState();
                }
                
                // Restaurer la jauge de progression
                if (data.gaugeLevel !== undefined) {
                    gaugeLevel = data.gaugeLevel;
                    gaugeCounter = data.gaugeCounter || 0;
                    gaugeMax = data.gaugeMax || 100;
                    updateGauge();
                }
                
                console.log('Sauvegarde automatique chargée depuis localStorage');
                return true;
            }
        }
    } catch (e) {
        console.error('Erreur lors du chargement depuis localStorage:', e);
    }
    return false;
}

// Charger la sauvegarde automatique au démarrage
loadFromLocalStorage();

// Sauvegarder automatiquement toutes les 30 secondes
setInterval(saveToLocalStorage, 30000);

// Sauvegarder automatiquement quand on quitte la page
window.addEventListener('beforeunload', saveToLocalStorage);

// ==================== FIN SAUVEGARDE AUTOMATIQUE ====================









