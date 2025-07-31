'use client';

interface QuantitySelectorProps {
  quantity: number;
  price?: number;
  currencySymbol?: string;
  onQuantityChange: (quantity: number) => void;
}

const QuantitySelector = ({ quantity, price = 0, currencySymbol = '$', onQuantityChange }: QuantitySelectorProps) => {
  const handleDecrease = () => {
    if (quantity > 0) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrease = () => {
    onQuantityChange(quantity + 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    if (value >= 0) {
      onQuantityChange(value);
    }
  };

  return (
    <div className="flex flex-col space-y-3">
      <label className="text-sm font-medium text-primary">
        Quantity
      </label>
      
      <div className="flex items-center justify-center space-x-3">
        <button
          type="button"
          onClick={handleDecrease}
          disabled={quantity <= 0}
          className="
            w-10 h-10 rounded-full border border-border bg-white
            flex items-center justify-center text-primary font-medium
            hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed
            transition-colors duration-200
          "
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </button>

        <input
          type="number"
          min="0"
          value={quantity}
          onChange={handleInputChange}
          className="
            w-16 h-10 text-center border border-border rounded-md
            focus:ring-2 focus:ring-accent focus:border-accent
            text-primary font-medium
          "
        />

        <button
          type="button"
          onClick={handleIncrease}
          className="
            w-10 h-10 rounded-full border border-border bg-white
            flex items-center justify-center text-primary font-medium
            hover:bg-gray-50 transition-colors duration-200
          "
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
      </div>

      {quantity > 0 && price > 0 && (
        <div className="text-center">
          <span className="text-sm text-gray-600">
            Subtotal: <span className="font-semibold text-primary">{currencySymbol}{(quantity * price).toFixed(2)}</span>
          </span>
        </div>
      )}
    </div>
  );
};

export default QuantitySelector;