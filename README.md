# AERYS · Plateforme de formation gamifiée

Application web de formation continue et gamifiée pour le personnel du **Hyatt Regency Alger Airport**.
Quiz, jeux, devinettes, simulations, micro-learning, vidéos et classes virtuelles, avec points,
badges, niveaux et boutique de récompenses.

L'application reproduit fidèlement la charte graphique et les maquettes fournies (violet `#5B21D6`,
accents or pour l'espace Manager, cartes arrondies, ombres légères).

## ✨ Caractéristiques

- **100 % statique** — HTML, CSS et JavaScript natif (aucun framework, aucune étape de build).
- **Sans base de données** — toutes les données sont en mémoire (objet `DATA` dans `js/data.js`).
- **Responsive Mobile + PC**
  - **PC / desktop** (≥ 1024 px) : barre latérale (sidebar) + zone de contenu.
  - **Mobile** (< 1024 px) : plein écran avec barre d'onglets en bas.
  - Les écrans publics (accueil, découverte, connexion) s'affichent dans un cadre type téléphone.
- **3 espaces / rôles** : Employé, Manager, Formateur — chacun avec sa navigation dédiée.

## 🔑 Connexion (démo)

Identifiants pré-remplis sur l'écran de connexion :

- **E-mail :** `rania@hyattalger.com`
- **Mot de passe :** `aerys2026`

Choisissez le rôle (Employé / Manager / Formateur) puis « Se connecter ».
Aucune vérification réelle n'est effectuée — c'est une démonstration sans backend.

## 📁 Structure

```
aerys/
├── index.html              # Point d'entrée
├── .nojekyll               # Désactive Jekyll sur GitHub Pages
├── css/
│   └── styles.css          # Design system complet
├── js/
│   ├── icons.js            # Bibliothèque d'icônes SVG + logo
│   ├── data.js             # Données en mémoire (contenu, utilisateurs…)
│   ├── components.js       # Composants partagés (cartes, graphes, modales…)
│   ├── screens-public.js   # Accueil, Découverte, Connexion
│   ├── screens-employe.js  # Espace Employé
│   ├── screens-manager.js  # Espace Manager
│   ├── screens-formateur.js# Espace Formateur
│   └── app.js              # Routeur / contrôleur + coquille de l'app
└── assets/
    └── img/                # Maquettes de référence (PNG)
```

## 🚀 Déploiement sur GitHub Pages

1. Créez un dépôt GitHub (par ex. `aerys`) et poussez tout le contenu de ce dossier
   **à la racine** du dépôt :
   ```bash
   git init
   git add .
   git commit -m "AERYS — application de formation"
   git branch -M main
   git remote add origin https://github.com/VOTRE-COMPTE/aerys.git
   git push -u origin main
   ```
2. Sur GitHub : **Settings → Pages**.
3. Sous **Build and deployment → Source**, choisissez **Deploy from a branch**.
4. Sélectionnez la branche **`main`** et le dossier **`/ (root)`**, puis **Save**.
5. Patientez ~1 minute. Le site sera disponible à :
   ```
   https://VOTRE-COMPTE.github.io/aerys/
   ```

> `index.html` étant à la racine, GitHub Pages le sert automatiquement.
> Le fichier `.nojekyll` évite tout traitement Jekyll indésirable.

## 🖥️ Test en local

Ouvrez `index.html` directement, ou servez le dossier (recommandé) :

```bash
cd aerys
python3 -m http.server 8000
# puis ouvrez http://localhost:8000
```

## 🎨 Charte

| Élément          | Couleur     |
|------------------|-------------|
| Violet principal | `#5B21D6`   |
| Violet clair     | `#EEE7FF`   |
| Bleu nuit        | `#0B0F3A`   |
| Gris clair       | `#F7F7FB`   |
| Or (Manager)     | accents or  |

Polices : **Plus Jakarta Sans** (titres) + **Manrope** (texte), via Google Fonts.

---

*Projet de démonstration — Hyatt Regency Alger Airport.*
