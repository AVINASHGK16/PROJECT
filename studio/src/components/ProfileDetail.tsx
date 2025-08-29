"use client";

import Image from 'next/image';
import type { ServiceProvider } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Zap, Wrench, Star, BadgeCheck, Briefcase, Clock, Phone, Mail, Store, ShoppingCart } from 'lucide-react';
import { ContactDialog } from './ContactDialog';
import Reviews from './Reviews';

interface ProfileDetailProps {
  provider: ServiceProvider;
}

const typeIcon: { [key: string]: React.ElementType } = {
    Electrician: Zap,
    Plumber: Wrench,
    'Hardware Store': Store,
};

export default function ProfileDetail({ provider }: ProfileDetailProps) {
  const Icon = typeIcon[provider.type];

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      {/* Header Section */}
      <Card>
        <CardContent className="p-6">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="flex flex-col items-center text-center md:items-start md:text-left">
              <Image
                src={provider.avatarUrl}
                alt={provider.name}
                width={128}
                height={128}
                className="rounded-full border-4 border-primary shadow-lg"
                data-ai-hint={provider.type === 'Hardware Store' ? 'store exterior' : 'portrait person'}
              />
              <h1 className="mt-4 text-3xl font-bold">{provider.name}</h1>
              <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground">
                {Icon && <Icon className="h-4 w-4" />}
                <span>{provider.type}</span>
              </div>
              <div className="mt-2 flex items-center gap-1 text-lg font-bold">
                <Star className="h-5 w-5 text-yellow-400" />
                <span>{provider.rating.toFixed(1)}</span>
                <span className="ml-1 text-sm font-normal text-muted-foreground">({provider.reviews.length} reviews)</span>
              </div>
              <ContactDialog providerName={provider.name}>
                 <Button className="mt-4 w-full md:w-auto">Contact {provider.type}</Button>
              </ContactDialog>
            </div>
            <div className="space-y-4 md:col-span-2">
              <h2 className="text-xl font-semibold">About</h2>
              <p className="text-muted-foreground">{provider.bio}</p>
              <div className="grid grid-cols-2 gap-4 pt-4 text-sm">
                {provider.experience !== undefined && <div className="flex items-center gap-2"><Briefcase className="h-4 w-4 text-primary" /> <span>{provider.experience} years of experience</span></div>}
                <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-primary" /> <span>{provider.workingHours}</span></div>
                <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /> <span>{provider.contact.phone}</span></div>
                <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /> <span>{provider.contact.email}</span></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Skills and Certifications or Products */}
      <div className="grid gap-8 md:grid-cols-2">
        {provider.skills && provider.skills.length > 0 && (
            <Card>
                <CardHeader><CardTitle>Skills</CardTitle></CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                    {provider.skills.map(skill => <Badge key={skill}>{skill}</Badge>)}
                </CardContent>
            </Card>
        )}
        {provider.certifications && provider.certifications.length > 0 && (
            <Card>
                <CardHeader><CardTitle>Certifications</CardTitle></CardHeader>
                <CardContent className="space-y-2">
                    {provider.certifications.map(cert => (
                    <div key={cert} className="flex items-center gap-2 text-sm">
                        <BadgeCheck className="h-5 w-5 text-green-500" />
                        <span>{cert}</span>
                    </div>
                    ))}
                </CardContent>
            </Card>
        )}
      </div>

       {provider.products && provider.products.length > 0 && (
        <Card>
          <CardHeader><CardTitle>Products</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {provider.products.map(product => (
              <div key={product.id} className="group relative space-y-2">
                <div className="aspect-square overflow-hidden rounded-lg">
                    <Image
                        src={product.imageUrl}
                        alt={product.name}
                        width={200}
                        height={200}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                        data-ai-hint={product.dataAiHint}
                    />
                </div>
                <div className="text-center">
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">${product.price.toFixed(2)}</p>
                    <Button variant="outline" size="sm" className="mt-2 w-full opacity-0 transition-opacity group-hover:opacity-100">
                        <ShoppingCart className="mr-2 h-4 w-4"/>
                        Add to Cart
                    </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
       )}


      {/* Project Portfolio */}
      {provider.projects && provider.projects.length > 0 && (
        <Card>
            <CardHeader><CardTitle>Project Portfolio</CardTitle></CardHeader>
            <CardContent>
            <Carousel opts={{ align: "start", loop: true }} className="w-full">
                <CarouselContent>
                {provider.projects.map(project => (
                    <CarouselItem key={project.id} className="md:basis-1/2 lg:basis-1/3">
                    <div className="space-y-2">
                        <Image
                        src={project.imageUrl}
                        alt={project.caption}
                        width={600}
                        height={400}
                        className="rounded-lg object-cover aspect-video"
                        data-ai-hint={project.dataAiHint}
                        />
                        <p className="text-center text-sm text-muted-foreground">{project.caption}</p>
                    </div>
                    </CarouselItem>
                ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
            </CardContent>
        </Card>
      )}
      
      {/* Reviews */}
      <Reviews provider={provider} />

    </div>
  );
}
