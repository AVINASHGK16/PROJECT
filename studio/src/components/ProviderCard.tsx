import Link from 'next/link';
import Image from 'next/image';
import type { ServiceProvider } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Zap, Wrench, BadgeCheck, Store } from 'lucide-react';

interface ProviderCardProps {
  provider: ServiceProvider;
}

const typeIcon: { [key: string]: React.ElementType } = {
    Electrician: Zap,
    Plumber: Wrench,
    'Hardware Store': Store,
};

export default function ProviderCard({ provider }: ProviderCardProps) {
  const Icon = typeIcon[provider.type];

  return (
    <Link href={`/profile/${provider.id}`} className="group block h-full">
      <Card className="h-full overflow-hidden transition-all duration-300 ease-in-out group-hover:shadow-xl group-hover:-translate-y-1 flex flex-col">
        <CardHeader className="flex flex-row items-start gap-4">
          <Image
            src={provider.avatarUrl}
            alt={provider.name}
            width={80}
            height={80}
            className="rounded-lg border"
            data-ai-hint={provider.type === 'Hardware Store' ? 'store exterior' : 'portrait person'}
          />
          <div className="flex-1">
            <Badge variant="secondary" className="mb-2 inline-flex items-center gap-1">
              {Icon && <Icon className="h-3 w-3" />}
              {provider.type}
            </Badge>
            <CardTitle className="text-xl">{provider.name}</CardTitle>
            <CardDescription className="flex items-center gap-1 pt-1">
              <MapPin className="h-4 w-4" />
              {provider.location}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-sm text-muted-foreground line-clamp-2">{provider.bio}</p>
          {provider.skills && provider.skills.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
                {provider.skills.slice(0, 3).map(skill => (
                <Badge key={skill} variant="outline">{skill}</Badge>
                ))}
                {provider.skills.length > 3 && <Badge variant="outline">...</Badge>}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between text-sm">
            {provider.certifications && provider.certifications.length > 0 ? (
                <div className="flex items-center gap-1 font-semibold">
                    <BadgeCheck className="h-5 w-5 text-green-500" />
                    <span>{provider.certifications.length} Certifications</span>
                </div>
            ) : <div />}
           <div className="flex items-center gap-1 font-bold">
            <Star className="h-5 w-5 text-yellow-400" />
            <span>{provider.rating.toFixed(1)}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
