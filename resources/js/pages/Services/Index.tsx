import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { type Service } from '@/types';
import { Link, router } from '@inertiajs/react';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow 
} from '@/components/ui/table';
import { formatCurrency } from '@/lib/utils';

interface ServicesIndexProps {
    services: Service[];
}

export default function ServicesIndex({ services }: ServicesIndexProps) {
    const deleteService = (serviceCode: string) => {
        if (confirm('Are you sure you want to delete this service?')) {
            router.delete(`/services/${serviceCode}`);
        }
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Services', href: '/services' }]}>
            <div className="container py-6 px-4">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Services</h1>
                    <Button asChild>
                        <Link href="/services/create">
                            <Plus className="mr-2 h-4 w-4" />
                            Add Service
                        </Link>
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Services List</CardTitle>
                        <CardDescription>
                            Manage repair services offered by SmartPark
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Code</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {services.length > 0 ? (
                                    services.map((service) => (
                                        <TableRow key={service.ServiceCode}>
                                            <TableCell>{service.ServiceCode}</TableCell>
                                            <TableCell>{service.ServiceName}</TableCell>
                                            <TableCell>{formatCurrency(service.ServicePrice)}</TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button 
                                                        variant="outline" 
                                                        size="icon"
                                                        asChild
                                                    >
                                                        <Link href={`/services/${service.ServiceCode}`}>
                                                            <Eye className="h-4 w-4" />
                                                        </Link>
                                                    </Button>
                                                    <Button 
                                                        variant="outline" 
                                                        size="icon"
                                                        asChild
                                                    >
                                                        <Link href={`/services/${service.ServiceCode}/edit`}>
                                                            <Edit className="h-4 w-4" />
                                                        </Link>
                                                    </Button>
                                                    <Button 
                                                        variant="destructive" 
                                                        size="icon"
                                                        onClick={() => deleteService(service.ServiceCode)}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center">
                                            No services found
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
} 