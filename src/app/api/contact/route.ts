import { NextRequest, NextResponse } from 'next/server';
import { sendContactFormEmails } from '@/lib/email';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  submittedAt: string;
  userAgent: string;
}

export async function POST(request: NextRequest) {
  try {
    const data: ContactFormData = await request.json();

    // Validate required fields
    if (!data.name || !data.email || !data.subject || !data.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
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
    const emailsSent = await sendContactFormEmails({
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
      submittedAt: data.submittedAt
    });

    if (!emailsSent) {
      console.error('Failed to send contact form emails');
      // Don't fail the request, just log the error
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Contact form submitted successfully' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}