#!/bin/bash

# 🚀 Script de déploiement Railway - Barber Shop
echo "🚀 Déploiement Railway - Barber Shop"

# Vérification des prérequis
echo "📋 Vérification des prérequis..."

# Vérifier que git est configuré
if ! git config --get user.name > /dev/null 2>&1; then
    echo "❌ Git n'est pas configuré. Configurez votre nom et email :"
    echo "git config --global user.name 'Votre Nom'"
    echo "git config --global user.email 'votre@email.com'"
    exit 1
fi

# Vérifier que le repository est connecté à GitHub
if ! git remote get-url origin > /dev/null 2>&1; then
    echo "❌ Aucun remote 'origin' trouvé. Connectez votre repository à GitHub :"
    echo "git remote add origin https://github.com/votre-username/barberShop.git"
    exit 1
fi

echo "✅ Prérequis vérifiés"

# Build des assets
echo "🔨 Build des assets..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Erreur lors du build des assets"
    exit 1
fi

echo "✅ Assets buildés avec succès"

# Commit et push
echo "📤 Push vers GitHub..."
git add .
git commit -m "🚀 Déploiement Railway - $(date)"
git push origin main

if [ $? -ne 0 ]; then
    echo "❌ Erreur lors du push vers GitHub"
    exit 1
fi

echo "✅ Code poussé vers GitHub"

echo ""
echo "🎉 Déploiement initié !"
echo ""
echo "📋 Prochaines étapes :"
echo "1. Allez sur https://railway.app"
echo "2. Connectez votre repository GitHub"
echo "3. Ajoutez une base de données PostgreSQL"
echo "4. Configurez les variables d'environnement"
echo "5. Vérifiez les logs de déploiement"
echo ""
echo "📖 Consultez RAILWAY_DEPLOY.md pour plus de détails" 