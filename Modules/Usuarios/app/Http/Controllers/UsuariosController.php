<?php

namespace Modules\Usuarios\app\Http\Controllers;

use App\Helpers\Respuesta;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Modules\Usuarios\app\Http\Requests\CrearUsuarioRequest;
use Spatie\QueryBuilder\QueryBuilder;

class UsuariosController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $perPage = $_GET['per_page'] ?? 20;
        $usuarios = QueryBuilder::for(User::class)
            ->allowedFilters([
                'nombreUsuario',
                'correo',
                'estado',
            ])
            ->with(['EstadoCuenta'])
            ->paginate($perPage);

        return Respuesta::respuesta(200, 'Listado de usuarios', $usuarios);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('usuarios::create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CrearUsuarioRequest $request): JsonResponse
    {
        /**
         * En este caso a utilizar un custom request podemos obtener los datos validados con el método validated
         */
        $usuario = new User($request->validated());
        $usuario->password = $request->input('password');
        $usuario->save();
        return Respuesta::respuesta(201, 'Usuario creado con exito');
    }

    /**
     * Show the specified resource.
     */
    public function show(string $nombreUsuario)
    {

        $query = User::query();
        $query->select()->where('nombreUsuario', '=', $nombreUsuario);
        $usuario = $query->first();

        if (empty($usuario)) {
            // return Respuesta::respuesta(404, 'Usuario no encontrado');
            throw new \Exception("Error Processing Request", 1);

        }

        return Respuesta::respuesta(200, 'Usuario', $usuario);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        return view('usuarios::edit');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id): RedirectResponse
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        //
    }
}
