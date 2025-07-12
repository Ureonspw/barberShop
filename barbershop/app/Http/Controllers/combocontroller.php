<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use App\Models\Salon;

use Illuminate\Http\Request;

class combocontroller extends Controller
{
    
public function create(): \Inertia\Response
{
    $salons = Salon::select('id_salon', 'nom')->get();

    return Inertia::render('NomDeTonComposant', [
        'salons' => $salons
    ]);
}
}
