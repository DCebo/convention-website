export type ViewMode = 'grid' | 'list';

interface ViewToggleProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

const ViewToggle = ({ viewMode, onViewModeChange }: ViewToggleProps) => {
  return (
    <div className="flex items-center bg-white rounded-lg border border-gray-300 shadow-sm">
      {/* Grid View Button */}
      <button
        onClick={() => onViewModeChange('grid')}
        className={`flex items-center px-4 py-2 text-sm font-medium transition-all duration-200 rounded-l-lg ${
          viewMode === 'grid'
            ? 'bg-primary text-white shadow-md'
            : 'text-gray-700 hover:bg-gray-50'
        }`}
        title="Grid View"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
        <span className="hidden sm:inline">Grid</span>
      </button>

      {/* List View Button */}
      <button
        onClick={() => onViewModeChange('list')}
        className={`flex items-center px-4 py-2 text-sm font-medium transition-all duration-200 rounded-r-lg ${
          viewMode === 'list'
            ? 'bg-primary text-white shadow-md'
            : 'text-gray-700 hover:bg-gray-50'
        }`}
        title="List View"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        </svg>
        <span className="hidden sm:inline">List</span>
      </button>
    </div>
  );
};

export default ViewToggle;