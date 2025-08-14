import { NextRequest, NextResponse } from 'next/server';
import { sendEmail, emailTemplates, textToHtml } from '@/lib/email';

export const dynamic = 'force-static';

// Email configuration - REPLACE WITH ACTUAL EMAIL
const VOLUNTEER_EMAIL = process.env.VOLUNTEER_EMAIL || 'PLACEHOLDER_EMAIL@example.com';
const FROM_EMAIL = process.env.FROM_EMAIL || 'noreply@collect-it-con.com';

// Simple email obfuscation for client-side (not foolproof but adds a layer)
const obfuscateEmail = (email: string) => {
  return Buffer.from(email).toString('base64');
};

interface VolunteerApplicationData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: string;
  experience: string;
  availability: string[];
  preferredRoles: string[];
  emergencyContact: string;
  emergencyPhone: string;
  specialSkills: string;
  motivation: string;
  acceptTerms: boolean;
  acceptBackground: boolean;
  submittedAt: string;
  userAgent: string;
}

// Helper function to format role names
const formatRoleNames = (roleIds: string[]): string[] => {
  const roleNames: { [key: string]: string } = {
    'registration': 'Registration & Check-in',
    'tournament-support': 'Tournament Support',
    'vendor-support': 'Vendor & Exhibitor Support',
    'guest-relations': 'Guest Relations',
    'security': 'Security & Safety',
    'technical': 'Technical Support'
  };

  return roleIds.map(roleId => roleNames[roleId] || roleId);
};

export async function POST(request: NextRequest) {
  try {
    const data: VolunteerApplicationData = await request.json();
    
    // Basic validation
    if (!data.firstName || !data.lastName || !data.email || !data.phone) {
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

    // Prepare data with formatted role names
    const formattedData = {
      ...data,
      preferredRoles: formatRoleNames(data.preferredRoles)
    };

    // Generate email templates
    const applicationEmail = emailTemplates.volunteerApplication(formattedData);
    const confirmationEmail = emailTemplates.volunteerConfirmation(formattedData);
    
    // Send email to volunteer coordinator
    const emailSent = await sendEmail({
      to: VOLUNTEER_EMAIL,
      subject: applicationEmail.subject,
      text: applicationEmail.text,
      html: textToHtml(applicationEmail.text),
      from: FROM_EMAIL
    });
    
    if (!emailSent) {
      throw new Error('Failed to send email');
    }

    // Send confirmation email to applicant
    await sendEmail({
      to: data.email,
      subject: confirmationEmail.subject,
      text: confirmationEmail.text,
      html: textToHtml(confirmationEmail.text),
      from: FROM_EMAIL
    });

    return NextResponse.json(
      { 
        success: true, 
        message: 'Volunteer application submitted successfully' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Volunteer application submission error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to submit volunteer application',
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    );
  }
}

// Optional: GET endpoint to retrieve obfuscated email for client-side use
export async function GET() {
  return NextResponse.json({
    // This provides an obfuscated version for any client-side needs
    // Still not completely secure, but adds a layer of obfuscation
    contact: obfuscateEmail(VOLUNTEER_EMAIL)
  });
}