import { useState } from 'react';
import { Vendor } from '@/types/vendors';
import VendorLogo from './VendorLogo';

interface VendorCardProps {
  vendor: Vendor;
  featured?: boolean;
  onShowMap?: (boothNumber: string) => void;
}

const VendorCard = ({ vendor, featured = false, onShowMap }: VendorCardProps) => {
  const [showAllSpecialties, setShowAllSpecialties] = useState(false);
  const getCategoryIcon = (category: string) => {
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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'TCG Cards': return 'bg-blue-100 text-blue-800';
      case 'Sports Cards': return 'bg-green-100 text-green-800';
      case 'Gaming Accessories': return 'bg-purple-100 text-purple-800';
      case 'Collectibles': return 'bg-yellow-100 text-yellow-800';
      case 'Art & Prints': return 'bg-pink-100 text-pink-800';
      case 'Apparel': return 'bg-indigo-100 text-indigo-800';
      case 'Food & Beverages': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const displayedSpecialties = showAllSpecialties ? vendor.specialties : vendor.specialties.slice(0, 3);
  const hasMoreSpecialties = vendor.specialties.length > 3;

  return (
    <div className={`bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col h-full min-h-[420px] border border-gray-100 ${
      featured 
        ? 'ring-2 ring-yellow-400 shadow-yellow-100 transform hover:scale-105 bg-gradient-to-br from-white to-yellow-50' 
        : 'hover:scale-102 hover:border-gray-200 hover:bg-gradient-to-br hover:from-white hover:to-gray-50'
    }`}>
      {/* Featured Badge */}
      {featured && (
        <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-400 text-white px-4 py-2 text-sm font-semibold flex items-center shadow-lg">
          <span className="font-bold">Featured Vendor</span>
          <div className="ml-auto">
            <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
          </div>
        </div>
      )}

      <div className="p-4 flex flex-col h-full">
        {/* Logo and Header Section - Fixed Height */}
        <div className="mb-3 h-20 flex gap-3">
          {/* Vendor Logo */}
          <div className="flex-shrink-0">
            <VendorLogo
              logo={vendor.logo}
              name={vendor.name}
              category={vendor.category}
              className="w-16 h-16 border border-gray-200 shadow-sm"
            />
          </div>
          
          {/* Header Info */}
          <div className="flex-1 flex flex-col min-w-0">
            <h3 className="text-lg font-bold text-gray-800 leading-tight overflow-hidden mb-1" style={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical'
            }}>{vendor.name}</h3>
            <div className="flex items-center">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(vendor.category)}`}>
                <span className="mr-1">{getCategoryIcon(vendor.category)}</span>
                {vendor.category}
              </span>
            </div>
          </div>
        </div>

        {/* Description - Fixed Height */}
        <div className="mb-3 h-16 overflow-hidden">
          <p className="text-gray-600 text-xs leading-relaxed overflow-hidden" style={{
            display: '-webkit-box',
            WebkitLineClamp: 4,
            WebkitBoxOrient: 'vertical'
          }}>{vendor.description}</p>
        </div>

        {/* Specialties - Fixed Height */}
        <div className="mb-3 h-18">
          <h4 className="text-xs font-semibold text-gray-800 mb-1 flex items-center">
            <span className="mr-1">✨</span>
            Specialties:
          </h4>
          <div className="flex flex-wrap gap-1 h-12 overflow-hidden">
            {displayedSpecialties.map((specialty, index) => (
              <span
                key={index}
                className="bg-gradient-to-r from-blue-100 to-purple-100 text-gray-700 px-2 py-1 rounded-full text-xs h-fit border border-blue-200 hover:scale-105 transition-transform duration-200"
              >
                {specialty}
              </span>
            ))}
            {hasMoreSpecialties && (
              <button
                onClick={() => setShowAllSpecialties(!showAllSpecialties)}
                className="text-primary hover:text-primary/80 text-xs font-medium transition-all duration-200 h-fit bg-primary/10 px-2 py-1 rounded-full hover:bg-primary/20"
              >
                {showAllSpecialties 
                  ? '← Show less' 
                  : `+${vendor.specialties.length - 3} more →`
                }
              </button>
            )}
          </div>
        </div>

        {/* Booth Information - Fixed Height */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg p-3 mb-3 h-16 border border-gray-200">
          <div className="grid grid-cols-2 gap-2 text-xs h-full">
            <div className="flex flex-col justify-center">
              <span className="font-semibold text-gray-700 flex items-center">
                <span className="mr-1">🏪</span>
                Booth:
              </span>
              <button
                onClick={() => onShowMap?.(vendor.boothNumber)}
                className="text-primary hover:text-primary/80 font-bold transition-all duration-200 underline text-left hover:scale-105 transform"
              >
                {vendor.boothNumber}
              </button>
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-semibold text-gray-700 flex items-center">
                <span className="mr-1">📍</span>
                Location:
              </span>
              <p className="text-gray-600 text-xs leading-tight">{vendor.location}</p>
            </div>
          </div>
        </div>

        {/* Contact Information - Fixed Height, Bottom Aligned */}
        <div className="border-t pt-3 mt-auto h-36">
          <h4 className="text-xs font-semibold text-gray-800 mb-2">Contact Info:</h4>
          <div className="space-y-1 h-18 overflow-hidden">
            {vendor.contact.email && (
              <div className="flex items-center text-xs">
                <span className="mr-1">📧</span>
                <a 
                  href={`mailto:${vendor.contact.email}`}
                  className="text-primary hover:text-primary/80 transition-colors truncate"
                >
                  {vendor.contact.email}
                </a>
              </div>
            )}
            {vendor.contact.phone && (
              <div className="flex items-center text-xs">
                <span className="mr-1">📞</span>
                <a 
                  href={`tel:${vendor.contact.phone}`}
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  {vendor.contact.phone}
                </a>
              </div>
            )}
            {vendor.contact.website && (
              <div className="flex items-center text-xs">
                <span className="mr-1">🌐</span>
                <a 
                  href={vendor.contact.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  Visit Website
                </a>
              </div>
            )}
          </div>

          {/* Social Media Links - Fixed Position */}
          {vendor.contact.social && (
            <div className="flex items-center space-x-2 mt-2 pt-2 border-t h-10">
              {vendor.contact.social.facebook && (
                <a
                  href={`https://facebook.com/${vendor.contact.social.facebook}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-500 transition-colors"
                  aria-label="Facebook"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              )}
              {vendor.contact.social.twitter && (
                <a
                  href={`https://twitter.com/${vendor.contact.social.twitter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                  aria-label="Twitter"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
              )}
              {vendor.contact.social.instagram && (
                <a
                  href={`https://instagram.com/${vendor.contact.social.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-600 hover:text-pink-500 transition-colors"
                  aria-label="Instagram"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323C5.902 8.198 7.053 7.708 8.35 7.708s2.448.49 3.323 1.297c.897.875 1.387 2.026 1.387 3.323s-.49 2.448-1.297 3.323c-.875.897-2.026 1.387-3.323 1.387zm7.718 0c-1.297 0-2.448-.49-3.323-1.297-.897-.875-1.387-2.026-1.387-3.323s.49-2.448 1.297-3.323c.875-.897 2.026-1.387 3.323-1.387s2.448.49 3.323 1.297c.897.875 1.387 2.026 1.387 3.323s-.49 2.448-1.297 3.323c-.875.897-2.026 1.387-3.323 1.387z"/>
                  </svg>
                </a>
              )}
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default VendorCard;