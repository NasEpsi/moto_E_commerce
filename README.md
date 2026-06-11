# MotoParts Catalog

MotoParts Catalog est une application web scolaire responsive permettant de consulter et d'administrer un catalogue de pieces moto. Le projet repose sur React, Vite et Firebase Firestore, sans backend serveur, sans panier, sans paiement et sans authentification.

## Fonctionnalites

- affichage d'un catalogue de pieces moto
- recherche en temps reel par nom
- recherche par marque
- filtre automatique par categorie
- page detail produit via la route `/produit/:id`
- interface d'administration via la route `/admin`
- CRUD complet sur les produits
- design responsive mobile, tablette et desktop

## Stack technique

- React
- Vite
- Firebase Firestore
- React Router DOM
- CSS moderne responsive

## Structure du projet

```text
src/
├── components
│   ├── Navbar.jsx
│   ├── ProductCard.jsx
│   ├── ProductForm.jsx
│   ├── SearchBar.jsx
│   └── CategoryFilter.jsx
├── pages
│   ├── Home.jsx
│   ├── ProductDetail.jsx
│   └── Admin.jsx
├── services
│   └── firestoreService.js
├── data
│   └── sampleProducts.js
├── styles
│   └── main.css
├── firebase.js
├── App.jsx
└── main.jsx
```

## Installation

1. Cloner le projet.
2. Ouvrir un terminal dans le dossier `motoparts-catalog`.
3. Installer les dependances :

```bash
npm install
```

## Configuration Firebase

Le fichier `src/firebase.js` est deja pret. Ajoutez simplement vos cles Firebase sans en inventer :

```js
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};
```

### Firestore

- base de donnees utilisee : Firestore
- collection : `produits`

Structure attendue pour chaque document :

```js
{
  nom: string,
  categorie: string,
  marque: string,
  prix: number,
  image: string,
  attributs: object,
  compatibilites: array
}
```

Tant que `firebase.js` n'est pas renseigne, l'application demarre en mode demonstration local avec des donnees d'exemple. Des que la configuration Firebase est ajoutee, le service bascule sur Firestore.

## Donnees de demonstration

Le fichier `src/data/sampleProducts.js` contient 5 produits :

- Plaquettes Brembo
- Pneu Michelin Road 5
- Kit chaine DID
- Ampoule LED Philips
- Retroviseurs Chaft

## Lancement du projet

Pour lancer le serveur de developpement :

```bash
npm run dev
```

Puis ouvrir l'URL indiquee par Vite dans le navigateur.

## Deploiement sur Vercel

1. Pousser le projet sur GitHub.
2. Creer un nouveau projet sur [Vercel](https://vercel.com/).
3. Importer le depot GitHub.
4. Laisser la commande de build par defaut :

```bash
npm run build
```

5. Laisser le dossier de sortie :

```bash
dist
```

6. Ajouter si besoin les variables de configuration Firebase dans le projet Vercel.
7. Lancer le deploiement.

## Soutenance

Le code a ete garde volontairement simple :

- composants separes par responsabilite
- service Firestore centralise
- commentaires courts sur les parties utiles
- interface claire pour expliquer facilement le CRUD et le routage
