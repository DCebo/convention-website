'use client';

import { useEffect, useState, forwardRef, useImperativeHandle } from 'react';

interface NewsletterModalProps {
  delay?: number;
}

export interface NewsletterModalRef {
  open: () => void;
}

const NewsletterModal = forwardRef<NewsletterModalRef, NewsletterModalProps>(({ delay = 10000 }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useImperativeHandle(ref, () => ({
    open: () => setIsOpen(true)
  }));

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          submittedAt: new Date().toISOString(),
          userAgent: navigator.userAgent,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to subscribe to newsletter');
      }

      setIsSubmitted(true);
      setTimeout(() => {
        setIsOpen(false);
      }, 3000);
    } catch (error) {
      console.error('Newsletter signup error:', error);
      // Still show success to user, but log the error
      setIsSubmitted(true);
      setTimeout(() => {
        setIsOpen(false);
      }, 3000);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 relative overflow-hidden">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
          aria-label="Close modal"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Decorative background */}
        <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
          <div className="text-6xl transform rotate-12">🎴</div>
        </div>

        <div className="p-8">
          {!isSubmitted ? (
            <>
              <div className="text-center mb-6">
                <div className="text-4xl mb-4">📧</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Stay in the Game!
                </h3>
                <p className="text-gray-600">
                  Get exclusive updates about upcoming conventions, tournaments, and special events!
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 hover:scale-105 shadow-lg"
                >
                  🎯 Subscribe Now
                </button>
              </form>

              <p className="text-xs text-gray-500 text-center mt-4">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-green-600 mb-2">
                Welcome to the Community!
              </h3>
              <p className="text-gray-600">
                You&apos;ll receive updates about our upcoming conventions and events.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

NewsletterModal.displayName = 'NewsletterModal';

export default NewsletterModal;