"use client";

import { useState } from 'react';
import Image from 'next/image';
import type { ServiceProvider } from '@/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, Trash2, Zap, Wrench, PlusCircle, Store } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AddProviderDialog } from './AddProviderDialog';
import { useToast } from '@/hooks/use-toast';

interface DashboardProps {
  initialProviders: ServiceProvider[];
}

const typeIcon: { [key: string]: React.ElementType } = {
    Electrician: Zap,
    Plumber: Wrench,
    'Hardware Store': Store,
};

export default function Dashboard({ initialProviders }: DashboardProps) {
  const [providers, setProviders] = useState(initialProviders);
  const [providerToDelete, setProviderToDelete] = useState<ServiceProvider | null>(null);
  const { toast } = useToast();

  const handleAddProvider = (newProvider: ServiceProvider) => {
    // In a real app, this would be an API call.
    // We also generate a temporary ID for the new provider.
    const providerWithId = { ...newProvider, id: `new-${Date.now()}` };
    setProviders(prev => [...prev, providerWithId]);
    toast({
      title: "Provider Added",
      description: `${newProvider.name} has been successfully added.`,
    });
  };

  const handleDeleteProvider = () => {
    if (!providerToDelete) return;
    // In a real app, this would be an API call.
    setProviders(prev => prev.filter(p => p.id !== providerToDelete.id));
    toast({
      title: "Provider Deleted",
      description: `${providerToDelete.name} has been removed.`,
    });
    setProviderToDelete(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-bold">Directory Dashboard</h1>
            <p className="text-muted-foreground">Manage your list of providers and stores.</p>
        </div>
        <AddProviderDialog onAddProvider={handleAddProvider}>
            <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Entry
            </Button>
        </AddProviderDialog>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Avatar</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Location</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {providers.map(provider => {
                const Icon = typeIcon[provider.type];
                return (
                    <TableRow key={provider.id}>
                        <TableCell>
                            <Image
                                src={provider.avatarUrl}
                                alt={provider.name}
                                width={40}
                                height={40}
                                className="rounded-md"
                                data-ai-hint="portrait person"
                            />
                        </TableCell>
                        <TableCell className="font-medium">{provider.name}</TableCell>
                        <TableCell>
                            <Badge variant="secondary" className="inline-flex items-center gap-1">
                                {Icon && <Icon className="h-3 w-3" />}
                                {provider.type}
                            </Badge>
                        </TableCell>
                        <TableCell>{provider.location}</TableCell>
                        <TableCell>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                        <span className="sr-only">Open menu</span>
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => setProviderToDelete(provider)}>
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        <span>Delete</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                )
            })}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={!!providerToDelete} onOpenChange={(open) => !open && setProviderToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the entry for
              <span className="font-semibold"> {providerToDelete?.name}</span>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteProvider}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
