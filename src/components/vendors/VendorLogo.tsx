import { useState } from 'react';
import Image from 'next/image';
import { VendorCategory } from '@/types/vendors';

interface VendorLogoProps {
  logo?: string;
  name: string;
  category: VendorCategory;
  className?: string;
}

const VendorLogo = ({ logo, name, category, className = '' }: VendorLogoProps) => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getCategoryColor = (category: VendorCategory) => {
    switch (category) {
      case 'TCG Cards': return 'from-blue-500 to-blue-600';
      case 'Sports Cards': return 'from-green-500 to-green-600';
      case 'Gaming Accessories': return 'from-purple-500 to-purple-600';
      case 'Collectibles': return 'from-yellow-500 to-yellow-600';
      case 'Art & Prints': return 'from-pink-500 to-pink-600';
      case 'Apparel': return 'from-indigo-500 to-indigo-600';
      case 'Food & Beverages': return 'from-orange-500 to-orange-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getCategoryIcon = (category: VendorCategory) => {
    switch (category) {
      case 'TCG Cards': return '🎴';
      case 'Sports Cards': return '⚾';
      case 'Gaming Accessories': return '🎮';
      case 'Collectibles': return '🏆';
      case 'Art & Prints': return '🎨';
      case 'Apparel': return '👕';
      case 'Food & Beverages': return '🍕';
      default: return '🏪';
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  // If no logo provided or image failed to load, show fallback
  if (!logo || imageError) {
    return (
      <div className={`relative overflow-hidden rounded-lg ${className}`}>
        <div className={`w-full h-full bg-gradient-to-br ${getCategoryColor(category)} flex items-center justify-center`}>
          <div className="text-center">
            <div className="text-2xl mb-1">{getCategoryIcon(category)}</div>
            <div className="text-white font-bold text-sm">{getInitials(name)}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden rounded-lg bg-white ${className}`}>
      {isLoading && (
        <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryColor(category)} flex items-center justify-center animate-pulse`}>
          <div className="text-white text-xl">{getCategoryIcon(category)}</div>
        </div>
      )}
      <Image
        src={logo}
        alt={`${name} logo`}
        fill
        className={`object-contain transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setImageError(true);
          setIsLoading(false);
        }}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
};

export default VendorLogo;