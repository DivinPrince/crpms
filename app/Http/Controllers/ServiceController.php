<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $services = Service::all();
        return Inertia::render('Services/Index', [
            'services' => $services
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Services/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'ServiceName' => 'required|string|max:255',
            'ServicePrice' => 'required|numeric|min:0',
        ]);
        
        // Generate a unique service code
        $serviceCode = 'SRV' . Str::upper(Str::random(8));
        
        Service::create([
            'ServiceCode' => $serviceCode,
            'ServiceName' => $validated['ServiceName'],
            'ServicePrice' => $validated['ServicePrice'],
        ]);
        
        return redirect()->route('services.index')
            ->with('message', 'Service created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Service $service)
    {
        return Inertia::render('Services/Show', [
            'service' => $service
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Service $service)
    {
        return Inertia::render('Services/Edit', [
            'service' => $service
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Service $service)
    {
        $validated = $request->validate([
            'ServiceName' => 'required|string|max:255',
            'ServicePrice' => 'required|numeric|min:0',
        ]);
        
        $service->update([
            'ServiceName' => $validated['ServiceName'],
            'ServicePrice' => $validated['ServicePrice'],
        ]);
        
        return redirect()->route('services.index')
            ->with('message', 'Service updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Service $service)
    {
        $service->delete();
        
        return redirect()->route('services.index')
            ->with('message', 'Service deleted successfully.');
    }
}
