'use client';

import { useState } from 'react';
import { CartSummary, Currency } from '@/types/tickets';
import { TICKET_TYPES, TAX_RATE, CURRENCIES } from '@/data/tickets';
import TicketCard from './TicketCard';
import CartSummaryComponent from './CartSummary';
import CurrencySelector from './CurrencySelector';
import CheckoutForm, { CheckoutFormData } from './CheckoutForm';
import OrderConfirmation from './OrderConfirmation';

type PurchaseStep = 'selection' | 'checkout' | 'confirmation';

const TicketPurchase = () => {
  const [selections, setSelections] = useState<Record<string, number>>({});
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(CURRENCIES[0]);
  const [currentStep, setCurrentStep] = useState<PurchaseStep>('selection');
  const [orderNumber, setOrderNumber] = useState<string>('');
  const [customerInfo, setCustomerInfo] = useState<CheckoutFormData | null>(null);

  const updateQuantity = (ticketId: string, quantity: number) => {
    setSelections(prev => ({
      ...prev,
      [ticketId]: quantity
    }));
  };

  const calculateCartSummary = (): CartSummary => {
    const items = Object.entries(selections)
      .filter(([, quantity]) => quantity > 0)
      .map(([ticketId, quantity]) => {
        const ticketType = TICKET_TYPES.find(t => t.id === ticketId)!;
        const convertedPrice = ticketType.price * selectedCurrency.rate;
        const subtotal = convertedPrice * quantity;
        return {
          ticketType: {
            ...ticketType,
            price: convertedPrice
          },
          quantity,
          subtotal
        };
      });

    const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);
    const tax = subtotal * TAX_RATE;
    const total = subtotal + tax;

    return {
      items,
      subtotal,
      tax,
      total
    };
  };

  const cartSummary = calculateCartSummary();
  const hasItems = cartSummary.items.length > 0;

  const handleProceedToCheckout = () => {
    if (hasItems) {
      setCurrentStep('checkout');
    }
  };

  const handleBackToSelection = () => {
    setCurrentStep('selection');
  };

  const handleCheckoutSubmit = async (formData: CheckoutFormData) => {
    // Simulate payment processing (placeholder implementation)
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate order number
    const orderNum = `CON-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    
    setOrderNumber(orderNum);
    setCustomerInfo(formData);
    setCurrentStep('confirmation');
  };

  const handleNewOrder = () => {
    setSelections({});
    setCurrentStep('selection');
    setOrderNumber('');
    setCustomerInfo(null);
  };

  // Render different steps
  if (currentStep === 'checkout') {
    return (
      <CheckoutForm
        cartSummary={cartSummary}
        currencySymbol={selectedCurrency.symbol}
        onSubmit={handleCheckoutSubmit}
        onBack={handleBackToSelection}
      />
    );
  }

  if (currentStep === 'confirmation' && customerInfo) {
    return (
      <OrderConfirmation
        orderNumber={orderNumber}
        cartSummary={cartSummary}
        customerInfo={customerInfo}
        currencySymbol={selectedCurrency.symbol}
        onNewOrder={handleNewOrder}
      />
    );
  }

  return (
    <div className="grid xl:grid-cols-4 gap-8">
      {/* Ticket Selection */}
      <div className="xl:col-span-3">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-primary flex-1 text-center">
            Select Your Passes
          </h2>
          <CurrencySelector
            currencies={CURRENCIES}
            selectedCurrency={selectedCurrency}
            onCurrencyChange={setSelectedCurrency}
          />
        </div>
        
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {TICKET_TYPES.map((ticket) => {
            const convertedPrice = ticket.price * selectedCurrency.rate;
            return (
              <TicketCard
                key={ticket.id}
                ticket={{
                  ...ticket,
                  price: convertedPrice
                }}
                quantity={selections[ticket.id] || 0}
                onQuantityChange={(quantity) => updateQuantity(ticket.id, quantity)}
                currencySymbol={selectedCurrency.symbol}
              />
            );
          })}
        </div>
      </div>

      {/* Cart Summary */}
      <div className="xl:col-span-1">
        <div className="sticky top-8">
          <CartSummaryComponent 
            cartSummary={cartSummary}
            hasItems={hasItems}
            currencySymbol={selectedCurrency.symbol}
            onProceedToCheckout={handleProceedToCheckout}
          />
        </div>
      </div>
    </div>
  );
};

export default TicketPurchase;