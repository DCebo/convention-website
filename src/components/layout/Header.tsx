import Link from 'next/link';

const Header = () => {
  return (
    <>
      {/* Mini Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-10 text-sm">
            {/* Event Date and Buy Now */}
            <div className="flex items-center space-x-4">
              <span className="text-white font-medium">
                Oct. 25 - Oct 26th 2025 in Box Hill, VIC
              </span>
              <a 
                href="/buy-now" 
                className="text-purple-400 hover:text-purple-300 font-bold transition-colors duration-200 flex items-center space-x-1"
              >
                <span>Buy Now</span>
                <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
            
            {/* Social Media Links */}
            <div className="flex items-center space-x-3">
              <a
                href="#"
                className="text-gray-300 hover:text-purple-400 transition-colors duration-200"
                aria-label="Facebook"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-purple-400 transition-colors duration-200"
                aria-label="Twitter"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-purple-400 transition-colors duration-200"
                aria-label="Instagram"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323C5.902 8.198 7.053 7.708 8.35 7.708s2.448.49 3.323 1.297c.897.875 1.387 2.026 1.387 3.323s-.49 2.448-1.297 3.323c-.875.897-2.026 1.387-3.323 1.387zm7.718 0c-1.297 0-2.448-.49-3.323-1.297-.897-.875-1.387-2.026-1.387-3.323s.49-2.448 1.297-3.323c.875-.897 2.026-1.387 3.323-1.387s2.448.49 3.323 1.297c.897.875 1.387 2.026 1.387 3.323s-.49 2.448-1.297 3.323c-.875.897-2.026 1.387-3.323 1.387z"/>
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-purple-400 transition-colors duration-200"
                aria-label="Discord"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
              </a>
            </div>
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
            <Link href="/" className="text-3xl font-bold text-white hover:text-accent transition-colors duration-300">
              ConventionHub
            </Link>
          </div>

          {/* Navigation - bigger and more noticeable */}
          <nav className="hidden md:flex space-x-1">
            {/* Things To Do Dropdown */}
            <div className="relative group">
              <button className="text-white hover:bg-white/20 px-6 py-3 rounded-lg text-lg font-semibold transition-all duration-200 hover:scale-105 hover:text-accent flex items-center">
                Things To Do
                <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  {/* Programming with sub-dropdown */}
                  <div className="relative group/sub">
                    <button className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors flex items-center justify-between">
                      Programming
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                    <div className="absolute left-full top-0 ml-1 w-40 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-200">
                      <div className="py-2">
                        <Link href="/things-to-do/programming/contests" className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors">
                          Contests
                        </Link>
                        <Link href="/things-to-do/programming/events" className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors">
                          Events
                        </Link>
                      </div>
                    </div>
                  </div>
                  <Link href="/things-to-do/vendors" className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors">
                    Vendors
                  </Link>
                </div>
              </div>
            </div>

            {/* Participate Dropdown */}
            <div className="relative group">
              <button className="text-white hover:bg-white/20 px-6 py-3 rounded-lg text-lg font-semibold transition-all duration-200 hover:scale-105 hover:text-accent flex items-center">
                Participate
                <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  <Link href="/participate/volunteer" className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors">
                    Volunteer
                  </Link>
                  <Link href="/participate/guests" className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors">
                    Guests
                  </Link>
                  <Link href="/participate/performers" className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors">
                    Performers
                  </Link>
                  <Link href="/participate/comics-pop-art" className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors">
                    Comics and Pop Art
                  </Link>
                  <Link href="/participate/art-show" className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors">
                    Art Show
                  </Link>
                  <Link href="/participate/vendors" className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors">
                    Vendors
                  </Link>
                  <Link href="/participate/superheroes" className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors">
                    Superheroes
                  </Link>
                  <Link href="/participate/fan-tables" className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors">
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
              className="text-white hover:bg-white/20 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
              aria-label="Open main menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
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
    </>
  );
};

export default Header;