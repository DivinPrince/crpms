<?php

namespace App\Http\Controllers;

use App\Models\Car;
use App\Models\Payment;
use App\Models\Service;
use App\Models\ServiceRecord;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReportController extends Controller
{
    /**
     * Display the reports page.
     */
    public function index()
    {
        return Inertia::render('Reports/Index');
    }

    /**
     * Generate a daily income report.
     */
    public function dailyIncome(Request $request)
    {
        $date = $request->input('date', now()->format('Y-m-d'));
        
        $payments = Payment::whereDate('PaymentDate', $date)
            ->with('serviceRecord.car', 'serviceRecord.service')
            ->get();
            
        $totalIncome = $payments->sum('AmountPaid');
        
        return Inertia::render('Reports/DailyIncome', [
            'date' => $date,
            'payments' => $payments,
            'totalIncome' => $totalIncome
        ]);
    }
    
    /**
     * Generate a monthly income report.
     */
    public function monthlyIncome(Request $request)
    {
        $year = $request->input('year', now()->year);
        $month = $request->input('month', now()->month);
        
        $payments = Payment::whereYear('PaymentDate', $year)
            ->whereMonth('PaymentDate', $month)
            ->with('serviceRecord.car', 'serviceRecord.service')
            ->get();
            
        $totalIncome = $payments->sum('AmountPaid');
        $dailyBreakdown = $payments->groupBy(function($payment) {
            return $payment->PaymentDate->format('Y-m-d');
        })->map(function($dayPayments) {
            return [
                'count' => $dayPayments->count(),
                'total' => $dayPayments->sum('AmountPaid')
            ];
        });
        
        return Inertia::render('Reports/MonthlyIncome', [
            'year' => $year,
            'month' => $month,
            'payments' => $payments,
            'totalIncome' => $totalIncome,
            'dailyBreakdown' => $dailyBreakdown
        ]);
    }
    
    /**
     * Generate a service popularity report.
     */
    public function servicePopularity()
    {
        $services = Service::withCount('serviceRecords')
            ->orderByDesc('service_records_count')
            ->get();
            
        return Inertia::render('Reports/ServicePopularity', [
            'services' => $services
        ]);
    }
    
    /**
     * Generate a car service history report.
     */
    public function carHistory(Request $request)
    {
        $plateNumber = $request->input('plateNumber');
        
        if ($plateNumber) {
            $car = Car::with(['serviceRecords.service', 'serviceRecords.payment'])
                ->where('PlateNumber', $plateNumber)
                ->first();
        } else {
            $car = null;
        }
        
        $cars = Car::all();
        
        return Inertia::render('Reports/CarHistory', [
            'cars' => $cars,
            'selectedCar' => $car,
            'plateNumber' => $plateNumber
        ]);
    }
}
