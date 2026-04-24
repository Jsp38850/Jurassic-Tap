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
