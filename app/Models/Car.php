<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Car extends Model
{
    use HasFactory;

    protected $primaryKey = 'PlateNumber';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'PlateNumber',
        'Type',
        'Model',
        'ManufacturingYear',
        'DriverPhone',
        'MechanicName',
    ];

    public function serviceRecords(): HasMany
    {
        return $this->hasMany(ServiceRecord::class, 'CarPlateNumber', 'PlateNumber');
    }
}
