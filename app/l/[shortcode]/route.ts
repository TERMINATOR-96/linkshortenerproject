import { NextRequest, NextResponse } from 'next/server';
import { getLinkByShortCode } from '@/data/links';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ shortcode: string }> }
) {
  const { shortcode } = await params;

  // Validate short code
  if (!shortcode || typeof shortcode !== 'string') {
    return NextResponse.json(
      { error: 'Invalid short code' },
      { status: 400 }
    );
  }

  try {
    // Fetch the link from the database
    const link = await getLinkByShortCode(shortcode);

    if (!link) {
      return NextResponse.json(
        { error: 'Link not found' },
        { status: 404 }
      );
    }

    // Redirect to the original URL
    return NextResponse.redirect(link.originalUrl, 301);
  } catch (error) {
    console.error('Error redirecting:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
