import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { DoorOpen, Plus, Pencil, Trash2, Plane } from 'lucide-react';
import { Head, router } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { useState } from 'react';

interface Terminal {
    id: number;
    code: string;
    name: string;
    airport: string;
}

interface CurrentFlight {
    flight_number: string;
    airline: string;
    status: string;
    scheduled_departure: string;
}

interface Gate {
    id: number;
    gate_code: string;
    terminal: Terminal;
    current_flights: CurrentFlight[];
    authorized_airlines: string[];
    is_occupied: boolean;
}

interface Props {
    gates: Gate[];
}

export default function GateManagement({ gates = [] }: Props) {
    const [selectedGate, setSelectedGate] = useState<Gate | null>(null);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Airport Resources', href: '#' },
        { title: 'Gates', href: '/management/gates' },
    ];

    const handleDelete = (gate: Gate) => {
        setSelectedGate(gate);
        setShowDeleteDialog(true);
    };

    const confirmDelete = () => {
        if (selectedGate) {
            router.delete(`/management/gates/${selectedGate.id}`, {
                onSuccess: () => {
                    setShowDeleteDialog(false);
                    setSelectedGate(null);
                },
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Gate Management" />

            <div className="space-y-6 py-6 px-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                            <DoorOpen className="w-8 h-8 text-primary" />
                            Gate Management
                        </h1>
                        <p className="text-muted-foreground mt-1">
                            Manage airport gates and flight assignments
                        </p>
                    </div>
                    <Button className="gap-2">
                        <Plus className="w-4 h-4" />
                        Add New Gate
                    </Button>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium">Total Gates</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{gates.length}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium">Occupied</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-500">
                                {gates.filter(g => g.is_occupied).length}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium">Available</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-blue-500">
                                {gates.filter(g => !g.is_occupied).length}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>All Gates</CardTitle>
                        <CardDescription>View and manage all airport gates</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Gate</TableHead>
                                        <TableHead>Terminal</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Current Flights</TableHead>
                                        <TableHead>Authorized Airlines</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {gates.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                                                No gates found. Add your first gate to get started.
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        gates.map((gate) => (
                                            <TableRow key={gate.id}>
                                                <TableCell className="font-medium">
                                                    <div className="flex items-center gap-2">
                                                        <DoorOpen className="w-4 h-4 text-muted-foreground" />
                                                        {gate.gate_code}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div>
                                                        <div className="font-medium">{gate.terminal.name}</div>
                                                        <div className="text-xs text-muted-foreground">
                                                            {gate.terminal.code} • {gate.terminal.airport}
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant={gate.is_occupied ? 'destructive' : 'default'}>
                                                        {gate.is_occupied ? 'Occupied' : 'Available'}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    {gate.current_flights.length > 0 ? (
                                                        <div className="space-y-1">
                                                            {gate.current_flights.map((flight, idx) => (
                                                                <div key={idx} className="text-sm flex items-center gap-2">
                                                                    <Plane className="w-3 h-3 text-muted-foreground" />
                                                                    <span className="font-medium">{flight.flight_number}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    ) : (
                                                        <span className="text-sm text-muted-foreground">No active flights</span>
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    {gate.authorized_airlines.length > 0 ? (
                                                        <div className="flex flex-wrap gap-1">
                                                            {gate.authorized_airlines.slice(0, 2).map((airline, idx) => (
                                                                <Badge key={idx} variant="outline" className="text-xs">
                                                                    {airline}
                                                                </Badge>
                                                            ))}
                                                            {gate.authorized_airlines.length > 2 && (
                                                                <Badge variant="outline" className="text-xs">
                                                                    +{gate.authorized_airlines.length - 2}
                                                                </Badge>
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <span className="text-sm text-muted-foreground">All airlines</span>
                                                    )}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex items-center justify-end gap-1">
                                                        <Button variant="ghost" size="icon">
                                                            <Pencil className="w-4 h-4" />
                                                        </Button>
                                                        <Button 
                                                            variant="ghost" 
                                                            size="icon"
                                                            onClick={() => handleDelete(gate)}
                                                        >
                                                            <Trash2 className="w-4 h-4 text-destructive" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>

                {/* Delete Confirmation Dialog */}
                <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Delete Gate</DialogTitle>
                            <DialogDescription>
                                Are you sure you want to delete gate {selectedGate?.gate_code}?
                                This action cannot be undone.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
                                Cancel
                            </Button>
                            <Button variant="destructive" onClick={confirmDelete}>
                                Delete Gate
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
}
