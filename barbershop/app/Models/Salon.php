<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Salon extends Model
{
    use HasFactory;

    protected $table = 'salons';
    protected $primaryKey = 'id_salon';

    protected $fillable = [
        'nom',
        'adresse',
        'id_admin'
    ];

    public function admin()
    {
        return $this->belongsTo(User::class, 'id_admin', 'id_user');
    }

    public function coiffeurs()
    {
        return $this->hasMany(Coiffeur::class, 'id_salon', 'id_salon');
    }

    public function clients()
    {
        return $this->hasMany(Client::class, 'id_salon', 'id_salon');
    }

    public function paiements()
    {
        return $this->hasMany(Paiement::class, 'id_salon', 'id_salon');
    }
} 