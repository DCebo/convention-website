'use client';

import Link from 'next/link';
import { PageLayout } from '@/components/layout';

export default function NotFound() {
  return (
    <PageLayout>
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center px-4">
          {/* 404 Illustration */}
          <div className="mb-8">
            <div className="text-8xl mb-4">🎴</div>
            <div className="text-6xl font-bold text-primary mb-2">404</div>
            <div className="text-2xl text-gray-600 mb-4">Page Not Found</div>
          </div>

          {/* Error Message */}
          <div className="max-w-md mx-auto mb-8">
            <h1 className="text-xl font-semibold text-gray-800 mb-4">
              Oops! This page seems to have been traded away! 🔄
            </h1>
            <p className="text-gray-600 mb-6">
              The page you&apos;re looking for doesn&apos;t exist or may have been moved. 
              Don&apos;t worry, there are plenty of other amazing things to discover at Collect-It Con!
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/"
              className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center"
            >
              <span className="mr-2">🏠</span>
              Back to Home
            </Link>
            
            <Link 
              href="/things-to-do/vendors"
              className="bg-secondary text-white px-6 py-3 rounded-lg font-semibold hover:bg-secondary/90 transition-colors flex items-center"
            >
              <span className="mr-2">🏪</span>
              Browse Vendors
            </Link>
            
            <Link 
              href="/about"
              className="border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center"
            >
              <span className="mr-2">ℹ️</span>
              Learn More
            </Link>
          </div>

          {/* Helpful Links */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Popular Pages
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <Link 
                href="/things-to-do/vendors"
                className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors text-center"
              >
                <div className="text-2xl mb-2">🏪</div>
                <div className="text-sm font-medium text-blue-800">Vendors</div>
              </Link>
              
              <Link 
                href="/things-to-do/venue-map"
                className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors text-center"
              >
                <div className="text-2xl mb-2">🗺️</div>
                <div className="text-sm font-medium text-green-800">Venue Map</div>
              </Link>
              
              <Link 
                href="/buy-now"
                className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors text-center"
              >
                <div className="text-2xl mb-2">🎫</div>
                <div className="text-sm font-medium text-purple-800">Buy Tickets</div>
              </Link>
              
              <Link 
                href="/about"
                className="p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors text-center"
              >
                <div className="text-2xl mb-2">ℹ️</div>
                <div className="text-sm font-medium text-yellow-800">About Us</div>
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="mt-8 text-sm text-gray-500">
            <p>
              Still can&apos;t find what you&apos;re looking for? 
              <Link href="/contact" className="text-primary hover:underline ml-1">
                Contact us
              </Link>
              {' '}and we&apos;ll help you out!
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}