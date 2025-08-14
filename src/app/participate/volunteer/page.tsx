'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PageLayout } from '@/components/layout';

interface VolunteerFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: string;
  availability: string[];
  emergencyContact: string;
  emergencyPhone: string;
  motivation: string;
  acceptTerms: boolean;
  acceptBackground: boolean;
}

interface VolunteerOpportunity {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  benefits: string[];
  timeCommitment: string;
  category: 'Event Support' | 'Registration' | 'Security' | 'Technical' | 'Guest Relations';
}

const volunteerOpportunities: VolunteerOpportunity[] = [
  {
    id: 'registration',
    title: 'Registration & Check-in',
    description: 'Help attendees check in, distribute badges, and provide information about the convention.',
    requirements: ['Friendly and welcoming personality', 'Basic computer skills', 'Ability to stand for extended periods'],
    benefits: ['Free convention pass', 'Volunteer t-shirt', 'Meet other volunteers'],
    timeCommitment: '4-6 hours per day',
    category: 'Registration'
  },
  {
    id: 'tournament-support',
    title: 'Tournament Support',
    description: 'Assist with TCG and sports card tournaments, help with setup, scoring, and crowd management.',
    requirements: ['Knowledge of TCG/sports card games preferred', 'Attention to detail', 'Ability to work under pressure'],
    benefits: ['Free convention pass', 'Volunteer t-shirt', 'Tournament prizes', 'Behind-the-scenes access'],
    timeCommitment: '6-8 hours per day',
    category: 'Event Support'
  },
  {
    id: 'vendor-support',
    title: 'Vendor & Exhibitor Support',
    description: 'Help vendors with setup, provide information, and assist with booth management.',
    requirements: ['Customer service experience preferred', 'Physical ability to help with setup', 'Problem-solving skills'],
    benefits: ['Free convention pass', 'Volunteer t-shirt', 'Vendor discounts', 'Networking opportunities'],
    timeCommitment: '4-6 hours per day',
    category: 'Event Support'
  },
  {
    id: 'guest-relations',
    title: 'Guest Relations',
    description: 'Assist special guests, manage autograph lines, and help with guest appearances.',
    requirements: ['Professional demeanor', 'Crowd management experience preferred', 'Flexible schedule'],
    benefits: ['Free convention pass', 'Volunteer t-shirt', 'Meet special guests', 'VIP access areas'],
    timeCommitment: '6-8 hours per day',
    category: 'Guest Relations'
  },
  {
    id: 'security',
    title: 'Security & Safety',
    description: 'Help maintain a safe environment, monitor entrances, and assist with crowd control.',
    requirements: ['Security experience preferred', 'Physical fitness', 'Calm under pressure', 'Background check required'],
    benefits: ['Free convention pass', 'Volunteer t-shirt', 'Security training', 'Leadership opportunities'],
    timeCommitment: '8 hours per day',
    category: 'Security'
  },
  {
    id: 'technical',
    title: 'Technical Support',
    description: 'Help with AV equipment, streaming setup, and technical troubleshooting.',
    requirements: ['Technical experience with AV equipment', 'Problem-solving skills', 'Ability to work independently'],
    benefits: ['Free convention pass', 'Volunteer t-shirt', 'Technical experience', 'Equipment access'],
    timeCommitment: '6-8 hours per day',
    category: 'Technical'
  }
];

const availabilityOptions = [
  'Friday Setup (Day Before)',
  'Saturday Morning (8 AM - 12 PM)',
  'Saturday Afternoon (12 PM - 6 PM)',
  'Saturday Evening (6 PM - 10 PM)',
  'Sunday Morning (8 AM - 12 PM)',
  'Sunday Afternoon (12 PM - 6 PM)',
  'Sunday Teardown (After 6 PM)'
];

