<?php

namespace Modules\EstadosUsuario\database\seeders;

use Illuminate\Database\Seeder;

class EstadosUsuarioDatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->call([
            EstadosUsuarioSeeder::class
        ]);
    }
}
