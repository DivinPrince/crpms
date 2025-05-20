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
import { type Car, type ServiceRecord } from '@/types';
import { Link, router } from '@inertiajs/react';
import { Edit, Trash2, FileSpreadsheet } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow 
} from '@/components/ui/table';

interface ShowCarProps {
    car: Car;
    serviceRecords: ServiceRecord[];
}

export default function ShowCar({ car, serviceRecords }: ShowCarProps) {
    const deleteCar = () => {
        if (confirm('Are you sure you want to delete this car?')) {
            router.delete(`/cars/${car.PlateNumber}`);
        }
    };

    return (
        <AppLayout breadcrumbs={[
            { title: 'Cars', href: '/cars' },
            { title: car.PlateNumber, href: `/cars/${car.PlateNumber}` }
        ]}>
            <div className="container py-6 px-4">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Car Details</h1>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" asChild>
                            <Link href={`/cars/${car.PlateNumber}/edit`}>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                            </Link>
                        </Button>
                        <Button variant="destructive" onClick={deleteCar}>
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                        </Button>
                    </div>
                </div>

                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle>Car Information</CardTitle>
                        <CardDescription>
                            Details about the registered car
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <h3 className="text-sm font-medium">Plate Number</h3>
                                <p className="text-lg">{car.PlateNumber}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium">Type</h3>
                                <p className="text-lg">{car.Type}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium">Model</h3>
                                <p className="text-lg">{car.Model}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium">Manufacturing Year</h3>
                                <p className="text-lg">{car.ManufacturingYear}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium">Driver Phone</h3>
                                <p className="text-lg">{car.DriverPhone}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium">Mechanic Name</h3>
                                <p className="text-lg">{car.MechanicName}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <div>
                                <CardTitle>Service History</CardTitle>
                                <CardDescription>
                                    List of repair services for this car
                                </CardDescription>
                            </div>
                            <Button asChild>
                                <Link href="/service-records/create">
                                    <FileSpreadsheet className="h-4 w-4 mr-2" />
                                    New Service Record
                                </Link>
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Record Number</TableHead>
                                    <TableHead>Service Date</TableHead>
                                    <TableHead>Service</TableHead>
                                    <TableHead>Payment Status</TableHead>
                                    <TableHead className="text-right">Amount</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {serviceRecords.length > 0 ? (
                                    serviceRecords.map((record) => (
                                        <TableRow key={record.RecordNumber}>
                                            <TableCell>
                                                <Link 
                                                    href={`/service-records/${record.RecordNumber}`} 
                                                    className="text-blue-600 hover:underline"
                                                >
                                                    {record.RecordNumber}
                                                </Link>
                                            </TableCell>
                                            <TableCell>{new Date(record.ServiceDate).toLocaleDateString()}</TableCell>
                                            <TableCell>{record.service?.ServiceName}</TableCell>
                                            <TableCell>
                                                {record.payment ? (
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                        Paid
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                                        Pending
                                                    </span>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                {record.payment 
                                                    ? formatCurrency(record.payment.AmountPaid) 
                                                    : record.service 
                                                        ? formatCurrency(record.service.ServicePrice)
                                                        : '-'
                                                }
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center">
                                            No service records found for this car
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