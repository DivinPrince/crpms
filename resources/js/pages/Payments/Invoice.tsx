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
import { type Payment, type Car, type Service } from '@/types';
import { Link } from '@inertiajs/react';
import { Printer, ArrowLeft, Download } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { useRef } from 'react';

interface InvoiceProps {
    payment: Payment;
    car: Car;
    service: Service;
}

export default function Invoice({ payment, car, service }: InvoiceProps) {
    const invoiceRef = useRef<HTMLDivElement>(null);

    const printInvoice = () => {
        const printContent = document.getElementById('invoice-content');
        const windowUrl = 'about:blank';
        const uniqueName = new Date().getTime();
        const windowName = 'Print' + uniqueName;
        const printWindow = window.open(windowUrl, windowName, 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
        
        if (printWindow && printContent) {
            printWindow.document.write('<html><head><title>SmartPark Invoice</title>');
            printWindow.document.write('<style>');
            printWindow.document.write(`
                body { font-family: Arial, sans-serif; padding: 20px; }
                .invoice-header { display: flex; justify-content: space-between; margin-bottom: 30px; }
                .invoice-details { margin-bottom: 20px; }
                .invoice-table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
                .invoice-table th, .invoice-table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                .invoice-table th { background-color: #f2f2f2; }
                .invoice-footer { margin-top: 50px; text-align: center; }
                .company-name { font-size: 24px; font-weight: bold; color: #333; }
                .invoice-total { text-align: right; margin-top: 20px; }
                .invoice-total h3 { margin: 5px 0; }
            `);
            printWindow.document.write('</style></head><body>');
            printWindow.document.write(printContent.innerHTML);
            printWindow.document.write('</body></html>');
            printWindow.document.close();
            printWindow.focus();
            
            // Add a slight delay to ensure content is loaded before printing
            setTimeout(() => {
                printWindow.print();
                printWindow.close();
            }, 250);
        }
    };

    return (
        <AppLayout breadcrumbs={[
            { title: 'Payments', href: '/payments' },
            { title: payment.PaymentNumber, href: `/payments/${payment.PaymentNumber}` },
            { title: 'Invoice', href: `/payments/${payment.PaymentNumber}/invoice` }
        ]}>
            <div className="container py-6 px-4">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Invoice</h1>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={printInvoice}>
                            <Printer className="h-4 w-4 mr-2" />
                            Print Invoice
                        </Button>
                        <Button variant="outline" asChild>
                            <Link href={`/payments/${payment.PaymentNumber}`}>
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Payment
                            </Link>
                        </Button>
                    </div>
                </div>

                <Card>
                    <CardContent className="p-6">
                        <div id="invoice-content" ref={invoiceRef}>
                            <div className="invoice-header flex justify-between border-b pb-6 mb-6">
                                <div>
                                    <h2 className="company-name text-2xl font-bold">SmartPark Garage</h2>
                                    <p className="text-sm text-muted-foreground">
                                        Kigali, Rwanda<br />
                                        Tel: +250 788 123 456<br />
                                        Email: info@smartpark.rw
                                    </p>
                                </div>
                                <div className="text-right">
                                    <h3 className="text-lg font-medium">INVOICE</h3>
                                    <p className="text-sm">
                                        Invoice #: {payment.PaymentNumber}<br />
                                        Date: {new Date(payment.PaymentDate).toLocaleDateString()}<br />
                                        Service Record #: {payment.RecordNumber}
                                    </p>
                                </div>
                            </div>

                            <div className="invoice-details grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <h3 className="text-md font-medium mb-2">Bill To:</h3>
                                    <div className="text-sm">
                                        <p className="mb-1">Car: {car.PlateNumber}</p>
                                        <p className="mb-1">Model: {car.Model} {car.Type}</p>
                                        <p className="mb-1">Year: {car.ManufacturingYear}</p>
                                        <p className="mb-1">Phone: {car.DriverPhone}</p>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-md font-medium mb-2">Service Details:</h3>
                                    <div className="text-sm">
                                        <p className="mb-1">Service Date: {new Date(payment.serviceRecord?.ServiceDate || '').toLocaleDateString()}</p>
                                        <p className="mb-1">Mechanic: {car.MechanicName}</p>
                                        <p className="mb-1">Service Type: {service.ServiceName}</p>
                                    </div>
                                </div>
                            </div>

                            <table className="invoice-table w-full border-collapse mb-6">
                                <thead>
                                    <tr className="bg-muted">
                                        <th className="border p-2 text-left">Description</th>
                                        <th className="border p-2 text-right">Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="border p-2">{service.ServiceName}</td>
                                        <td className="border p-2 text-right">{formatCurrency(service.ServicePrice)}</td>
                                    </tr>
                                    {service.ServicePrice !== payment.AmountPaid && (
                                        <tr>
                                            <td className="border p-2">
                                                {payment.AmountPaid > service.ServicePrice 
                                                    ? 'Additional charges (parts, etc.)'
                                                    : 'Discount'}
                                            </td>
                                            <td className="border p-2 text-right">
                                                {payment.AmountPaid > service.ServicePrice 
                                                    ? formatCurrency(payment.AmountPaid - service.ServicePrice)
                                                    : `(${formatCurrency(service.ServicePrice - payment.AmountPaid)})`}
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                                <tfoot>
                                    <tr className="font-medium">
                                        <td className="border p-2">Total</td>
                                        <td className="border p-2 text-right">{formatCurrency(payment.AmountPaid)}</td>
                                    </tr>
                                </tfoot>
                            </table>

                            <div className="invoice-footer border-t pt-6 text-center">
                                <p className="text-sm text-muted-foreground">
                                    Thank you for choosing SmartPark Garage for your vehicle maintenance needs.
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    For any inquiries, please contact us at +250 788 123 456 or info@smartpark.rw
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
} 