export default function VolunteerPage() {
  const [formData, setFormData] = useState<VolunteerFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    age: '',
    availability: [],
    emergencyContact: '',
    emergencyPhone: '',
    motivation: '',
    acceptTerms: false,
    acceptBackground: false
  });

  const [errors, setErrors] = useState<Partial<Record<keyof VolunteerFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleInputChange = (field: keyof VolunteerFormData, value: string | boolean | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleCheckboxChange = (field: 'availability', value: string, checked: boolean) => {
    const currentArray = formData[field] as string[];
    const newArray = checked 
      ? [...currentArray, value]
      : currentArray.filter(item => item !== value);
    
    handleInputChange(field, newArray);
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof VolunteerFormData, string>> = {};

    // Required fields validation
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.age.trim()) newErrors.age = 'Age is required';
    if (!formData.emergencyContact.trim()) newErrors.emergencyContact = 'Emergency contact is required';
    if (!formData.emergencyPhone.trim()) newErrors.emergencyPhone = 'Emergency phone is required';
    if (!formData.motivation.trim()) newErrors.motivation = 'Please tell us why you want to volunteer';

    // Email validation
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation
    if (formData.phone && !/^\+?[\d\s\-\(\)]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    // Age validation
    if (formData.age && (isNaN(Number(formData.age)) || Number(formData.age) < 16)) {
      newErrors.age = 'Must be at least 16 years old';
    }

    // Array validations
    if (formData.availability.length === 0) {
      newErrors.availability = 'Please select at least one availability option';
    }



    // Terms acceptance
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the volunteer terms and conditions';
    }

    if (!formData.acceptBackground) {
      newErrors.acceptBackground = 'You must consent to background check if required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Send volunteer application via email
      const response = await fetch('/api/volunteer-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          submittedAt: new Date().toISOString(),
          userAgent: navigator.userAgent,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit application');
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error('Volunteer application error:', error);
      setSubmitError('There was an error submitting your application. Please try again or contact us directly at volunteers@collect-it-con.com');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <PageLayout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="mb-6">
              <div className="mx-auto w-16 h-16 bg-success rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-primary mb-4">Application Submitted!</h1>
            <p className="text-lg text-gray-600 mb-8">
              Thank you for your interest in volunteering at Collect-It-Con! We&apos;ll review your application and get back to you within 5-7 business days.
            </p>
            <div className="bg-card-bg border border-border rounded-lg p-6 text-left max-w-2xl mx-auto">
              <h3 className="font-semibold text-primary mb-3">What happens next?</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-accent mr-2">1.</span>
                  We&apos;ll review your application and preferred roles
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">2.</span>
                  You&apos;ll receive an email confirmation with next steps
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">3.</span>
                  If selected, we&apos;ll schedule a brief orientation call
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">4.</span>
                  You&apos;ll receive your volunteer packet and schedule
                </li>
              </ul>
            </div>
            <div className="mt-8">
              <Link href="/" className="bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                Return to Home
              </Link>
            </div>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">Volunteer at Collect-It-Con</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join our amazing team of volunteers and help make Collect-It-Con an unforgettable experience for everyone! 
            Volunteers are the heart of our convention and we couldn&apos;t do it without you.
          </p>
        </div>

        {/* Benefits Section */}
        <div className="rounded-2xl p-8 mb-12 text-white" style={{
          background: 'linear-gradient(90deg, #7c3aed 0%, #9333ea 100%)',
          backgroundImage: 'linear-gradient(90deg, #7c3aed 0%, #9333ea 100%)'
        }}>
          <h2 className="text-2xl font-bold mb-6 text-center">Volunteer Benefits</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-2">🎫</div>
              <h3 className="font-semibold mb-1">Free Convention Pass</h3>
              <p className="text-sm text-white" style={{ opacity: 0.9, color: 'rgba(255, 255, 255, 0.9)' }}>Full access to all convention activities</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">👕</div>
              <h3 className="font-semibold mb-1">Volunteer T-Shirt</h3>
              <p className="text-sm text-white" style={{ opacity: 0.9, color: 'rgba(255, 255, 255, 0.9)' }}>Exclusive volunteer merchandise</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🍕</div>
              <h3 className="font-semibold mb-1">Meals Provided</h3>
              <p className="text-sm text-white" style={{ opacity: 0.9, color: 'rgba(255, 255, 255, 0.9)' }}>Free meals during your volunteer shifts</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🤝</div>
              <h3 className="font-semibold mb-1">Community</h3>
              <p className="text-sm text-white" style={{ opacity: 0.9, color: 'rgba(255, 255, 255, 0.9)' }}>Meet amazing people and make lasting friendships</p>
            </div>
          </div>
        </div>

        {/* Volunteer Opportunities */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">Volunteer Opportunities</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {volunteerOpportunities.map((opportunity) => (
              <div key={opportunity.id} className="bg-card-bg border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-primary">{opportunity.title}</h3>
                  <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full">
                    {opportunity.category}
                  </span>
                </div>
                <p className="text-gray-600 mb-4 text-sm">{opportunity.description}</p>
                
                <div className="mb-4">
                  <h4 className="font-medium text-primary mb-2 text-sm">Requirements:</h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {opportunity.requirements.map((req, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-accent mr-1">•</span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-4">
                  <h4 className="font-medium text-primary mb-2 text-sm">Benefits:</h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {opportunity.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-success mr-1">✓</span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="text-sm">
                  <span className="font-medium text-primary">Time Commitment: </span>
                  <span className="text-gray-600">{opportunity.timeCommitment}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Application Form */}
        <div className="bg-card-bg border border-border rounded-lg p-8">
          <h2 className="text-2xl font-bold text-primary mb-6 text-center">Volunteer Application</h2>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-semibold text-primary mb-4">Personal Information</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-accent focus:border-accent ${
                      errors.firstName ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-accent focus:border-accent ${
                      errors.lastName ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-accent focus:border-accent ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-accent focus:border-accent ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                    Age *
                  </label>
                  <input
                    type="number"
                    id="age"
                    min="16"
                    value={formData.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-accent focus:border-accent ${
                      errors.age ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age}</p>}
                  <p className="text-xs text-gray-500 mt-1">Must be at least 16 years old</p>
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div>
              <h3 className="text-lg font-semibold text-primary mb-4">Emergency Contact</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="emergencyContact" className="block text-sm font-medium text-gray-700 mb-1">
                    Emergency Contact Name *
                  </label>
                  <input
                    type="text"
                    id="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-accent focus:border-accent ${
                      errors.emergencyContact ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.emergencyContact && <p className="text-red-500 text-xs mt-1">{errors.emergencyContact}</p>}
                </div>

                <div>
                  <label htmlFor="emergencyPhone" className="block text-sm font-medium text-gray-700 mb-1">
                    Emergency Contact Phone *
                  </label>
                  <input
                    type="tel"
                    id="emergencyPhone"
                    value={formData.emergencyPhone}
                    onChange={(e) => handleInputChange('emergencyPhone', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-accent focus:border-accent ${
                      errors.emergencyPhone ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.emergencyPhone && <p className="text-red-500 text-xs mt-1">{errors.emergencyPhone}</p>}
                </div>
              </div>
            </div>

            {/* Availability */}
            <div>
              <h3 className="text-lg font-semibold text-primary mb-4">Availability *</h3>
              <p className="text-sm text-gray-600 mb-4">Select all times you&apos;re available to volunteer:</p>
              <div className="grid md:grid-cols-2 gap-3">
                {availabilityOptions.map((option) => (
                  <label key={option} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.availability.includes(option)}
                      onChange={(e) => handleCheckboxChange('availability', option, e.target.checked)}
                      className="mr-3 h-4 w-4 text-accent focus:ring-accent border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
              {errors.availability && <p className="text-red-500 text-xs mt-2">{errors.availability}</p>}
            </div>

            {/* Motivation */}
            <div>
              <h3 className="text-lg font-semibold text-primary mb-4">Tell Us About Yourself</h3>
              <div>
                <label htmlFor="motivation" className="block text-sm font-medium text-gray-700 mb-1">
                  Why do you want to volunteer? *
                </label>
                <textarea
                  id="motivation"
                  rows={4}
                  value={formData.motivation}
                  onChange={(e) => handleInputChange('motivation', e.target.value)}
                  placeholder="Tell us what motivates you to volunteer at Collect-It-Con..."
                  className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-accent focus:border-accent ${
                    errors.motivation ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.motivation && <p className="text-red-500 text-xs mt-1">{errors.motivation}</p>}
              </div>
            </div>

            {/* Terms and Conditions */}
            <div>
              <h3 className="text-lg font-semibold text-primary mb-4">Terms and Conditions</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={(e) => handleInputChange('acceptTerms', e.target.checked)}
                    className="mt-1 mr-3 h-4 w-4 text-accent focus:ring-accent border-gray-300 rounded"
                  />
                  <label htmlFor="acceptTerms" className="text-sm text-gray-700">
                    I understand and agree to the volunteer terms and conditions, including:
                    <ul className="mt-2 ml-4 text-xs text-gray-600 space-y-1">
                      <li>• Following all convention rules and policies</li>
                      <li>• Maintaining a professional and friendly demeanor</li>
                      <li>• Completing assigned shifts and responsibilities</li>
                      <li>• Respecting attendees, staff, and fellow volunteers</li>
                    </ul>
                  </label>
                </div>
                {errors.acceptTerms && <p className="text-red-500 text-xs">{errors.acceptTerms}</p>}

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="acceptBackground"
                    checked={formData.acceptBackground}
                    onChange={(e) => handleInputChange('acceptBackground', e.target.checked)}
                    className="mt-1 mr-3 h-4 w-4 text-accent focus:ring-accent border-gray-300 rounded"
                  />
                  <label htmlFor="acceptBackground" className="text-sm text-gray-700">
                    I consent to a background check if required for my volunteer position (security roles require background checks) *
                  </label>
                </div>
                {errors.acceptBackground && <p className="text-red-500 text-xs">{errors.acceptBackground}</p>}
              </div>
            </div>

            {/* Error Message */}
            {submitError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-red-400 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 className="text-sm font-medium text-red-800">Submission Error</h3>
                    <p className="text-sm text-red-700 mt-1">{submitError}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="
                  bg-accent hover:bg-accent/90 disabled:bg-gray-400 text-white font-medium 
                  py-3 px-8 rounded-lg transition-colors duration-200 
                  focus:ring-2 focus:ring-accent focus:ring-offset-2
                  disabled:cursor-not-allowed
                "
              >
                {isSubmitting ? 'Submitting Application...' : 'Submit Volunteer Application'}
              </button>
            </div>
          </form>
        </div>

        {/* Additional Information */}
        <div className="mt-12 bg-slate-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-primary mb-6 text-center">Volunteer Schedule & Information</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-primary mb-4">Convention Schedule</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="font-medium">Friday Setup</span>
                  <span className="text-gray-600">2:00 PM - 8:00 PM</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="font-medium">Saturday</span>
                  <span className="text-gray-600">8:00 AM - 10:00 PM</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="font-medium">Sunday</span>
                  <span className="text-gray-600">8:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-medium">Sunday Teardown</span>
                  <span className="text-gray-600">6:00 PM - 10:00 PM</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-primary mb-4">What to Expect</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-accent mr-2">•</span>
                  Volunteer orientation before your first shift
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">•</span>
                  Clear instructions and support from staff
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">•</span>
                  Breaks and meal times scheduled
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">•</span>
                  Opportunity to enjoy the convention during off-hours
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">•</span>
                  Recognition and appreciation from the community
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">
              Questions about volunteering? Contact our volunteer coordinator:
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:volunteers@collect-it-con.com" className="text-accent hover:underline">
                volunteers@collect-it-con.com
              </a>
              <span className="hidden sm:inline text-gray-400">|</span>
              <a href="tel:+1-555-0123" className="text-accent hover:underline">
                (555) 012-3456
              </a>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}