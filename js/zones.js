// ==================== GESTION DES ZONES ====================

// État des zones déverrouillées
let zonesUnlocked = {
  zone1: false,
  zone2: false,
  zone3: false,
  zone4: false,
  zone5: false,
  zone6: false,
  zone7: false
};

// Coûts pour déverrouiller chaque zone
const ZONE_COSTS = {
  zone1: 100,
  zone2: 1000,
  zone3: 5000,
  zone4: 10000,
  zone5: 100000,
  zone6: 10,
  zone7: 1000000
};

// Mapping des éléments de zones
const ZONE_ELEMENTS = {
  zone1: () => document.querySelector('.zone1'),
  zone2: () => document.querySelector('.zone2'),
  zone3: () => document.querySelector('.zone3'),
  zone4: () => document.querySelector('.zone4'),
  zone5: () => document.querySelector('.zone5'),
  zone6: () => document.getElementById('ZoneTraining'),
  zone7: () => document.querySelector('.zone7')
};

// Fonction pour déverrouiller une zone
function unlockZone(zoneName, cost) {
  const zoneElement = ZONE_ELEMENTS[zoneName]();
  if (!zoneElement) {
    console.log(`Zone ${zoneName} non trouvée`);
    return false;
  }

  if (zonesUnlocked[zoneName]) {
    console.log(`Zone ${zoneName} déjà déverrouillée`);
    return true;
  }

  if (compteur >= cost) {
    compteur -= cost;
    compteurElement.textContent = compteur;
    zonesUnlocked[zoneName] = true;
    
    // Mettre à jour l'apparence de la zone
    zoneElement.classList.remove('zone-lock');
    zoneElement.classList.add('zone');
    const textSpan = zoneElement.querySelector('.zone-text');
    if (textSpan) textSpan.style.display = 'none';
    
    console.log(`Zone ${zoneName} déverrouillée !`);
    return true;
  } else {
    console.log(`Pas assez de points pour déverrouiller la zone ${zoneName}`);
    return false;
  }
}

// Fonction pour restaurer l'état des zones
function restoreZonesState() {
  for (const [zoneName, isUnlocked] of Object.entries(zonesUnlocked)) {
    const zoneElement = ZONE_ELEMENTS[zoneName]();
    if (zoneElement && isUnlocked) {
      zoneElement.classList.remove('zone-lock');
      zoneElement.classList.add('zone');
      const textSpan = zoneElement.querySelector('.zone-text');
      if (textSpan) textSpan.style.display = 'none';
    }
  }
}

// Fonction pour afficher le modal de la zone 6
function showZone6Modal() {
  const modal = new bootstrap.Modal(document.getElementById('zone6Modal'));
  modal.show();
}

// Gestionnaire de clic pour la zone 6
function handleZone6Click() {
  const zone6 = ZONE_ELEMENTS.zone6();
  if (!zone6) return;

  if (zone6.classList.contains('zone-lock')) {
    // Tenter de déverrouiller la zone 6 (sans ouvrir le modal)
    unlockZone('zone6', ZONE_COSTS.zone6);
  } else {
    // Zone déjà déverrouillée, ouvrir le modal
    showZone6Modal();
  }
}

// Gestionnaires de clic pour les autres zones
function handleZoneClick(zoneName) {
  const zoneElement = ZONE_ELEMENTS[zoneName]();
  if (!zoneElement) return;

  if (zoneElement.classList.contains('zone-lock')) {
    // Tenter de déverrouiller la zone
    if (unlockZone(zoneName, ZONE_COSTS[zoneName])) {
      // Zone déverrouillée
    }
  } else {
    // Zone déjà déverrouillée - action par défaut (navigation ou autre)
    console.log(`Zone ${zoneName} cliquée (déverrouillée)`);
  }
}

// Initialiser les écouteurs d'événements pour les zones
function initZoneListeners() {
  // Zone 6 a un gestionnaire spécial via onclick dans le HTML
  // Pour les autres zones, on ajoute des écouteurs
  const otherZones = ['zone1', 'zone2', 'zone3', 'zone4', 'zone5', 'zone7'];
  otherZones.forEach(zoneName => {
    const zoneElement = ZONE_ELEMENTS[zoneName]();
    if (zoneElement) {
      zoneElement.addEventListener('click', () => handleZoneClick(zoneName));
    }
  });
}

// Fonction pour charger les zones depuis le localStorage
function loadZonesFromLocalStorage() {
  try {
    const savedData = localStorage.getItem('jurassicTapSave');
    if (savedData) {
      const data = JSON.parse(savedData);
      if (data.zonesUnlocked !== undefined) {
        // Fusionner les données sauvegardées avec l'état actuel
        for (const [key, value] of Object.entries(data.zonesUnlocked)) {
          if (zonesUnlocked.hasOwnProperty(key)) {
            zonesUnlocked[key] = value;
          }
        }
        console.log('Zones chargées depuis localStorage');
        return true;
      }
    }
  } catch (e) {
    console.error('Erreur lors du chargement des zones depuis localStorage:', e);
  }
  return false;
}

// Exporter les fonctions et variables pour utilisation externe
window.zonesUnlocked = zonesUnlocked;
window.restoreZonesState = restoreZonesState;
window.showZone6Modal = showZone6Modal;
window.handleZone6Click = handleZone6Click;
window.unlockZone = unlockZone;
window.initZoneListeners = initZoneListeners;
window.loadZonesFromLocalStorage = loadZonesFromLocalStorage;

// Initialiser au chargement - charger depuis localStorage puis restaurer l'état
document.addEventListener('DOMContentLoaded', () => {
  loadZonesFromLocalStorage();
  restoreZonesState();
  initZoneListeners();
});
