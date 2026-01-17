---
description: Read this before creating or modifying any server actions for data mutations.
---

# Server Actions Instructions

This document outlines the required patterns and conventions for implementing server actions in this Next.js application.

## Core Rules

### 1. File Naming & Location
- Server action files **MUST** be named `actions.ts`
- Colocate `actions.ts` in the same directory as the component that calls the server action
- Example: If `app/dashboard/page.tsx` needs actions, create `app/dashboard/actions.ts`

### 2. Client Component Requirement
- Server actions **MUST** be called from Client Components only
- Mark components with `'use client'` directive when they need to invoke server actions

### 3. Type Safety
- All data passed to server actions **MUST** have appropriate TypeScript types
- **DO NOT** use the `FormData` TypeScript type for action parameters
- Define explicit interfaces or types for action inputs

### 4. Validation
- All incoming data **MUST** be validated using Zod schemas
- Define validation schemas at the top of the `actions.ts` file
- Validate before any processing or database operations

### 5. Authentication Check
- Every server action **MUST** first check for a logged-in user
- Return appropriate error response if user is not authenticated
- Do not proceed with any operations if authentication fails

### 6. Database Operations
- Server actions **MUST NOT** contain direct Drizzle queries
- Use helper functions from the `/data` directory to perform database operations
- Keep database logic separate from action logic

### 7. Error Handling
- Server actions **MUST NOT** throw errors
- Always return an object with either an `error` or `success` property
- Use consistent error response format: `{ error: string }` or `{ error: string, details: any }`
- Use consistent success response format: `{ success: true, data?: any }`

## Example Pattern

```typescript
'use server'

import { z } from 'zod'
import { createLink } from '@/data/links'
import { auth } from '@/lib/auth'

const createLinkSchema = z.object({
  url: z.string().url(),
  slug: z.string().min(3)
})

export async function createLinkAction(input: { url: string; slug: string }) {
  // 1. Check authentication
  const user = await auth()
  if (!user) {
    return { error: 'Unauthorized' }
  }

  // 2. Validate input
  const result = createLinkSchema.safeParse(input)
  if (!result.success) {
    return { error: 'Invalid input', details: result.error }
  }

  // 3. Use helper function for database operation
  const link = await createLink(result.data, user.id)
  
  return { success: true, link }
}
```

## Summary

All server actions must follow this flow:
1. Define in colocated `actions.ts` file
2. Accept typed parameters (not FormData)
3. Validate with Zod
4. Check authentication
5. Use `/data` helper functions for database operations
6. Be called from Client Components only
