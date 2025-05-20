<?php

namespace App\Http\Controllers;

use App\Models\Car;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CarController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $cars = Car::all();
        return Inertia::render('Cars/Index', [
            'cars' => $cars
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Cars/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'PlateNumber' => 'required|string|max:20|unique:cars,PlateNumber',
            'Type' => 'required|string|max:100',
            'Model' => 'required|string|max:100',
            'ManufacturingYear' => 'required|integer|min:1900|max:' . (date('Y') + 1),
            'DriverPhone' => 'required|string|max:20',
            'MechanicName' => 'required|string|max:100',
        ]);
        
        Car::create($validated);
        
        return redirect()->route('cars.index')
            ->with('message', 'Car added successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Car $car)
    {
        return Inertia::render('Cars/Show', [
            'car' => $car,
            'serviceRecords' => $car->serviceRecords()->with(['service', 'payment'])->get()
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Car $car)
    {
        return Inertia::render('Cars/Edit', [
            'car' => $car
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Car $car)
    {
        $validated = $request->validate([
            'Type' => 'required|string|max:100',
            'Model' => 'required|string|max:100',
            'ManufacturingYear' => 'required|integer|min:1900|max:' . (date('Y') + 1),
            'DriverPhone' => 'required|string|max:20',
            'MechanicName' => 'required|string|max:100',
        ]);
        
        $car->update($validated);
        
        return redirect()->route('cars.index')
            ->with('message', 'Car updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Car $car)
    {
        $car->delete();
        
        return redirect()->route('cars.index')
            ->with('message', 'Car deleted successfully.');
    }
}
