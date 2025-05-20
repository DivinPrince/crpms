import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { type Payment } from '@/types';
import { Link, router } from '@inertiajs/react';
import { Plus, Edit, Trash2, FileText } from 'lucide-react';
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

interface PaymentsIndexProps {
    payments: Payment[];
}

export default function PaymentsIndex({ payments }: PaymentsIndexProps) {
    const deletePayment = (paymentNumber: string) => {
        if (confirm('Are you sure you want to delete this payment?')) {
            router.delete(`/payments/${paymentNumber}`);
        }
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Payments', href: '/payments' }]}>
            <div className="container py-6 px-4">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Payments</h1>
                    <Button asChild>
                        <Link href="/payments/create">
                            <Plus className="mr-2 h-4 w-4" />
                            Record Payment
                        </Link>
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Payments List</CardTitle>
                        <CardDescription>
                            Manage payment records
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
                                    <TableHead>Amount</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {payments.length > 0 ? (
                                    payments.map((payment) => (
                                        <TableRow key={payment.PaymentNumber}>
                                            <TableCell>{payment.PaymentNumber}</TableCell>
                                            <TableCell>{new Date(payment.PaymentDate).toLocaleDateString()}</TableCell>
                                            <TableCell>{payment.serviceRecord?.car?.PlateNumber}</TableCell>
                                            <TableCell>{payment.serviceRecord?.service?.ServiceName}</TableCell>
                                            <TableCell>{formatCurrency(payment.AmountPaid)}</TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button 
                                                        variant="outline" 
                                                        size="icon"
                                                        asChild
                                                    >
                                                        <Link href={`/payments/${payment.PaymentNumber}/invoice`}>
                                                            <FileText className="h-4 w-4" />
                                                        </Link>
                                                    </Button>
                                                    <Button 
                                                        variant="outline" 
                                                        size="icon"
                                                        asChild
                                                    >
                                                        <Link href={`/payments/${payment.PaymentNumber}/edit`}>
                                                            <Edit className="h-4 w-4" />
                                                        </Link>
                                                    </Button>
                                                    <Button 
                                                        variant="destructive" 
                                                        size="icon"
                                                        onClick={() => deletePayment(payment.PaymentNumber)}
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
                                            No payments found
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