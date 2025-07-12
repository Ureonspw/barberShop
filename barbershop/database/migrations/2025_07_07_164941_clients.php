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
        Schema::create('clients',function(Blueprint $table){
            $table->id("id_client");
            $table->string('nom');
            $table->string('contacts')->nullable();
            $table->foreignId('id_salon')->constrained('salons', 'id_salon')->onDelete('cascade');
            $table->foreignId('id_coiffeur')->constrained('coiffeurs', 'id_coiffeur')->onDelete('cascade');
            $table->timestamp("date_coiffure");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('clients');
    }
};
