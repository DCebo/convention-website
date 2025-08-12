'use client';

import { useState, useEffect } from 'react';
import { FactionStats, Faction } from '@/types/factions';
import { getAllFactions } from '@/data/factions';
import { FactionService } from '@/services/factionService';
import FactionProgressBar from './FactionProgressBar';
import FactionAchievementBadge from './FactionAchievementBadge';
import FactionSocialShare from './FactionSocialShare';

interface FactionLeaderboardProps {
  refreshInterval?: number;
  showTopMembers?: boolean;
  showAchievements?: boolean;
  showSocialShare?: boolean;
  className?: string;
}

export default function FactionLeaderboard({
  refreshInterval = 30000, // 30 seconds
  showTopMembers = true,
  showAchievements = true,
  showSocialShare = true,
  className = ''
}: FactionLeaderboardProps) {
  const [factionStats, setFactionStats] = useState<FactionStats[]>([]);
  const [factions, setFactions] = useState<Faction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [error, setError] = useState<string | null>(null);

  // Load faction data
  useEffect(() => {
    const loadFactionData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const [stats, factionsData] = await Promise.all([
          FactionService.getAllFactionStats(),
          Promise.resolve(getAllFactions())
        ]);
        
        setFactionStats(stats);
        setFactions(factionsData);
        setLastUpdated(new Date());
      } catch (err) {
        console.error('Failed to load guild data:', err);
        setError('Failed to load guild data');
      } finally {
        setIsLoading(false);
      }
    };

    loadFactionData();
  }, []);

  // Auto-refresh data
  useEffect(() => {
    if (refreshInterval <= 0) return;

    const interval = setInterval(async () => {
      try {
        const stats = await FactionService.getAllFactionStats();
        setFactionStats(stats);
        setLastUpdated(new Date());
      } catch (err) {
        console.error('Failed to refresh guild data:', err);
      }
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [refreshInterval]);

  const getFactionById = (factionId: string): Faction | undefined => {
    return factions.find(f => f.id === factionId);
  };

  const getMaxPoints = (): number => {
    return Math.max(...factionStats.map(stat => stat.totalPoints), 1);
  };

  const formatLastUpdated = (): string => {
    const now = new Date();
    const diffMs = now.getTime() - lastUpdated.getTime();
    const diffSeconds = Math.floor(diffMs / 1000);
    
    if (diffSeconds < 60) return `${diffSeconds}s ago`;
    if (diffSeconds < 3600) return `${Math.floor(diffSeconds / 60)}m ago`;
    return `${Math.floor(diffSeconds / 3600)}h ago`;
  };

  if (isLoading) {
    return (
      <div className={`bg-white rounded-lg shadow-lg p-8 ${className}`}>
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto"></div>
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="space-y-3">
              <div className="h-6 bg-gray-200 rounded w-1/4"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          ))}
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
          <p className="text-lg font-medium">Error Loading Leaderboard</p>
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

  return (
    <div className={`bg-white rounded-lg shadow-lg overflow-hidden ${className}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-1">Guild Prestige Tracker</h2>
            <p className="text-purple-100">The Multiverse Marketplace 2025</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-purple-100">Last updated</div>
            <div className="text-lg font-semibold">{formatLastUpdated()}</div>
          </div>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="p-6 space-y-6">
        {factionStats.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-400 mb-2">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <p className="text-gray-600 text-lg">No guild data available</p>
            <p className="text-gray-500 text-sm">Get recruited into a guild to start collecting!</p>
          </div>
        ) : (
          factionStats.map((stat, index) => {
            const faction = getFactionById(stat.factionId);
            if (!faction) return null;

            const isWinning = index === 0;
            const maxPoints = getMaxPoints();

            return (
              <div
                key={stat.factionId}
                className={`relative rounded-lg border-2 transition-all duration-300 ${
                  isWinning 
                    ? 'border-yellow-400 bg-gradient-to-r from-yellow-50 to-amber-50 shadow-lg' 
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                {/* Rank Badge */}
                <div className="absolute -top-3 -left-3 z-10">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                      index === 0 ? 'bg-yellow-500' :
                      index === 1 ? 'bg-gray-400' :
                      index === 2 ? 'bg-amber-600' :
                      'bg-gray-500'
                    }`}
                  >
                    {index + 1}
                  </div>
                </div>

                {/* Crown for winner */}
                {isWinning && (
                  <div className="absolute -top-2 left-6 text-yellow-500">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732L14.146 12.8l-1.179 4.456a1 1 0 01-1.934 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732L9.854 7.2l1.179-4.456A1 1 0 0112 2z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}

                <div className="p-6">
                  {/* Faction Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: faction.colors.primary }}
                      ></div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {faction.displayName}
                        </h3>
                        <p className="text-sm text-gray-600">{faction.theme}</p>
                      </div>
                    </div>
                    
                    {showAchievements && (
                      <FactionAchievementBadge 
                        faction={faction} 
                        stats={stat}
                        className="flex-shrink-0"
                      />
                    )}
                  </div>

                  {/* Progress Bar */}
                  <FactionProgressBar
                    faction={faction}
                    currentPoints={stat.totalPoints}
                    maxPoints={maxPoints}
                    animated={true}
                    showPercentage={true}
                    className="mb-4"
                  />

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold" style={{ color: faction.colors.primary }}>
                        {stat.totalPoints.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-600">Total Points</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-700">
                        {stat.memberCount.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-600">Members</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-700">
                        {Math.round(stat.averagePointsPerMember).toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-600">Avg/Member</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {stat.pointsFromPurchases.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-600">Purchase Points</div>
                    </div>
                  </div>

                  {/* Top Members */}
                  {showTopMembers && stat.topMembers.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Top Contributors</h4>
                      <div className="space-y-1">
                        {stat.topMembers.slice(0, 3).map((member, idx) => (
                          <div key={member.userId} className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">
                              {idx + 1}. {member.displayName || `Member ${member.userId.slice(-4)}`}
                            </span>
                            <span className="font-semibold" style={{ color: faction.colors.primary }}>
                              {member.points.toLocaleString()} pts
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Social Share */}
                  {showSocialShare && (
                    <FactionSocialShare
                      faction={faction}
                      stats={stat}
                      rank={index + 1}
                      className="mt-4"
                    />
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer */}
      <div className="bg-gray-50 px-6 py-4 border-t">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div>
            Prestige is earned through trading, exploring booths, and finding QR deal markers
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Live updates every {Math.floor(refreshInterval / 1000)}s</span>
          </div>
        </div>
      </div>
    </div>
  );
}