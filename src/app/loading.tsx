import { PageLayout } from '@/components/layout';

export default function Loading() {
  return (
    <PageLayout>
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          {/* Loading Animation */}
          <div className="mb-8">
            <div className="relative">
              {/* Spinning Cards */}
              <div className="text-6xl animate-spin">🎴</div>
              <div className="absolute inset-0 text-6xl animate-ping opacity-30">🎴</div>
            </div>
          </div>

          {/* Loading Text */}
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-gray-800">
              Loading your collection...
            </h2>
            <p className="text-gray-600">
              Shuffling the deck and preparing your experience
            </p>
          </div>

          {/* Loading Dots */}
          <div className="flex justify-center space-x-2 mt-6">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}