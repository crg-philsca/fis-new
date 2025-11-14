import AppLayout from '@/layouts/app-layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Icon } from '@/components/icon';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// FIX: Removed the problematic relative import for 'route' (Code 2307)
// The 'route' function should be globally available via Ziggy's setup in app.blade.php.
// import { route } from '../../../../vendor/tightenco/ziggy/dist/index'; 

// FIX: Imported the necessary icon components from lucide-react (Code 2741)
import { Plus, Filter, Pencil } from 'lucide-react'; 
import { Link } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';

// Define the shape of the data expected from Laravel
interface Flight {
    id: number;
    flight_number: string;
    airline_name: string;
    destination_iata: string;
    scheduled_time: string;
    estimated_time: string;
    gate: string;
    status: string;
}

// Define the shape of the props passed by Inertia from the Laravel Controller
interface FlightsIndexProps {
    flights: Flight[];
    title: string;
    breadcrumbs: BreadcrumbItem[];
}

export default function FlightsIndex({ flights, title, breadcrumbs }: FlightsIndexProps) {
    return (
        <AppLayout title={title} breadcrumbs={breadcrumbs}>
            <div className="space-y-6">
                
                {/* 1. Header and Action Button */}
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
                    {/* The 'route' function is now used without an import */}
                    <Link href={route('flights.create')}>
                        <Button>
                            <Icon iconNode={Plus} className="mr-2 h-4 w-4" />
                            Add New Flight
                        </Button>
                    </Link>
                </div>

                <Separator />
                
                <Card>
                    <CardContent className="pt-6">
                        {/* 2. Filter/Search Bar */}
                        <div className="flex items-center justify-between pb-4">
                            <div className="flex w-full items-center space-x-2">
                                <Input
                                    placeholder="Search by Flight, Destination, or Airline..."
                                    className="max-w-sm"
                                />
                                <Button variant="outline">
                                    <Icon iconNode={Filter} className="mr-2 h-4 w-4" />
                                    Status
                                </Button>
                            </div>
                        </div>

                        {/* 3. Main Flight Data Table */}
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Flight #</TableHead>
                                    <TableHead>Airline</TableHead>
                                    <TableHead>Destination</TableHead>
                                    <TableHead>Scheduled</TableHead>
                                    <TableHead>Estimated</TableHead>
                                    <TableHead>Gate</TableHead>
                                    <TableHead className="text-center">Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {flights.map((flight) => (
                                    <TableRow key={flight.id}>
                                        <TableCell className="font-medium">{flight.flight_number}</TableCell>
                                        <TableCell>{flight.airline_name}</TableCell>
                                        <TableCell>{flight.destination_iata}</TableCell>
                                        <TableCell>{flight.scheduled_time}</TableCell>
                                        <TableCell 
                                            className={flight.scheduled_time !== flight.estimated_time ? 'font-semibold text-red-500' : ''}
                                        >
                                            {flight.estimated_time}
                                        </TableCell>
                                        <TableCell>{flight.gate}</TableCell>
                                        <TableCell className="text-center">
                                            {flight.status}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {/* The 'route' function is now used without an import */}
                                            <Link href={route('flights.edit', flight.id)}>
                                                <Button variant="ghost" size="sm">
                                                    <Icon iconNode={Pencil} className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        
                        {/* 4. Pagination */}
                        <div className="flex items-center justify-between pt-4 text-sm text-muted-foreground">
                            <span>Showing 1 to {flights.length} of {flights.length} entries</span>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}