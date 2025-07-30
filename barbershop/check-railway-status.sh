#!/bin/bash

# 🔍 Script de vérification Railway - Barber Shop
echo "🔍 Vérification du statut Railway - Barber Shop"

# Couleurs pour l'affichage
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}📋 Vérifications à effectuer :${NC}"
echo ""

echo -e "${YELLOW}1. Configuration Railway :${NC}"
echo "   - Allez sur https://railway.app"
echo "   - Ouvrez votre projet Barber Shop"
echo "   - Vérifiez que l'application est déployée"
echo ""

echo -e "${YELLOW}2. Base de données PostgreSQL :${NC}"
echo "   - Cliquez sur 'New' → 'Database' → 'PostgreSQL'"
echo "   - Vérifiez que la DB est créée"
echo "   - Notez les variables d'environnement générées"
echo ""

echo -e "${YELLOW}3. Variables d'environnement :${NC}"
echo "   - Onglet 'Variables' dans votre projet"
echo "   - Ajoutez ces variables :"
echo "     APP_NAME='Barber Shop'"
echo "     APP_ENV=production"
echo "     APP_DEBUG=false"
echo "     APP_URL=https://votre-app.railway.app"
echo "     DB_CONNECTION=pgsql"
echo "     DB_HOST=\${DB_HOST}"
echo "     DB_PORT=\${DB_PORT}"
echo "     DB_DATABASE=\${DB_DATABASE}"
echo "     DB_USERNAME=\${DB_USERNAME}"
echo "     DB_PASSWORD=\${DB_PASSWORD}"
echo ""

echo -e "${YELLOW}4. Vérification de l'URL :${NC}"
echo "   - Votre app est accessible sur :"
echo "     https://votre-app-name.railway.app"
echo "   - Remplacez 'votre-app-name' par votre vrai nom d'app"
echo ""

echo -e "${YELLOW}5. Test de l'application :${NC}"
echo "   - Ouvrez l'URL dans votre navigateur"
echo "   - Vérifiez que la page d'accueil s'affiche"
echo "   - Testez la connexion utilisateur"
echo "   - Vérifiez que les données s'affichent"
echo ""

echo -e "${YELLOW}6. Logs et monitoring :${NC}"
echo "   - Onglet 'Deployments' : Vérifiez les logs"
echo "   - Onglet 'Metrics' : Surveillez les performances"
echo "   - Onglet PostgreSQL : Vérifiez la base de données"
echo ""

echo -e "${GREEN}✅ Vérifications terminées !${NC}"
echo ""
echo -e "${BLUE}📖 Guides disponibles :${NC}"
echo "   - RAILWAY_DB_SETUP.md : Configuration de la base de données"
echo "   - ACCES_INTERNET.md : Accès à votre application"
echo "   - RAILWAY_DEPLOY.md : Guide complet de déploiement"
echo ""

echo -e "${BLUE}🎯 Prochaines étapes :${NC}"
echo "   1. Configurez la base PostgreSQL"
echo "   2. Testez votre application"
echo "   3. Configurez un domaine personnalisé (optionnel)"
echo "   4. Surveillez les performances" 