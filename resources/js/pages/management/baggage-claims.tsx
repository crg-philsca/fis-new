import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { Luggage, Plus, Pencil, Trash2, Plane } from 'lucide-react';
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
    origin: string;
    status: string;
    scheduled_arrival: string;
}

interface BaggageClaim {
    id: number;
    claim_area: string;
    terminal: Terminal;
    current_flights: CurrentFlight[];
    is_active: boolean;
}

interface Props {
    baggageClaims: BaggageClaim[];
}

export default function BaggageClaimManagement({ baggageClaims = [] }: Props) {
    const [selectedClaim, setSelectedClaim] = useState<BaggageClaim | null>(null);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Airport Resources', href: '#' },
        { title: 'Baggage Claims', href: '/management/baggage-claims' },
    ];

    const handleDelete = (claim: BaggageClaim) => {
        setSelectedClaim(claim);
        setShowDeleteDialog(true);
    };

    const confirmDelete = () => {
        if (selectedClaim) {
            router.delete(`/management/baggage-claims/${selectedClaim.id}`, {
                onSuccess: () => {
                    setShowDeleteDialog(false);
                    setSelectedClaim(null);
                },
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Baggage Claim Management" />

            <div className="space-y-6 py-6 px-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                            <Luggage className="w-8 h-8 text-primary" />
                            Baggage Claim Management
                        </h1>
                        <p className="text-muted-foreground mt-1">
                            Manage baggage claim areas and flight assignments
                        </p>
                    </div>
                    <Button className="gap-2">
                        <Plus className="w-4 h-4" />
                        Add Baggage Claim
                    </Button>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium">Total Claims</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{baggageClaims.length}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium">Active</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-500">
                                {baggageClaims.filter(c => c.is_active).length}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>All Baggage Claim Areas</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Claim Area</TableHead>
                                    <TableHead>Terminal</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Current Arrivals</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {baggageClaims.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                            No baggage claim areas found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    baggageClaims.map((claim) => (
                                        <TableRow key={claim.id}>
                                            <TableCell className="font-medium">
                                                <div className="flex items-center gap-2">
                                                    <Luggage className="w-4 h-4 text-muted-foreground" />
                                                    {claim.claim_area}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div>
                                                    <div className="font-medium">{claim.terminal.name}</div>
                                                    <div className="text-xs text-muted-foreground">
                                                        {claim.terminal.code}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={claim.is_active ? 'default' : 'secondary'}>
                                                    {claim.is_active ? 'Active' : 'Idle'}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                {claim.current_flights.length > 0 ? (
                                                    <div className="space-y-1">
                                                        {claim.current_flights.map((flight, idx) => (
                                                            <div key={idx} className="text-sm flex items-center gap-2">
                                                                <Plane className="w-3 h-3 text-muted-foreground" />
                                                                <span className="font-medium">{flight.flight_number}</span>
                                                                <span className="text-muted-foreground">from {flight.origin}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <span className="text-sm text-muted-foreground">No active flights</span>
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
                                                        onClick={() => handleDelete(claim)}
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
                    </CardContent>
                </Card>

                {/* Delete Confirmation Dialog */}
                <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Delete Baggage Claim</DialogTitle>
                            <DialogDescription>
                                Are you sure you want to delete baggage claim area {selectedClaim?.claim_area}?
                                This action cannot be undone.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
                                Cancel
                            </Button>
                            <Button variant="destructive" onClick={confirmDelete}>
                                Delete Claim Area
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
}
