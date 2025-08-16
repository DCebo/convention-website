import { Metadata } from 'next'
import Link from 'next/link'
import { PageLayout } from '@/components/layout'
import { FactionDashboard } from '@/components/factions'

export const metadata: Metadata = {
  title: 'The Collector&apos;s Guild Chronicles | Collect-It Con 2025',
  description:
    'For centuries, the Collector&apos;s Guild has ruled the Multiverse Market. Join one of four legendary factions vying for the Golden Seal: Vaultbreakers, Relickeepers, Riftwalkers, or Chronoguards.',
  keywords:
    'collectors guild, vaultbreakers, relickeepers, riftwalkers, chronoguards, golden seal, multiverse market, convention, TCG, sports cards',
  openGraph: {
    title: 'The Collector&apos;s Guild Chronicles | Collect-It Con 2025',
    description:
      'For centuries, the Collector&apos;s Guild has ruled the Multiverse Market. Join one of four legendary factions vying for the Golden Seal.',
    type: 'website',
  },
}

export default function FactionsPage() {
  return (
    <PageLayout>
      <div className="bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-purple-900 via-purple-800 to-indigo-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                The Collector&apos;s Guild Chronicles
              </h1>
              <p className="text-xl md:text-2xl text-purple-200 mb-8 max-w-4xl mx-auto">
                For centuries, the Collector&apos;s Guild has quietly ruled the
                Multiverse Market — a hidden nexus where worlds collide and
                treasures beyond imagination are traded. Every decade, the Guild
                gathers at Collect-It Con to determine which faction will hold
                the Golden Seal, the mark of supreme collecting prestige.
              </p>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-3xl mx-auto mb-8">
                <p className="text-lg text-purple-100">
                  <strong>This year, the Seal is up for grabs.</strong> Four
                  legendary guilds are vying for dominance — each with a unique
                  philosophy, trading style, and field strategy.
                </p>
              </div>

              {/* Guild Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-3xl font-bold">4</div>
                  <div className="text-purple-200 text-sm">
                    Legendary Factions
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-3xl font-bold">1</div>
                  <div className="text-purple-200 text-sm">Golden Seal</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-3xl font-bold">∞</div>
                  <div className="text-purple-200 text-sm">
                    Centuries of History
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-3xl font-bold">2025</div>
                  <div className="text-purple-200 text-sm">Chronicle Year</div>
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
                How the Chronicles Unfold
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Choose your faction and help them claim the Golden Seal through
                strategic collecting and faction-specific bonuses!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⚔️</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Choose Your Faction
                </h3>
                <p className="text-gray-600">
                  Join the swift Vaultbreakers, patient Relickeepers,
                  opportunistic Riftwalkers, or coordinated Chronoguards. Each
                  faction has unique buffs and strategies.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Activate Faction Buffs
                </h3>
                <p className="text-gray-600">
                  Earn bonus points through faction-specific abilities: early
                  bird bonuses, power hours, team coordination, and strategic
                  timing.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-yellow-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🏆</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Claim the Golden Seal
                </h3>
                <p className="text-gray-600">
                  At the Sealing Ceremony, the victorious faction&apos;s banner
                  is raised, their name etched into the Guild Ledger, and the
                  Golden Seal placed in their care.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sealing Ceremony Section */}
        <div className="bg-gradient-to-r from-amber-50 to-yellow-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                The Sealing Ceremony
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                At the end of Collect-It Con, the Guild convenes for the
                legendary Sealing Ceremony
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">🏛️</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  The Guild Convenes
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="p-4">
                  <div className="text-3xl mb-2">🚩</div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Banner Raised
                  </h4>
                  <p className="text-gray-600 text-sm">
                    The victorious faction&apos;s banner is raised high above
                    the Guild Hall
                  </p>
                </div>

                <div className="p-4">
                  <div className="text-3xl mb-2">📜</div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Name Etched
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Their name is permanently etched into the ancient Guild
                    Ledger
                  </p>
                </div>

                <div className="p-4">
                  <div className="text-3xl mb-2">🥇</div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Seal Bestowed
                  </h4>
                  <p className="text-gray-600 text-sm">
                    The Golden Seal is placed in their care until the next
                    gathering
                  </p>
                </div>
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg">
                <p className="text-center text-gray-700 italic">
                  &quot; &ldquo;As the crowd cheers, whispers ripple through the
                  hall: <strong>Next year... the contest begins anew.</strong>
                  &rdquo;&quot;
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
                Every guild member enjoys exclusive perks and marketplace
                advantages
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-center mb-4">
                  <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                    <span className="text-xl">🎫</span>
                  </div>
                  <h3 className="font-semibold text-gray-900">
                    Exclusive Access
                  </h3>
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
                  <h3 className="font-semibold text-gray-900">
                    Special Rewards
                  </h3>
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
              Ready to Join the Chronicles?
            </h2>
            <p className="text-xl text-purple-200 mb-8 max-w-2xl mx-auto">
              Choose your faction and help them claim the Golden Seal. The
              Collector&apos;s Guild Chronicles await your legend!
            </p>
            <div className="space-x-4">
              <Link
                href="/buy-now"
                className="inline-block bg-white text-purple-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Enter the Chronicles
              </Link>
              <Link
                href="/participate/volunteer"
                className="inline-block border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white hover:text-purple-600 transition-colors"
              >
                Volunteer for the Guild
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
