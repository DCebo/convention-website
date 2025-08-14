import { NextRequest, NextResponse } from 'next/server';
import { sendEmail, textToHtml } from '@/lib/email';

export const dynamic = 'force-static';

// Email configuration - REPLACE WITH ACTUAL EMAIL
const VENDOR_EMAIL = process.env.VENDOR_EMAIL || 'PLACEHOLDER_EMAIL@example.com';
const FROM_EMAIL = process.env.FROM_EMAIL || 'noreply@collect-it-con.com';

interface VendorApplicationData {
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  website: string;
  businessType: string;
  description: string;
  products: string[];
  boothSize: string;
  electricalNeeds: boolean;
  internetNeeds: boolean;
  specialRequirements: string;
  previousExperience: string;
  references: string;
  acceptTerms: boolean;
  acceptPolicies: boolean;
  submittedAt: string;
  userAgent: string;
}

// Helper function to format booth size names
const formatBoothSize = (boothId: string): string => {
  const boothNames: { [key: string]: string } = {
    'standard': 'Standard Booth (10\' x 10\')',
    'premium': 'Premium Booth (10\' x 20\')',
    'corner': 'Corner Booth (10\' x 10\')',
    'showcase': 'Showcase Booth (20\' x 20\')'
  };

  return boothNames[boothId] || boothId;
};

// Email templates for vendor applications
const vendorEmailTemplates = {
  vendorApplication: (data: VendorApplicationData) => ({
    subject: `New Vendor Application: ${data.businessName}`,
    text: `
New Vendor Application - Collect-It-Con

BUSINESS INFORMATION:
Business Name: ${data.businessName}
Contact Name: ${data.contactName}
Email: ${data.email}
Phone: ${data.phone}
Website: ${data.website || 'Not provided'}
Business Type: ${data.businessType}

BUSINESS DESCRIPTION:
${data.description}

PRODUCT CATEGORIES:
${data.products.map((product: string) => `• ${product}`).join('\n')}

BOOTH REQUIREMENTS:
Preferred Booth Size: ${formatBoothSize(data.boothSize)}
Additional Electrical Outlets: ${data.electricalNeeds ? 'Yes' : 'No'}
Internet Access: ${data.internetNeeds ? 'Yes' : 'No'}

SPECIAL REQUIREMENTS:
${data.specialRequirements || 'None specified'}

EXPERIENCE:
${data.previousExperience || 'No previous experience provided'}

REFERENCES:
${data.references || 'No references provided'}

AGREEMENTS:
Terms Accepted: ${data.acceptTerms ? 'Yes' : 'No'}
Policies Accepted: ${data.acceptPolicies ? 'Yes' : 'No'}

SUBMISSION DETAILS:
Submitted: ${new Date(data.submittedAt).toLocaleString()}

---
This application was submitted through the Collect-It-Con website vendor form.
Please review and respond with pricing information within 5-7 business days.
    `.trim()
  }),

  vendorConfirmation: (data: VendorApplicationData) => ({
    subject: 'Vendor Application Received - Collect-It-Con',
    text: `
Dear ${data.contactName},

Thank you for your interest in becoming a vendor at Collect-It-Con!

We have received your vendor application for ${data.businessName} and will review it within 5-7 business days. Our vendor coordinator will contact you at ${data.email} with pricing information and next steps.

Your application details:
• Business: ${data.businessName}
• Preferred Booth: ${formatBoothSize(data.boothSize)}
• Product Categories: ${data.products.join(', ')}

WHAT HAPPENS NEXT:
1. We'll review your application and booth requirements
2. You'll receive an email with pricing and package details
3. Once approved, we'll send booth assignment and setup information
4. You'll receive your vendor packet with all event details

If you have any questions, please contact our vendor coordinator at ${VENDOR_EMAIL}.

We're excited about the possibility of having you join our vendor community at Collect-It-Con!

Best regards,
The Collect-It-Con Team

---
Collect-It-Con - Your Premier TCG & Sports Card Convention
Website: https://collect-it-con.com
    `.trim()
  })
};

export async function POST(request: NextRequest) {
  try {
    const data: VendorApplicationData = await request.json();
    
    // Basic validation
    if (!data.businessName || !data.contactName || !data.email || !data.phone) {
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

    // Validate required arrays and selections
    if (!data.products || data.products.length === 0) {
      return NextResponse.json(
        { error: 'At least one product category must be selected' },
        { status: 400 }
      );
    }

    if (!data.boothSize) {
      return NextResponse.json(
        { error: 'Booth size selection is required' },
        { status: 400 }
      );
    }

    // Generate email templates
    const applicationEmail = vendorEmailTemplates.vendorApplication(data);
    const confirmationEmail = vendorEmailTemplates.vendorConfirmation(data);
    
    // Send email to vendor coordinator
    const emailSent = await sendEmail({
      to: VENDOR_EMAIL,
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
        message: 'Vendor application submitted successfully' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Vendor application submission error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to submit vendor application',
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    );
  }
}

// Optional: GET endpoint to retrieve vendor contact info
export async function GET() {
  return NextResponse.json({
    contact: VENDOR_EMAIL,
    message: 'For vendor inquiries, please submit the application form or contact us directly.'
  });
}