import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { UserButton } from '@clerk/nextjs';
import { getUserLinks } from '@/data/links';
import { CreateLinkModal } from './create-link-modal';
import { EditLinkModal } from './edit-link-modal';
import { DeleteLinkDialog } from './delete-link-dialog';
import { Button } from '@/components/ui/button';

export default async function DashboardPage() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect('/');
  }
  
  const userLinks = await getUserLinks(userId);
  
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
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">Your Links</h1>
            <CreateLinkModal />
          </div>
          
          {userLinks.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-zinc-600 dark:text-zinc-400">No links yet. Create your first shortened link!</p>
            </div>
          ) : (
            <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden">
              <ul className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {userLinks.map((link) => (
                  <li key={link.id} className="p-6 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                    <div className="flex flex-col space-y-3">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50 truncate">
                            /{link.shortCode}
                          </p>
                          <p className="text-sm text-zinc-600 dark:text-zinc-400 truncate mt-1">
                            {link.originalUrl}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <EditLinkModal
                            link={{
                              id: link.id,
                              shortCode: link.shortCode,
                              originalUrl: link.originalUrl,
                            }}
                          >
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                          </EditLinkModal>
                          <DeleteLinkDialog linkId={link.id} shortCode={link.shortCode}>
                            <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-950/50">
                              Delete
                            </Button>
                          </DeleteLinkDialog>
                        </div>
                      </div>
                      <div className="flex items-center text-xs text-zinc-500 dark:text-zinc-500">
                        <time dateTime={link.createdAt.toISOString()}>
                          Created {link.createdAt.toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </time>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
