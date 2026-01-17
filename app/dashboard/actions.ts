'use server'

import { z } from 'zod'
import { createLink, updateLink, deleteLink } from '@/data/links'
import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'

const createLinkSchema = z.object({
  originalUrl: z.string().url('Please enter a valid URL'),
  shortCode: z.string()
    .min(3, 'Short code must be at least 3 characters')
    .max(10, 'Short code cannot exceed 10 characters')
    .regex(/^[a-zA-Z0-9-_]+$/, 'Short code can only contain letters, numbers, hyphens, and underscores')
    .optional()
    .or(z.literal(''))
})

type CreateLinkInput = {
  originalUrl: string
  shortCode?: string
}

type ActionResult = 
  | { error: string; details?: Record<string, string[] | undefined> }
  | { success: true; link: { id: number; shortCode: string; originalUrl: string } }

export async function createLinkAction(input: CreateLinkInput): Promise<ActionResult> {
  // 1. Check authentication
  const { userId } = await auth()
  if (!userId) {
    return { error: 'Unauthorized' }
  }

  // 2. Validate input
  const result = createLinkSchema.safeParse(input)
  if (!result.success) {
    return { 
      error: 'Invalid input', 
      details: result.error.flatten().fieldErrors as Record<string, string[] | undefined>
    }
  }

  // 3. Use helper function for database operation
  try {
    // Filter out empty string for shortCode
    const data = {
      originalUrl: result.data.originalUrl,
      ...(result.data.shortCode && result.data.shortCode.trim() !== '' && { shortCode: result.data.shortCode })
    }
    const link = await createLink(data, userId)
    
    // Revalidate the dashboard page to show the new link
    revalidatePath('/dashboard')
    
    return { success: true, link }
  } catch (error) {
    // Handle database errors (e.g., duplicate short code)
    if (error instanceof Error && error.message.includes('unique')) {
      return { error: 'This short code is already taken. Please choose another.' }
    }
    return { error: 'Failed to create link. Please try again.' }
  }
}

const updateLinkSchema = z.object({
  originalUrl: z.string().url('Please enter a valid URL'),
  shortCode: z.string()
    .min(3, 'Short code must be at least 3 characters')
    .max(10, 'Short code cannot exceed 10 characters')
    .regex(/^[a-zA-Z0-9-_]+$/, 'Short code can only contain letters, numbers, hyphens, and underscores')
})

type UpdateLinkInput = {
  linkId: number
  originalUrl: string
  shortCode: string
}

export async function updateLinkAction(input: UpdateLinkInput): Promise<ActionResult> {
  // 1. Check authentication
  const { userId } = await auth()
  if (!userId) {
    return { error: 'Unauthorized' }
  }

  // 2. Validate input
  const result = updateLinkSchema.safeParse({
    originalUrl: input.originalUrl,
    shortCode: input.shortCode
  })
  if (!result.success) {
    return { 
      error: 'Invalid input', 
      details: result.error.flatten().fieldErrors as Record<string, string[] | undefined>
    }
  }

  // 3. Use helper function for database operation
  try {
    const link = await updateLink(
      input.linkId,
      {
        originalUrl: result.data.originalUrl,
        shortCode: result.data.shortCode
      },
      userId
    )
    
    // Revalidate the dashboard page to show the updated link
    revalidatePath('/dashboard')
    
    return { success: true, link }
  } catch (error) {
    // Handle database errors (e.g., duplicate short code)
    if (error instanceof Error) {
      if (error.message.includes('unique')) {
        return { error: 'This short code is already taken. Please choose another.' }
      }
      if (error.message === 'Unauthorized') {
        return { error: 'You do not have permission to edit this link.' }
      }
      if (error.message === 'Link not found') {
        return { error: 'Link not found.' }
      }
    }
    return { error: 'Failed to update link. Please try again.' }
  }
}

export async function deleteLinkAction(linkId: number): Promise<ActionResult> {
  // 1. Check authentication
  const { userId } = await auth()
  if (!userId) {
    return { error: 'Unauthorized' }
  }

  // 2. Use helper function for database operation
  try {
    await deleteLink(linkId, userId)
    
    // Revalidate the dashboard page to remove the deleted link
    revalidatePath('/dashboard')
    
    return { success: true, link: { id: linkId, shortCode: '', originalUrl: '' } }
  } catch (error) {
    // Handle database errors
    if (error instanceof Error) {
      if (error.message === 'Unauthorized') {
        return { error: 'You do not have permission to delete this link.' }
      }
      if (error.message === 'Link not found') {
        return { error: 'Link not found.' }
      }
    }
    return { error: 'Failed to delete link. Please try again.' }
  }
}
