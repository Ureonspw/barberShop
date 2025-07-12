<?php

namespace Database\Seeders;

use App\Models\Client;
use App\Models\Coiffeur;
use App\Models\Salon;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class ClientSeeder extends Seeder
{
    public function run(): void
    {
        $coiffeurs = Coiffeur::all();
        $salons = Salon::all();

        $noms = [
            'Martin Dubois', 'Sophie Leroy', 'Pierre Moreau', 'Emma Bernard',
            'Lucas Petit', 'Julie Simon', 'Thomas Durand', 'Camille Roux',
            'Nicolas Michel', 'Léa David', 'Hugo Mercier', 'Chloé Blanchard',
            'Maxime Faure', 'Sarah Garnier', 'Alexandre Rousseau', 'Emma Leroy',
            'Lucas Martin', 'Julie Dubois', 'Thomas Moreau', 'Camille Bernard',
            'Nicolas Petit', 'Léa Simon', 'Hugo Durand', 'Chloé Roux',
            'Maxime Michel', 'Sarah David', 'Alexandre Mercier', 'Emma Blanchard',
            'Lucas Faure', 'Julie Garnier', 'Thomas Rousseau', 'Camille Leroy',
            'Nicolas Martin', 'Léa Dubois', 'Hugo Moreau', 'Chloé Bernard',
            'Maxime Petit', 'Sarah Simon', 'Alexandre Durand', 'Emma Roux',
            'Lucas Michel', 'Julie David', 'Thomas Mercier', 'Camille Blanchard',
            'Nicolas Faure', 'Léa Garnier', 'Hugo Rousseau', 'Chloé Leroy',
            'Maxime Martin', 'Sarah Dubois', 'Alexandre Moreau', 'Emma Bernard'
        ];

        $contacts = [
            '+33 1 23 45 67 89', '+33 1 98 76 54 32', '+33 2 34 56 78 90',
            '+33 2 09 87 65 43', '+33 3 45 67 89 01', '+33 3 21 09 87 65',
            '+33 4 56 78 90 12', '+33 4 32 10 98 76', '+33 5 67 89 01 23',
            '+33 5 43 21 09 87', '+33 6 78 90 12 34', '+33 6 54 32 10 98',
            '+33 7 89 01 23 45', '+33 7 65 43 21 09', '+33 8 90 12 34 56',
            '+33 8 76 54 32 10', '+33 9 01 23 45 67', '+33 9 87 65 43 21',
            '+33 1 12 34 56 78', '+33 1 89 76 54 32', '+33 2 23 45 67 89',
            '+33 2 98 76 54 32', '+33 3 34 56 78 90', '+33 3 09 87 65 43',
            '+33 4 45 67 89 01', '+33 4 21 09 87 65', '+33 5 56 78 90 12',
            '+33 5 32 10 98 76', '+33 6 67 89 01 23', '+33 6 43 21 09 87',
            '+33 7 78 90 12 34', '+33 7 54 32 10 98', '+33 8 89 01 23 45',
            '+33 8 65 43 21 09', '+33 9 90 12 34 56', '+33 9 76 54 32 10',
            '+33 1 01 23 45 67', '+33 1 87 65 43 21', '+33 2 12 34 56 78',
            '+33 2 89 76 54 32', '+33 3 23 45 67 89', '+33 3 98 76 54 32',
            '+33 4 34 56 78 90', '+33 4 09 87 65 43', '+33 5 45 67 89 01',
            '+33 5 21 09 87 65', '+33 6 56 78 90 12', '+33 6 32 10 98 76',
            '+33 7 67 89 01 23', '+33 7 43 21 09 87', '+33 8 78 90 12 34',
            '+33 8 54 32 10 98', '+33 9 89 01 23 45', '+33 9 65 43 21 09'
        ];

        // Générer des données sur les 30 derniers jours avec des heures réalistes
        for ($i = 0; $i < 200; $i++) {
            $coiffeur = $coiffeurs->random();
            $salon = $salons->random();
            
            // Générer une date de création récente (derniers 30 jours)
            $daysAgo = rand(0, 30);
            $hour = rand(0, 23); // Heures de 00h à 23h
            $minute = rand(0, 59);
            
            $createdAt = Carbon::now()->subDays($daysAgo)->setTime($hour, $minute, 0);
            
            // Date de coiffure peut être différente de la création
            $coiffureDaysAgo = rand(0, $daysAgo);
            $coiffureHour = rand(0, 23);
            $coiffureMinute = rand(0, 59);
            $dateCoiffure = Carbon::now()->subDays($coiffureDaysAgo)->setTime($coiffureHour, $coiffureMinute, 0);

            Client::create([
                'nom' => $noms[$i % count($noms)],
                'contacts' => $contacts[$i % count($contacts)],
                'id_salon' => $salon->id_salon,
                'id_coiffeur' => $coiffeur->id_coiffeur,
                'date_coiffure' => $dateCoiffure,
                'created_at' => $createdAt,
                'updated_at' => $createdAt,
            ]);
        }
    }
} 