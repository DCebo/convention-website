// Email service configuration
// This file handles email sending with different providers

interface EmailOptions {
  to: string;
  subject: string;
  text: string;
  html?: string;
  from?: string;
}

// Email service interface
interface EmailService {
  sendEmail(options: EmailOptions): Promise<boolean>;
}

// Console Email Service (for development/testing)
class ConsoleEmailService implements EmailService {
  async sendEmail(options: EmailOptions): Promise<boolean> {
    console.log('=== EMAIL WOULD BE SENT ===');
    console.log('From:', options.from || 'noreply@collect-it-con.com');
    console.log('To:', options.to);
    console.log('Subject:', options.subject);
    console.log('Content:', options.text);
    if (options.html) {
      console.log('HTML Content:', options.html);
    }
    console.log('=== END EMAIL ===');
    return true;
  }
}

// Nodemailer Email Service (for SMTP)
class NodemailerEmailService implements EmailService {
  async sendEmail(options: EmailOptions): Promise<boolean> {
    try {
      // TODO: Implement Nodemailer
      // const nodemailer = require('nodemailer');
      // const transporter = nodemailer.createTransporter({
      //   host: process.env.SMTP_HOST,
      //   port: process.env.SMTP_PORT,
      //   secure: process.env.SMTP_SECURE === 'true',
      //   auth: {
      //     user: process.env.SMTP_USER,
      //     pass: process.env.SMTP_PASS,
      //   },
      // });
      // 
      // await transporter.sendMail({
      //   from: options.from || process.env.FROM_EMAIL,
      //   to: options.to,
      //   subject: options.subject,
      //   text: options.text,
      //   html: options.html,
      // });
      
      console.log('Nodemailer would send email to:', options.to);
      return true;
    } catch (error) {
      console.error('Nodemailer error:', error);
      return false;
    }
  }
}

// SendGrid Email Service
class SendGridEmailService implements EmailService {
  async sendEmail(options: EmailOptions): Promise<boolean> {
    try {
      // TODO: Implement SendGrid
      // const sgMail = require('@sendgrid/mail');
      // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      // 
      // const msg = {
      //   to: options.to,
      //   from: options.from || process.env.FROM_EMAIL,
      //   subject: options.subject,
      //   text: options.text,
      //   html: options.html,
      // };
      // 
      // await sgMail.send(msg);
      
      console.log('SendGrid would send email to:', options.to);
      return true;
    } catch (error) {
      console.error('SendGrid error:', error);
      return false;
    }
  }
}

// Resend Email Service
class ResendEmailService implements EmailService {
  async sendEmail(options: EmailOptions): Promise<boolean> {
    try {
      // TODO: Implement Resend
      // const { Resend } = require('resend');
      // const resend = new Resend(process.env.RESEND_API_KEY);
      // 
      // await resend.emails.send({
      //   from: options.from || process.env.FROM_EMAIL,
      //   to: options.to,
      //   subject: options.subject,
      //   text: options.text,
      //   html: options.html,
      // });
      
      console.log('Resend would send email to:', options.to);
      return true;
    } catch (error) {
      console.error('Resend error:', error);
      return false;
    }
  }
}

// Factory function to get the appropriate email service
function getEmailService(): EmailService {
  const emailProvider = process.env.EMAIL_PROVIDER || 'console';
  
  switch (emailProvider.toLowerCase()) {
    case 'nodemailer':
      return new NodemailerEmailService();
    case 'sendgrid':
      return new SendGridEmailService();
    case 'resend':
      return new ResendEmailService();
    case 'console':
    default:
      return new ConsoleEmailService();
  }
}

// Main email sending function
export async function sendEmail(options: EmailOptions): Promise<boolean> {
  const emailService = getEmailService();
  return await emailService.sendEmail(options);
}

// Helper function to create HTML version of text email
export function textToHtml(text: string): string {
  return text
    .replace(/\n/g, '<br>')
    .replace(/^([A-Z\s]+:)$/gm, '<strong>$1</strong>')
    .replace(/^(•\s)/gm, '&bull; ');
}

// Types for email template data
interface VolunteerApplicationData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: string;
  emergencyContact: string;
  emergencyPhone: string;
  availability: string[];
  preferredRoles: string[];
  experience?: string;
  specialSkills?: string;
  motivation: string;
  acceptTerms: boolean;
  acceptBackground: boolean;
  submittedAt: string;
}

// Email templates
export const emailTemplates = {
  volunteerApplication: (data: VolunteerApplicationData) => ({
    subject: `New Volunteer Application: ${data.firstName} ${data.lastName}`,
    text: `
New Volunteer Application - Collect-It-Con

APPLICANT INFORMATION:
Name: ${data.firstName} ${data.lastName}
Email: ${data.email}
Phone: ${data.phone}
Age: ${data.age}

EMERGENCY CONTACT:
Name: ${data.emergencyContact}
Phone: ${data.emergencyPhone}

AVAILABILITY:
${data.availability.map((slot: string) => `• ${slot}`).join('\n')}

PREFERRED ROLES:
${data.preferredRoles.join(', ')}

EXPERIENCE:
${data.experience || 'No previous experience provided'}

SPECIAL SKILLS:
${data.specialSkills || 'None specified'}

MOTIVATION:
${data.motivation}

AGREEMENTS:
Terms Accepted: ${data.acceptTerms ? 'Yes' : 'No'}
Background Check Consent: ${data.acceptBackground ? 'Yes' : 'No'}

SUBMISSION DETAILS:
Submitted: ${new Date(data.submittedAt).toLocaleString()}

---
This application was submitted through the Collect-It-Con website volunteer form.
    `.trim()
  }),

  volunteerConfirmation: (data: VolunteerApplicationData) => ({
    subject: 'Volunteer Application Received - Collect-It-Con',
    text: `
Dear ${data.firstName},

Thank you for your interest in volunteering at Collect-It-Con!

We have received your volunteer application and will review it within 5-7 business days. Our volunteer coordinator will contact you at ${data.email} with next steps.

Your preferred volunteer roles: ${data.preferredRoles.join(', ')}

If you have any questions, please contact our volunteer coordinator at ${process.env.VOLUNTEER_EMAIL || 'volunteers@collect-it-con.com'}.

Thank you for wanting to be part of making Collect-It-Con amazing!

Best regards,
The Collect-It-Con Team
    `.trim()
  })
};