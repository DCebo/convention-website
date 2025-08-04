'use client';

import { PageLayout } from '@/components/layout';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import Countdown from '@/components/ui/Countdown';
import NewsletterModal, { NewsletterModalRef } from '@/components/ui/NewsletterModal';
import { useRef } from 'react';

// Event Configuration - Update this date for the next convention
const NEXT_EVENT_DATE = new Date('2025-10-25T09:00:00');

export default function Home() {
  const newsletterModalRef = useRef<NewsletterModalRef>(null);

  const handleStayUpdatedClick = () => {
    newsletterModalRef.current?.open();
  };
  return (
    <PageLayout>
      {/* Hero Section */}
      <div className="relative bg-primary/10 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-40 right-20 text-4xl animate-pulse">⚡</div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-primary">
              Collect-It-Con
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed">
              🚀 Your ultimate destination for <span className="font-bold text-primary">TCG</span> and 
              <span className="font-bold text-secondary"> sports card</span> conventions! 
              Join our epic community for legendary tournaments, rare card trading, and unforgettable gaming experiences.
            </p>
            
            {/* Countdown to next event */}
            <div className="mb-8 w-full max-w-6xl mx-auto">
              <Countdown 
                targetDate={NEXT_EVENT_DATE} 
                className="mb-0"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <a href="/buy-now" className="bg-purple-600 hover:bg-purple-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl inline-block text-center">
                Buy Now for {new Date().getFullYear()}
              </a>
              <a href="/about" className="bg-purple-600 hover:bg-purple-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl inline-block text-center">
                Learn More
              </a>
            </div>

            {/* Feature highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
                <div className="text-4xl mb-4">🏆</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Epic Tournaments</h3>
                <p className="text-gray-600">Compete in high-stakes TCG and sports card tournaments with amazing prizes!</p>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
                <div className="text-4xl mb-4">🔄</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Card Trading</h3>
                <p className="text-gray-600">Find rare cards, make trades, and expand your collection with fellow enthusiasts!</p>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
                <div className="text-4xl mb-4">👥</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Gaming Community</h3>
                <p className="text-gray-600">Connect with passionate gamers and collectors from around the world!</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Section */}
      <div className="bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Join the Ultimate Gaming Experience
            </h2>
            <p className="text-lg text-gray-600">
              Be part of something legendary at our conventions!
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <AnimatedCounter 
                end={500} 
                suffix="+" 
                className="text-4xl font-bold text-primary mb-2 block"
                delay={200}
              />
              <div className="text-gray-600 font-medium">🎴 TCG Players</div>
            </div>
            <div className="text-center">
              <AnimatedCounter 
                end={200} 
                suffix="+" 
                className="text-4xl font-bold text-secondary mb-2 block"
                delay={400}
              />
              <div className="text-gray-600 font-medium">⚾ Sports Card Collectors</div>
            </div>
            <div className="text-center">
              <AnimatedCounter 
                end={50} 
                suffix="+" 
                className="text-4xl font-bold text-accent mb-2 block"
                delay={600}
              />
              <div className="text-gray-600 font-medium">🏆 Tournaments</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-success mb-2">24/7</div>
              <div className="text-gray-600 font-medium">🎯 Gaming Fun</div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-purple-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Don&apos;t Miss the Ultimate Convention Experience!
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Don&apos;t miss out on the most epic gaming conventions! Join our community and be part of legendary tournaments and unforgettable experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/buy-now" className="bg-white text-purple-600 px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all duration-200 shadow-lg">
              🎫 Get Your Tickets
            </a>
            <button onClick={handleStayUpdatedClick} className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-purple-600 transition-all duration-200">
              📧 Stay Updated
            </button>
          </div>
        </div>
      </div>

      {/* Newsletter Modal */}
      <NewsletterModal ref={newsletterModalRef} delay={15000} />
    </PageLayout>
  )
}
