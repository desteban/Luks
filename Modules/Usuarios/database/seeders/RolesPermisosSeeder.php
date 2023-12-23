<?php

namespace Modules\Usuarios\database\seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolesPermisosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        /**
         * ------------------------------------------------------------------------
         * *     Permisos Ingresos
         * ------------------------------------------------------------------------
         */
        Permission::create(['name' => 'ingresos.crear']);
        Permission::create(['name' => 'ingresos.editar']);

        /**
         * ------------------------------------------------------------------------
         * *     Permisos Usuarios
         * ------------------------------------------------------------------------
         */
        Permission::create(['name' => 'usuarios.editar']);
        Permission::create(['name' => 'usuarios.listar']);

        /**
         * ------------------------------------------------------------------------
         *      * CREAR ROLES
         * ------------------------------------------------------------------------
         * lista de roles de la aplicacion
         */
        $rolAdministrador = Role::create(['name' => 'Administrador']);
        $rolUsuario = Role::create(['name' => 'usuario']);

        $rolAdministrador->syncPermissions([
            'ingresos.crear',
            'ingresos.editar',
            'usuarios.editar',
            'usuarios.listar',
        ]);
    }
}
