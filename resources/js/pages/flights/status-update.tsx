import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { RefreshCw, Search } from 'lucide-react';
import { Head } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';

export default function StatusUpdate() {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Status Update', href: '/status-update' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Flight Status Update" />

            <div className="space-y-6 py-6 px-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                            <RefreshCw className="w-8 h-8 text-primary" />
                            Flight Status Update
                        </h1>
                        <p className="text-muted-foreground mt-1">
                            Quick interface to update flight status, gate, or baggage claim
                        </p>
                    </div>
                </div>

                <Separator />

                <Card>
                    <CardHeader>
                        <CardTitle>Search Flight</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex gap-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                                <Input
                                    type="text"
                                    placeholder="Enter flight number..."
                                    className="pl-10"
                                />
                            </div>
                            <Button>Search</Button>
                        </div>
                        <p className="text-sm text-muted-foreground mt-4">
                            Search for a flight by flight number to update its status, gate assignment, or baggage claim area.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
