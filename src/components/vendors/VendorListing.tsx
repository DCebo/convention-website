'use client';

import { useState, useMemo } from 'react';
import { vendors, vendorCategories } from '@/data/vendors';
import { VendorCategory } from '@/types/vendors';
import VendorCard from './VendorCard';
import VendorFilter from './VendorFilter';
import Pagination from './Pagination';

interface VendorListingProps {
  onShowMap?: (boothNumber: string) => void;
}

const VendorListing = ({ onShowMap }: VendorListingProps) => {
  const [selectedCategory, setSelectedCategory] = useState<VendorCategory | 'All'>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const vendorsPerPage = 12;

  const filteredVendors = useMemo(() => {
    const filtered = vendors.filter(vendor => {
      const matchesCategory = selectedCategory === 'All' || vendor.category === selectedCategory;
      const matchesSearch = searchTerm === '' || 
        vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.specialties.some(specialty => 
          specialty.toLowerCase().includes(searchTerm.toLowerCase())
        );
      
      return matchesCategory && matchesSearch;
    });
    
    // Reset to page 1 when filters change
    setCurrentPage(1);
    return filtered;
  }, [selectedCategory, searchTerm]);

  const featuredVendors = filteredVendors.filter(vendor => vendor.featured);
  const regularVendors = filteredVendors.filter(vendor => !vendor.featured);
  
  // Pagination calculations
  const totalPages = Math.ceil(regularVendors.length / vendorsPerPage);
  const startIndex = (currentPage - 1) * vendorsPerPage;
  const paginatedVendors = regularVendors.slice(startIndex, startIndex + vendorsPerPage);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Filter Section */}
      <VendorFilter
        categories={vendorCategories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      {/* Results Summary */}
      <div className="mb-8">
        <p className="text-gray-600">
          Showing {filteredVendors.length} vendor{filteredVendors.length !== 1 ? 's' : ''}
          {selectedCategory !== 'All' && ` in ${selectedCategory}`}
          {searchTerm && ` matching "${searchTerm}"`}
        </p>
      </div>

      {/* Featured Vendors */}
      {featuredVendors.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <span className="text-yellow-500 mr-2">⭐</span>
            Featured Vendors
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredVendors.map(vendor => (
              <VendorCard key={vendor.id} vendor={vendor} featured onShowMap={onShowMap} />
            ))}
          </div>
        </div>
      )}

      {/* Regular Vendors */}
      {regularVendors.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            All Vendors ({regularVendors.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {paginatedVendors.map(vendor => (
              <VendorCard key={vendor.id} vendor={vendor} onShowMap={onShowMap} />
            ))}
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      )}

      {/* No Results */}
      {filteredVendors.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No vendors found</h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your search or filter criteria
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchTerm('');
            }}
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default VendorListing;