<?php

namespace Database\Seeders;

use App\Models\Coiffeur;
use App\Models\Salon;
use Illuminate\Database\Seeder;

class CoiffeurSeeder extends Seeder
{
    public function run(): void
    {
        $salons = Salon::all();

        $coiffeurs = [
            [
                'nom' => 'Jean Dupont',
                'specialite' => 'Coupe classique',
                'disponibilite' => 'Lundi-Vendredi 9h-18h',
                'id_salon' => $salons->get(0)->id_salon,
            ],
            [
                'nom' => 'Marie Martin',
                'specialite' => 'Coloration',
                'disponibilite' => 'Mardi-Samedi 10h-19h',
                'id_salon' => $salons->get(0)->id_salon,
            ],
            [
                'nom' => 'Pierre Durand',
                'specialite' => 'Barbier',
                'disponibilite' => 'Lundi-Samedi 8h-17h',
                'id_salon' => $salons->get(1)->id_salon,
            ],
            [
                'nom' => 'Sophie Bernard',
                'specialite' => 'Coiffure de mariage',
                'disponibilite' => 'Mercredi-Dimanche 11h-20h',
                'id_salon' => $salons->get(1)->id_salon,
            ],
            [
                'nom' => 'Lucas Moreau',
                'specialite' => 'Coupe moderne',
                'disponibilite' => 'Lundi-Vendredi 9h-18h',
                'id_salon' => $salons->get(0)->id_salon,
            ],
            [
                'nom' => 'Emma Petit',
                'specialite' => 'Extensions',
                'disponibilite' => 'Mardi-Samedi 10h-19h',
                'id_salon' => $salons->get(0)->id_salon,
            ],
            [
                'nom' => 'Thomas Roux',
                'specialite' => 'Coupe homme',
                'disponibilite' => 'Lundi-Samedi 8h-17h',
                'id_salon' => $salons->get(1)->id_salon,
            ],
            [
                'nom' => 'Julie Simon',
                'specialite' => 'Mèches',
                'disponibilite' => 'Mercredi-Dimanche 11h-20h',
                'id_salon' => $salons->get(1)->id_salon,
            ],
        ];

        foreach ($coiffeurs as $coiffeur) {
            Coiffeur::create($coiffeur);
        }
    }
} 