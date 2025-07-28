# 🦁 Zoo Dashboard

Un système de gestion complet pour un zoo, comprenant un tableau de bord administratif et une API backend robuste pour gérer les visiteurs, les billets, les animaux et les espaces du zoo.

## 📋 Table des matières

- [Aperçu du projet](#aperçu-du-projet)
- [Architecture](#architecture)
- [Fonctionnalités](#fonctionnalités)
- [Technologies utilisées](#technologies-utilisées)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Configuration](#configuration)
- [Utilisation](#utilisation)
- [Structure du projet](#structure-du-projet)
- [API Documentation](#api-documentation)
- [Base de données](#base-de-données)
- [Déploiement](#déploiement)
- [Contribution](#contribution)

## 🎯 Aperçu du projet

Le Zoo Dashboard est une application full-stack moderne conçue pour simplifier la gestion quotidienne d'un zoo. Elle permet aux employés de gérer efficacement les visiteurs, la billetterie, les animaux, les espèces et les différentes zones du parc.

### Objectifs principaux
- **Gestion des visiteurs** : Suivi des entrées et sorties, localisation en temps réel
- **Billetterie intelligente** : Différents types de billets avec zones autorisées
- **Gestion des animaux** : Inventaire complet avec informations sur les espèces
- **Administration des zones** : Capacité, maintenance, accessibilité
- **Authentification sécurisée** : Système de rôles pour différents types d'employés

## 🏗️ Architecture

```
zoo-dashboard/
├── client/          # Application Frontend (Next.js)
├── server/          # API Backend (Express.js + Prisma)
└── docker-compose.yml
```

### Architecture technique
- **Frontend** : Next.js 13 avec TypeScript, Tailwind CSS et DaisyUI
- **Backend** : Express.js avec TypeScript et Prisma ORM
- **Base de données** : MongoDB avec Prisma comme ORM
- **Authentification** : JWT avec refresh tokens
- **Containerisation** : Docker et Docker Compose

## ✨ Fonctionnalités

### 🎫 Gestion de la billetterie
- Différents types de billets (adulte, étudiant, enfant)
- Plusieurs formules (journée, weekend, annuel, nocturne, escape game)
- Zones autorisées par billet
- Gestion des expirations

### 👥 Gestion des visiteurs
- Enregistrement des visiteurs
- Suivi de la localisation actuelle dans le zoo
- Historique des visites

### 🐅 Gestion des animaux et espèces
- Inventaire complet des animaux
- Informations détaillées sur les espèces
- Localisation par zone
- Galerie d'images

### 🏞️ Gestion des zones
- Capacité et durée de visite
- Statut de maintenance
- Accessibilité handicapés
- Horaires et descriptions
- Galerie d'images

### 👨‍💼 Gestion des utilisateurs
- Système de rôles (admin, réceptionniste, vétérinaire, agent d'entretien, vendeur)
- Authentification sécurisée
- Gestion des sessions

## 🛠️ Technologies utilisées

### Frontend
- **Next.js 13** - Framework React avec App Router
- **TypeScript** - Typage statique
- **Tailwind CSS** - Framework CSS utilitaire
- **DaisyUI** - Composants UI pour Tailwind
- **Radix UI** - Composants headless
- **Lucide React** - Icônes
- **Jotai** - Gestion d'état
- **React Hot Toast** - Notifications

### Backend
- **Express.js** - Framework web Node.js
- **Prisma** - ORM moderne pour TypeScript
- **MongoDB** - Base de données NoSQL
- **JWT** - Authentification stateless
- **Bcrypt** - Hachage des mots de passe
- **Cloudinary** - Gestion des images
- **CORS** - Gestion des requêtes cross-origin

### DevOps
- **Docker** - Containerisation
- **Docker Compose** - Orchestration multi-conteneurs

## 📋 Prérequis

- **Node.js** (version 18+)
- **Docker** et **Docker Compose**
- **MongoDB** (local ou Atlas)
- Compte **Cloudinary** (pour la gestion des images)

## 🚀 Installation

### 1. Cloner le repository
```bash
git clone <repository-url>
cd zoo-dashboard
```

### 2. Installation avec Docker (Recommandé)
```bash
# Construire et lancer tous les services
docker-compose up --build
```

### 3. Installation manuelle

#### Backend
```bash
cd server
npm install
# ou
yarn install
```

#### Frontend
```bash
cd client
npm install
# ou
yarn install
```

## ⚙️ Configuration

### Variables d'environnement - Backend (server/.env)
```env
DATABASE_URL="mongodb://localhost:27017/zoo-dashboard"
JWT_SECRET="your-super-secret-jwt-key"
REFRESH_TOKEN_SECRET="your-super-secret-refresh-key"
CLOUDINARY_CLOUD_NAME="your-cloudinary-cloud-name"
CLOUDINARY_API_KEY="your-cloudinary-api-key"
CLOUDINARY_API_SECRET="your-cloudinary-api-secret"
PORT=3000
```

### Variables d'environnement - Frontend (client/.env.local)
```env
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

### Initialisation de la base de données
```bash
cd server
npx prisma generate
npx prisma db push
```

## 🎮 Utilisation

### Démarrage en développement

#### Avec Docker
```bash
docker-compose up
```
- Frontend : http://localhost:3001
- Backend : http://localhost:3000

#### Manuel
```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
cd client
npm run dev
```

### Comptes par défaut
Après l'initialisation, vous pouvez créer un compte administrateur via l'API ou directement en base.

## 📁 Structure du projet

```
zoo-dashboard/
├── client/                     # Application Frontend
│   ├── public/                 # Assets statiques
│   ├── src/
│   │   ├── app/               # Pages Next.js (App Router)
│   │   ├── components/        # Composants réutilisables
│   │   └── context/           # Contextes React
│   ├── package.json
│   ├── tailwind.config.js
│   └── tsconfig.json
├── server/                     # API Backend
│   ├── prisma/
│   │   └── schema.prisma      # Schéma de base de données
│   ├── src/
│   │   ├── controllers/       # Logique métier
│   │   ├── routes/           # Routes API
│   │   ├── utils/            # Utilitaires
│   │   └── index.ts          # Point d'entrée
│   ├── package.json
│   └── tsconfig.json
└── docker-compose.yml
```

## 📖 API Documentation

### Endpoints principaux

#### Authentification
- `POST /auth/login` - Connexion
- `POST /auth/register` - Inscription
- `POST /auth/refresh` - Rafraîchir le token
- `POST /auth/logout` - Déconnexion

#### Visiteurs
- `GET /visitors` - Liste des visiteurs
- `POST /visitors` - Créer un visiteur
- `GET /visitors/:id` - Détails d'un visiteur
- `PUT /visitors/:id` - Modifier un visiteur
- `DELETE /visitors/:id` - Supprimer un visiteur

#### Billets
- `GET /tickets` - Liste des billets
- `POST /tickets` - Créer un billet
- `GET /tickets/:id` - Détails d'un billet
- `PUT /tickets/:id` - Modifier un billet

#### Zones
- `GET /areas` - Liste des zones
- `POST /areas` - Créer une zone
- `GET /areas/:id` - Détails d'une zone
- `PUT /areas/:id` - Modifier une zone

#### Animaux
- `GET /animals` - Liste des animaux
- `POST /animals` - Ajouter un animal
- `GET /animals/:id` - Détails d'un animal

#### Espèces
- `GET /species` - Liste des espèces
- `POST /species` - Ajouter une espèce

## 🗄️ Base de données

### Modèles principaux

#### Visitor (Visiteur)
- Informations personnelles
- Billets associés
- Zone actuelle

#### Billet
- Catégorie (adulte, étudiant, enfant)
- Type de pass (journée, weekend, annuel, etc.)
- Zones autorisées
- Date d'expiration

#### Area (Zone)
- Capacité et durée de visite
- Statut de maintenance
- Accessibilité
- Animaux présents

#### Animal
- Nom et espèce
- Zone d'habitat

#### User (Utilisateur/Employé)
- Rôles et permissions
- Authentification sécurisée

## 🚢 Déploiement

### Production avec Docker
```bash
# Variables d'environnement de production
cp server/.env.example server/.env
cp client/.env.local.example client/.env.local

# Build et déploiement
docker-compose -f docker-compose.prod.yml up -d
```

### Déploiement cloud
Le projet est compatible avec :
- **Vercel** (Frontend)
- **Railway/Render** (Backend)
- **MongoDB Atlas** (Base de données)
- **Cloudinary** (Images)

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commit vos changements (`git commit -am 'Ajout nouvelle fonctionnalite'`)
4. Push vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Créer une Pull Request

### Standards de code
- **TypeScript** strict
- **ESLint** + **Prettier**
- **Conventional Commits**
- Tests unitaires recommandés

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 📞 Support

Pour toute question ou problème :
- Créer une issue sur GitHub
- Documentation Prisma : https://prisma.io/docs
- Documentation Next.js : https://nextjs.org/docs

---

**Développé avec ❤️ pour la gestion moderne des zoos**