'use client';

import { PageLayout } from '@/components/layout';
import { VenueMap } from '@/components/venue';

export default function VenueMapPage() {
  return (
    <PageLayout>
      {/* Hero Section */}
      <div className="bg-primary/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-primary">
              Venue Map
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              🗺️ Navigate the convention like a pro! Find your favorite vendors, discover new booths, and plan your epic adventure! 🎯
            </p>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <VenueMap className="w-full" />
          
          {/* Additional Info */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-center">
                <span className="mr-2">📍</span>
                Getting Around
              </h3>
              <ul className="text-blue-700 space-y-2 text-sm">
                <li>• Main entrance is located at the bottom center of the venue</li>
                <li>• Food court is conveniently located near the main entrance</li>
                <li>• Artist Alley features independent creators and custom artwork</li>
                <li>• Different wings specialize in different types of vendors</li>
              </ul>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-green-800 mb-3 flex items-center">
                <span className="mr-2">💡</span>
                Pro Tips
              </h3>
              <ul className="text-green-700 space-y-2 text-sm">
                <li>• Hover over booths to see vendor information</li>
                <li>• Click booth numbers on vendor cards to see their location</li>
                <li>• Plan your route to hit all your must-visit vendors</li>
                <li>• Check out the food court when you need a break</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}