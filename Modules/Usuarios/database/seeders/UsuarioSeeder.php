<?php

namespace Modules\Usuarios\database\seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UsuarioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $usuario = new User([
            'nombre' => 'Usuario',
            'apellido' => 'Pruebas',
            'nombreUsuario' => env('USER_USERNAME', 'myUser'),
            'correo' => env('USER_EMAI', 'mail@mail.com'),
            'password' => env('USER_PASSWORD', 'password'),
            'estado' => 1,
        ]);

        $usuario->save();
        $usuario->assignRole('Administrador');
    }
}
