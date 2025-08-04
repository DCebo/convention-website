'use client';

import { useEffect, useCallback } from 'react';
import VenueMap from './VenueMap';

interface VenueMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  highlightedBooth?: string;
}

const VenueMapModal = ({ isOpen, onClose, highlightedBooth }: VenueMapModalProps) => {
  const handleEscapeKey = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleEscapeKey);
    } else {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, handleEscapeKey]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-6xl h-full max-h-[90vh] overflow-auto flex flex-col rounded-2xl shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b-2 border-gray-200 bg-gradient-to-r from-primary to-purple-600 text-white flex-shrink-0">
          <h2 className="text-3xl font-bold flex items-center">
            <span className="mr-3">🗺️</span>
            Collect-It-Con Venue Map
          </h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm opacity-80">Press ESC to close</span>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white hover:bg-white/20 p-2 rounded-lg transition-all duration-200"
              aria-label="Close modal"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Map */}
        <div className="p-6 flex-1 overflow-auto">
          <VenueMap 
            highlightedBooth={highlightedBooth}
            className="w-full min-h-[500px]"
          />
          
          {highlightedBooth && (
            <div className="mt-6 p-6 bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 rounded-xl shadow-lg">
              <h3 className="font-bold text-red-800 mb-3 text-xl flex items-center">
                <span className="mr-2">📍</span>
                Booth {highlightedBooth} Location
              </h3>
              <p className="text-red-700 text-lg">
                The highlighted booth shows where this vendor is located in the venue. Look for the pulsing red booth on the map above!
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t-2 border-gray-200 p-6 bg-gradient-to-r from-gray-50 to-blue-50 flex-shrink-0">
          <div className="text-gray-700">
            <h4 className="font-bold mb-3 text-lg flex items-center">
              <span className="mr-2">💡</span>
              Navigation Tips:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="mr-2 text-blue-500">•</span>
                  <span>Hover over booths to see vendor information</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-blue-500">•</span>
                  <span>Click booth numbers on vendor cards to see their location</span>
                </li>
              </ul>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="mr-2 text-green-500">•</span>
                  <span>Use the main entrance to enter the venue</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-500">•</span>
                  <span>Food court is located near the main entrance</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueMapModal;