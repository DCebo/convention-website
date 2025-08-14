import { Metadata } from 'next';
import Link from 'next/link';
import { PageLayout } from '@/components/layout';
import { FactionDashboard } from '@/components/factions';

export const metadata: Metadata = {
  title: 'Guild Prestige Tracker | Multiverse Marketplace 2025',
  description: 'Track the race for prestige among rival collector guilds in the bustling multiverse marketplace. See leaderboards, achievements, and progress toward the Golden Seal.',
  keywords: 'guild prestige, collector guilds, multiverse marketplace, competition, convention, TCG, sports cards, comics',
  openGraph: {
    title: 'Guild Prestige Tracker | Multiverse Marketplace 2025',
    description: 'Track the race for prestige among rival collector guilds in the bustling multiverse marketplace. See leaderboards, achievements, and progress toward the Golden Seal.',
    type: 'website',
  },
};

export default function FactionsPage() {
  return (
    <PageLayout>
      <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-900 via-purple-800 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              The Multiverse Marketplace
            </h1>
            <p className="text-xl md:text-2xl text-purple-200 mb-8 max-w-3xl mx-auto">
              In the bustling multiverse marketplace, rival guilds of collectors race to acquire the most prized items. Join a guild, explore booths, uncover secret QR deal markers, and help your guild earn the Golden Seal!
            </p>
            
            {/* Guild Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold">4</div>
                <div className="text-purple-200 text-sm">Collector Guilds</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold">∞</div>
                <div className="text-purple-200 text-sm">Prestige to Earn</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold">1</div>
                <div className="text-purple-200 text-sm">Golden Seal</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold">2025</div>
                <div className="text-purple-200 text-sm">Marketplace Year</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <FactionDashboard
          showHistory={true}
          showUserStats={true}
          refreshInterval={30000}
        />
      </div>

      {/* How It Works Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How the Guild Competition Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join a collector&apos;s guild and help them earn the most prestige in the multiverse marketplace!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚔️</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Join Your Guild
              </h3>
              <p className="text-gray-600">
                Get recruited into one of four collector guilds upon arrival, each with unique specialties, benefits, and exclusive rewards.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Earn Prestige
              </h3>
              <p className="text-gray-600">
                Gain prestige by trading, exploring booths, and uncovering secret QR deal markers throughout the marketplace.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-yellow-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏆</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Win the Golden Seal
              </h3>
              <p className="text-gray-600">
                The guild with the most prestige by closing ceremony earns the Golden Seal of the Collector&apos;s Guild—a title that passes from con to con like a championship belt!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Faction Benefits Section */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Guild Member Benefits
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every guild member enjoys exclusive perks and marketplace advantages
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-center mb-4">
                <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                  <span className="text-xl">🎫</span>
                </div>
                <h3 className="font-semibold text-gray-900">Exclusive Access</h3>
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Priority access to rare items</li>
                <li>• Guild-only trading sessions</li>
                <li>• Early marketplace entry</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-center mb-4">
                <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                  <span className="text-xl">🎁</span>
                </div>
                <h3 className="font-semibold text-gray-900">Special Rewards</h3>
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Guild badges and lanyards</li>
                <li>• Exclusive guild merchandise</li>
                <li>• Collector&apos;s commemorative items</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-center mb-4">
                <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                  <span className="text-xl">💸</span>
                </div>
                <h3 className="font-semibold text-gray-900">Discounts</h3>
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 10% off guild-themed items</li>
                <li>• Special marketplace pricing</li>
                <li>• Bonus prestige multipliers</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-center mb-4">
                <div className="bg-red-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                  <span className="text-xl">👥</span>
                </div>
                <h3 className="font-semibold text-gray-900">Community</h3>
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Private guild gatherings</li>
                <li>• Collector challenges</li>
                <li>• Marketplace recognition</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Enter the Marketplace?
          </h2>
          <p className="text-xl text-purple-200 mb-8 max-w-2xl mx-auto">
            Get recruited into a collector&apos;s guild and start earning prestige today. The race for the Golden Seal begins now!
          </p>
          <div className="space-x-4">
            <Link
              href="/buy-now"
              className="inline-block bg-white text-purple-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Get Your Ticket
            </Link>
            <Link
              href="/participate/volunteer"
              className="inline-block border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white hover:text-purple-600 transition-colors"
            >
              Join as Volunteer
            </Link>
          </div>
        </div>
      </div>
      </div>
    </PageLayout>
  );
}