import Dashboard from '@/components/Dashboard';
import Header from '@/components/Header';
import { getProviders } from '@/lib/data';

export default function DashboardPage() {
  const providers = getProviders();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="container mx-auto flex-grow px-4 py-8">
        <Dashboard initialProviders={providers} />
      </main>
    </div>
  );
}
