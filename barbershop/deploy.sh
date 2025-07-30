#!/bin/bash

# Script de déploiement pour Railway

echo "🚀 Démarrage du déploiement..."

# Copier le fichier .env.example si .env n'existe pas
if [ ! -f .env ]; then
    echo "📝 Création du fichier .env..."
    cp .env.example .env
fi

# Installer les dépendances PHP
echo "📦 Installation des dépendances PHP..."
composer install --no-dev --optimize-autoloader

# Installer les dépendances Node.js
echo "📦 Installation des dépendances Node.js..."
npm ci --only=production

# Construire les assets
echo "🔨 Construction des assets..."
npm run build

# Générer la clé d'application si elle n'existe pas
if [ -z "$APP_KEY" ]; then
    echo "🔑 Génération de la clé d'application..."
    php artisan key:generate
fi

# Exécuter les migrations
echo "🗄️ Exécution des migrations..."
php artisan migrate --force

# Optimiser l'application
echo "⚡ Optimisation de l'application..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

echo "✅ Déploiement terminé !" 