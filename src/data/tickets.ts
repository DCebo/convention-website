import { TicketType, Currency } from '@/types/tickets'

export const TICKET_TYPES: TicketType[] = [
  {
    id: 'day-pass',
    name: 'Day Pass',
    description: 'Access to the convention for one day',
    price: 25,
    features: [
      'Full day access to vendor hall',
      'Access to TCG tournaments',
      'Sports card trading areas',
      'General programming events',
    ],
  },
  {
    id: 'weekend-pass',
    name: 'Weekend Pass',
    description: 'Full weekend access with premium benefits',
    price: 45,
    features: [
      'Full weekend access to all areas',
      'Priority tournament registration',
      'Exclusive trading sessions',
      'Meet & greet opportunities',
      'Convention swag bag',
    ],
    popular: true,
  },
  {
    id: 'vip-pass',
    name: 'VIP Pass',
    description: 'Premium experience with exclusive access',
    price: 85,
    features: [
      'All weekend pass benefits',
      'VIP lounge access',
      'Early vendor hall access',
      'Reserved seating at events',
      'Exclusive VIP merchandise',
      'Meet & greet with special guests',
      'Complimentary refreshments',
    ],
  },
]

export const CURRENCIES: Currency[] = [
  {
    code: 'USD',
    symbol: '$',
    name: 'US Dollar',
    rate: 1.0,
  },
  {
    code: 'AUD',
    symbol: 'A$',
    name: 'Australian Dollar',
    rate: 1.52,
  },
]

export const TAX_RATE = 0.08
