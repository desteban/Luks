<?php

namespace Modules\Usuarios\app\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CrearUsuarioRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'id' => 'uuid',
            'nombre' => 'required|string',
            'apellido' => 'required|string',
            'nombreUsuario' => 'required|unique:users,nombreUsuario|string',
            'correo' => 'required|email|unique:users,correo',
            'password' => 'required|min:6',
            'estado' => 'required|exists:estados_usuario,id',
        ];
    }

    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'id.uuid' => 'El id debe ser un uuid',
            'nombre' => [
                'required' => 'El nombre es obligatorio',
                'string' => 'El nombre debe ser una cadena de texto'
            ],
            'apellido' => [
                'required' => 'El apellido es obligatorio',
                'string' => 'El apellido debe ser una cadena de texto'
            ],
            'nombreUsuario' => [
                'required' => 'El nombre de usuario es obligatorio',
                'unique' => 'Ya existe un usuario con este nombre de usuario',
                'string' => 'El nombre de usuario debe ser una cadena de texto',
            ],
            'correo' => [
                'required' => 'El correo electrónico es obligatorio',
                'email' => 'Ingrese un formato de email válido',
                'unique' => 'Este correo no es valido',
            ],
            'password' => [
                'required' => 'La contraseña es obligatoria',
                'min' => 'La contraseña debe tener al menos 6 caracteres'
            ],
            'estado' => [
                'required' => 'Seleccione el estado del usuario',
                'exists' => 'No se encontró el estado indicado'
            ],
        ];
    }
}
