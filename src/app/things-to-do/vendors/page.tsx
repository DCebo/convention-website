'use client';

import { useState } from 'react';
import { PageLayout } from '@/components/layout';
import VendorListing from '@/components/vendors/VendorListing';
import { VenueMapModal } from '@/components/venue';

export default function VendorsPage() {
  const [showMapModal, setShowMapModal] = useState(false);
  const [selectedBooth, setSelectedBooth] = useState<string | undefined>();

  const handleShowMap = (boothNumber: string) => {
    setSelectedBooth(boothNumber);
    setShowMapModal(true);
  };

  const handleCloseMap = () => {
    setShowMapModal(false);
    setSelectedBooth(undefined);
  };

  return (
    <PageLayout>
      {/* Hero Section */}
      <div className="bg-primary/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-primary">
              Collect-It-Con Vendors
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              🎉 Explore our epic vendor marketplace! Hunt for legendary cards, rare collectibles, and awesome gaming gear from the best dealers around! 🏆
            </p>
          </div>
        </div>
      </div>

      {/* Vendor Listing */}
      <VendorListing onShowMap={handleShowMap} />

      {/* Venue Map Modal */}
      <VenueMapModal
        isOpen={showMapModal}
        onClose={handleCloseMap}
        highlightedBooth={selectedBooth}
      />
    </PageLayout>
  );
}