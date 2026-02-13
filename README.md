# 🏋️ GYMZONE – Plateforme de Réservation d'Entraînement

Une plateforme web moderne de réservation d'entraînement conçue pour les amateurs de fitness. GYMZONE offre une expérience utilisateur fluide et réactive pour découvrir, réserver et suivre vos séances d'entraînement préférées.

<img src="https://img.shields.io/badge/HTML5-E34C26?style=flat&logo=html5&logoColor=white" alt="HTML5">
<img src="https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white" alt="CSS3">
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black" alt="JavaScript">
<img src="https://img.shields.io/badge/Status-Active-success" alt="Status">

---

## ✨ Fonctionnalités Principales

### 🎯 Réservation en 3 Étapes
- **Étape 1** : Sélection de la séance d'entraînement
- **Étape 2** : Choix de la date et de l'heure avec calendrier interactif
- **Étape 3** : Confirmation et résumé de la réservation

### 📅 Calendrier Interactif
- Navigation fluide entre les mois
- Sélection de date avec feedback visuel
- Grille horaire adaptive par jour
- États de basculement (disponible/plein/réservé)

### 🏃 Pages d'Entraînement Spécialisées
- **Box Jump** – Laboratoire d'explosivité avec mètre de saut interactif
- **Battle Rope** – Entraînement par cordes avec effets visuels dynamiques
- **Cross Training** – Aperçu modulaire des programmes
- **Circuit Kettlebell** – Séquences d'entraînement aux kettlebells

### 💾 Stockage Local
- Persistance des données avec `localStorage`
- Historique des réservations
- Préférences utilisateur et thème

### 🌓 Mode Clair/Sombre
- Toggle thème dynamique avec `data-theme="light"`
- Palette de couleurs adaptée pour chaque mode
- Persistance du choix utilisateur

### 📱 Design Entièrement Responsive
- Layouts fluides avec `clamp()` et CSS Grid
- 4 niveaux de responsivité : 980px, 900px, 720px, 560px
- Optimisé pour mobile, tablette et desktop
- Support de `prefers-reduced-motion`

### ⚡ Animations & Interactions
- Animations d'entrée en cascade (`slideUp`, `fadeScale`)
- Effet glow et glassmorphism
- Transitions fluides sur les cartes et boutons
- Animationen brand animé (orb, ring, gradient)

---

## 🏗️ Architecture du Projet

```
final-projet/
│
├─ index.html                 # Page d'accueil et flux de réservation
├─ box-jump.html            # Page détail Box Jump
├─ battle-rope.html         # Page détail Battle Rope
├─ cross-training.html      # Page Cross Training
├─ circuit-kettlebell.html  # Page Circuit Kettlebell
│
├─ css/
│   └─ style.css            # Stylesheet principal (1970 lignes)
│                            # - Design system avec variables CSS
│                            # - Themable (clair/sombre)
│                            # - Animations et keyframes
│                            # - Responsive breakpoints
│
├─ js/
│   ├─ app.js               # Logique principale du booking
│   ├─ storage.js           # Gestion localStorage
│   ├─ calendar.js          # Générateur calendrier
│   ├─ booking.js           # Gestion flux réservation
│   └─ exercises.js         # Chargement données exercices
│
├─ assets/
│   └─ icons/               # Icônes SVG (pour futures améliorations)
│
└─ README.md                # Ce fichier
```

---

## 🎨 Design System

### Palette de Couleurs
```css
/* Couleurs Primaires */
--accent: #c8ff00         /* Lime */
--accent-2: #ff5e3a       /* Coral */
--accent-3: #ff2d7b       /* Rose */
--accent-4: #00e5ff       /* Cyan */
--accent-5: #00e676       /* Vert */

/* Arrière-plans */
--bg-1: #0a0a10           /* Très sombre */
--bg-2: #101018           /* Sombre */
--bg-3: #16161f           /* Gris sombre */

/* Texte */
--text: #f0f0f5           /* Corps blanc */
--text-2: #c4c4d0         /* Secondaire */
--muted: #8888a0          /* Muet */
```

### Typographie
- **Font de corps** : Inter (300–900)
- **Font de titres** : Space Grotesk (400–700)
- **Sizing fluide** : `clamp()` pour scalabilité

### Rayon de Bord
```css
--radius-sm: 10px          /* Petits éléments */
--radius-md: 16px          /* Cartes, inputs */
--radius-lg: 24px          /* Panneaux larges */
--radius-xl: 32px          /* Héros, média */
--radius-full: 999px       /* Boutons, badges */
```

---

## 🛠️ Structure JavaScript

### `app.js` – Orchestrateur Principal
- Navigation entre les étapes du booking
- Gestion du thème clair/sombre
- IntersectionObserver pour animations au scroll
- Récupération et validation des données

### `storage.js` – Persistance
- Sauvegardes localStorage (`reservations`, `history`, `preferences`)
- Récupération et suppression de données
- Sérialisation d'objets complexes

### `calendar.js` – Calendrier
- Génération dynamique du calendrier
- Navigation mois précédent/suivant
- Détection des jours actuels et réservés
- Support des fuseaux horaires

### `booking.js` – Flux de Réservation
- Validation des champs
- Gestion du récapitulatif
- Sauvegarde des réservations
- Historique des sessions

### `exercises.js` – Exercices
- Chargement catalogue d'exercices
- Rendu des cartes dynamiques
- Skeleton loading pour UX fluide
- Filtrage et recherche

---

