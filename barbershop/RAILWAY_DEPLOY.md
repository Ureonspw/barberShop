# 🚀 Guide de Déploiement Railway - Barber Shop

## 📋 Prérequis

1. **Compte Railway** : Créez un compte sur [railway.app](https://railway.app)
2. **Repository GitHub** : Votre code doit être sur GitHub
3. **Base de données PostgreSQL** : Railway fournit une DB gratuite

## 🔧 Étapes de déploiement

### 1. Connexion à Railway

1. Allez sur [railway.app](https://railway.app)
2. Connectez-vous avec votre compte GitHub
3. Cliquez sur "New Project"
4. Sélectionnez "Deploy from GitHub repo"
5. Choisissez votre repository `barberShop`

### 2. Configuration de la base de données

1. Dans votre projet Railway, cliquez sur "New"
2. Sélectionnez "Database" → "PostgreSQL"
3. Railway créera automatiquement une base PostgreSQL
4. Notez les variables d'environnement de la DB

### 3. Configuration des variables d'environnement

Dans votre projet Railway, allez dans l'onglet "Variables" et ajoutez :

```env
APP_NAME="Barber Shop"
APP_ENV=production
APP_DEBUG=false
APP_URL=https://votre-app-name.railway.app

DB_CONNECTION=pgsql
DB_HOST=${DB_HOST}
DB_PORT=${DB_PORT}
DB_DATABASE=${DB_DATABASE}
DB_USERNAME=${DB_USERNAME}
DB_PASSWORD=${DB_PASSWORD}

CACHE_DRIVER=file
SESSION_DRIVER=file
QUEUE_CONNECTION=sync
```

### 4. Génération de la clé d'application

Dans le terminal Railway ou via les variables d'environnement :
```bash
php artisan key:generate
```

### 5. Commandes de déploiement

Railway exécutera automatiquement ces commandes grâce au fichier `railway.toml` :

```bash
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan migrate --force
php artisan storage:link
npm run build
```

## 🔍 Vérification du déploiement

1. **Logs** : Vérifiez les logs dans l'onglet "Deployments"
2. **Health Check** : L'application doit répondre sur `/`
3. **Base de données** : Vérifiez que les migrations ont été exécutées

## 🛠️ Dépannage

### Problèmes courants :

1. **Erreur de clé d'application** :
   - Générez une nouvelle clé : `php artisan key:generate`

2. **Erreur de base de données** :
   - Vérifiez les variables d'environnement DB_*
   - Assurez-vous que la DB PostgreSQL est créée

3. **Erreur de migration** :
   - Vérifiez les logs de déploiement
   - Exécutez manuellement : `php artisan migrate --force`

4. **Assets non chargés** :
   - Vérifiez que `npm run build` a été exécuté
   - Vérifiez le lien storage : `php artisan storage:link`

## 📊 Monitoring

- **Logs** : Disponibles dans l'onglet "Deployments"
- **Métriques** : CPU, RAM, requêtes dans l'onglet "Metrics"
- **Base de données** : Monitoring dans l'onglet de la DB

## 🔄 Déploiement automatique

Railway déploie automatiquement à chaque push sur la branche `main` de votre repository GitHub.

## 💰 Coûts

- **Gratuit** : 500 heures/mois
- **Payant** : $5/mois pour plus d'heures

## 📞 Support

- **Documentation Railway** : [docs.railway.app](https://docs.railway.app)
- **Community Discord** : [discord.gg/railway](https://discord.gg/railway)
- **Support** : Via l'interface Railway

## 🎯 Prochaines étapes

1. **Domaine personnalisé** : Configurez votre propre domaine
2. **SSL** : Railway fournit automatiquement HTTPS
3. **Monitoring** : Configurez des alertes
4. **Backup** : Configurez des sauvegardes automatiques de la DB 