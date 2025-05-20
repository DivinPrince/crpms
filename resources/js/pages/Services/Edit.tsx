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
import { type Service } from '@/types';
import { useForm } from '@inertiajs/react';
import { FormEvent } from 'react';

interface EditServiceProps {
    service: Service;
}

export default function EditService({ service }: EditServiceProps) {
    const { data, setData, patch, processing, errors } = useForm({
        ServiceName: service.ServiceName,
        ServicePrice: service.ServicePrice.toString(),
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        patch(`/services/${service.ServiceCode}`);
    };

    return (
        <AppLayout breadcrumbs={[
            { title: 'Services', href: '/services' },
            { title: 'Edit', href: `/services/${service.ServiceCode}/edit` }
        ]}>
            <div className="container py-6 px-4">
                <h1 className="text-2xl font-bold mb-6">Edit Service</h1>

                <Card className="max-w-2xl mx-auto">
                    <CardHeader>
                        <CardTitle>Service Details</CardTitle>
                        <CardDescription>
                            Update the details of the service
                        </CardDescription>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="serviceCode">Service Code</Label>
                                <Input
                                    id="serviceCode"
                                    value={service.ServiceCode}
                                    disabled
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="serviceName">Service Name</Label>
                                <Input
                                    id="serviceName"
                                    value={data.ServiceName}
                                    onChange={e => setData('ServiceName', e.target.value)}
                                    placeholder="Enter service name"
                                />
                                {errors.ServiceName && (
                                    <p className="text-sm text-red-500">{errors.ServiceName}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="servicePrice">Service Price (RWF)</Label>
                                <Input
                                    id="servicePrice"
                                    type="number"
                                    value={data.ServicePrice}
                                    onChange={e => setData('ServicePrice', e.target.value)}
                                    placeholder="Enter price in RWF"
                                />
                                {errors.ServicePrice && (
                                    <p className="text-sm text-red-500">{errors.ServicePrice}</p>
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
                                {processing ? 'Updating...' : 'Update Service'}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </AppLayout>
    );
} 