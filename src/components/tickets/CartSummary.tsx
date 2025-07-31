'use client';

import { CartSummary } from '@/types/tickets';

interface CartSummaryProps {
  cartSummary: CartSummary;
  hasItems: boolean;
  currencySymbol?: string;
  onProceedToCheckout?: () => void;
}

const CartSummaryComponent = ({ cartSummary, hasItems, currencySymbol = '$', onProceedToCheckout }: CartSummaryProps) => {
  if (!hasItems) {
    return (
      <div className="bg-card-bg border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-primary mb-4">
          Order Summary
        </h3>
        <div className="text-center py-8">
          <svg 
            className="w-12 h-12 text-gray-300 mx-auto mb-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5M7 13l-1.1 5m0 0h9.2M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6" 
            />
          </svg>
          <p className="text-gray-500 text-sm">
            Select tickets to see your order summary
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card-bg border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-primary mb-4">
        Order Summary
      </h3>

      <div className="space-y-4 mb-6">
        {cartSummary.items.map((item) => (
          <div key={item.ticketType.id} className="flex justify-between items-start">
            <div className="flex-1">
              <h4 className="font-medium text-primary text-sm">
                {item.ticketType.name}
              </h4>
              <p className="text-xs text-gray-500">
                {currencySymbol}{item.ticketType.price.toFixed(2)} × {item.quantity}
              </p>
            </div>
            <div className="text-sm font-medium text-primary">
              {currencySymbol}{item.subtotal.toFixed(2)}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-border pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="text-primary">{currencySymbol}{cartSummary.subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Tax (8%)</span>
          <span className="text-primary">{currencySymbol}{cartSummary.tax.toFixed(2)}</span>
        </div>
        
        <div className="border-t border-border pt-2">
          <div className="flex justify-between text-lg font-semibold">
            <span className="text-primary">Total</span>
            <span className="text-primary">{currencySymbol}{cartSummary.total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <button
        onClick={onProceedToCheckout}
        className="
          w-full mt-6 bg-accent hover:bg-accent/90 text-white font-medium py-3 px-4 rounded-lg
          transition-colors duration-200 focus:ring-2 focus:ring-accent focus:ring-offset-2
          disabled:bg-gray-400 disabled:cursor-not-allowed
        "
        disabled={!hasItems}
      >
        Proceed to Checkout
      </button>

      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500">
          Secure checkout powered by industry-standard encryption
        </p>
      </div>
    </div>
  );
};

export default CartSummaryComponent;