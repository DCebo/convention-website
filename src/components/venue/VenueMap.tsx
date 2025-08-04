'use client';

import { useState } from 'react';
import { venueSections, boothPositions } from '@/data/venueMap';
import { vendors } from '@/data/vendors';

interface VenueMapProps {
  highlightedBooth?: string;
  onBoothClick?: (boothId: string) => void;
  className?: string;
}

const VenueMap = ({ highlightedBooth, onBoothClick, className = '' }: VenueMapProps) => {
  const [hoveredBooth, setHoveredBooth] = useState<string | null>(null);

  const getVendorByBoothId = (boothId: string) => {
    const booth = boothPositions.find(b => b.id === boothId);
    if (!booth?.vendorId) return null;
    return vendors.find(v => v.id === booth.vendorId);
  };

  return (
    <div className={`relative bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl overflow-hidden shadow-lg ${className}`}>
      {/* Map Container */}
      <div className="relative w-full h-[600px] bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 rounded-lg">
        {/* Venue Sections */}
        {venueSections.map(section => (
          <div
            key={section.id}
            className="absolute border-2 border-gray-300 rounded-lg flex items-center justify-center text-sm font-semibold text-gray-700 shadow-sm"
            style={{
              left: `${section.x}%`,
              top: `${section.y}%`,
              width: `${section.width}%`,
              height: `${section.height}%`,
              backgroundColor: section.color,
            }}
          >
            <span className="text-center px-2 py-1 bg-white/80 rounded-md shadow-sm">{section.name}</span>
          </div>
        ))}

        {/* Booth Positions */}
        {boothPositions.map(booth => {
          const vendor = getVendorByBoothId(booth.id);
          const isHighlighted = highlightedBooth === booth.id;
          const isHovered = hoveredBooth === booth.id;
          
          return (
            <div
              key={booth.id}
              className={`absolute border-2 rounded-lg cursor-pointer transition-all duration-300 flex items-center justify-center text-sm font-bold shadow-md ${
                isHighlighted 
                  ? 'border-red-500 bg-red-200 z-20 scale-125 shadow-lg animate-pulse' 
                  : isHovered
                  ? 'border-blue-500 bg-blue-200 z-10 scale-110 shadow-lg'
                  : vendor
                  ? 'border-purple-400 bg-purple-100 hover:bg-purple-200 hover:scale-105'
                  : 'border-gray-400 bg-gray-200 hover:bg-gray-300'
              }`}
              style={{
                left: `${booth.x}%`,
                top: `${booth.y}%`,
                width: `${booth.width}%`,
                height: `${booth.height}%`,
              }}
              onMouseEnter={() => setHoveredBooth(booth.id)}
              onMouseLeave={() => setHoveredBooth(null)}
              onClick={() => onBoothClick?.(booth.id)}
              title={vendor ? `${booth.id} - ${vendor.name}` : `${booth.id} - Available`}
            >
              <span className="text-center px-1">
                {booth.id}
              </span>
            </div>
          );
        })}

        {/* Entrance */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl text-lg font-bold shadow-lg">
          🚪 Main Entrance
        </div>

        {/* Legend */}
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-xl border-2 border-gray-200 text-sm">
          <h4 className="font-bold mb-3 text-gray-800 flex items-center">
            <span className="mr-2">📋</span>
            Legend
          </h4>
          <div className="space-y-2">
            <div className="flex items-center">
              <div className="w-5 h-5 border-2 border-purple-400 bg-purple-100 rounded mr-3 shadow-sm"></div>
              <span className="text-gray-700">Occupied Booth</span>
            </div>
            <div className="flex items-center">
              <div className="w-5 h-5 border-2 border-gray-400 bg-gray-200 rounded mr-3 shadow-sm"></div>
              <span className="text-gray-700">Available Booth</span>
            </div>
            {highlightedBooth && (
              <div className="flex items-center">
                <div className="w-5 h-5 border-2 border-red-500 bg-red-200 rounded mr-3 shadow-sm animate-pulse"></div>
                <span className="text-red-700 font-semibold">Selected Booth</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Hovered Booth Info */}
      {hoveredBooth && (
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border-2 border-blue-200 shadow-lg">
          {(() => {
            const vendor = getVendorByBoothId(hoveredBooth);
            return vendor ? (
              <div>
                <h4 className="font-bold text-blue-800 text-lg flex items-center">
                  <span className="mr-2">🏪</span>
                  Booth {hoveredBooth}
                </h4>
                <p className="text-blue-700 font-semibold text-lg">{vendor.name}</p>
                <p className="text-blue-600">{vendor.category}</p>
                <p className="text-sm text-blue-500 mt-1">{vendor.specialties.slice(0, 2).join(', ')}</p>
              </div>
            ) : (
              <div>
                <h4 className="font-bold text-gray-800 text-lg flex items-center">
                  <span className="mr-2">🏪</span>
                  Booth {hoveredBooth}
                </h4>
                <p className="text-gray-600">Available for rent</p>
                <p className="text-sm text-gray-500">Contact us for booth rental information</p>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
};

export default VenueMap;