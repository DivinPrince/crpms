<?php

namespace App\Http\Controllers;

use App\Models\Car;
use App\Models\Service;
use App\Models\ServiceRecord;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ServiceRecordController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $serviceRecords = ServiceRecord::with(['car', 'service', 'payment'])->get();
        return Inertia::render('ServiceRecords/Index', [
            'serviceRecords' => $serviceRecords
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('ServiceRecords/Create', [
            'cars' => Car::all(),
            'services' => Service::all()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'ServiceDate' => 'required|date',
            'CarPlateNumber' => 'required|exists:cars,PlateNumber',
            'ServiceCode' => 'required|exists:services,ServiceCode',
        ]);
        
        // Generate a unique record number
        $recordNumber = 'REC' . Str::upper(Str::random(8));
        
        ServiceRecord::create([
            'RecordNumber' => $recordNumber,
            'ServiceDate' => $validated['ServiceDate'],
            'CarPlateNumber' => $validated['CarPlateNumber'],
            'ServiceCode' => $validated['ServiceCode'],
        ]);
        
        return redirect()->route('service-records.index')
            ->with('message', 'Service record created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(ServiceRecord $serviceRecord)
    {
        $serviceRecord->load(['car', 'service', 'payment']);
        
        return Inertia::render('ServiceRecords/Show', [
            'serviceRecord' => $serviceRecord
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ServiceRecord $serviceRecord)
    {
        return Inertia::render('ServiceRecords/Edit', [
            'serviceRecord' => $serviceRecord,
            'cars' => Car::all(),
            'services' => Service::all()
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ServiceRecord $serviceRecord)
    {
        $validated = $request->validate([
            'ServiceDate' => 'required|date',
            'CarPlateNumber' => 'required|exists:cars,PlateNumber',
            'ServiceCode' => 'required|exists:services,ServiceCode',
        ]);
        
        $serviceRecord->update($validated);
        
        return redirect()->route('service-records.index')
            ->with('message', 'Service record updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ServiceRecord $serviceRecord)
    {
        $serviceRecord->delete();
        
        return redirect()->route('service-records.index')
            ->with('message', 'Service record deleted successfully.');
    }
}
