<?php

namespace Modules\Usuarios\app\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Modules\EstadosUsuario\Database\factories\EstadoUsuarioFactory;

class EstadoUsuario extends Model
{
    use HasFactory;

    protected $table = 'estados_usuario';

    protected $fillable = [
        'estado',
    ];

    protected $hidden = [
        'id',
        'created_at',
        'updated_at',
    ];

    public function Usuarios(): HasMany
    {
        return $this->hasMany(User::class, 'estado', 'id');
    }

    protected static function newFactory(): EstadoUsuarioFactory
    {
        //return EstadoUsuarioFactory::new();
    }
}
