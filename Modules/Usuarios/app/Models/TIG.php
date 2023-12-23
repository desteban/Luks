<?php

namespace Modules\Usuarios\app\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Modules\Usuarios\Database\factories\TIGFactory;


/**
 * Tipo Ingresos o Gastos
 */
class TIG extends Model
{
    use HasFactory;

    protected $table = 'tig_usuarios';

    protected $keyType = 'uuid';

    protected $fillable = [
        'idUsuario',
        'nombre',
        'tipo',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public function Usuario(): BelongsTo
    {
        return $this->belongsTo(User::class, 'idUsuario', 'id');
    }

    protected static function newFactory(): TIGFactory
    {
        //return TIGFactory::new();
    }
}
