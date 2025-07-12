#!/bin/bash

# Script pour changer facilement le favicon
# Usage: ./change_favicon.sh chemin_vers_votre_logo.png

if [ $# -eq 0 ]; then
    echo "Usage: ./change_favicon.sh chemin_vers_votre_logo.png"
    echo "Exemple: ./change_favicon.sh ~/Desktop/mon_logo.png"
    exit 1
fi

LOGO_PATH="$1"
LOGO_NAME=$(basename "$LOGO_PATH")

echo "🔄 Changement du favicon..."

# Copier le nouveau logo
cp "$LOGO_PATH" "public/images/$LOGO_NAME"

# Créer les favicons
echo "📱 Création des favicons..."
sips -z 32 32 "public/images/$LOGO_NAME" --out public/favicon-32x32.png
sips -z 16 16 "public/images/$LOGO_NAME" --out public/favicon-16x16.png
cp "public/images/$LOGO_NAME" public/favicon.ico

# Vider le cache
echo "🧹 Vidage du cache..."
php artisan cache:clear

echo "✅ Favicon changé avec succès !"
echo "🔄 Rechargez votre navigateur (Ctrl+F5 ou Cmd+Shift+R)" 