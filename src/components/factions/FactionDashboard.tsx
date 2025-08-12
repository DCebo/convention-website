'use client';

import { useState, useEffect } from 'react';
import { Faction, FactionStats } from '@/types/factions';
import { getAllFactions } from '@/data/factions';
import { FactionService } from '@/services/factionService';
import FactionLeaderboard from './FactionLeaderboard';
import FactionHistoryChart from './FactionHistoryChart';

interface FactionDashboardProps {
  userId?: string;
  showHistory?: boolean;
  showUserStats?: boolean;
  refreshInterval?: number;
  className?: string;
}

interface UserFactionInfo {
  faction: Faction;
  points: number;
  rank: number;
  percentile: number;
}

export default function FactionDashboard({
  userId,
  showHistory = true,
  showUserStats = true,
  refreshInterval = 30000,
  className = ''
}: FactionDashboardProps) {
  const [factions] = useState<Faction[]>(getAllFactions());
  const [factionStats, setFactionStats] = useState<FactionStats[]>([]);
  const [userFactionInfo, setUserFactionInfo] = useState<UserFactionInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'leaderboard' | 'history' | 'stats'>('leaderboard');

  // Load data
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const stats = await FactionService.getAllFactionStats();
        setFactionStats(stats);

        // Load user faction info if userId provided
        if (userId && showUserStats) {
          const userFaction = await FactionService.getUserFaction(userId);
          if (userFaction) {
            const faction = factions.find(f => f.id === userFaction.factionId);
            if (faction) {
              const factionStat = stats.find(s => s.factionId === faction.id);
              if (factionStat) {
                // Calculate user rank within faction (mock for now)
                const userRankInFaction = Math.floor(Math.random() * factionStat.memberCount) + 1;
                const percentile = ((factionStat.memberCount - userRankInFaction) / factionStat.memberCount) * 100;

                setUserFactionInfo({
                  faction,
                  points: userFaction.totalPoints,
                  rank: userRankInFaction,
                  percentile
                });
              }
            }
          }
        }
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
        setError('Failed to load dashboard data');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [userId, showUserStats, factions]);

  // Auto-refresh
  useEffect(() => {
    if (refreshInterval <= 0) return;

    const interval = setInterval(async () => {
      try {
        const stats = await FactionService.getAllFactionStats();
        setFactionStats(stats);
      } catch (err) {
        console.error('Failed to refresh data:', err);
      }
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [refreshInterval]);

  const getTotalParticipants = (): number => {
    return factionStats.reduce((total, stat) => total + stat.memberCount, 0);
  };

  const getTotalPoints = (): number => {
    return factionStats.reduce((total, stat) => total + stat.totalPoints, 0);
  };

  const getLeadingFaction = (): FactionStats | null => {
    return factionStats.find(stat => stat.rank === 1) || null;
  };

  if (isLoading) {
    return (
      <div className={`space-y-6 ${className}`}>
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-lg shadow p-6">
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-lg shadow p-8">
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-white rounded-lg shadow-lg p-8 text-center ${className}`}>
        <div className="text-red-500 mb-4">
          <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <p className="text-lg font-medium">Dashboard Error</p>
        </div>
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  const leadingFaction = getLeadingFaction();

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Guild Prestige Dashboard
        </h1>
        <p className="text-gray-600">
          Track the race for prestige among collector guilds in real-time
        </p>
      </div>

      {/* User Stats (if available) */}
      {userFactionInfo && showUserStats && (
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold mb-1">Your Guild</h2>
              <div className="flex items-center space-x-4">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: userFactionInfo.faction.colors.accent }}
                />
                <span className="text-lg font-semibold">
                  {userFactionInfo.faction.displayName}
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">
                {userFactionInfo.points.toLocaleString()}
              </div>
              <div className="text-purple-200 text-sm">Your Prestige</div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-purple-200">Guild Rank:</span>
              <span className="ml-2 font-semibold">#{userFactionInfo.rank}</span>
            </div>
            <div>
              <span className="text-purple-200">Top:</span>
              <span className="ml-2 font-semibold">{userFactionInfo.percentile.toFixed(1)}%</span>
            </div>
          </div>
        </div>
      )}

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <div className="text-3xl font-bold text-purple-600 mb-2">
            {getTotalParticipants().toLocaleString()}
          </div>
          <div className="text-gray-600">Total Participants</div>
          <div className="text-sm text-gray-500 mt-1">
            Across all factions
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">
            {getTotalPoints().toLocaleString()}
          </div>
          <div className="text-gray-600">Total Points Earned</div>
          <div className="text-sm text-gray-500 mt-1">
            Convention-wide
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 text-center">
          {leadingFaction ? (
            <>
              <div className="flex items-center justify-center mb-2">
                <div
                  className="w-4 h-4 rounded-full mr-2"
                  style={{ backgroundColor: factions.find(f => f.id === leadingFaction.factionId)?.colors.primary }}
                />
                <div className="text-lg font-bold text-gray-900">
                  {factions.find(f => f.id === leadingFaction.factionId)?.displayName}
                </div>
              </div>
              <div className="text-gray-600">Leading Guild</div>
              <div className="text-sm text-gray-500 mt-1">
                {leadingFaction.totalPoints.toLocaleString()} prestige
              </div>
            </>
          ) : (
            <>
              <div className="text-3xl font-bold text-gray-400 mb-2">—</div>
              <div className="text-gray-600">No Leader Yet</div>
              <div className="text-sm text-gray-500 mt-1">
                The battle begins!
              </div>
            </>
          )}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex">
            <button
              onClick={() => setActiveTab('leaderboard')}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'leaderboard'
                  ? 'border-purple-500 text-purple-600 bg-purple-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              🏆 Leaderboard
            </button>
            {showHistory && (
              <button
                onClick={() => setActiveTab('history')}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'history'
                    ? 'border-purple-500 text-purple-600 bg-purple-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                📈 History
              </button>
            )}
            <button
              onClick={() => setActiveTab('stats')}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'stats'
                  ? 'border-purple-500 text-purple-600 bg-purple-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              📊 Stats
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'leaderboard' && (
            <FactionLeaderboard
              refreshInterval={refreshInterval}
              showTopMembers={true}
              showAchievements={true}
              showSocialShare={true}
            />
          )}

          {activeTab === 'history' && showHistory && (
            <FactionHistoryChart
              factions={factions}
              historyData={[]} // Would be populated with real data
              timeRange="7d"
              showMembers={true}
              height={400}
            />
          )}

          {activeTab === 'stats' && (
            <div className="space-y-6">
              {/* Faction Comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Points Distribution
                  </h3>
                  <div className="space-y-3">
                    {factionStats.map(stat => {
                      const faction = factions.find(f => f.id === stat.factionId);
                      if (!faction) return null;
                      
                      const percentage = getTotalPoints() > 0 ? (stat.totalPoints / getTotalPoints()) * 100 : 0;
                      
                      return (
                        <div key={stat.factionId}>
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span className="font-medium">{faction.displayName}</span>
                            <span>{percentage.toFixed(1)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="h-2 rounded-full transition-all duration-500"
                              style={{
                                width: `${percentage}%`,
                                backgroundColor: faction.colors.primary
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Member Distribution
                  </h3>
                  <div className="space-y-3">
                    {factionStats.map(stat => {
                      const faction = factions.find(f => f.id === stat.factionId);
                      if (!faction) return null;
                      
                      const percentage = getTotalParticipants() > 0 ? (stat.memberCount / getTotalParticipants()) * 100 : 0;
                      
                      return (
                        <div key={stat.factionId}>
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span className="font-medium">{faction.displayName}</span>
                            <span>{percentage.toFixed(1)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="h-2 rounded-full transition-all duration-500"
                              style={{
                                width: `${percentage}%`,
                                backgroundColor: faction.colors.secondary
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Detailed Stats Table */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Detailed Statistics
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2">Faction</th>
                        <th className="text-right py-2">Rank</th>
                        <th className="text-right py-2">Points</th>
                        <th className="text-right py-2">Members</th>
                        <th className="text-right py-2">Avg/Member</th>
                        <th className="text-right py-2">Purchase Points</th>
                        <th className="text-right py-2">Bonus Points</th>
                      </tr>
                    </thead>
                    <tbody>
                      {factionStats.map(stat => {
                        const faction = factions.find(f => f.id === stat.factionId);
                        if (!faction) return null;
                        
                        return (
                          <tr key={stat.factionId} className="border-b border-gray-100">
                            <td className="py-2">
                              <div className="flex items-center space-x-2">
                                <div
                                  className="w-3 h-3 rounded-full"
                                  style={{ backgroundColor: faction.colors.primary }}
                                />
                                <span className="font-medium">{faction.displayName}</span>
                              </div>
                            </td>
                            <td className="text-right py-2 font-semibold">#{stat.rank}</td>
                            <td className="text-right py-2">{stat.totalPoints.toLocaleString()}</td>
                            <td className="text-right py-2">{stat.memberCount.toLocaleString()}</td>
                            <td className="text-right py-2">{Math.round(stat.averagePointsPerMember).toLocaleString()}</td>
                            <td className="text-right py-2">{stat.pointsFromPurchases.toLocaleString()}</td>
                            <td className="text-right py-2">{stat.pointsFromBonuses.toLocaleString()}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}