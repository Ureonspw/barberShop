# ⚡ Déploiement Railway - Guide Rapide

## 🚀 Étapes Express

### 1. Préparation
```bash
# Build des assets
npm run build

# Commit et push
git add .
git commit -m "🚀 Déploiement Railway"
git push origin main
```

### 2. Railway Setup
1. Allez sur [railway.app](https://railway.app)
2. Connectez votre GitHub
3. Créez un nouveau projet
4. Sélectionnez votre repository `barberShop`

### 3. Base de données
1. Dans votre projet Railway → "New" → "Database" → "PostgreSQL"
2. Railway génère automatiquement les variables DB_*

### 4. Variables d'environnement
Dans l'onglet "Variables", ajoutez :
```env
APP_NAME="Barber Shop"
APP_ENV=production
APP_DEBUG=false
APP_URL=https://votre-app.railway.app
DB_CONNECTION=pgsql
```

### 5. Déploiement
- Railway déploie automatiquement
- Vérifiez les logs dans "Deployments"
- Votre app sera disponible sur `https://votre-app.railway.app`

## 🔧 Commandes utiles

```bash
# Générer la clé d'application
php artisan key:generate

# Vérifier les migrations
php artisan migrate:status

# Voir les logs
railway logs
```

## 📞 Support
- **Logs** : Onglet "Deployments" dans Railway
- **DB** : Onglet de votre base PostgreSQL
- **Variables** : Onglet "Variables" dans Railway

## 🎯 Votre URL
Votre application sera disponible sur :
`https://votre-app-name.railway.app` 