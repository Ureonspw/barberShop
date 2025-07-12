# Système de Redirection Basé sur les Rôles

Ce système permet de rediriger automatiquement les utilisateurs vers différentes pages selon leur rôle après la connexion.

## Fonctionnalités

- **Redirection automatique** : Les utilisateurs sont redirigés vers la page appropriée selon leur rôle
- **Protection des routes** : Les routes sont protégées par middleware selon le rôle
- **Gestion centralisée** : Utilisation d'un trait pour éviter la duplication de code

## Rôles Supportés

- **admin** : Redirigé vers `/dashboard`
- **caissier** : Redirigé vers `/caissier`

## Structure des Fichiers

### Contrôleurs Modifiés
- `app/Http/Controllers/Auth/AuthenticatedSessionController.php` - Gestion de la connexion
- `app/Http/Controllers/Auth/RegisteredUserController.php` - Gestion de l'enregistrement
- `app/Http/Controllers/Auth/ConfirmablePasswordController.php` - Confirmation de mot de passe
- `app/Http/Controllers/Auth/VerifyEmailController.php` - Vérification d'email
- `app/Http/Controllers/Auth/EmailVerificationPromptController.php` - Prompt de vérification

### Nouveaux Fichiers
- `app/Traits/RedirectBasedOnRole.php` - Trait pour la redirection
- `app/Http/Middleware/CheckRole.php` - Middleware de vérification des rôles
- `app/Http/Controllers/CaissierController.php` - Contrôleur pour la page caissier
- `app/Http/Controllers/DashboardController.php` - Contrôleur pour le dashboard

### Routes
- `/dashboard` - Page admin (rôle: admin)
- `/caissier` - Page caissier (rôle: caissier)

## Utilisation

### Connexion
1. L'utilisateur se connecte avec ses identifiants
2. Le système vérifie son rôle dans la base de données
3. Redirection automatique vers la page appropriée

### Protection des Routes
Les routes sont protégées par le middleware `role` :
```php
Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified', 'role:admin'])
    ->name('dashboard');
```

### Ajout d'un Nouveau Rôle
1. Ajouter le rôle dans la base de données
2. Créer la route correspondante
3. Ajouter la logique de redirection dans le trait `RedirectBasedOnRole`

## Utilisateurs de Test

- **Admin** : admin@example.com / password
- **Caissier** : caissier@example.com / password

## Base de Données

Le champ `role` est stocké dans la table `users` avec les valeurs possibles :
- `admin`
- `caissier`

La valeur par défaut est `caissier` selon la migration. 