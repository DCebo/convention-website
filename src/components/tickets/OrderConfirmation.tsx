'use client';

import Link from 'next/link';
import { CartSummary } from '@/types/tickets';
import { CheckoutFormData } from './CheckoutForm';

interface OrderConfirmationProps {
  orderNumber: string;
  cartSummary: CartSummary;
  customerInfo: CheckoutFormData;
  currencySymbol: string;
  onNewOrder: () => void;
}

const OrderConfirmation = ({ 
  orderNumber, 
  cartSummary, 
  customerInfo, 
  currencySymbol, 
  onNewOrder 
}: OrderConfirmationProps) => {
  const orderDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Success Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-primary mb-2">Order Confirmed!</h1>
        <p className="text-lg text-gray-600">
          Thank you for your purchase. Your convention passes are confirmed.
        </p>
      </div>

      {/* Order Details Card */}
      <div className="bg-card-bg border border-border rounded-lg p-6 mb-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-xl font-semibold text-primary mb-2">Order Details</h2>
            <div className="text-sm text-gray-600 space-y-1">
              <p><strong>Order Number:</strong> {orderNumber}</p>
              <p><strong>Order Date:</strong> {orderDate}</p>
              <p><strong>Customer:</strong> {customerInfo.firstName} {customerInfo.lastName}</p>
              <p><strong>Email:</strong> {customerInfo.email}</p>
            </div>
          </div>
          <button
            onClick={handlePrint}
            className="flex items-center text-accent hover:text-accent/80 transition-colors text-sm"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print Receipt
          </button>
        </div>

        {/* Purchased Items */}
        <div className="border-t border-border pt-6">
          <h3 className="text-lg font-semibold text-primary mb-4">Your Convention Passes</h3>
          
          <div className="space-y-4 mb-6">
            {cartSummary.items.map((item) => (
              <div key={item.ticketType.id} className="flex justify-between items-start p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-primary">
                    {item.ticketType.name}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {item.ticketType.description}
                  </p>
                  <div className="mt-2">
                    <span className="text-sm text-gray-500">
                      Quantity: {item.quantity} × {currencySymbol}{item.ticketType.price.toFixed(2)}
                    </span>
                  </div>
                  
                  {/* Features */}
                  <div className="mt-2">
                    <p className="text-xs text-gray-500 mb-1">Includes:</p>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {item.ticketType.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <svg className="w-3 h-3 text-green-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold text-primary">
                    {currencySymbol}{item.subtotal.toFixed(2)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Total */}
          <div className="border-t border-border pt-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-primary">{currencySymbol}{cartSummary.subtotal.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax (8%)</span>
                <span className="text-primary">{currencySymbol}{cartSummary.tax.toFixed(2)}</span>
              </div>
              
              <div className="border-t border-border pt-2">
                <div className="flex justify-between text-xl font-bold">
                  <span className="text-primary">Total Paid</span>
                  <span className="text-primary">{currencySymbol}{cartSummary.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Important Information */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">What&apos;s Next?</h3>
          <ul className="text-sm text-blue-800 space-y-2">
            <li className="flex items-start">
              <svg className="w-4 h-4 text-blue-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              A confirmation email has been sent to {customerInfo.email}
            </li>
            <li className="flex items-start">
              <svg className="w-4 h-4 text-blue-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Your digital passes will be available 48 hours before the event
            </li>
            <li className="flex items-start">
              <svg className="w-4 h-4 text-blue-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Bring a valid ID and this confirmation to the event
            </li>
          </ul>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-amber-900 mb-3">Important Reminders</h3>
          <ul className="text-sm text-amber-800 space-y-2">
            <li className="flex items-start">
              <svg className="w-4 h-4 text-amber-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              Passes are non-refundable and non-transferable
            </li>
            <li className="flex items-start">
              <svg className="w-4 h-4 text-amber-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              Check our website for the latest event updates
            </li>
            <li className="flex items-start">
              <svg className="w-4 h-4 text-amber-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              Contact us if you have any questions or concerns
            </li>
          </ul>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-card-bg border border-border rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-primary mb-3 text-center">Need Help?</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-primary mb-2">Customer Support</h4>
            <p className="text-sm text-gray-600 mb-1">
              Email: support@convention.com
            </p>
            <p className="text-sm text-gray-600">
              Phone: (555) 123-4567
            </p>
          </div>
          <div>
            <h4 className="font-medium text-primary mb-2">Event Information</h4>
            <p className="text-sm text-gray-600 mb-1">
              Visit our website for schedules and updates
            </p>
            <p className="text-sm text-gray-600">
              Follow us on social media for announcements
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={onNewOrder}
          className="bg-accent hover:bg-accent/90 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-accent focus:ring-offset-2"
        >
          Purchase More Passes
        </button>
        
        <Link
          href="/"
          className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-6 rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-center"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmation;