<?php

namespace Database\Seeders;

use App\Models\Salon;
use App\Models\User;
use Illuminate\Database\Seeder;

class SalonSeeder extends Seeder
{
    public function run(): void
    {
        $users = User::where('role', 'admin')->get();

        $salons = [
            [
                'nom' => 'Salon Premium Paris',
                'adresse' => '123 Rue de la Paix, 75001 Paris',
                'id_admin' => $users->first()->id_user,
            ],
            [
                'nom' => 'Salon Élégance Lyon',
                'adresse' => '456 Avenue des Champs, 69001 Lyon',
                'id_admin' => $users->skip(1)->first()->id_user,
            ],
        ];

        foreach ($salons as $salon) {
            Salon::create($salon);
        }
    }
} 