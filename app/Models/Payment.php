<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Payment extends Model
{
    use HasFactory;

    protected $primaryKey = 'PaymentNumber';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'PaymentNumber',
        'AmountPaid',
        'PaymentDate',
        'RecordNumber',
    ];

    protected $casts = [
        'PaymentDate' => 'date',
        'AmountPaid' => 'decimal:2',
    ];

    public function serviceRecord(): BelongsTo
    {
        return $this->belongsTo(ServiceRecord::class, 'RecordNumber', 'RecordNumber');
    }
}
