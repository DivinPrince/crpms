<?php

use App\Http\Controllers\CarController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\ServiceRecordController;
use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('welcome');

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // Services Routes
    Route::resource('services', ServiceController::class);
    
    // Cars Routes
    Route::resource('cars', CarController::class);
    
    // Service Records Routes
    Route::resource('service-records', ServiceRecordController::class);
    
    // Payments Routes
    Route::resource('payments', PaymentController::class);
    Route::get('/payments/{payment}/invoice', [PaymentController::class, 'generateInvoice'])->name('payments.invoice');
    
    // Reports Routes
    Route::get('/reports', [ReportController::class, 'index'])->name('reports.index');
    Route::get('/reports/daily-income', [ReportController::class, 'dailyIncome'])->name('reports.daily-income');
    Route::get('/reports/monthly-income', [ReportController::class, 'monthlyIncome'])->name('reports.monthly-income');
    Route::get('/reports/service-popularity', [ReportController::class, 'servicePopularity'])->name('reports.service-popularity');
    Route::get('/reports/car-history', [ReportController::class, 'carHistory'])->name('reports.car-history');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
