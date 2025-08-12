import { useState } from 'react';
import { Vendor } from '@/types/vendors';
import VendorLogo from './VendorLogo';

interface VendorListCardProps {
  vendor: Vendor;
  featured?: boolean;
  onShowMap?: (boothNumber: string) => void;
}

const VendorListCard = ({ vendor, featured = false, onShowMap }: VendorListCardProps) => {
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
    <div className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 ${
      featured 
        ? 'ring-2 ring-yellow-400 shadow-yellow-100 bg-gradient-to-r from-white to-yellow-50' 
        : 'hover:border-gray-300 hover:bg-gradient-to-r hover:from-white hover:to-gray-50'
    }`}>
      {/* Featured Badge */}
      {featured && (
        <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-400 text-white px-4 py-1 text-xs font-semibold flex items-center">
          <span className="font-bold">Featured Vendor</span>
          <div className="ml-auto">
            <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping"></div>
          </div>
        </div>
      )}

      <div className="p-4">
        <div className="flex items-start gap-4">
          {/* Vendor Logo */}
          <div className="flex-shrink-0">
            <VendorLogo
              logo={vendor.logo}
              name={vendor.name}
              category={vendor.category}
              className="w-20 h-16 border border-gray-200 shadow-sm"
            />
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              {/* Vendor Info */}
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-gray-800 mb-1 overflow-hidden" style={{
                  display: '-webkit-box',
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: 'vertical'
                }}>{vendor.name}</h3>
                
                <div className="flex items-center gap-2 mb-2">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(vendor.category)}`}>
                    <span className="mr-1">{getCategoryIcon(vendor.category)}</span>
                    {vendor.category}
                  </span>
                </div>
              </div>

              {/* Booth Info */}
              <div className="flex-shrink-0 text-right ml-4">
                <div className="text-xs text-gray-600 mb-1">
                  <span className="font-semibold">Booth:</span>
                </div>
                <button
                  onClick={() => onShowMap?.(vendor.boothNumber)}
                  className="text-primary hover:text-primary/80 font-bold transition-all duration-200 underline text-sm"
                >
                  {vendor.boothNumber}
                </button>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm mb-3 overflow-hidden" style={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical'
            }}>{vendor.description}</p>

            {/* Specialties and Contact Row */}
            <div className="flex items-center justify-between gap-4">
              {/* Specialties */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap gap-1">
                  {displayedSpecialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="bg-gradient-to-r from-blue-100 to-purple-100 text-gray-700 px-2 py-1 rounded-full text-xs border border-blue-200"
                    >
                      {specialty}
                    </span>
                  ))}
                  {hasMoreSpecialties && (
                    <button
                      onClick={() => setShowAllSpecialties(!showAllSpecialties)}
                      className="text-primary hover:text-primary/80 text-xs font-medium transition-all duration-200 bg-primary/10 px-2 py-1 rounded-full hover:bg-primary/20"
                    >
                      {showAllSpecialties 
                        ? '← Less' 
                        : `+${vendor.specialties.length - 3}`
                      }
                    </button>
                  )}
                </div>
              </div>

              {/* Contact Info */}
              <div className="flex-shrink-0 flex items-center gap-4 text-lg">
                {vendor.contact.email && (
                  <a 
                    href={`mailto:${vendor.contact.email}`}
                    className="text-gray-500 hover:text-primary transition-colors hover:scale-110 transform"
                    title="Email"
                  >
                    📧
                  </a>
                )}
                {vendor.contact.phone && (
                  <a 
                    href={`tel:${vendor.contact.phone}`}
                    className="text-gray-500 hover:text-primary transition-colors hover:scale-110 transform"
                    title="Phone"
                  >
                    📞
                  </a>
                )}
                {vendor.contact.website && (
                  <a 
                    href={vendor.contact.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-primary transition-colors hover:scale-110 transform"
                    title="Website"
                  >
                    🌐
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorListCard;