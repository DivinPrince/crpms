<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            ServicesSeeder::class,
        ]);
        
        // Create a default admin user
        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@smartpark.com',
            'password' => bcrypt('password'),
        ]);
    }
}
