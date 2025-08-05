import { VendorCategory } from '@/types/vendors';

export type SortOption = 'name' | 'category' | 'featured' | 'location';

interface VendorFilterProps {
  categories: VendorCategory[];
  selectedCategory: VendorCategory | 'All';
  onCategoryChange: (category: VendorCategory | 'All') => void;
  searchTerm: string;
  onSearchChange: (searchTerm: string) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  sortOrder: 'asc' | 'desc';
  onSortOrderChange: (order: 'asc' | 'desc') => void;
}

const VendorFilter = ({
  categories,
  selectedCategory,
  onCategoryChange,
  searchTerm,
  onSearchChange,
  sortBy,
  onSortChange,
  sortOrder,
  onSortOrderChange
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

  const getSortIcon = (sort: SortOption) => {
    switch (sort) {
      case 'name': return '🔤';
      case 'category': return '📂';
      case 'featured': return '⭐';
      case 'location': return '📍';
      default: return '🔤';
    }
  };

  const getSortLabel = (sort: SortOption) => {
    switch (sort) {
      case 'name': return 'Name';
      case 'category': return 'Category';
      case 'featured': return 'Featured';
      case 'location': return 'Location';
      default: return 'Name';
    }
  };

  const clearAllFilters = () => {
    onCategoryChange('All');
    onSearchChange('');
    onSortChange('name');
    onSortOrderChange('asc');
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

      {/* Sort Options */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Sort Vendors
        </label>
        <div className="flex flex-col sm:flex-row flex-wrap gap-3 items-start sm:items-center">
          {/* Sort By Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition-colors"
            >
              <option value="name">Sort by Name</option>
              <option value="category">Sort by Category</option>
              <option value="featured">Sort by Featured</option>
              <option value="location">Sort by Location</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Sort Order Toggle */}
          <button
            onClick={() => onSortOrderChange(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all duration-200 border border-gray-300"
            title={`Currently sorting ${sortOrder === 'asc' ? 'ascending' : 'descending'} - click to toggle`}
          >
            <span className="mr-2 text-lg">{sortOrder === 'asc' ? '↑' : '↓'}</span>
            <span>{sortOrder === 'asc' ? 'A-Z' : 'Z-A'}</span>
          </button>

          {/* Current Sort Display */}
          <div className="bg-secondary/10 text-secondary px-3 py-2 rounded-lg text-sm font-medium flex items-center sm:ml-auto">
            <span className="mr-2">{getSortIcon(sortBy)}</span>
            <span className="hidden sm:inline">Sorting by {getSortLabel(sortBy)} ({sortOrder === 'asc' ? 'ascending' : 'descending'})</span>
            <span className="sm:hidden">{getSortLabel(sortBy)} ({sortOrder === 'asc' ? 'A-Z' : 'Z-A'})</span>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Filter by Category
        </label>
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
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
      {(selectedCategory !== 'All' || searchTerm || sortBy !== 'name' || sortOrder !== 'asc') && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center flex-wrap gap-2 text-sm text-gray-600">
              <span className="font-semibold">Active filters:</span>
              {selectedCategory !== 'All' && (
                <span className="bg-primary/10 text-primary px-2 py-1 rounded-md flex items-center">
                  <span className="mr-1">📂</span>
                  {selectedCategory}
                </span>
              )}
              {searchTerm && (
                <span className="bg-primary/10 text-primary px-2 py-1 rounded-md flex items-center">
                  <span className="mr-1">🔍</span>
                  &ldquo;{searchTerm}&rdquo;
                </span>
              )}
              {(sortBy !== 'name' || sortOrder !== 'asc') && (
                <span className="bg-secondary/10 text-secondary px-2 py-1 rounded-md flex items-center">
                  <span className="mr-1">{getSortIcon(sortBy)}</span>
                  {getSortLabel(sortBy)} ({sortOrder === 'asc' ? 'A-Z' : 'Z-A'})
                </span>
              )}
            </div>
            <button
              onClick={clearAllFilters}
              className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-lg text-sm font-medium transition-colors flex items-center"
            >
              <span className="mr-1">🗑️</span>
              Clear All Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorFilter;