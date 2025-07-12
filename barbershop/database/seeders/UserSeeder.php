<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Créer un utilisateur admin
        User::create([
            'name' => 'Admin',
            'email' => 'admin@barbershop.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
        ]);

        // Créer un utilisateur caissier
        User::create([
            'name' => 'Caissier',
            'email' => 'caissier@barbershop.com',
            'password' => Hash::make('password'),
            'role' => 'caissier',
        ]);

        // Créer quelques utilisateurs supplémentaires
        User::create([
            'name' => 'Manager Salon 1',
            'email' => 'manager1@barbershop.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
        ]);

        User::create([
            'name' => 'Manager Salon 2',
            'email' => 'manager2@barbershop.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
        ]);
    }
} 