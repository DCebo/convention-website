'use client';

import { PageLayout } from '@/components/layout';
import { VenueMap } from '@/components/venue';

export default function VenueMapPage() {
  return (
    <PageLayout>
      {/* Hero Section */}
      <div className="bg-primary/10 py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 text-primary">
              Venue Map
            </h1>
            <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto px-2">
              🗺️ Navigate the convention like a pro! Find your favorite vendors, discover new booths, and plan your epic adventure! 🎯
            </p>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
        <div className="bg-white rounded-xl shadow-lg p-3 sm:p-4 md:p-6">
          <VenueMap className="w-full" />
          
          {/* Mobile Instructions */}
          <div className="mt-4 sm:hidden bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <h3 className="text-sm font-semibold text-yellow-800 mb-2 flex items-center">
              <span className="mr-2">📱</span>
              Mobile Tip
            </h3>
            <p className="text-yellow-700 text-sm">
              Tap and drag to navigate the map. Tap booths to see vendor information.
            </p>
          </div>
          
          {/* Additional Info */}
          <div className="mt-6 sm:mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-blue-50 p-4 sm:p-6 rounded-lg">
              <h3 className="text-base sm:text-lg font-semibold text-blue-800 mb-3 flex items-center">
                <span className="mr-2">📍</span>
                Getting Around
              </h3>
              <ul className="text-blue-700 space-y-2 text-sm">
                <li>• Main entrance is at the bottom center</li>
                <li>• Food court is near the main entrance</li>
                <li>• Artist Alley has independent creators</li>
                <li>• Different wings have different vendors</li>
              </ul>
            </div>
            
            <div className="bg-green-50 p-4 sm:p-6 rounded-lg">
              <h3 className="text-base sm:text-lg font-semibold text-green-800 mb-3 flex items-center">
                <span className="mr-2">💡</span>
                Pro Tips
              </h3>
              <ul className="text-green-700 space-y-2 text-sm">
                <li>• <span className="hidden sm:inline">Hover over</span><span className="sm:hidden">Tap</span> booths for vendor info</li>
                <li>• Click booth numbers on vendor cards</li>
                <li>• Plan your route to hit must-visit vendors</li>
                <li>• Check out the food court for breaks</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}