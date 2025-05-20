<?php

namespace App\Http\Controllers;

use App\Models\Car;
use App\Models\Payment;
use App\Models\Service;
use App\Models\ServiceRecord;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $carCount = Car::count();
        $serviceCount = Service::count();
        $recordCount = ServiceRecord::count();
        $paymentCount = Payment::count();
        
        // Get recent payments
        $recentPayments = Payment::with('serviceRecord.car', 'serviceRecord.service')
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get();
        
        return Inertia::render('Dashboard', [
            'carCount' => $carCount,
            'serviceCount' => $serviceCount,
            'recordCount' => $recordCount,
            'paymentCount' => $paymentCount,
            'recentPayments' => $recentPayments,
        ]);
    }
}
