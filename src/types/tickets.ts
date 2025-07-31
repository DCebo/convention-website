export interface TicketType {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  popular?: boolean;
  maxQuantity?: number;
}

export interface TicketSelection {
  ticketType: TicketType;
  quantity: number;
}

export interface CartItem extends TicketSelection {
  subtotal: number;
}

export interface CartSummary {
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
}

export interface Currency {
  code: string;
  symbol: string;
  name: string;
  rate: number; // Exchange rate relative to USD
}