import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@inertiajs/react';
import { BarChart3, LineChart, PieChart, Car } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow 
} from '@/components/ui/table';

interface ReportSummaryProps {
    totalIncome: number;
    monthlyIncome: { month: string; amount: number }[];
    popularServices: { name: string; count: number; percentage: number }[];
    recentServices: { plateNumber: string; service: string; date: string; amount: number }[];
}

export default function ReportsIndex({ 
    totalIncome = 1250000, 
    monthlyIncome = [
        { month: 'Jan', amount: 120000 },
        { month: 'Feb', amount: 150000 },
        { month: 'Mar', amount: 180000 },
        { month: 'Apr', amount: 210000 },
        { month: 'May', amount: 190000 },
        { month: 'Jun', amount: 220000 },
    ],
    popularServices = [
        { name: 'Oil Change', count: 45, percentage: 28 },
        { name: 'Brake Repair', count: 32, percentage: 20 },
        { name: 'Tire Replacement', count: 25, percentage: 16 },
        { name: 'Engine Tune-Up', count: 18, percentage: 11 },
        { name: 'Battery Replacement', count: 15, percentage: 9 },
    ],
    recentServices = [
        { plateNumber: 'RAA 123A', service: 'Oil Change', date: '2023-06-15', amount: 25000 },
        { plateNumber: 'RAB 456B', service: 'Brake Repair', date: '2023-06-14', amount: 85000 },
        { plateNumber: 'RAC 789C', service: 'Tire Replacement', date: '2023-06-13', amount: 120000 },
        { plateNumber: 'RAD 101D', service: 'Engine Tune-Up', date: '2023-06-12', amount: 95000 },
        { plateNumber: 'RAE 202E', service: 'Battery Replacement', date: '2023-06-11', amount: 45000 },
    ]
}: ReportSummaryProps) {
    // Calculate max value for the chart
    const maxIncome = Math.max(...monthlyIncome.map(item => item.amount));
    const scale = 100 / maxIncome;

    return (
        <AppLayout breadcrumbs={[{ title: 'Reports', href: '/reports' }]}>
            <div className="container py-6 px-4">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Reports</h1>
                    <div className="text-sm text-muted-foreground">
                        Data shown is a summary. Click "View Report" for detailed analysis.
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {/* Monthly Income Report Card */}
                    <Card>
                        <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                                <CardTitle>Monthly Income</CardTitle>
                                <LineChart className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <CardDescription>
                                Income trends over the last 6 months
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[200px] flex items-end space-x-2 pb-4">
                                {monthlyIncome.map((item, i) => (
                                    <div key={i} className="flex-1 flex flex-col items-center">
                                        <div 
                                            className="bg-primary/90 hover:bg-primary w-full rounded-t-md" 
                                            style={{ height: `${item.amount * scale}px` }}
                                        ></div>
                                        <div className="text-xs mt-2">{item.month}</div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between items-center mt-4 pt-4 border-t">
                                <div>
                                    <div className="text-sm font-medium">Total Income</div>
                                    <div className="text-2xl font-bold">{formatCurrency(totalIncome)}</div>
                                </div>
                                <Button asChild>
                                    <Link href="/reports/monthly-income">
                                        View Full Report
                                    </Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Popular Services Card */}
                    <Card>
                        <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                                <CardTitle>Popular Services</CardTitle>
                                <PieChart className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <CardDescription>
                                Most requested repair services
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {popularServices.map((service, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-sm font-medium">{service.name}</span>
                                            <span className="text-sm text-muted-foreground">{service.count} services</span>
                                        </div>
                                        <div className="w-full bg-muted rounded-full h-2.5">
                                            <div 
                                                className="bg-primary h-2.5 rounded-full" 
                                                style={{ width: `${service.percentage}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-end mt-4 pt-4 border-t">
                                <Button asChild>
                                    <Link href="/reports/service-popularity">
                                        View Full Report
                                    </Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Services Card */}
                <Card className="mb-6">
                    <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                            <CardTitle>Recent Services</CardTitle>
                            <Car className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <CardDescription>
                            Latest repair services performed
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Car</TableHead>
                                    <TableHead>Service</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead className="text-right">Amount</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {recentServices.map((service, i) => (
                                    <TableRow key={i}>
                                        <TableCell className="font-medium">
                                            <Link 
                                                href={`/cars/${service.plateNumber}`}
                                                className="text-blue-600 hover:underline"
                                            >
                                                {service.plateNumber}
                                            </Link>
                                        </TableCell>
                                        <TableCell>{service.service}</TableCell>
                                        <TableCell>{new Date(service.date).toLocaleDateString()}</TableCell>
                                        <TableCell className="text-right">{formatCurrency(service.amount)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <div className="flex justify-end mt-4">
                            <Button variant="outline" asChild>
                                <Link href="/reports/car-history">
                                    View Car History Reports
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Report Links */}
                <Card>
                    <CardHeader>
                        <CardTitle>All Reports</CardTitle>
                        <CardDescription>Quick access to detailed reports</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <Link href="/reports/daily-income" className="block p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                                <BarChart3 className="h-8 w-8 mb-2" />
                                <h3 className="font-medium">Daily Income</h3>
                                <p className="text-sm text-muted-foreground">View daily income data</p>
                            </Link>
                            
                            <Link href="/reports/monthly-income" className="block p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                                <LineChart className="h-8 w-8 mb-2" />
                                <h3 className="font-medium">Monthly Income</h3>
                                <p className="text-sm text-muted-foreground">View monthly income trends</p>
                            </Link>
                            
                            <Link href="/reports/service-popularity" className="block p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                                <PieChart className="h-8 w-8 mb-2" />
                                <h3 className="font-medium">Service Popularity</h3>
                                <p className="text-sm text-muted-foreground">Track popular services</p>
                            </Link>
                            
                            <Link href="/reports/car-history" className="block p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                                <Car className="h-8 w-8 mb-2" />
                                <h3 className="font-medium">Car History</h3>
                                <p className="text-sm text-muted-foreground">View service history by car</p>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
} 