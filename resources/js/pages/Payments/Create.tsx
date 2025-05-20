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
import { type ServiceRecord } from '@/types';
import { useForm } from '@inertiajs/react';
import { FormEvent } from 'react';
import { formatCurrency } from '@/lib/utils';

interface CreatePaymentProps {
    serviceRecords: ServiceRecord[];
}

export default function CreatePayment({ serviceRecords }: CreatePaymentProps) {
    const { data, setData, post, processing, errors } = useForm({
        RecordNumber: '',
        AmountPaid: '',
        PaymentDate: new Date().toISOString().substring(0, 10),
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post('/payments');
    };

    // Find the selected service record to display its details
    const selectedRecord = serviceRecords.find(record => record.RecordNumber === data.RecordNumber);

    return (
        <AppLayout breadcrumbs={[
            { title: 'Payments', href: '/payments' },
            { title: 'Create', href: '/payments/create' }
        ]}>
            <div className="container py-6 px-4">
                <h1 className="text-2xl font-bold mb-6">Record Payment</h1>

                <Card className="max-w-2xl mx-auto">
                    <CardHeader>
                        <CardTitle>Payment Details</CardTitle>
                        <CardDescription>
                            Record a payment for a service
                        </CardDescription>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="recordNumber">Service Record</Label>
                                <Select 
                                    value={data.RecordNumber} 
                                    onValueChange={(value) => setData('RecordNumber', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a service record" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {serviceRecords.map((record) => (
                                            <SelectItem key={record.RecordNumber} value={record.RecordNumber}>
                                                {record.RecordNumber} - {record.car?.PlateNumber} - {record.service?.ServiceName}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.RecordNumber && (
                                    <p className="text-sm text-red-500">{errors.RecordNumber}</p>
                                )}
                            </div>

                            {selectedRecord && (
                                <div className="bg-muted p-4 rounded-md">
                                    <h3 className="font-medium mb-2">Service Details</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                                        <div>
                                            <span className="font-medium">Car:</span> {selectedRecord.car?.PlateNumber}
                                        </div>
                                        <div>
                                            <span className="font-medium">Model:</span> {selectedRecord.car?.Model}
                                        </div>
                                        <div>
                                            <span className="font-medium">Service:</span> {selectedRecord.service?.ServiceName}
                                        </div>
                                        <div>
                                            <span className="font-medium">Standard Price:</span> {selectedRecord.service && formatCurrency(selectedRecord.service.ServicePrice)}
                                        </div>
                                        <div>
                                            <span className="font-medium">Date:</span> {new Date(selectedRecord.ServiceDate).toLocaleDateString()}
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
                                {processing ? 'Processing...' : 'Record Payment'}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </AppLayout>
    );
} 