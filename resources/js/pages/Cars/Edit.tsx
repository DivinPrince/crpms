import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardFooter, 
    CardHeader, 
    CardTitle 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { type Car } from '@/types';
import { useForm } from '@inertiajs/react';
import { FormEvent } from 'react';

interface EditCarProps {
    car: Car;
}

export default function EditCar({ car }: EditCarProps) {
    const { data, setData, patch, processing, errors } = useForm({
        Type: car.Type,
        Model: car.Model,
        ManufacturingYear: car.ManufacturingYear,
        DriverPhone: car.DriverPhone,
        MechanicName: car.MechanicName,
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        patch(`/cars/${car.PlateNumber}`);
    };

    return (
        <AppLayout breadcrumbs={[
            { title: 'Cars', href: '/cars' },
            { title: 'Edit', href: `/cars/${car.PlateNumber}/edit` }
        ]}>
            <div className="container py-6 px-4">
                <h1 className="text-2xl font-bold mb-6">Edit Car</h1>

                <Card className="max-w-2xl mx-auto">
                    <CardHeader>
                        <CardTitle>Car Details</CardTitle>
                        <CardDescription>
                            Update the details of the car
                        </CardDescription>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="plateNumber">Plate Number</Label>
                                <Input
                                    id="plateNumber"
                                    value={car.PlateNumber}
                                    disabled
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="type">Car Type</Label>
                                <Input
                                    id="type"
                                    value={data.Type}
                                    onChange={e => setData('Type', e.target.value)}
                                    placeholder="Enter car type (e.g., Sedan, SUV)"
                                />
                                {errors.Type && (
                                    <p className="text-sm text-red-500">{errors.Type}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="model">Car Model</Label>
                                <Input
                                    id="model"
                                    value={data.Model}
                                    onChange={e => setData('Model', e.target.value)}
                                    placeholder="Enter car model"
                                />
                                {errors.Model && (
                                    <p className="text-sm text-red-500">{errors.Model}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="manufacturingYear">Manufacturing Year</Label>
                                <Input
                                    id="manufacturingYear"
                                    type="number"
                                    value={data.ManufacturingYear}
                                    onChange={e => setData('ManufacturingYear', Number(e.target.value))}
                                    placeholder="Enter manufacturing year"
                                />
                                {errors.ManufacturingYear && (
                                    <p className="text-sm text-red-500">{errors.ManufacturingYear}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="driverPhone">Driver Phone</Label>
                                <Input
                                    id="driverPhone"
                                    value={data.DriverPhone}
                                    onChange={e => setData('DriverPhone', e.target.value)}
                                    placeholder="Enter driver phone number"
                                />
                                {errors.DriverPhone && (
                                    <p className="text-sm text-red-500">{errors.DriverPhone}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="mechanicName">Mechanic Name</Label>
                                <Input
                                    id="mechanicName"
                                    value={data.MechanicName}
                                    onChange={e => setData('MechanicName', e.target.value)}
                                    placeholder="Enter mechanic name"
                                />
                                {errors.MechanicName && (
                                    <p className="text-sm text-red-500">{errors.MechanicName}</p>
                                )}
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button 
                                type="button" 
                                variant="outline" 
                                onClick={() => window.history.back()}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Updating...' : 'Update Car'}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </AppLayout>
    );
} 