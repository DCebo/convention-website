'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { PageLayout } from '@/components/layout';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <PageLayout>
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center px-4">
          {/* Error Illustration */}
          <div className="mb-8">
            <div className="text-8xl mb-4">⚠️</div>
            <div className="text-6xl font-bold text-red-600 mb-2">Oops!</div>
            <div className="text-2xl text-gray-600 mb-4">Something went wrong</div>
          </div>

          {/* Error Message */}
          <div className="max-w-md mx-auto mb-8">
            <h1 className="text-xl font-semibold text-gray-800 mb-4">
              Our cards got shuffled! 🃏
            </h1>
            <p className="text-gray-600 mb-6">
              Don&apos;t worry, this happens sometimes. We&apos;re working to fix it. 
              Try refreshing the page or go back to explore other parts of Collect-It-Con!
            </p>
            
            {/* Error Details (only in development) */}
            {process.env.NODE_ENV === 'development' && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-left">
                <h3 className="text-sm font-semibold text-red-800 mb-2">Error Details:</h3>
                <p className="text-xs text-red-700 font-mono break-all">
                  {error.message}
                </p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={reset}
              className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center"
            >
              <span className="mr-2">🔄</span>
              Try Again
            </button>
            
            <Link 
              href="/"
              className="bg-secondary text-white px-6 py-3 rounded-lg font-semibold hover:bg-secondary/90 transition-colors flex items-center"
            >
              <span className="mr-2">🏠</span>
              Back to Home
            </Link>
            
            <Link 
              href="/things-to-do/vendors"
              className="border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center"
            >
              <span className="mr-2">🏪</span>
              Browse Vendors
            </Link>
          </div>

          {/* Help Section */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Need Help?
            </h2>
            <div className="text-sm text-gray-600 space-y-2">
              <p>If this error persists, try:</p>
              <ul className="list-disc list-inside space-y-1 max-w-md mx-auto">
                <li>Refreshing your browser</li>
                <li>Clearing your browser cache</li>
                <li>Checking your internet connection</li>
                <li>Trying again in a few minutes</li>
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div className="mt-8 text-sm text-gray-500">
            <p>
              Still having issues? 
              <Link href="/contact" className="text-primary hover:underline ml-1">
                Contact our support team
              </Link>
              {' '}and we&apos;ll help you get back to collecting!
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}