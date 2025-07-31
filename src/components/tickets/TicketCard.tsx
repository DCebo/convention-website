'use client';

import { TicketType } from '@/types/tickets';
import QuantitySelector from './QuantitySelector';

interface TicketCardProps {
  ticket: TicketType;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  currencySymbol?: string;
}

const TicketCard = ({ ticket, quantity, onQuantityChange, currencySymbol = '$' }: TicketCardProps) => {
  return (
    <div className={`
      relative bg-card-bg border border-border rounded-lg p-6 shadow-sm h-full flex flex-col
      ${ticket.popular ? 'ring-2 ring-accent border-accent' : ''}
      transition-all duration-200 hover:shadow-md
    `}>
      {ticket.popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-accent text-white px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap">
            Most Popular
          </span>
        </div>
      )}

      <div className="text-center mb-4">
        <h3 className="text-xl font-semibold text-primary mb-2">
          {ticket.name}
        </h3>
        <p className="text-gray-600 text-sm mb-4">
          {ticket.description}
        </p>
        <div className="text-3xl font-bold text-primary">
          {currencySymbol}{ticket.price.toFixed(2)}
        </div>
      </div>

      <div className="flex-grow mb-6">
        <h4 className="font-medium text-primary mb-3">What&apos;s included:</h4>
        <ul className="space-y-2">
          {ticket.features.map((feature, index) => (
            <li key={index} className="flex items-start text-sm text-gray-600">
              <svg 
                className="w-4 h-4 text-success mt-0.5 mr-2 flex-shrink-0" 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path 
                  fillRule="evenodd" 
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                  clipRule="evenodd" 
                />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-border pt-4 mt-auto">
        <QuantitySelector
          quantity={quantity}
          price={ticket.price}
          currencySymbol={currencySymbol}
          onQuantityChange={onQuantityChange}
        />
      </div>
    </div>
  );
};

export default TicketCard;