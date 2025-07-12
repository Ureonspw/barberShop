<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('paiements', function (Blueprint $table) {
            $table->id("id_paiement");
            $table->string('mode_paiement')->default("espèce");
            $table->integer('somme_paiement')->nullable();
            $table->string('statut_paiement')->default("en attente");
            $table->foreignId('id_client')->constrained('clients', 'id_client')->onDelete('cascade');
            $table->foreignId('id_salon')->constrained('salons', 'id_salon')->onDelete('cascade');
            $table->timestamp("date_paiement");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('paiements');
    }
};
