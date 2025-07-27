<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Coiffeur extends Model
{
    use HasFactory;

    protected $table = 'coiffeurs';
    protected $primaryKey = 'id_coiffeur';

    protected $fillable = [
        'nom', 
        'specialite',
        'disponibilite',
        'id_salon'
    ];

    public function salon()
    {
        return $this->belongsTo(Salon::class, 'id_salon', 'id_salon');
    }

    public function clients()
    {
        return $this->hasMany(Client::class, 'id_coiffeur', 'id_coiffeur');
    }
} 