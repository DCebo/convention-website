import { PageLayout } from '@/components/layout';

export default function EventsPage() {
  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          {/* Icon */}
          <div className="mb-8">
            <div className="mx-auto w-24 h-24 bg-gradient-to-r from-purple-600 to-accent rounded-full flex items-center justify-center">
              <div className="text-4xl">🎉</div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-primary mb-4">Programming Events</h1>
          
          {/* Coming Soon Message */}
          <div className="bg-card-bg border border-border rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-primary mb-4">Coming Soon</h2>
            <p className="text-lg text-gray-600 mb-6">
              We&apos;re planning an incredible lineup of programming events for Collect-It-Con! 
              Get ready for tournaments, contests, special activities, and much more.
            </p>
            <div className="bg-gradient-to-r from-purple-100 to-accent/10 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-primary mb-3">What to Expect</h3>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-center">
                  <span className="text-accent mr-2">🏆</span>
                  TCG and sports card tournaments with prizes
                </li>
                <li className="flex items-center">
                  <span className="text-accent mr-2">🎮</span>
                  Interactive gaming competitions and challenges
                </li>
                <li className="flex items-center">
                  <span className="text-accent mr-2">🎯</span>
                  Faction-based contests with exciting rewards
                </li>
                <li className="flex items-center">
                  <span className="text-accent mr-2">🎪</span>
                  Special activities and community events
                </li>
                <li className="flex items-center">
                  <span className="text-accent mr-2">🏅</span>
                  Prize giveaways and exclusive merchandise
                </li>
              </ul>
            </div>
          </div>

          {/* Highlight Box */}
          <div className="rounded-lg p-6 text-white mb-8" style={{
            background: 'linear-gradient(90deg, #9333ea 0%, #7c3aed 100%)',
            backgroundImage: 'linear-gradient(90deg, #9333ea 0%, #7c3aed 100%)'
          }}>
            <h3 className="text-xl font-bold mb-3">🚀 Something Big is Coming!</h3>
            <p className="text-lg text-white" style={{ opacity: 0.9, color: 'rgba(255, 255, 255, 0.9)' }}>
              We&apos;re working on a revolutionary gamified experience that will transform 
              how you participate in conventions. Stay tuned for details about our 
              faction-based competition system!
            </p>
          </div>

          {/* Stay Updated */}
          <div className="bg-slate-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-primary mb-3">Stay in the Loop</h3>
            <p className="text-gray-600 mb-4">
              Be the first to know about event announcements, tournament schedules, and special contests!
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