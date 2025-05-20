<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use App\Models\ServiceRecord;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class PaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $payments = Payment::with('serviceRecord.car', 'serviceRecord.service')->get();
        return Inertia::render('Payments/Index', [
            'payments' => $payments
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Get only service records that don't have a payment
        $serviceRecords = ServiceRecord::whereDoesntHave('payment')
            ->with(['car', 'service'])
            ->get();
            
        return Inertia::render('Payments/Create', [
            'serviceRecords' => $serviceRecords
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'AmountPaid' => 'required|numeric|min:0',
            'PaymentDate' => 'required|date',
            'RecordNumber' => 'required|exists:service_records,RecordNumber|unique:payments,RecordNumber',
        ]);
        
        // Generate a unique payment number
        $paymentNumber = 'PAY' . Str::upper(Str::random(8));
        
        Payment::create([
            'PaymentNumber' => $paymentNumber,
            'AmountPaid' => $validated['AmountPaid'],
            'PaymentDate' => $validated['PaymentDate'],
            'RecordNumber' => $validated['RecordNumber'],
        ]);
        
        return redirect()->route('payments.index')
            ->with('message', 'Payment recorded successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Payment $payment)
    {
        $payment->load('serviceRecord.car', 'serviceRecord.service');
        
        return Inertia::render('Payments/Show', [
            'payment' => $payment
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Payment $payment)
    {
        $payment->load('serviceRecord');
        
        return Inertia::render('Payments/Edit', [
            'payment' => $payment,
            'serviceRecords' => [
                $payment->serviceRecord
            ]
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Payment $payment)
    {
        $validated = $request->validate([
            'AmountPaid' => 'required|numeric|min:0',
            'PaymentDate' => 'required|date',
        ]);
        
        $payment->update($validated);
        
        return redirect()->route('payments.index')
            ->with('message', 'Payment updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Payment $payment)
    {
        $payment->delete();
        
        return redirect()->route('payments.index')
            ->with('message', 'Payment deleted successfully.');
    }
    
    /**
     * Generate an invoice for the payment.
     */
    public function generateInvoice(Payment $payment)
    {
        $payment->load('serviceRecord.car', 'serviceRecord.service');
        
        return Inertia::render('Payments/Invoice', [
            'payment' => $payment,
            'car' => $payment->serviceRecord->car,
            'service' => $payment->serviceRecord->service,
        ]);
    }
}
