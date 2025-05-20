<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ServicesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $services = [
            [
                'ServiceName' => 'Engine Repairing',
                'ServicePrice' => 150000.00,
            ],
            [
                'ServiceName' => 'Transmission Repair',
                'ServicePrice' => 50000.00,
            ],
            [
                'ServiceName' => 'Oil Change',
                'ServicePrice' => 60000.00,
            ],
            [
                'ServiceName' => 'Chain Replacement',
                'ServicePrice' => 40000.00,
            ],
            [
                'ServiceName' => 'Disc Replacement',
                'ServicePrice' => 400000.00,
            ],
            [
                'ServiceName' => 'Wheel Alignment',
                'ServicePrice' => 5000.00,
            ],
        ];

        foreach ($services as $service) {
            Service::create([
                'ServiceCode' => 'SRV' . Str::upper(Str::random(8)),
                'ServiceName' => $service['ServiceName'],
                'ServicePrice' => $service['ServicePrice'],
            ]);
        }
    }
}
