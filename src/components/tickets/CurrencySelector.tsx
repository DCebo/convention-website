'use client';

import { Currency } from '@/types/tickets';

interface CurrencySelectorProps {
  currencies: Currency[];
  selectedCurrency: Currency;
  onCurrencyChange: (currency: Currency) => void;
}

const CurrencySelector = ({ currencies, selectedCurrency, onCurrencyChange }: CurrencySelectorProps) => {
  return (
    <div className="flex items-center space-x-2">
      <label htmlFor="currency-select" className="text-sm font-medium text-primary">
        Currency:
      </label>
      <select
        id="currency-select"
        value={selectedCurrency.code}
        onChange={(e) => {
          const currency = currencies.find(c => c.code === e.target.value);
          if (currency) onCurrencyChange(currency);
        }}
        className="
          px-3 py-1 border border-border rounded-md bg-white text-primary
          focus:ring-2 focus:ring-accent focus:border-accent
          text-sm font-medium
        "
      >
        {currencies.map((currency) => (
          <option key={currency.code} value={currency.code}>
            {currency.code} ({currency.symbol})
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencySelector;