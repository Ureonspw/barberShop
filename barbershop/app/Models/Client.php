<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;

    protected $table = 'clients';
    protected $primaryKey = 'id_client';

    protected $fillable = [
        'nom',
        'contacts',
        'id_salon', 
        'id_coiffeur',
        'date_coiffure'
    ];

    protected $casts = [
        'date_coiffure' => 'datetime'
    ];

    public function salon()
    {
        return $this->belongsTo(Salon::class, 'id_salon', 'id_salon');
    }

    public function coiffeur()
    {
        return $this->belongsTo(Coiffeur::class, 'id_coiffeur', 'id_coiffeur');
    }

    public function paiements()
    {
        return $this->hasMany(Paiement::class, 'id_client', 'id_client');
    }
} 