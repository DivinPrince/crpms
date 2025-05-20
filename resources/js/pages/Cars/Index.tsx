import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { type Car } from '@/types';
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

interface CarsIndexProps {
    cars: Car[];
}

export default function CarsIndex({ cars }: CarsIndexProps) {
    const deleteCar = (plateNumber: string) => {
        if (confirm('Are you sure you want to delete this car?')) {
            router.delete(`/cars/${plateNumber}`);
        }
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Cars', href: '/cars' }]}>
            <div className="container py-6 px-4">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Cars</h1>
                    <Button asChild>
                        <Link href="/cars/create">
                            <Plus className="mr-2 h-4 w-4" />
                            Add Car
                        </Link>
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Cars List</CardTitle>
                        <CardDescription>
                            Manage cars registered at SmartPark
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Plate Number</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Model</TableHead>
                                    <TableHead>Year</TableHead>
                                    <TableHead>Driver Phone</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {cars.length > 0 ? (
                                    cars.map((car) => (
                                        <TableRow key={car.PlateNumber}>
                                            <TableCell>{car.PlateNumber}</TableCell>
                                            <TableCell>{car.Type}</TableCell>
                                            <TableCell>{car.Model}</TableCell>
                                            <TableCell>{car.ManufacturingYear}</TableCell>
                                            <TableCell>{car.DriverPhone}</TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button 
                                                        variant="outline" 
                                                        size="icon"
                                                        asChild
                                                    >
                                                        <Link href={`/cars/${car.PlateNumber}`}>
                                                            <Eye className="h-4 w-4" />
                                                        </Link>
                                                    </Button>
                                                    <Button 
                                                        variant="outline" 
                                                        size="icon"
                                                        asChild
                                                    >
                                                        <Link href={`/cars/${car.PlateNumber}/edit`}>
                                                            <Edit className="h-4 w-4" />
                                                        </Link>
                                                    </Button>
                                                    <Button 
                                                        variant="destructive" 
                                                        size="icon"
                                                        onClick={() => deleteCar(car.PlateNumber)}
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
                                            No cars found
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