## 📝 Utilisation

### Installation & Exécution
1. Clonez le repo
2. Ouvrez `index.html` dans votre navigateur
3. Naviguez entre les pages via la nav

```bash
# Aucune dépendance – utilise HTML/CSS/JS pur
# Fonctionne offline après le premier load (localStorage)
```

### Flux de Réservation Principal

1. **Accueil** → Sélectionnez une séance dans la grille
2. **Étape 1** → Confirmez la sélection
3. **Étape 2** → Choisissez date + heure
4. **Étape 3** → Résumé et confirmation
5. **Succès** → Réservation sauvegardée en historique

### Pages Spécialisées
- Cliquez sur une exercice pour voir ses détails
- Consultez les étapes, consignes et infos
- Retrouvez les actions "Réserver" ou "Explorer"

---

## 🎭 Classes CSS Clés

### Composants
- `.page` – Shell de page
- `.hero` – Section héro avec glow
- `.nav` – Navigation stickée
- `.panel` – Carte de contenu
- `.session-card` – Carte de séance
- `.exercise-card` – Carte d'exercice
- `.info-card` – Carte d'information
- `.cta` – Bouton d'action (CTA)

### États
- `.is-active` – Élément actif/sélectionné
- `.is-visible` – Visible dans la viewport
- `.is-animating` – En cours d'animation
- `.is-selected` – Utilisateur a sélectionné
- `.is-disabled` – Désactivé
- `.is-today` – Jour actuel
- `.is-new` – Nouveau (réservation)
- `.is-removing` – En suppression

### Thème
- `[data-theme="light"]` – Mode clair

---

## ⚙️ Variables CSS Disponibles

```css
/* Espacements */
--gutter: clamp(20px, 5vw, 48px)
--content-max: 1200px

/* Ombres */
--shadow-sm: 0 4px 20px rgba(0, 0, 0, 0.3)
--shadow-md: 0 12px 40px rgba(0, 0, 0, 0.4)
--shadow-lg: 0 24px 60px rgba(0, 0, 0, 0.5)
--shadow-glow: 0 0 40px rgba(200, 255, 0, 0.15)
--shadow-cyan: 0 0 30px rgba(0, 229, 255, 0.2)
--shadow-fire: 0 0 30px rgba(255, 94, 58, 0.2)
--shadow-pink: 0 0 30px rgba(255, 45, 123, 0.15)

/* Easing */
--ease-out: cubic-bezier(0.16, 1, 0.3, 1)
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1)
--ease-elastic: cubic-bezier(0.68, -0.55, 0.265, 1.55)
```

---

## 🎬 Animations

| Nom | Durée | Usage |
|-----|-------|-------|
| `slideUp` | 800ms | Entrée en cascade |
| `slideDown` | 600ms | Nav révélation |
| `fadeScale` | 600ms | Cartes apparition |
| `float` | 16s | Glow ambiant |
| `pulse` | 3s | Orb brand |
| `spin` | 8s | Ring brand |
| `ringPulse` | 2.5s | Succès check |
| `meterPulse` | 3s | Barre saut |
| `glow` | 5s | Ombres lumineu |
| `gradient-shift` | 4s | Gradient animé |
| `tapPop` | 250ms | Feedback clic |
| `shimmer` | 1.8s | Skeleton loading |

---

## 📊 Caractéristiques Techniques

✅ **HTML5 Sémantique** – Structure claire et accessible  
✅ **CSS3 Moderne** – Variables, Grid, Flexbox, Gradients  
✅ **JavaScript ES6+** – Async/await, Destructuring, Arrow functions  
✅ **RWD Fluide** – Mobile-first avec `clamp()`, `@media`  
✅ **Performance** – Zéro dépendances externes, <50KB CSS  
✅ **Accessibilité** – `prefers-reduced-motion`, contraste WCAG  
✅ **Themable** – Dark/Light avec transitions fluides  
✅ **Offline-Ready** – localStorage pour persistance  

---

## 🚀 Améliorations Futures

- [ ] Backend API pour vraies données
- [ ] Authentification utilisateur
- [ ] Paiement intégré (Stripe/PayPal)
- [ ] Notifications push
- [ ] Export PDF des réservations
- [ ] Reviews & ratings
- [ ] Système de points de fidélité
- [ ] Chat support en direct
- [ ] PWA capabilities
- [ ] Analytics intégrés

---

## 🤝 Contribution

Les suggestions sont bienvenues ! Pour proposer des améliorations :

1. Fork le repo
2. Créez une branche (`git checkout -b feature/amazing-feature`)
3. Commitez vos changements (`git commit -m 'Add amazing feature'`)
4. Push la branche (`git push origin feature/amazing-feature`)
5. Ouvrez une Pull Request

---

## 📄 Licence

Ce projet est sous licence MIT – libre d'utilisation commerciale et personnelle.

---

## 👨‍💻 Auteur

**Hamza Zerouki**  
[GitHub](https://github.com/hamzazerouki11) | [Portfolio]()

---

## 🎯 Objectifs Pédagogiques

Ce projet démontre :
- ✅ Maîtrise de HTML/CSS/JS vanilla (sans frameworks)
- ✅ Design responsive & adaptif avec CSS moderne
- ✅ Gestion d'état côté client
- ✅ LocalStorage pour persistance
- ✅ Animations et transitions fluides
- ✅ UX/UI centré utilisateur
- ✅ Code structuré et maintenable

---

**Lancé en Février 2026** | Version 1.0.0
