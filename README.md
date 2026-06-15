# Faveur Divine AI

Une application SaaS spirituelle complète avec authentification Firebase, gestion des abonnements PayPal, blog administrable et fonctionnalités métier.

## 🚀 Features

- ✅ Authentification Firebase (Email/Password)
- ✅ Dashboard Super Admin complet
- ✅ Blog type WordPress administrable
- ✅ Intégration PayPal (Subscriptions)
- ✅ Gestion des utilisateurs et abonnements
- ✅ SEO optimisé
- ✅ Responsive Mobile/Tablet/Desktop

## 📋 Stack Technique

- **Frontend**: Next.js 15 + React 19 + TypeScript
- **Styling**: Tailwind CSS
- **Base de données**: Firebase (Firestore)
- **Authentification**: Firebase Auth
- **Paiements**: PayPal Subscriptions API
- **Stockage**: Firebase Storage
- **Hébergement**: Firebase Hosting / Vercel

## 🔧 Installation

```bash
# Clone et installation
git clone https://github.com/Adeito-Poba/faveur.git
cd faveur
npm install

# Configuration variables d'environnement
cp .env.example .env.local
# Remplir les variables dans .env.local

# Développement
npm run dev

# Production
npm run build
npm start
```

## 📁 Structure du Projet

```
faveur/
├── src/
│   ├── app/                    # App Router Next.js
│   │   ├── (auth)/            # Routes authentification
│   │   ├── (dashboard)/       # Routes dashboard
│   │   ├── (admin)/           # Routes administration
│   │   ├── (blog)/            # Routes blog
│   │   └── api/               # API Routes
│   ├── components/            # Composants réutilisables
│   ├── lib/                   # Utilitaires (Firebase, auth)
│   ├── hooks/                 # Custom React hooks
│   ├── types/                 # Types TypeScript
│   ├── utils/                 # Fonctions utilitaires
│   └── styles/                # Styles globaux
├── public/                    # Assets statiques
├── .env.example               # Variables d'environnement (exemple)
├── .env.local                 # Variables d'environnement (local)
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## 🔐 Sécurité

- Variables d'environnement sécurisées
- Règles Firestore sécurisées (RBAC)
- Protection des routes (middleware)
- Validation serveur/client
- CSRF protection

## 💰 Configuration PayPal

Le système PayPal supporte :
- ✅ Plans d'abonnement (FREE, PREMIUM_MONTHLY, PREMIUM_ANNUAL)
- ✅ Webhooks PayPal intégrés
- ✅ Gestion automatique des accès utilisateur
- ✅ Gestion des renouvellements/annulations

## 📧 Contact

Email administrateur: maviedechant@gmail.com

## 📄 Licence

Tous droits réservés © 2024 Faveur Divine AI