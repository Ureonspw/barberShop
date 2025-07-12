<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Paiement extends Model
{
    use HasFactory;

    protected $table = 'paiements';
    protected $primaryKey = 'id_paiement';

    protected $fillable = [
        'mode_paiement',
        'somme_paiement',
        'statut_paiement',
        'id_client',
        'id_salon',
        'date_paiement'
    ];

    protected $casts = [
        'date_paiement' => 'datetime'
    ];

    public function client()
    {
        return $this->belongsTo(Client::class, 'id_client', 'id_client');
    }

    public function salon()
    {
        return $this->belongsTo(Salon::class, 'id_salon', 'id_salon');
    }
} 