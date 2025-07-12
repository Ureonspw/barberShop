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
        Schema::create('coiffeurs', function (Blueprint $table) {
            $table->id("id_coiffeur");
            $table->string('nom');
            $table->string('specialite')->nullable();   
            $table->string('disponibilite')->nullable();
            $table->foreignId('id_salon')->constrained('salons', 'id_salon')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('coiffeurs');
    }
};
