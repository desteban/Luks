<?php

namespace Modules\Usuarios\database\seeders;

use Illuminate\Database\Seeder;

class UsuariosDatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->call([
            EstadosUsuarioSeeder::class,
            UsuarioSeeder::class,
        ]);
    }
}
