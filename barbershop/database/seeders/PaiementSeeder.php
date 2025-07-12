<?php

namespace Database\Seeders;

use App\Models\Client;
use App\Models\Paiement;
use App\Models\Salon;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class PaiementSeeder extends Seeder
{
    public function run(): void
    {
        $clients = Client::all();
        $salons = Salon::all();

        $modesPaiement = ['espèce', 'carte', 'chèque', 'virement'];
        $statutsPaiement = ['en attente', 'validé', 'annulé'];
        $montants = [25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100];

        // Générer des données sur les 30 derniers jours avec des heures réalistes
        for ($i = 0; $i < 300; $i++) {
            $client = $clients->random();
            $salon = $salons->random();
            
            // Générer une date de création récente (derniers 30 jours)
            $daysAgo = rand(0, 30);
            $hour = rand(0, 23); // Heures de 00h à 23h
            $minute = rand(0, 59);
            
            $createdAt = Carbon::now()->subDays($daysAgo)->setTime($hour, $minute, 0);
            
            // Date de paiement peut être différente de la création
            $paiementDaysAgo = rand(0, $daysAgo);
            $paiementHour = rand(0, 23);
            $paiementMinute = rand(0, 59);
            $datePaiement = Carbon::now()->subDays($paiementDaysAgo)->setTime($paiementHour, $paiementMinute, 0);

            Paiement::create([
                'mode_paiement' => $modesPaiement[array_rand($modesPaiement)],
                'somme_paiement' => $montants[array_rand($montants)],
                'statut_paiement' => $statutsPaiement[array_rand($statutsPaiement)],
                'id_client' => $client->id_client,
                'id_salon' => $salon->id_salon,
                'date_paiement' => $datePaiement,
                'created_at' => $createdAt,
                'updated_at' => $createdAt,
            ]);
        }
    }
} 