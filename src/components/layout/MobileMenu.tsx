'use client';

import { useState } from 'react';
import Link from 'next/link';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [expandedSubSection, setExpandedSubSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
    // Reset subsection when main section changes
    if (expandedSection !== section) {
      setExpandedSubSection(null);
    }
  };

  const toggleSubSection = (subSection: string) => {
    setExpandedSubSection(expandedSubSection === subSection ? null : subSection);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50" 
        onClick={onClose}
      />
      
      {/* Menu Panel */}
      <div className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-purple-700 shadow-2xl transform transition-transform duration-300 ease-in-out" style={{
        background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 50%, #4338ca 100%)',
        backgroundImage: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 50%, #4338ca 100%)'
      }}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white border-opacity-20 bg-white bg-opacity-10" style={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderBottomColor: 'rgba(255, 255, 255, 0.2)'
          }}>
            <Link
              href="/"
              className="text-2xl font-bold text-white hover:text-yellow-300 transition-colors"
              onClick={onClose}
            >
              Collect-It-Con
            </Link>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-white/20 transition-colors"
              aria-label="Close menu"
            >
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Menu Items */}
          <div className="flex-1 overflow-y-auto py-4">
            {/* Things To Do */}
            <div className="border-b border-white border-opacity-20" style={{ borderBottomColor: 'rgba(255, 255, 255, 0.2)' }}>
              <button
                onClick={() => toggleSection('things-to-do')}
                className="w-full flex items-center justify-between px-4 py-3 text-left text-white hover:bg-white hover:bg-opacity-10 transition-colors rounded-lg mx-2"
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <span className="font-semibold flex items-center">
                  <span className="mr-2">🎯</span>
                  Things To Do
                </span>
                <svg
                  className={`h-5 w-5 transform transition-transform ${
                    expandedSection === 'things-to-do' ? 'rotate-180' : ''
                  }`}
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
              {expandedSection === 'things-to-do' && (
                <div className="bg-white bg-opacity-10 rounded-lg mx-2 mb-2" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                  <div className="px-4 py-2">
                    <button
                      onClick={() => toggleSubSection('programming')}
                      className="w-full flex items-center justify-between py-2 text-left text-white hover:text-yellow-300 transition-colors rounded px-2 hover:bg-white hover:bg-opacity-10"
                      style={{ color: 'rgba(255, 255, 255, 0.9)' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                        e.currentTarget.style.color = '#fde047';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)';
                      }}
                    >
                      <span className="flex items-center">
                        <span className="mr-2">💻</span>
                        Programming
                      </span>
                      <svg
                        className={`h-4 w-4 transform transition-transform ${
                          expandedSubSection === 'programming' ? 'rotate-180' : ''
                        }`}
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
                    {expandedSubSection === 'programming' && (
                      <div className="ml-6 space-y-1 mt-2 bg-white bg-opacity-10 rounded-lg p-2" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                        <Link
                          href="/things-to-do/programming/contests"
                          className="block py-2 px-3 text-white hover:text-yellow-300 transition-colors rounded hover:bg-white hover:bg-opacity-10 flex items-center"
                          style={{ color: 'rgba(255, 255, 255, 0.8)' }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                            e.currentTarget.style.color = '#fde047';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)';
                          }}
                          onClick={onClose}
                        >
                          <span className="mr-2">🏆</span>
                          Contests
                        </Link>
                        <Link
                          href="/things-to-do/programming/events"
                          className="block py-2 px-3 text-white hover:text-yellow-300 transition-colors rounded hover:bg-white hover:bg-opacity-10 flex items-center"
                          style={{ color: 'rgba(255, 255, 255, 0.8)' }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                            e.currentTarget.style.color = '#fde047';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)';
                          }}
                          onClick={onClose}
                        >
                          <span className="mr-2">🎪</span>
                          Events
                        </Link>
                      </div>
                    )}
                  </div>
                  <Link
                    href="/things-to-do/vendors"
                    className="block px-4 py-2 text-white hover:text-yellow-300 hover:bg-white hover:bg-opacity-10 transition-colors rounded mx-2 flex items-center"
                    style={{ color: 'rgba(255, 255, 255, 0.9)' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                      e.currentTarget.style.color = '#fde047';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)';
                    }}
                    onClick={onClose}
                  >
                    <span className="mr-2">🛍️</span>
                    Vendors
                  </Link>
                  <Link
                    href="/things-to-do/venue-map"
                    className="block px-4 py-2 text-white hover:text-yellow-300 hover:bg-white hover:bg-opacity-10 transition-colors rounded mx-2 mb-2 flex items-center"
                    style={{ color: 'rgba(255, 255, 255, 0.9)' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                      e.currentTarget.style.color = '#fde047';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)';
                    }}
                    onClick={onClose}
                  >
                    <span className="mr-2">🗺️</span>
                    Venue Map
                  </Link>
                </div>
              )}
            </div>

            {/* Participate */}
            <div className="border-b border-white border-opacity-20" style={{ borderBottomColor: 'rgba(255, 255, 255, 0.2)' }}>
              <button
                onClick={() => toggleSection('participate')}
                className="w-full flex items-center justify-between px-4 py-3 text-left text-white hover:bg-white hover:bg-opacity-10 transition-colors rounded-lg mx-2"
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <span className="font-semibold flex items-center">
                  <span className="mr-2">🤝</span>
                  Participate
                </span>
                <svg
                  className={`h-5 w-5 transform transition-transform ${
                    expandedSection === 'participate' ? 'rotate-180' : ''
                  }`}
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
              {expandedSection === 'participate' && (
                <div className="bg-white bg-opacity-10 rounded-lg mx-2 mb-2 p-2" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                  <Link
                    href="/participate/vendors"
                    className="block px-4 py-2 text-white hover:text-yellow-300 hover:bg-white hover:bg-opacity-10 transition-colors rounded flex items-center"
                    style={{ color: 'rgba(255, 255, 255, 0.9)' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                      e.currentTarget.style.color = '#fde047';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)';
                    }}
                    onClick={onClose}
                  >
                    <span className="mr-2">🛍️</span>
                    Vendors
                  </Link>
                  <Link
                    href="/participate/volunteer"
                    className="block px-4 py-2 text-white hover:text-yellow-300 hover:bg-white hover:bg-opacity-10 transition-colors rounded flex items-center"
                    style={{ color: 'rgba(255, 255, 255, 0.9)' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                      e.currentTarget.style.color = '#fde047';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)';
                    }}
                    onClick={onClose}
                  >
                    <span className="mr-2">🦸</span>
                    Superheroes
                  </Link>
                  <Link
                    href="/participate/guests"
                    className="block px-4 py-2 text-white hover:text-yellow-300 hover:bg-white hover:bg-opacity-10 transition-colors rounded flex items-center"
                    style={{ color: 'rgba(255, 255, 255, 0.9)' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                      e.currentTarget.style.color = '#fde047';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)';
                    }}
                    onClick={onClose}
                  >
                    <span className="mr-2">⭐</span>
                    Guests
                  </Link>
                  <Link
                    href="/participate/comics-pop-art"
                    className="block px-4 py-2 text-white hover:text-yellow-300 hover:bg-white hover:bg-opacity-10 transition-colors rounded flex items-center"
                    style={{ color: 'rgba(255, 255, 255, 0.9)' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                      e.currentTarget.style.color = '#fde047';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)';
                    }}
                    onClick={onClose}
                  >
                    <span className="mr-2">🎨</span>
                    Comics and Pop Art
                  </Link>
                  <Link
                    href="/participate/art-show"
                    className="block px-4 py-2 text-white hover:text-yellow-300 hover:bg-white hover:bg-opacity-10 transition-colors rounded flex items-center"
                    style={{ color: 'rgba(255, 255, 255, 0.9)' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                      e.currentTarget.style.color = '#fde047';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)';
                    }}
                    onClick={onClose}
                  >
                    <span className="mr-2">🖼️</span>
                    Art Show
                  </Link>
                  <Link
                    href="/participate/fan-tables"
                    className="block px-4 py-2 text-white hover:text-yellow-300 hover:bg-white hover:bg-opacity-10 transition-colors rounded flex items-center"
                    style={{ color: 'rgba(255, 255, 255, 0.9)' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                      e.currentTarget.style.color = '#fde047';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)';
                    }}
                    onClick={onClose}
                  >
                    <span className="mr-2">🎪</span>
                    Fan Tables
                  </Link>
                </div>
              )}
            </div>

            {/* About */}
            <Link
              href="/about"
              className="block px-4 py-3 text-white hover:bg-white hover:bg-opacity-10 transition-colors font-semibold rounded-lg mx-2 flex items-center"
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              onClick={onClose}
            >
              <span className="mr-2">ℹ️</span>
              About
            </Link>

            {/* Buy Now Button */}
            <div className="px-4 py-4">
              <Link
                href="/buy-now"
                className="block w-full bg-yellow-400 hover:bg-yellow-300 text-black px-6 py-3 rounded-xl font-bold text-center transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center"
                style={{
                  background: 'linear-gradient(90deg, #facc15 0%, #f97316 100%)',
                  backgroundImage: 'linear-gradient(90deg, #facc15 0%, #f97316 100%)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(90deg, #fde047 0%, #fb923c 100%)';
                  e.currentTarget.style.backgroundImage = 'linear-gradient(90deg, #fde047 0%, #fb923c 100%)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(90deg, #facc15 0%, #f97316 100%)';
                  e.currentTarget.style.backgroundImage = 'linear-gradient(90deg, #facc15 0%, #f97316 100%)';
                }}
                onClick={onClose}
              >
                <span className="mr-2">🎫</span>
                Buy Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;