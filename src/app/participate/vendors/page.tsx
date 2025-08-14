'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PageLayout } from '@/components/layout';

interface VendorFormData {
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  website: string;
  businessType: string;
  description: string;
  products: string[];
  acceptTerms: boolean;
  acceptPolicies: boolean;
}



const productCategories = [
  'Trading Card Games (TCG)',
  'Sports Cards',
  'Gaming Accessories',
  'Collectible Figures',
  'Board Games',
  'Card Sleeves & Protection',
  'Display Cases',
  'Vintage Cards',
  'Graded Cards',
  'Card Grading Services',
  'Gaming Supplies',
  'Memorabilia',
  'Other Collectibles'
];

const businessTypes = [
  'Card Shop/Retail Store',
  'Online Retailer',
  'Individual Collector/Seller',
  'Grading Service',
  'Gaming Company',
  'Distributor',
  'Artist/Creator',
  'Service Provider',
  'Other'
];

export default function VendorsPage() {
  const [formData, setFormData] = useState<VendorFormData>({
    businessName: '',
    contactName: '',
    email: '',
    phone: '',
    website: '',
    businessType: '',
    description: '',
    products: [],
    acceptTerms: false,
    acceptPolicies: false
  });

  const [errors, setErrors] = useState<Partial<Record<keyof VendorFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleInputChange = (field: keyof VendorFormData, value: string | boolean | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleCheckboxChange = (field: 'products', value: string, checked: boolean) => {
    const currentArray = formData[field] as string[];
    const newArray = checked 
      ? [...currentArray, value]
      : currentArray.filter(item => item !== value);
    
    handleInputChange(field, newArray);
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof VendorFormData, string>> = {};

    // Required fields validation
    if (!formData.businessName.trim()) newErrors.businessName = 'Business name is required';
    if (!formData.contactName.trim()) newErrors.contactName = 'Contact name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.businessType.trim()) newErrors.businessType = 'Business type is required';
    if (!formData.description.trim()) newErrors.description = 'Business description is required';


    // Email validation
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation
    if (formData.phone && !/^\+?[\d\s\-\(\)]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    // Array validations
    if (formData.products.length === 0) {
      newErrors.products = 'Please select at least one product category';
    }

    // Terms acceptance
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the vendor terms and conditions';
    }

    if (!formData.acceptPolicies) {
      newErrors.acceptPolicies = 'You must accept the vendor policies';
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
      // Send vendor application via email
      const response = await fetch('/api/vendor-application', {
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
      console.error('Vendor application error:', error);
      setSubmitError('There was an error submitting your application. Please try again or contact us directly at vendors@collect-it-con.com');
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
              Thank you for your interest in becoming a vendor at Collect-It-Con! We&apos;ll review your application and get back to you within 5-7 business days with pricing and next steps.
            </p>
            <div className="bg-card-bg border border-border rounded-lg p-6 text-left max-w-2xl mx-auto">
              <h3 className="font-semibold text-primary mb-3">What happens next?</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-accent mr-2">1.</span>
                  We&apos;ll review your application and booth requirements
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">2.</span>
                  You&apos;ll receive an email with pricing and package details
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">3.</span>
                  Once approved, we&apos;ll send booth assignment and setup information
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">4.</span>
                  You&apos;ll receive your vendor packet with all event details
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
          <h1 className="text-4xl font-bold text-primary mb-4">Become a Vendor at Collect-It-Con</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join our community of passionate vendors and showcase your products to collectors, gamers, and enthusiasts. 
            Be part of the premier TCG and sports card convention experience!
          </p>
        </div>

        {/* Benefits Section */}
        <div className="bg-gradient-to-r from-purple-600 to-accent rounded-2xl p-8 mb-12 text-white">
          <h2 className="text-2xl font-bold mb-6 text-center">Vendor Benefits</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-2">🎯</div>
              <h3 className="font-semibold mb-1">Targeted Audience</h3>
              <p className="text-sm opacity-90">Reach passionate collectors and gamers</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🏪</div>
              <h3 className="font-semibold mb-1">Professional Setup</h3>
              <p className="text-sm opacity-90">Quality booth spaces with amenities</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🤝</div>
              <h3 className="font-semibold mb-1">Networking</h3>
              <p className="text-sm opacity-90">Connect with other vendors and industry professionals</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">📈</div>
              <h3 className="font-semibold mb-1">Growth Opportunity</h3>
              <p className="text-sm opacity-90">Expand your customer base and brand recognition</p>
            </div>
          </div>
        </div>



        {/* Vendor Requirements */}
        <div className="mb-12 bg-slate-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-primary mb-6 text-center">Vendor Requirements & Guidelines</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-primary mb-4">Requirements</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-accent mr-2">•</span>
                  Valid business license or tax ID
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">•</span>
                  General liability insurance (minimum $1M)
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">•</span>
                  Products must align with convention theme
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">•</span>
                  Professional presentation and customer service
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">•</span>
                  Compliance with all local and state regulations
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-primary mb-4">Setup & Resources</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-success mr-2">✓</span>
                  Setup begins Friday morning
                </li>
                <li className="flex items-start">
                  <span className="text-success mr-2">✓</span>
                  Dedicated vendor parking available
                </li>
                <li className="flex items-start">
                  <span className="text-success mr-2">✓</span>
                  Security provided during event hours
                </li>
                <li className="flex items-start">
                  <span className="text-success mr-2">✓</span>
                  Vendor handbook with detailed instructions
                </li>
                <li className="flex items-start">
                  <span className="text-success mr-2">✓</span>
                  On-site support staff available
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Application Form */}
        <div className="bg-card-bg border border-border rounded-lg p-8">
          <h2 className="text-2xl font-bold text-primary mb-6 text-center">Vendor Application</h2>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Business Information */}
            <div>
              <h3 className="text-lg font-semibold text-primary mb-4">Business Information</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-1">
                    Business Name *
                  </label>
                  <input
                    type="text"
                    id="businessName"
                    value={formData.businessName}
                    onChange={(e) => handleInputChange('businessName', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-accent focus:border-accent ${
                      errors.businessName ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.businessName && <p className="text-red-500 text-xs mt-1">{errors.businessName}</p>}
                </div>

                <div>
                  <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Name *
                  </label>
                  <input
                    type="text"
                    id="contactName"
                    value={formData.contactName}
                    onChange={(e) => handleInputChange('contactName', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-accent focus:border-accent ${
                      errors.contactName ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.contactName && <p className="text-red-500 text-xs mt-1">{errors.contactName}</p>}
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
                  <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                    Website/Social Media
                  </label>
                  <input
                    type="url"
                    id="website"
                    value={formData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent focus:border-accent"
                  />
                </div>

                <div>
                  <label htmlFor="businessType" className="block text-sm font-medium text-gray-700 mb-1">
                    Business Type *
                  </label>
                  <select
                    id="businessType"
                    value={formData.businessType}
                    onChange={(e) => handleInputChange('businessType', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-accent focus:border-accent ${
                      errors.businessType ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select business type</option>
                    {businessTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  {errors.businessType && <p className="text-red-500 text-xs mt-1">{errors.businessType}</p>}
                </div>
              </div>

              <div className="mt-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Business Description *
                </label>
                <textarea
                  id="description"
                  rows={4}
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe your business, what you sell, and what makes you unique..."
                  className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-accent focus:border-accent ${
                    errors.description ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
              </div>
            </div>

            {/* Product Categories */}
            <div>
              <h3 className="text-lg font-semibold text-primary mb-4">Product Categories *</h3>
              <p className="text-sm text-gray-600 mb-4">Select all product categories you plan to sell:</p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                {productCategories.map((category) => (
                  <label key={category} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.products.includes(category)}
                      onChange={(e) => handleCheckboxChange('products', category, e.target.checked)}
                      className="mr-3 h-4 w-4 text-accent focus:ring-accent border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">{category}</span>
                  </label>
                ))}
              </div>
              {errors.products && <p className="text-red-500 text-xs mt-2">{errors.products}</p>}
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
                    I understand and agree to the vendor terms and conditions, including:
                    <ul className="mt-2 ml-4 text-xs text-gray-600 space-y-1">
                      <li>• Payment terms and cancellation policies</li>
                      <li>• Setup and breakdown requirements</li>
                      <li>• Compliance with all convention rules and regulations</li>
                      <li>• Maintaining professional standards throughout the event</li>
                    </ul>
                  </label>
                </div>
                {errors.acceptTerms && <p className="text-red-500 text-xs">{errors.acceptTerms}</p>}

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="acceptPolicies"
                    checked={formData.acceptPolicies}
                    onChange={(e) => handleInputChange('acceptPolicies', e.target.checked)}
                    className="mt-1 mr-3 h-4 w-4 text-accent focus:ring-accent border-gray-300 rounded"
                  />
                  <label htmlFor="acceptPolicies" className="text-sm text-gray-700">
                    I acknowledge that booth assignments are subject to approval and availability, and that pricing will be communicated via email after application review *
                  </label>
                </div>
                {errors.acceptPolicies && <p className="text-red-500 text-xs">{errors.acceptPolicies}</p>}
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
                {isSubmitting ? 'Submitting Application...' : 'Submit Vendor Application'}
              </button>
            </div>
          </form>
        </div>

        {/* Additional Information */}
        <div className="mt-12 bg-slate-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-primary mb-6 text-center">Important Information</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-primary mb-4">Application Process</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li className="flex items-start">
                  <span className="text-accent mr-2">1.</span>
                  Submit your complete application with all required information
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">2.</span>
                  Our team reviews applications within 5-7 business days
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">3.</span>
                  Approved vendors receive pricing and payment instructions via email
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">4.</span>
                  Booth assignments are confirmed upon payment receipt
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">5.</span>
                  Vendor packets with setup details sent 2 weeks before event
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-primary mb-4">Contact Information</h3>
              <div className="space-y-3 text-gray-600 text-sm">
                <p>
                  <strong>Vendor Coordinator:</strong><br />
                  Email: vendors@collect-it-con.com<br />
                  Phone: Available upon request
                </p>
                <p>
                  <strong>Questions?</strong><br />
                  We&apos;re here to help! Contact us with any questions about the application process, booth options, or event details.
                </p>
                <p className="text-xs text-gray-500">
                  Applications are processed in the order received. Early applications receive priority booth placement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}