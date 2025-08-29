import { getProviderById } from '@/lib/data';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import ProfileDetail from '@/components/ProfileDetail';
import type { Metadata } from 'next';

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const provider = getProviderById(params.id);

  if (!provider) {
    return {
      title: 'Provider Not Found',
    };
  }

  return {
    title: `${provider.name} | HandyConnect`,
    description: `View the profile, projects, and reviews for ${provider.name}, a trusted ${provider.type} in ${provider.location}.`,
  };
}

export default function ProfilePage({ params }: { params: { id: string } }) {
  const provider = getProviderById(params.id);

  if (!provider) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="container mx-auto flex-grow px-4 py-8">
        <ProfileDetail provider={provider} />
      </main>
    </div>
  );
}
