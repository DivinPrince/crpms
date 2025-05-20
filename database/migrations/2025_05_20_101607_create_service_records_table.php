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
        Schema::create('service_records', function (Blueprint $table) {
            $table->string('RecordNumber')->primary();
            $table->date('ServiceDate');
            $table->string('CarPlateNumber');
            $table->string('ServiceCode');
            $table->foreign('CarPlateNumber')->references('PlateNumber')->on('cars')->onDelete('cascade');
            $table->foreign('ServiceCode')->references('ServiceCode')->on('services')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('service_records');
    }
};
