import { NextRequest, NextResponse } from 'next/server';
import { sendNewsletterEmails } from '@/lib/email';

interface NewsletterSignupData {
  email: string;
  name?: string;
  interests?: string[];
  submittedAt: string;
  userAgent: string;
}

export async function POST(request: NextRequest) {
  try {
    const data: NewsletterSignupData = await request.json();

    // Validate required fields
    if (!data.email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Send emails using the email service
    const emailsSent = await sendNewsletterEmails({
      email: data.email,
      name: data.name,
      interests: data.interests,
      submittedAt: data.submittedAt
    });

    if (!emailsSent) {
      console.error('Failed to send newsletter emails');
      // Don't fail the request, just log the error
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Successfully subscribed to newsletter' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Newsletter API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}