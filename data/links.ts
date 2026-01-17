import { db } from '@/db';
import { links, type Link, type NewLink } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';

/**
 * Generates a random short code
 * @param length - Length of the short code (default: 6)
 * @returns A random alphanumeric string
 */
function generateShortCode(length: number = 6): string {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Fetches all links for a specific user
 * @param userId - The Clerk user ID
 * @returns Array of links belonging to the user, ordered by most recently updated first
 */
export async function getUserLinks(userId: string): Promise<Link[]> {
  const userLinks = await db
    .select()
    .from(links)
    .where(eq(links.userId, userId))
    .orderBy(desc(links.updatedAt));
  
  return userLinks;
}

/**
 * Creates a new shortened link
 * @param data - Link data with optional shortCode and originalUrl
 * @param userId - The Clerk user ID
 * @returns The created link
 */
export async function createLink(
  data: { shortCode?: string; originalUrl: string },
  userId: string
): Promise<Link> {
  // Generate a short code if not provided
  let shortCode = data.shortCode || generateShortCode();
  
  // Keep trying with new codes if there's a collision
  let attempts = 0;
  const maxAttempts = 10;
  
  while (attempts < maxAttempts) {
    try {
      const [newLink] = await db
        .insert(links)
        .values({
          userId,
          shortCode,
          originalUrl: data.originalUrl,
        })
        .returning();
      
      return newLink;
    } catch (error) {
      // If it's a unique constraint error and we auto-generated the code, try again
      if (!data.shortCode && error instanceof Error && error.message.includes('unique')) {
        shortCode = generateShortCode();
        attempts++;
      } else {
        // Re-throw if it's a user-provided code or different error
        throw error;
      }
    }
  }
  
  throw new Error('Failed to generate unique short code after multiple attempts');
}

/**
 * Updates an existing link
 * @param linkId - The ID of the link to update
 * @param data - Updated link data
 * @param userId - The Clerk user ID (for authorization)
 * @returns The updated link
 */
export async function updateLink(
  linkId: number,
  data: { shortCode?: string; originalUrl: string },
  userId: string
): Promise<Link> {
  // First verify the link belongs to the user
  const [existingLink] = await db
    .select()
    .from(links)
    .where(eq(links.id, linkId));
  
  if (!existingLink) {
    throw new Error('Link not found');
  }
  
  if (existingLink.userId !== userId) {
    throw new Error('Unauthorized');
  }
  
  // Update the link
  const [updatedLink] = await db
    .update(links)
    .set({
      ...(data.shortCode && { shortCode: data.shortCode }),
      originalUrl: data.originalUrl,
      updatedAt: new Date(),
    })
    .where(eq(links.id, linkId))
    .returning();
  
  return updatedLink;
}

/**
 * Fetches a link by its short code
 * @param shortCode - The short code to look up
 * @returns The link if found, null otherwise
 */
export async function getLinkByShortCode(shortCode: string): Promise<Link | null> {
  const [link] = await db
    .select()
    .from(links)
    .where(eq(links.shortCode, shortCode))
    .limit(1);
  
  return link || null;
}

/**
 * Deletes a link
 * @param linkId - The ID of the link to delete
 * @param userId - The Clerk user ID (for authorization)
 */
export async function deleteLink(
  linkId: number,
  userId: string
): Promise<void> {
  // First verify the link belongs to the user
  const [existingLink] = await db
    .select()
    .from(links)
    .where(eq(links.id, linkId));
  
  if (!existingLink) {
    throw new Error('Link not found');
  }
  
  if (existingLink.userId !== userId) {
    throw new Error('Unauthorized');
  }
  
  // Delete the link
  await db
    .delete(links)
    .where(eq(links.id, linkId));
}
