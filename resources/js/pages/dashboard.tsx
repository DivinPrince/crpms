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
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow 
} from '@/components/ui/table';
import { type Payment } from '@/types';
import { Link } from '@inertiajs/react';
import { Car, Wrench, FileSpreadsheet, Receipt } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface DashboardProps {
    carCount: number;
    serviceCount: number;
    recordCount: number;
    paymentCount: number;
    recentPayments: Payment[];
}

export default function Dashboard({ carCount, serviceCount, recordCount, paymentCount, recentPayments }: DashboardProps) {
    return (
        <AppLayout breadcrumbs={[{ title: 'Dashboard', href: '/' }]}>
            <div className="container py-6 px-4">
                <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <CardTitle className="text-sm font-medium">Cars</CardTitle>
                            <Car className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{carCount}</div>
                            <p className="text-xs text-muted-foreground pt-1">
                                Total cars registered in the system
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <CardTitle className="text-sm font-medium">Services</CardTitle>
                            <Wrench className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{serviceCount}</div>
                            <p className="text-xs text-muted-foreground pt-1">
                                Total repair services available
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <CardTitle className="text-sm font-medium">Service Records</CardTitle>
                            <FileSpreadsheet className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{recordCount}</div>
                            <p className="text-xs text-muted-foreground pt-1">
                                Total service records created
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <CardTitle className="text-sm font-medium">Payments</CardTitle>
                            <Receipt className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{paymentCount}</div>
                            <p className="text-xs text-muted-foreground pt-1">
                                Total payments processed
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Quick Navigation</CardTitle>
                        <CardDescription>Shortcuts to manage your garage operations</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <Link href="/cars/create" className="block p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                                <Car className="h-8 w-8 mb-2" />
                                <h3 className="font-medium">Register New Car</h3>
                                <p className="text-sm text-muted-foreground">Add a new car to the system</p>
                            </Link>
                            
                            <Link href="/service-records/create" className="block p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                                <Wrench className="h-8 w-8 mb-2" />
                                <h3 className="font-medium">Create Service Record</h3>
                                <p className="text-sm text-muted-foreground">Record a new repair service</p>
                            </Link>
                            
                            <Link href="/payments/create" className="block p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                                <Receipt className="h-8 w-8 mb-2" />
                                <h3 className="font-medium">Record Payment</h3>
                                <p className="text-sm text-muted-foreground">Process payment for a service</p>
                            </Link>
                            
                            <Link href="/reports" className="block p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                                <FileSpreadsheet className="h-8 w-8 mb-2" />
                                <h3 className="font-medium">View Reports</h3>
                                <p className="text-sm text-muted-foreground">Generate and view reports</p>
                            </Link>
                        </div>
                    </CardContent>
                </Card>

                <Card className="mt-8">
                    <CardHeader>
                        <CardTitle>Recent Payments</CardTitle>
                        <CardDescription>
                            The latest payments recorded in the system
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Payment Number</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Car</TableHead>
                                    <TableHead>Service</TableHead>
                                    <TableHead className="text-right">Amount</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {recentPayments.length > 0 ? (
                                    recentPayments.map((payment) => (
                                        <TableRow key={payment.PaymentNumber}>
                                            <TableCell>
                                                <Link
                                                    href={`/payments/${payment.PaymentNumber}`}
                                                    className="text-blue-600 hover:underline"
                                                >
                                                    {payment.PaymentNumber}
                                                </Link>
                                            </TableCell>
                                            <TableCell>{new Date(payment.PaymentDate).toLocaleDateString()}</TableCell>
                                            <TableCell>
                                                {payment.serviceRecord?.car?.PlateNumber && (
                                                    <Link
                                                        href={`/cars/${payment.serviceRecord.car.PlateNumber}`}
                                                        className="text-blue-600 hover:underline"
                                                    >
                                                        {payment.serviceRecord.car.PlateNumber}
                                                    </Link>
                                                )}
                                            </TableCell>
                                            <TableCell>{payment.serviceRecord?.service?.ServiceName}</TableCell>
                                            <TableCell className="text-right font-medium">
                                                {formatCurrency(payment.AmountPaid)}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center">
                                            No recent payments
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                    <CardFooter>
                        <Button variant="outline" asChild>
                            <Link href="/payments">View all payments</Link>
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </AppLayout>
    );
}
