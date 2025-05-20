<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->string('PaymentNumber')->primary();
            $table->decimal('AmountPaid', 10, 2);
            $table->date('PaymentDate');
            $table->string('RecordNumber');
            $table->foreign('RecordNumber')->references('RecordNumber')->on('service_records')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
