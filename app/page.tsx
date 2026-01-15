import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { SignInButton, SignUpButton } from '@clerk/nextjs';

export default async function Home() {
  const { userId } = await auth();
  
  if (userId) {
    redirect('/dashboard');
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
            <div className="flex items-center gap-6 ml-auto pr-4">
              <SignInButton mode="modal">
                <button type="button" className="px-4 py-2 text-sm font-medium text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50 transition-colors">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button type="button" className="px-4 py-2 text-sm font-medium bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 transition-colors">
                  Sign Up
                </button>
              </SignUpButton>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <section className="text-center py-20">
          <h2 className="text-5xl sm:text-6xl font-bold text-zinc-900 dark:text-zinc-50 mb-6">
            Shorten Your Links,
            <br />
            <span className="text-zinc-600 dark:text-zinc-400">Amplify Your Reach</span>
          </h2>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-12 max-w-2xl mx-auto">
            Create short, memorable links in seconds. Track analytics, customize URLs, and share with confidence.
          </p>
          <div className="flex gap-4 justify-center">
            <SignUpButton mode="modal">
              <button className="px-8 py-3 text-base font-medium bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 transition-colors shadow-lg">
                Get Started Free
              </button>
            </SignUpButton>
            <SignInButton mode="modal">
              <button className="px-8 py-3 text-base font-medium border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                Sign In
              </button>
            </SignInButton>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <h3 className="text-3xl font-bold text-center text-zinc-900 dark:text-zinc-50 mb-12">
            Why Choose LinkShortener?
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 shadow hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-zinc-900 dark:text-zinc-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                Lightning Fast
              </h4>
              <p className="text-zinc-600 dark:text-zinc-400">
                Create shortened links instantly with our optimized infrastructure. No delays, just results.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 shadow hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-zinc-900 dark:text-zinc-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                Detailed Analytics
              </h4>
              <p className="text-zinc-600 dark:text-zinc-400">
                Track clicks, geographic data, and referral sources. Understand your audience better.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 shadow hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-zinc-900 dark:text-zinc-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                Secure & Reliable
              </h4>
              <p className="text-zinc-600 dark:text-zinc-400">
                Enterprise-grade security with 99.9% uptime. Your links are always accessible and protected.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 shadow hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-zinc-900 dark:text-zinc-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                Custom Branding
              </h4>
              <p className="text-zinc-600 dark:text-zinc-400">
                Create branded short links that reflect your identity. Build trust with custom domains.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 shadow hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-zinc-900 dark:text-zinc-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                Link Management
              </h4>
              <p className="text-zinc-600 dark:text-zinc-400">
                Organize, edit, and manage all your links from one central dashboard. Stay organized.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 shadow hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-zinc-900 dark:text-zinc-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                Always Available
              </h4>
              <p className="text-zinc-600 dark:text-zinc-400">
                Cloud-based infrastructure ensures your links work 24/7, anywhere in the world.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 text-center">
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-950 p-12">
            <h3 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
              Ready to get started?
            </h3>
            <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-8 max-w-2xl mx-auto">
              Join thousands of users who trust LinkShortener for their link management needs.
            </p>
            <SignUpButton mode="modal">
              <button className="px-8 py-3 text-base font-medium bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 transition-colors shadow-lg">
                Create Your Free Account
              </button>
            </SignUpButton>
          </div>
        </section>
      </main>
    </div>
  );
}
