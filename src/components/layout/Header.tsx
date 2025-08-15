'use client';

import Link from 'next/link'
import { useState } from 'react'
import MobileMenu from './MobileMenu'
import SocialLinks from '@/components/ui/SocialLinks'

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  return (
    <>
      {/* Mini Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-10 text-sm">
            {/* Event Date and Buy Now */}
            <div className="flex items-center space-x-4">
              <span className="text-white font-medium">
                Nov. 29th in Collingwood
              </span>
              <Link
                href="/buy-now"
                className="text-purple-400 hover:text-purple-300 font-bold transition-colors duration-200 flex items-center space-x-1"
              >
                <span>Buy Now</span>
                <svg
                  className="h-3 w-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>

            {/* Social Media Links */}
            <SocialLinks />
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-primary shadow-lg border-b-4 border-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo/Brand */}
            <div className="flex-shrink-0 flex items-center space-x-3">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg transform rotate-12">
                <div className="text-2xl">🎴</div>
              </div>
              <Link
                href="/"
                className="text-3xl font-bold text-white hover:text-accent transition-colors duration-300"
              >
                Collect-It Con
              </Link>
            </div>

            {/* Navigation - bigger and more noticeable */}
            <nav className="hidden md:flex space-x-1">
              {/* Things To Do Dropdown */}
              <div className="relative group">
                <button className="text-white hover:bg-white/20 px-6 py-3 rounded-lg text-lg font-semibold transition-all duration-200 hover:scale-105 hover:text-accent flex items-center">
                  Things To Do
                  <svg
                    className="ml-1 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-2">
                    {/* Programming with sub-dropdown */}
                    <div className="relative group/sub">
                      <button className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors flex items-center justify-between">
                        Programming
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                      <div className="absolute left-full top-0 ml-1 w-40 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-200">
                        <div className="py-2">
                          <Link
                            href="/things-to-do/programming/contests"
                            className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors"
                          >
                            Contests
                          </Link>
                          <Link
                            href="/things-to-do/programming/events"
                            className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors"
                          >
                            Events
                          </Link>
                        </div>
                      </div>
                    </div>
                    <Link
                      href="/things-to-do/vendors"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors"
                    >
                      Vendors
                    </Link>
                    <Link
                      href="/things-to-do/venue-map"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors"
                    >
                      Venue Map
                    </Link>
                  </div>
                </div>
              </div>

              {/* Participate Dropdown */}
              <div className="relative group">
                <button className="text-white hover:bg-white/20 px-6 py-3 rounded-lg text-lg font-semibold transition-all duration-200 hover:scale-105 hover:text-accent flex items-center">
                  Participate
                  <svg
                    className="ml-1 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-2">
                    <Link
                      href="/participate/vendors"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors"
                    >
                      Vendors
                    </Link>
                    <Link
                      href="/participate/volunteer"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors"
                    >
                      Superheroes
                    </Link>
                    <Link
                      href="/participate/guests"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors"
                    >
                      Guests
                    </Link>
                    <Link
                      href="/participate/comics-pop-art"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors"
                    >
                      Comics and Pop Art
                    </Link>
                    <Link
                      href="/participate/art-show"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors"
                    >
                      Art Show
                    </Link>
                    <Link
                      href="/participate/fan-tables"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors"
                    >
                      Fan Tables
                    </Link>
                  </div>
                </div>
              </div>

              <Link
                href="/about"
                className="text-white hover:bg-white/20 px-6 py-3 rounded-lg text-lg font-semibold transition-all duration-200 hover:scale-105 hover:text-accent"
              >
                About
              </Link>
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                className="text-white hover:bg-white/20 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                aria-label="Open main menu"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Decorative bottom border */}
        <div className="bg-accent h-1 relative overflow-hidden">
          <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
    </>
  )
}

export default Header
