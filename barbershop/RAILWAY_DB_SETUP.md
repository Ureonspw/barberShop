# 🗄️ Configuration Base de Données Railway - Barber Shop

## 📋 Étapes pour configurer PostgreSQL

### 1. Ajouter une base de données PostgreSQL

1. **Dans votre projet Railway** :
   - Allez sur [railway.app](https://railway.app)
   - Ouvrez votre projet Barber Shop
   - Cliquez sur le bouton **"New"**
   - Sélectionnez **"Database"** → **"PostgreSQL"**

2. **Railway va automatiquement** :
   - Créer une base PostgreSQL
   - Générer les variables d'environnement
   - Connecter la DB à votre application

### 2. Vérifier les variables d'environnement

Railway génère automatiquement ces variables dans votre projet :
```env
DB_HOST=containers-us-west-XX.railway.app
DB_PORT=5432
DB_DATABASE=railway
DB_USERNAME=postgres
DB_PASSWORD=votre_mot_de_passe
```

### 3. Configurer les variables d'environnement

Dans l'onglet **"Variables"** de votre projet Railway, ajoutez :

```env
APP_NAME="Barber Shop"
APP_ENV=production
APP_DEBUG=false
APP_URL=https://votre-app.railway.app

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

### 4. Exécuter les migrations

Après avoir configuré la DB, Railway va automatiquement exécuter :
```bash
php artisan migrate --force
```

### 5. Vérifier la connexion

Pour vérifier que tout fonctionne :
1. Allez dans l'onglet **"Deployments"**
2. Vérifiez que le déploiement s'est bien passé
3. Cliquez sur votre URL d'application

## 🔍 Vérification de la base de données

### Via l'interface Railway :
1. Cliquez sur votre base PostgreSQL dans le projet
2. Onglet **"Connect"** → **"Connect with Railway CLI"**
3. Ou utilisez **"Query"** pour exécuter des requêtes SQL

### Via les logs :
1. Onglet **"Deployments"**
2. Vérifiez qu'il n'y a pas d'erreurs de connexion DB

## 🚨 Problèmes courants

### Erreur de connexion DB :
- Vérifiez que les variables DB_* sont bien configurées
- Assurez-vous que la base PostgreSQL est créée
- Vérifiez les logs de déploiement

### Erreur de migration :
- Vérifiez que la DB est accessible
- Consultez les logs pour les erreurs spécifiques

## 📊 Monitoring de la base de données

- **Onglet PostgreSQL** : Métriques, connexions, requêtes
- **Logs** : Requêtes lentes, erreurs
- **Backup** : Sauvegardes automatiques

## 🔗 Accès à votre application

Votre application sera accessible sur :
`https://votre-app-name.railway.app`

## 🎯 Prochaines étapes

1. **Testez votre application** : Visitez l'URL
2. **Vérifiez les données** : Connectez-vous et testez les fonctionnalités
3. **Configurez un domaine personnalisé** (optionnel)
4. **Configurez les alertes** (optionnel) 