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
import { 
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { type Car, type Service } from '@/types';
import { useForm } from '@inertiajs/react';
import { FormEvent } from 'react';

interface CreateServiceRecordProps {
    cars: Car[];
    services: Service[];
}

export default function CreateServiceRecord({ cars, services }: CreateServiceRecordProps) {
    const { data, setData, post, processing, errors } = useForm({
        CarPlateNumber: '',
        ServiceCode: '',
        ServiceDate: new Date().toISOString().substring(0, 10),
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post('/service-records');
    };

    // Get the selected service for price display
    const selectedService = services.find(service => service.ServiceCode === data.ServiceCode);

    return (
        <AppLayout breadcrumbs={[
            { title: 'Service Records', href: '/service-records' },
            { title: 'Create', href: '/service-records/create' }
        ]}>
            <div className="container py-6 px-4">
                <h1 className="text-2xl font-bold mb-6">Create Service Record</h1>

                <Card className="max-w-2xl mx-auto">
                    <CardHeader>
                        <CardTitle>Service Record Details</CardTitle>
                        <CardDescription>
                            Record a new car repair service
                        </CardDescription>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="plateNumber">Car</Label>
                                <Select 
                                    value={data.CarPlateNumber} 
                                    onValueChange={(value) => setData('CarPlateNumber', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a car" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {cars.map((car) => (
                                            <SelectItem key={car.PlateNumber} value={car.PlateNumber}>
                                                {car.PlateNumber} - {car.Model}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.CarPlateNumber && (
                                    <p className="text-sm text-red-500">{errors.CarPlateNumber}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="service">Service</Label>
                                <Select 
                                    value={data.ServiceCode} 
                                    onValueChange={(value) => setData('ServiceCode', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a service" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {services.map((service) => (
                                            <SelectItem key={service.ServiceCode} value={service.ServiceCode}>
                                                {service.ServiceName} - {new Intl.NumberFormat('rw-RW', {
                                                    style: 'currency',
                                                    currency: 'RWF',
                                                    minimumFractionDigits: 0,
                                                }).format(service.ServicePrice)}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.ServiceCode && (
                                    <p className="text-sm text-red-500">{errors.ServiceCode}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="serviceDate">Service Date</Label>
                                <Input
                                    id="serviceDate"
                                    type="date"
                                    value={data.ServiceDate}
                                    onChange={e => setData('ServiceDate', e.target.value)}
                                />
                                {errors.ServiceDate && (
                                    <p className="text-sm text-red-500">{errors.ServiceDate}</p>
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
                                {processing ? 'Saving...' : 'Create Record'}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </AppLayout>
    );
} 