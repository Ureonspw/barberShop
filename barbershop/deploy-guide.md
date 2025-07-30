# Guide de Déploiement - Barber Shop App

## 🚀 Options d'hébergement gratuites

### 1. Railway (Recommandé)
**Avantages :**
- Déploiement automatique depuis GitHub
- Base de données PostgreSQL incluse
- Support Laravel natif
- Interface simple

**Étapes :**
1. Créez un compte sur [railway.app](https://railway.app)
2. Connectez votre repository GitHub
3. Ajoutez une base de données PostgreSQL
4. Configurez les variables d'environnement

### 2. Render
**Avantages :**
- 750 heures gratuites par mois
- Base de données PostgreSQL gratuite
- Déploiement automatique

**Étapes :**
1. Créez un compte sur [render.com](https://render.com)
2. Connectez votre repository GitHub
3. Créez un nouveau Web Service
4. Ajoutez une base de données PostgreSQL

## ⚙️ Configuration requise

### Variables d'environnement à configurer :
```env
APP_NAME="Barber Shop"
APP_ENV=production
APP_DEBUG=false
APP_URL=https://votre-domaine.com

DB_CONNECTION=pgsql
DB_HOST=votre-host-db
DB_PORT=5432
DB_DATABASE=votre-database
DB_USERNAME=votre-username
DB_PASSWORD=votre-password

CACHE_DRIVER=file
SESSION_DRIVER=file
QUEUE_CONNECTION=sync
```

### Commandes à exécuter après déploiement :
```bash
php artisan key:generate
php artisan migrate
php artisan storage:link
npm run build
```

## 📁 Fichiers de configuration

### Procfile (déjà créé)
```
web: vendor/bin/heroku-php-apache2 public/
```

### Configuration de la base de données
Pour Railway/Render, utilisez PostgreSQL au lieu de SQLite.

## 🔧 Optimisations recommandées

1. **Cache de configuration :**
   ```bash
   php artisan config:cache
   php artisan route:cache
   php artisan view:cache
   ```

2. **Optimisation des assets :**
   ```bash
   npm run build
   ```

3. **Sécurité :**
   - Définir `APP_DEBUG=false` en production
   - Utiliser HTTPS
   - Configurer les variables d'environnement

## 📞 Support

Si vous rencontrez des problèmes :
1. Vérifiez les logs de déploiement
2. Assurez-vous que toutes les variables d'environnement sont configurées
3. Vérifiez que la base de données est accessible

## 💰 Coûts estimés

- **Railway :** Gratuit (500h/mois) puis $5/mois
- **Render :** Gratuit (750h/mois) puis $7/mois
- **Heroku :** $7/mois (plan Eco) 