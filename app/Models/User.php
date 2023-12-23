<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Modules\Usuarios\app\Models\EstadoUsuario;
use Modules\Usuarios\app\Models\TIG;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasUuids;

    protected $primaryKey = 'id';

    protected $keyType = 'uuid';

    protected $fillable = [
        'nombre',
        'apellido',
        'nombreUsuario',
        'correo',
        'password',
        'estado',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function EstadoCuenta(): BelongsTo
    {
        return $this->belongsTo(EstadoUsuario::class, 'estado', 'id');
    }

    public function TIGs(): HasMany
    {
        return $this->hasMany(TIG::class, 'idUsuario', 'id');
    }
}
