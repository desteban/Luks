<?php

namespace Modules\EstadosUsuario\database\seeders;

use Illuminate\Database\Seeder;
use Modules\EstadosUsuario\app\Models\EstadoUsuario;

class EstadosUsuarioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        EstadoUsuario::create([
            'id' => 1,
            'estado' => 'Activo'
        ]);

        EstadoUsuario::create([
            'id' => 2,
            'estado' => 'Inhabilitado'
        ]);
    }
}
