"use client";

import { useState, useMemo } from 'react';
import type { ServiceProvider } from '@/types';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProviderCard from './ProviderCard';
import { Search } from 'lucide-react';

interface ProvidersDirectoryProps {
  providers: ServiceProvider[];
}

type FilterType = 'All' | 'Electrician' | 'Plumber' | 'Hardware Store';

export default function ProvidersDirectory({ providers }: ProvidersDirectoryProps) {
  const [filter, setFilter] = useState<FilterType>('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProviders = useMemo(() => {
    return providers
      .filter(p => filter === 'All' || p.type === filter)
      .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.location.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [providers, filter, searchTerm]);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">Find a Professional or Store</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Browse our directory of verified electricians, plumbers, and hardware stores.
        </p>
      </div>

      <div className="sticky top-0 z-10 bg-background/80 py-4 backdrop-blur-sm">
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search by name or location..."
              className="pl-10"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <Tabs value={filter} onValueChange={(value) => setFilter(value as any)} className="w-full sm:w-auto">
            <TabsList className="grid w-full grid-cols-4 sm:w-auto">
              <TabsTrigger value="All">All</TabsTrigger>
              <TabsTrigger value="Electrician">Electricians</TabsTrigger>
              <TabsTrigger value="Plumber">Plumbers</TabsTrigger>
              <TabsTrigger value="Hardware Store">Stores</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {filteredProviders.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProviders.map(provider => (
            <ProviderCard key={provider.id} provider={provider} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center">
          <h3 className="text-xl font-semibold">No Results Found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
}
