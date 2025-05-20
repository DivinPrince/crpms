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
import { type Payment, type ServiceRecord } from '@/types';
import { useForm } from '@inertiajs/react';
import { FormEvent } from 'react';
import { formatCurrency } from '@/lib/utils';

interface EditPaymentProps {
    payment: Payment;
    serviceRecords: ServiceRecord[];
}

export default function EditPayment({ payment, serviceRecords }: EditPaymentProps) {
    const { data, setData, patch, processing, errors } = useForm({
        AmountPaid: payment.AmountPaid.toString(),
        PaymentDate: new Date(payment.PaymentDate).toISOString().substring(0, 10),
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        patch(`/payments/${payment.PaymentNumber}`);
    };

    // Current service record
    const serviceRecord = serviceRecords[0];

    return (
        <AppLayout breadcrumbs={[
            { title: 'Payments', href: '/payments' },
            { title: payment.PaymentNumber, href: `/payments/${payment.PaymentNumber}` },
            { title: 'Edit', href: `/payments/${payment.PaymentNumber}/edit` }
        ]}>
            <div className="container py-6 px-4">
                <h1 className="text-2xl font-bold mb-6">Edit Payment</h1>

                <Card className="max-w-2xl mx-auto">
                    <CardHeader>
                        <CardTitle>Payment Details</CardTitle>
                        <CardDescription>
                            Edit the payment information
                        </CardDescription>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="paymentNumber">Payment Number</Label>
                                <Input
                                    id="paymentNumber"
                                    value={payment.PaymentNumber}
                                    disabled
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="recordNumber">Service Record</Label>
                                <Input
                                    id="recordNumber"
                                    value={payment.RecordNumber}
                                    disabled
                                />
                            </div>

                            {serviceRecord && (
                                <div className="bg-muted p-4 rounded-md">
                                    <h3 className="font-medium mb-2">Service Details</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                                        <div>
                                            <span className="font-medium">Car:</span> {serviceRecord.car?.PlateNumber}
                                        </div>
                                        <div>
                                            <span className="font-medium">Model:</span> {serviceRecord.car?.Model}
                                        </div>
                                        <div>
                                            <span className="font-medium">Service:</span> {serviceRecord.service?.ServiceName}
                                        </div>
                                        <div>
                                            <span className="font-medium">Standard Price:</span> {serviceRecord.service && formatCurrency(serviceRecord.service.ServicePrice)}
                                        </div>
                                        <div>
                                            <span className="font-medium">Date:</span> {new Date(serviceRecord.ServiceDate).toLocaleDateString()}
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="space-y-2">
                                <Label htmlFor="amountPaid">Amount Paid (RWF)</Label>
                                <Input
                                    id="amountPaid"
                                    type="number"
                                    value={data.AmountPaid}
                                    onChange={e => setData('AmountPaid', e.target.value)}
                                    placeholder="Enter payment amount"
                                />
                                {errors.AmountPaid && (
                                    <p className="text-sm text-red-500">{errors.AmountPaid}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="paymentDate">Payment Date</Label>
                                <Input
                                    id="paymentDate"
                                    type="date"
                                    value={data.PaymentDate}
                                    onChange={e => setData('PaymentDate', e.target.value)}
                                />
                                {errors.PaymentDate && (
                                    <p className="text-sm text-red-500">{errors.PaymentDate}</p>
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
                                {processing ? 'Updating...' : 'Update Payment'}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </AppLayout>
    );
} 