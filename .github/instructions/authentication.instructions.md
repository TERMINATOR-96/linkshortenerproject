---
description: Read this before implementing or modifying any authentication-related code.
---

# Authentication

## Overview

This application uses **Clerk** exclusively for all authentication and user management. No other authentication methods or libraries should be implemented.

## Core Rules

1. **Clerk Only**: All authentication must go through Clerk. Never implement custom auth logic or use alternative auth providers.

2. **Modal Authentication**: Sign-in and sign-up flows must always launch as modals, not full-page redirects.

3. **Protected Routes**: 
   - `/dashboard` and any dashboard sub-routes are protected
   - Users must be authenticated to access these pages
   - Use Clerk's authentication helpers to enforce protection

4. **Redirect Logic**:
   - If an authenticated user accesses the homepage (`/`), redirect them to `/dashboard`
   - If an unauthenticated user tries to access `/dashboard`, redirect to sign-in modal

## Implementation Patterns

### Protecting Routes

Use Clerk's `auth()` helper in Server Components:

```typescript
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect('/');
  }
  
  // Protected content here
}
```

### Homepage Redirect

Check authentication status and redirect logged-in users:

```typescript
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function HomePage() {
  const { userId } = await auth();
  
  if (userId) {
    redirect('/dashboard');
  }
  
  // Public homepage content
}
```

### Modal Sign-In/Sign-Up

Use Clerk components with modal configuration:

```typescript
import { SignInButton, SignUpButton } from '@clerk/nextjs';

// Modal trigger buttons
<SignInButton mode="modal">
  <button>Sign In</button>
</SignInButton>

<SignUpButton mode="modal">
  <button>Sign Up</button>
</SignUpButton>
```

## User Data Access

Access user information through Clerk's provided methods:

```typescript
// Server Components
import { currentUser } from '@clerk/nextjs/server';

const user = await currentUser();

// Client Components
import { useUser } from '@clerk/nextjs';

const { user, isLoaded, isSignedIn } = useUser();
```

## Key Clerk Imports

```typescript
// Server-side
import { auth, currentUser } from '@clerk/nextjs/server';

// Client-side
import { useUser, useAuth, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
```

## Best Practices

- Always check authentication on protected routes
- Use Server Components for auth checks when possible
- Keep modal mode consistent across all sign-in/sign-up triggers
- Never store authentication tokens manually
- Let Clerk handle session management automatically

---

**Last Updated**: January 15, 2026
