<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Modules\Usuarios\app\Models\EstadoUsuario;
use Modules\Usuarios\app\Models\TIG;
use Spatie\Permission\Traits\HasPermissions;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasUuids, HasRoles, HasPermissions;

    protected $primaryKey = 'id';

    protected $keyType = 'uuid';

    protected $fillable = [
        'id',
        'nombre',
        'apellido',
        'nombreUsuario',
        'correo',
        'estado',
    ];

    protected $hidden = [
        'password',
        'remember_token',
        // 'created_at',
        // 'updated_at',
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

    public function scopeSearch(Builder $query, string $search): Builder
    {
        // $buscar = str_replace(' ', '%', $search);
        return $query->orWhere('correo', 'like', $search)
            ->orWhere('nombreUsuario', 'like', $search);
    }
}
