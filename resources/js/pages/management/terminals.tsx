import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
import { Building2, Plus, Pencil, Trash2 } from 'lucide-react';
import { Head, router } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { useState } from 'react';

interface Airport {
    iata_code: string;
    airport_name: string;
}

interface Terminal {
    id: number;
    terminal_code: string;
    name: string;
    airport: Airport;
}

interface PaginatedTerminals {
    data: Terminal[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface Props {
    terminals: PaginatedTerminals;
}

export default function TerminalManagement({ terminals }: Props) {
    const [selectedTerminal, setSelectedTerminal] = useState<Terminal | null>(null);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    
    const terminalsList = terminals.data || [];

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Airport Resources', href: '#' },
        { title: 'Terminals', href: '/management/terminals' },
    ];

    const handleDelete = (terminal: Terminal) => {
        setSelectedTerminal(terminal);
        setShowDeleteDialog(true);
    };

    const confirmDelete = () => {
        if (selectedTerminal) {
            router.delete(`/management/terminals/${selectedTerminal.id}`, {
                onSuccess: () => {
                    setShowDeleteDialog(false);
                    setSelectedTerminal(null);
                },
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Terminal Management" />

            <div className="space-y-6 py-6 px-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                            <Building2 className="w-8 h-8 text-primary" />
                            Terminal Management
                        </h1>
                        <p className="text-muted-foreground mt-1">
                            Manage airport terminals
                        </p>
                    </div>
                    <Button 
                        className="gap-2"
                        onClick={() => alert('Terminal creation form coming soon')}
                    >
                        <Plus className="w-4 h-4" />
                        Add Terminal
                    </Button>
                </div>

                <Separator />

                <Card>
                    <CardHeader>
                        <CardTitle>All Terminals</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Terminal Code</TableHead>
                                    <TableHead>Airport</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {terminalsList.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">
                                            No terminals found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    terminalsList.map((terminal) => (
                                        <TableRow key={terminal.id}>
                                            <TableCell className="font-medium">
                                                {terminal.terminal_code}
                                            </TableCell>
                                            <TableCell>
                                                <div>
                                                    <div className="font-medium">{terminal.airport.airport_name}</div>
                                                    <div className="text-xs text-muted-foreground">
                                                        {terminal.airport.iata_code}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end gap-1">
                                                    <Button 
                                                        variant="ghost" 
                                                        size="icon"
                                                        onClick={() => alert(`Edit terminal ${terminal.terminal_code} - Form coming soon`)}
                                                    >
                                                        <Pencil className="w-4 h-4" />
                                                    </Button>
                                                    <Button 
                                                        variant="ghost" 
                                                        size="icon"
                                                        onClick={() => handleDelete(terminal)}
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
                        
                        {/* Pagination */}
                        {terminalsList.length > 0 && (
                            <div className="flex items-center justify-between pt-4">
                                <div className="text-sm text-muted-foreground">
                                    Showing {((terminals.current_page - 1) * terminals.per_page) + 1} to {Math.min(terminals.current_page * terminals.per_page, terminals.total)} of {terminals.total} entries
                                </div>
                                <div className="flex gap-1">
                                    {terminals.current_page > 1 && (
                                        <Button 
                                            variant="outline" 
                                            size="sm"
                                            onClick={() => router.get(`/management/terminals?page=${terminals.current_page - 1}`)}
                                        >
                                            ← Previous
                                        </Button>
                                    )}
                                    {Array.from({ length: Math.min(5, terminals.last_page) }, (_, i) => i + 1).map(page => (
                                        <Button 
                                            key={page}
                                            variant={page === terminals.current_page ? 'default' : 'outline'}
                                            size="sm"
                                            className="w-8"
                                            onClick={() => router.get(`/management/terminals?page=${page}`)}
                                        >
                                            {page}
                                        </Button>
                                    ))}
                                    {terminals.current_page < terminals.last_page && (
                                        <Button 
                                            variant="outline" 
                                            size="sm"
                                            onClick={() => router.get(`/management/terminals?page=${terminals.current_page + 1}`)}
                                        >
                                            Next →
                                        </Button>
                                    )}
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Delete Confirmation Dialog */}
                <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Delete Terminal</DialogTitle>
                            <DialogDescription>
                                Are you sure you want to delete terminal {selectedTerminal?.terminal_code}?
                                This action cannot be undone.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
                                Cancel
                            </Button>
                            <Button variant="destructive" onClick={confirmDelete}>
                                Delete Terminal
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
}
