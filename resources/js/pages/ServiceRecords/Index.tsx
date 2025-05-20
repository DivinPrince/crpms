import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { type ServiceRecord } from '@/types';
import { Link, router } from '@inertiajs/react';
import { Plus, Edit, Trash2, Eye, Receipt } from 'lucide-react';
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

interface ServiceRecordsIndexProps {
    serviceRecords: ServiceRecord[];
}

export default function ServiceRecordsIndex({ serviceRecords }: ServiceRecordsIndexProps) {
    const deleteServiceRecord = (recordNumber: string) => {
        if (confirm('Are you sure you want to delete this service record?')) {
            router.delete(`/service-records/${recordNumber}`);
        }
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Service Records', href: '/service-records' }]}>
            <div className="container py-6 px-4">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Service Records</h1>
                    <Button asChild>
                        <Link href="/service-records/create">
                            <Plus className="mr-2 h-4 w-4" />
                            Add Service Record
                        </Link>
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Service Records List</CardTitle>
                        <CardDescription>
                            Manage repair service records
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Record Number</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Car</TableHead>
                                    <TableHead>Service</TableHead>
                                    <TableHead>Payment Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {serviceRecords.length > 0 ? (
                                    serviceRecords.map((record) => (
                                        <TableRow key={record.RecordNumber}>
                                            <TableCell>{record.RecordNumber}</TableCell>
                                            <TableCell>{new Date(record.ServiceDate).toLocaleDateString()}</TableCell>
                                            <TableCell>
                                                {record.car ? (
                                                    <Link 
                                                        href={`/cars/${record.car.PlateNumber}`}
                                                        className="text-blue-600 hover:underline"
                                                    >
                                                        {record.car.PlateNumber}
                                                    </Link>
                                                ) : record.CarPlateNumber}
                                            </TableCell>
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
                                                <div className="flex justify-end gap-2">
                                                    <Button 
                                                        variant="outline" 
                                                        size="icon"
                                                        asChild
                                                    >
                                                        <Link href={`/service-records/${record.RecordNumber}`}>
                                                            <Eye className="h-4 w-4" />
                                                        </Link>
                                                    </Button>
                                                    <Button 
                                                        variant="outline" 
                                                        size="icon"
                                                        asChild
                                                    >
                                                        <Link href={`/service-records/${record.RecordNumber}/edit`}>
                                                            <Edit className="h-4 w-4" />
                                                        </Link>
                                                    </Button>
                                                    {!record.payment && (
                                                        <Button 
                                                            variant="outline" 
                                                            size="icon"
                                                            asChild
                                                        >
                                                            <Link href={`/payments/create?record=${record.RecordNumber}`}>
                                                                <Receipt className="h-4 w-4" />
                                                            </Link>
                                                        </Button>
                                                    )}
                                                    <Button 
                                                        variant="destructive" 
                                                        size="icon"
                                                        onClick={() => deleteServiceRecord(record.RecordNumber)}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center">
                                            No service records found
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