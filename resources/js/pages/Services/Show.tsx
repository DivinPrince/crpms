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
import { type Service } from '@/types';
import { Link, router } from '@inertiajs/react';
import { Edit, Trash2 } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface ShowServiceProps {
    service: Service;
}

export default function ShowService({ service }: ShowServiceProps) {
    const deleteService = () => {
        if (confirm('Are you sure you want to delete this service?')) {
            router.delete(`/services/${service.ServiceCode}`);
        }
    };

    return (
        <AppLayout breadcrumbs={[
            { title: 'Services', href: '/services' },
            { title: service.ServiceName, href: `/services/${service.ServiceCode}` }
        ]}>
            <div className="container py-6 px-4">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Service Details</h1>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" asChild>
                            <Link href={`/services/${service.ServiceCode}/edit`}>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                            </Link>
                        </Button>
                        <Button variant="destructive" onClick={deleteService}>
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                        </Button>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>{service.ServiceName}</CardTitle>
                        <CardDescription>
                            Service details and information
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <h3 className="text-sm font-medium">Service Code</h3>
                                <p className="text-lg">{service.ServiceCode}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium">Service Name</h3>
                                <p className="text-lg">{service.ServiceName}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium">Price</h3>
                                <p className="text-lg">{formatCurrency(service.ServicePrice)}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium">Created At</h3>
                                <p className="text-lg">{new Date(service.created_at).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button variant="outline" onClick={() => window.history.back()}>
                            Back
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </AppLayout>
    );
} 