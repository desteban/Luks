<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->uuid('id')->unique()->nullable(false);
            $table->string('nombre')->nullable(false);
            $table->string('apellido')->nullable(false);
            $table->string('nombreUsuario', 50)->unique()->nullable(false);
            $table->string('correo')->unique()->nullable(false);
            $table->string('password')->nullable(false);
            $table->integer('estado')->nullable(false);
            $table->timestamps();

            $table->primary(['id']);
            $table->foreign('estado')->on('estados_usuario')->references('id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
