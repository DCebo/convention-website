import { PageLayout } from '@/components/layout';

export default function GuestsPage() {
  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          {/* Icon */}
          <div className="mb-8">
            <div className="mx-auto w-24 h-24 bg-gradient-to-r from-purple-600 to-accent rounded-full flex items-center justify-center">
              <div className="text-4xl">🌟</div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-primary mb-4">Special Guests</h1>
          
          {/* Coming Soon Message */}
          <div className="bg-card-bg border border-border rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-primary mb-4">To Be Announced</h2>
            <p className="text-lg text-gray-600 mb-6">
              We&apos;re working hard to bring you amazing special guests for Collect-It-Con! 
              Stay tuned for exciting announcements about the incredible personalities who will be joining us.
            </p>
            <div className="bg-gradient-to-r from-purple-100 to-accent/10 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-primary mb-3">Coming Soon</h3>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-center">
                  <span className="text-accent mr-2">✨</span>
                  Celebrity guests and industry professionals
                </li>
                <li className="flex items-center">
                  <span className="text-accent mr-2">✨</span>
                  Meet and greet opportunities
                </li>
                <li className="flex items-center">
                  <span className="text-accent mr-2">✨</span>
                  Autograph sessions and photo opportunities
                </li>
                <li className="flex items-center">
                  <span className="text-accent mr-2">✨</span>
                  Exclusive panels and Q&A sessions
                </li>
              </ul>
            </div>
          </div>

          {/* Stay Updated */}
          <div className="bg-slate-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-primary mb-3">Stay Updated</h3>
            <p className="text-gray-600 mb-4">
              Be the first to know when we announce our special guests! Follow us on social media or check back here for updates.
            </p>
            <div className="flex justify-center space-x-4">
              <a
                href="#"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Follow on Facebook
              </a>
              <a
                href="#"
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Follow on Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}