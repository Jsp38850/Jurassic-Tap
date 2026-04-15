# Changelog

Tous les changements notables apportés au projet Jurrasic Tap seront documentés dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
et ce projet adhère au [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.7.0] - 2026-04-15

### Ajouté

- Ajout d'un arrière-plan (background)
- Premier essai d'implémentation de cartes (maps)
- Ajout d'images pour les dinosaures et montagnes

### Modifié

- Mise à jour de `index.html`, `script.js` et `style.css` pour intégrer les nouvelles fonctionnalités

## [1.6.0] - 2026-04-13

### Ajouté

- Intégration de Bootstrap 5 via CDN pour la responsivité et le styling
- Restructuration de la mise en page avec des classes Bootstrap (container, row, col-md-4, text-center, btn, img-fluid)
- Suppression des styles CSS conflictuels dans `style.css` pour laisser Bootstrap gérer la responsivité

### Modifié

- Mise à jour de la structure HTML pour être responsive sur tous les appareils

## [1.5.0] - 2026-04-13

### Ajouté

- Ajout de boutons "Sauvegarde" et "Chargement" dans `index.html`
- Implémentation de la sauvegarde : téléchargement d'un fichier JSON avec le compteur actuel
- Implémentation du chargement : sélection et lecture d'un fichier JSON pour restaurer le compteur
- Ajout de styles pour les boutons dans `style.css`

## [1.4.0] - 2026-04-13

### Ajouté

- Ajout de légendes sous chaque image dans `index.html` en utilisant `<figure>` et `<figcaption>`
- Mise à jour des styles dans `style.css` pour centrer les images et styliser les légendes

## [1.3.0] - 2026-04-13

### Ajouté

- Ajout de 3 images cliquables dans `index.html` pour incrémenter le compteur
- Implémentation des écouteurs d'événements sur les images dans `script.js`
- Ajout de styles pour les images dans `style.css` : taille fixe, curseur pointeur, marges et bordures

### Modifié

- Suppression de l'incrémentation au clic sur le compteur lui-même ; désormais uniquement via les images

## [1.2.0] - 2026-04-13

### Ajouté

- Ajout d'une balise favicon dans `index.html` pour personnaliser l'icône de l'onglet

## [1.1.0] - 2026-04-13

### Ajouté

- Ajout d'un compteur cliquable dans `index.html` avec un élément `<div id="compteur">`
- Implémentation de la logique du compteur dans `script.js` : incrémentation au clic sur le compteur
- Ajout de styles pour le compteur dans `style.css` : curseur pointeur, padding, fond blanc, bordure et coins arrondis

### Modifié

- Suppression du bouton "Incrémenter" dans `index.html` pour rendre le compteur directement cliquable

## [1.0.0] - 2026-04-13

### Ajouté

- Création de la structure HTML de base dans `index.html`
- Ajout du fichier `style.css` avec des styles CSS de base pour le corps, les titres et les paragraphes
- Ajout du fichier `script.js` avec du code JavaScript initial, incluant une fonction exemple
- Mise à jour d'`index.html` pour inclure les liens vers `style.css` et `script.js`
