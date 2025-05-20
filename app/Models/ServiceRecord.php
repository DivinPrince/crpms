<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class ServiceRecord extends Model
{
    use HasFactory;

    protected $primaryKey = 'RecordNumber';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'RecordNumber',
        'ServiceDate',
        'CarPlateNumber',
        'ServiceCode',
    ];

    protected $casts = [
        'ServiceDate' => 'date',
    ];

    public function car(): BelongsTo
    {
        return $this->belongsTo(Car::class, 'CarPlateNumber', 'PlateNumber');
    }

    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class, 'ServiceCode', 'ServiceCode');
    }

    public function payment(): HasOne
    {
        return $this->hasOne(Payment::class, 'RecordNumber', 'RecordNumber');
    }
}
