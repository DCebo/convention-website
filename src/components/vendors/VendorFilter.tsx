import { VendorCategory } from '@/types/vendors';

interface VendorFilterProps {
  categories: VendorCategory[];
  selectedCategory: VendorCategory | 'All';
  onCategoryChange: (category: VendorCategory | 'All') => void;
  searchTerm: string;
  onSearchChange: (searchTerm: string) => void;
}

const VendorFilter = ({
  categories,
  selectedCategory,
  onCategoryChange,
  searchTerm,
  onSearchChange
}: VendorFilterProps) => {
  const getCategoryIcon = (category: VendorCategory | 'All') => {
    switch (category) {
      case 'All': return '🏪';
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

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      {/* Search Bar */}
      <div className="mb-6">
        <label htmlFor="vendor-search" className="block text-sm font-semibold text-gray-700 mb-2">
          Search Vendors
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            id="vendor-search"
            type="text"
            placeholder="Search by name, description, or specialty..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
          />
          {searchTerm && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Category Filter */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Filter by Category
        </label>
        <div className="flex flex-wrap gap-2">
          {/* All Categories Button */}
          <button
            onClick={() => onCategoryChange('All')}
            className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              selectedCategory === 'All'
                ? 'bg-primary text-white shadow-md transform scale-105'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
            }`}
          >
            <span className="mr-2">{getCategoryIcon('All')}</span>
            All Categories
          </button>

          {/* Individual Category Buttons */}
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-primary text-white shadow-md transform scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
              }`}
            >
              <span className="mr-2">{getCategoryIcon(category)}</span>
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Active Filters Summary */}
      {(selectedCategory !== 'All' || searchTerm) && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>Active filters:</span>
              {selectedCategory !== 'All' && (
                <span className="bg-primary/10 text-primary px-2 py-1 rounded-md">
                  {selectedCategory}
                </span>
              )}
              {searchTerm && (
                <span className="bg-primary/10 text-primary px-2 py-1 rounded-md">
                  &ldquo;{searchTerm}&rdquo;
                </span>
              )}
            </div>
            <button
              onClick={() => {
                onCategoryChange('All');
                onSearchChange('');
              }}
              className="text-sm text-gray-500 hover:text-gray-700 underline"
            >
              Clear all filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorFilter;