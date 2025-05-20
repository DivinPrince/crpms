<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Service extends Model
{
    use HasFactory;

    protected $primaryKey = 'ServiceCode';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'ServiceCode',
        'ServiceName',
        'ServicePrice',
    ];

    public function serviceRecords(): HasMany
    {
        return $this->hasMany(ServiceRecord::class, 'ServiceCode', 'ServiceCode');
    }
}
