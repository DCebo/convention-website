// Email service configuration
// This file handles email sending with different providers

import { getContactEmail } from '@/config/contactInfo';

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
    console.log('From:', options.from || getContactEmail());
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

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  submittedAt: string;
}

interface NewsletterSignupData {
  email: string;
  name?: string;
  interests?: string[];
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
    subject: 'Volunteer Application Received - Collect-It Con',
    text: `
Dear ${data.firstName},

Thank you for your interest in volunteering at Collect-It Con!

We have received your volunteer application and will review it within 5-7 business days. Our volunteer coordinator will contact you at ${data.email} with next steps.

Your preferred volunteer roles: ${data.preferredRoles.join(', ')}

If you have any questions, please contact our volunteer coordinator at ${process.env.VOLUNTEER_EMAIL || 'volunteers@collect-it-con.com'}.

Thank you for wanting to be part of making Collect-It Con amazing!

Best regards,
The Collect-It Con Team
    `.trim()
  }),

  // Contact form templates
  contactFormNotification: (data: ContactFormData) => ({
    subject: `New Contact Form: ${data.subject}`,
    text: `
New Contact Form Submission - Collect-It Con

FROM: ${data.name}
EMAIL: ${data.email}
SUBJECT: ${data.subject}

MESSAGE:
${data.message}

---
Submitted: ${new Date(data.submittedAt).toLocaleString()}
    `.trim()
  }),

  contactFormConfirmation: (data: ContactFormData) => ({
    subject: 'Contact Form Received - Collect-It Con',
    text: `
Dear ${data.name},

Thank you for contacting Collect-It Con! We have received your message and will get back to you within 24-48 hours.

Your message:
Subject: ${data.subject}
Message: ${data.message}

If you have any urgent questions, please contact us directly at ${getContactEmail()}.

Best regards,
The Collect-It Con Team
    `.trim()
  }),

  // Newsletter templates
  newsletterNotification: (data: NewsletterSignupData) => ({
    subject: 'New Newsletter Signup',
    text: `
New Newsletter Signup - Collect-It Con

EMAIL: ${data.email}
NAME: ${data.name || 'Not provided'}
INTERESTS: ${data.interests?.join(', ') || 'Not specified'}

---
Submitted: ${new Date(data.submittedAt).toLocaleString()}
    `.trim()
  }),

  newsletterWelcome: (data: NewsletterSignupData) => ({
    subject: 'Welcome to Collect-It Con Newsletter!',
    text: `
Welcome to Collect-It Con!

Thank you for subscribing to our newsletter! You'll be the first to know about:

🎯 Convention updates and announcements
🏆 Tournament schedules and prizes  
🎴 Special guest appearances
🛍️ Vendor spotlights and exclusive deals
🎪 Programming events and activities

We're excited to have you as part of our community!

Event Details:
📅 Date: Nov. 29th, 2025
📍 Location: Collingwood, VIC

Stay tuned for more exciting updates!

Best regards,
The Collect-It Con Team

---
You can unsubscribe at any time by contacting us at ${getContactEmail()}
    `.trim()
  })
};

// Convenience functions for sending specific email types

export async function sendContactFormEmails(data: ContactFormData): Promise<boolean> {
  try {
    // Send notification to business
    const businessTemplate = emailTemplates.contactFormNotification(data);
    const businessEmailSent = await sendEmail({
      to: getContactEmail(),
      from: data.email,
      subject: businessTemplate.subject,
      text: businessTemplate.text,
      html: textToHtml(businessTemplate.text)
    });

    // Send confirmation to user
    const userTemplate = emailTemplates.contactFormConfirmation(data);
    const userEmailSent = await sendEmail({
      to: data.email,
      from: getContactEmail(),
      subject: userTemplate.subject,
      text: userTemplate.text,
      html: textToHtml(userTemplate.text)
    });

    return businessEmailSent && userEmailSent;
  } catch (error) {
    console.error('Error sending contact form emails:', error);
    return false;
  }
}

export async function sendNewsletterEmails(data: NewsletterSignupData): Promise<boolean> {
  try {
    // Send notification to business
    const businessTemplate = emailTemplates.newsletterNotification(data);
    const businessEmailSent = await sendEmail({
      to: getContactEmail(),
      from: 'newsletter@collect-it-con.com',
      subject: businessTemplate.subject,
      text: businessTemplate.text,
      html: textToHtml(businessTemplate.text)
    });

    // Send welcome email to user
    const welcomeTemplate = emailTemplates.newsletterWelcome(data);
    const welcomeEmailSent = await sendEmail({
      to: data.email,
      from: getContactEmail(),
      subject: welcomeTemplate.subject,
      text: welcomeTemplate.text,
      html: textToHtml(welcomeTemplate.text)
    });

    return businessEmailSent && welcomeEmailSent;
  } catch (error) {
    console.error('Error sending newsletter emails:', error);
    return false;
  }
}