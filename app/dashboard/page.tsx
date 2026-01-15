import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { UserButton } from '@clerk/nextjs';

export default async function DashboardPage() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect('/');
  }
  
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <nav className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black">
        <div className="max-w-full mx-auto px-8 sm:px-12 lg:px-16">
          <div className="flex items-center h-16">
            <div className="flex items-center pl-4">
              <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
                LinkShortener
              </h1>
            </div>
            <div className="flex items-center ml-auto pr-4">
              <UserButton />
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">Dashboard</h1>
      </main>
    </div>
  );
}
