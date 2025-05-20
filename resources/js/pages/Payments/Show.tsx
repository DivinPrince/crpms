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
import { type Payment } from '@/types';
import { Link, router } from '@inertiajs/react';
import { Edit, Trash2, Printer, ArrowLeft } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface ShowPaymentProps {
    payment: Payment;
}

export default function ShowPayment({ payment }: ShowPaymentProps) {
    const deletePayment = () => {
        if (confirm('Are you sure you want to delete this payment?')) {
            router.delete(`/payments/${payment.PaymentNumber}`);
        }
    };

    return (
        <AppLayout breadcrumbs={[
            { title: 'Payments', href: '/payments' },
            { title: payment.PaymentNumber, href: `/payments/${payment.PaymentNumber}` }
        ]}>
            <div className="container py-6 px-4">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Payment Details</h1>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" asChild>
                            <Link href={`/payments/${payment.PaymentNumber}/invoice`}>
                                <Printer className="h-4 w-4 mr-2" />
                                View Invoice
                            </Link>
                        </Button>
                        <Button variant="outline" asChild>
                            <Link href={`/payments/${payment.PaymentNumber}/edit`}>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                            </Link>
                        </Button>
                        <Button variant="destructive" onClick={deletePayment}>
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Payment Information</CardTitle>
                            <CardDescription>
                                Details about the payment
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <h3 className="text-sm font-medium">Payment Number</h3>
                                <p className="text-lg">{payment.PaymentNumber}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium">Payment Date</h3>
                                <p className="text-lg">{new Date(payment.PaymentDate).toLocaleDateString()}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium">Amount Paid</h3>
                                <p className="text-lg">{formatCurrency(payment.AmountPaid)}</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Service Information</CardTitle>
                            <CardDescription>
                                Details about the related service
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <h3 className="text-sm font-medium">Service Record</h3>
                                <p className="text-lg">
                                    <Link 
                                        href={`/service-records/${payment.RecordNumber}`}
                                        className="text-blue-600 hover:underline"
                                    >
                                        {payment.RecordNumber}
                                    </Link>
                                </p>
                            </div>
                            {payment.serviceRecord && (
                                <>
                                    <div>
                                        <h3 className="text-sm font-medium">Service Date</h3>
                                        <p className="text-lg">{new Date(payment.serviceRecord.ServiceDate).toLocaleDateString()}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium">Service Type</h3>
                                        <p className="text-lg">{payment.serviceRecord.service?.ServiceName}</p>
                                    </div>
                                </>
                            )}
                            {payment.serviceRecord?.car && (
                                <div>
                                    <h3 className="text-sm font-medium">Car</h3>
                                    <p className="text-lg">
                                        <Link 
                                            href={`/cars/${payment.serviceRecord.car.PlateNumber}`}
                                            className="text-blue-600 hover:underline"
                                        >
                                            {payment.serviceRecord.car.PlateNumber} - {payment.serviceRecord.car.Model}
                                        </Link>
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                <div className="mt-6">
                    <Button variant="outline" asChild>
                        <Link href="/payments">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Payments
                        </Link>
                    </Button>
                </div>
            </div>
        </AppLayout>
    );
} 