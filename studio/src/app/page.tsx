import Header from '@/components/Header';
import ProvidersDirectory from '@/components/ProvidersDirectory';
import { getProviders } from '@/lib/data';

export default function Home() {
  const providers = getProviders();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="container mx-auto flex-grow px-4 py-8">
        <ProvidersDirectory providers={providers} />
      </main>
      <footer className="py-6 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} HandyConnect. All rights reserved.</p>
      </footer>
    </div>
  );
}
