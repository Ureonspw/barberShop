<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use App\Models\Salon;
use App\Models\Coiffeur;
use App\Models\User;
use App\Models\Client;
use Illuminate\Http\Request;

class combocontroller extends Controller
{
    
public function create(): \Inertia\Response
{
    $salons = Salon::select('id_salon', 'nom')->get();
    $coiffeurs = Coiffeur::select('id_coiffeur', 'nom')->get();
    $users = User::select('id_user', 'name', 'email', 'role')->get();
    $clients = Client::select('id_client', 'nom', 'contacts')->get();
    
    // Compter les éléments par type
    $userCount = User::count();
    $coiffeurCount = Coiffeur::count();
    $salonCount = Salon::count();
    $clientCount = Client::count();
    
    return Inertia::render('gestionnaireadmin/gestAdmin', [
        'salons' => $salons,
        'coiffeurs' => $coiffeurs,
        'users' => $users,
        'clients' => $clients,
        'counts' => [
            'users' => $userCount,
            'coiffeurs' => $coiffeurCount,
            'salons' => $salonCount,
            'clients' => $clientCount,
        ]
    ]);
}
}
