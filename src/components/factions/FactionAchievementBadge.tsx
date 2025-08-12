'use client';

import { Faction, FactionStats } from '@/types/factions';
import { useState } from 'react';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  condition: (factionStats: FactionStats) => boolean;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface FactionAchievementBadgeProps {
  faction: Faction;
  stats: FactionStats;
  showTooltip?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-blood',
    name: 'First Blood',
    description: 'First faction to earn points',
    icon: '⚔️',
    condition: (factionStats) => factionStats.totalPoints > 0,
    rarity: 'common'
  },
  {
    id: 'century-club',
    name: 'Century Club',
    description: 'Reach 100 total points',
    icon: '💯',
    condition: (factionStats) => factionStats.totalPoints >= 100,
    rarity: 'common'
  },
  {
    id: 'growing-strong',
    name: 'Growing Strong',
    description: 'Reach 25 members',
    icon: '👥',
    condition: (factionStats) => factionStats.memberCount >= 25,
    rarity: 'common'
  },
  {
    id: 'thousand-points',
    name: 'Thousand Points',
    description: 'Reach 1,000 total points',
    icon: '🏆',
    condition: (factionStats) => factionStats.totalPoints >= 1000,
    rarity: 'rare'
  },
  {
    id: 'popular-faction',
    name: 'Popular Faction',
    description: 'Reach 50 members',
    icon: '🌟',
    condition: (factionStats) => factionStats.memberCount >= 50,
    rarity: 'rare'
  },
  {
    id: 'high-roller',
    name: 'High Roller',
    description: 'Average 100+ points per member',
    icon: '💎',
    condition: (factionStats) => factionStats.averagePointsPerMember >= 100,
    rarity: 'rare'
  },
  {
    id: 'champion',
    name: 'Champion',
    description: 'Currently in 1st place',
    icon: '👑',
    condition: (factionStats) => factionStats.rank === 1,
    rarity: 'epic'
  },
  {
    id: 'mega-faction',
    name: 'Mega Faction',
    description: 'Reach 100 members',
    icon: '🏰',
    condition: (factionStats) => factionStats.memberCount >= 100,
    rarity: 'epic'
  },
  {
    id: 'point-master',
    name: 'Point Master',
    description: 'Reach 10,000 total points',
    icon: '⭐',
    condition: (factionStats) => factionStats.totalPoints >= 10000,
    rarity: 'epic'
  },
  {
    id: 'legendary-faction',
    name: 'Legendary Faction',
    description: 'Reach 50,000 total points',
    icon: '🔥',
    condition: (factionStats) => factionStats.totalPoints >= 50000,
    rarity: 'legendary'
  },
  {
    id: 'unstoppable',
    name: 'Unstoppable',
    description: 'Average 500+ points per member',
    icon: '⚡',
    condition: (factionStats) => factionStats.averagePointsPerMember >= 500,
    rarity: 'legendary'
  }
];

export default function FactionAchievementBadge({
  faction,
  stats,
  showTooltip = true,
  size = 'md',
  className = ''
}: FactionAchievementBadgeProps) {
  const [showTooltipState, setShowTooltipState] = useState(false);

  const earnedAchievements = ACHIEVEMENTS.filter(achievement => 
    achievement.condition(stats)
  );

  const highestRarityAchievement = earnedAchievements.reduce((highest, current) => {
    const rarityOrder = { common: 1, rare: 2, epic: 3, legendary: 4 };
    return rarityOrder[current.rarity] > rarityOrder[highest?.rarity || 'common'] 
      ? current 
      : highest;
  }, earnedAchievements[0]);

  const sizeClasses = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-8 h-8 text-sm',
    lg: 'w-12 h-12 text-lg'
  };

  const rarityColors = {
    common: 'bg-gray-100 border-gray-300 text-gray-700',
    rare: 'bg-blue-100 border-blue-300 text-blue-700',
    epic: 'bg-purple-100 border-purple-300 text-purple-700',
    legendary: 'bg-gradient-to-br from-yellow-100 to-orange-100 border-yellow-400 text-yellow-800'
  };

  const rarityGlow = {
    common: '',
    rare: 'shadow-blue-200',
    epic: 'shadow-purple-200',
    legendary: 'shadow-yellow-200 shadow-lg'
  };

  if (!highestRarityAchievement) {
    return (
      <div className={`${sizeClasses[size]} rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center ${className}`}>
        <span className="text-gray-400">—</span>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <div
        className={`
          ${sizeClasses[size]} 
          rounded-full border-2 flex items-center justify-center cursor-pointer
          transition-all duration-200 hover:scale-110
          ${rarityColors[highestRarityAchievement.rarity]}
          ${rarityGlow[highestRarityAchievement.rarity]}
        `}
        onMouseEnter={() => showTooltip && setShowTooltipState(true)}
        onMouseLeave={() => showTooltip && setShowTooltipState(false)}
        style={{
          boxShadow: highestRarityAchievement.rarity === 'legendary' 
            ? `0 0 20px ${faction.colors.accent}40` 
            : undefined
        }}
      >
        <span className="font-bold">
          {highestRarityAchievement.icon}
        </span>

        {/* Legendary Sparkle Effect */}
        {highestRarityAchievement.rarity === 'legendary' && (
          <div className="absolute inset-0 rounded-full animate-pulse">
            <div className="absolute top-0 left-1/2 w-1 h-1 bg-yellow-400 rounded-full transform -translate-x-1/2 -translate-y-1 animate-ping" />
            <div className="absolute top-1/2 right-0 w-1 h-1 bg-yellow-400 rounded-full transform translate-x-1 -translate-y-1/2 animate-ping" style={{ animationDelay: '0.5s' }} />
            <div className="absolute bottom-0 left-1/2 w-1 h-1 bg-yellow-400 rounded-full transform -translate-x-1/2 translate-y-1 animate-ping" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/2 left-0 w-1 h-1 bg-yellow-400 rounded-full transform -translate-x-1 -translate-y-1/2 animate-ping" style={{ animationDelay: '1.5s' }} />
          </div>
        )}
      </div>

      {/* Achievement Count Badge */}
      {earnedAchievements.length > 1 && (
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
          {earnedAchievements.length}
        </div>
      )}

      {/* Tooltip */}
      {showTooltip && showTooltipState && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50">
          <div className="bg-gray-900 text-white text-xs rounded-lg p-3 shadow-lg max-w-xs">
            <div className="font-bold mb-1">
              {highestRarityAchievement.icon} {highestRarityAchievement.name}
            </div>
            <div className="text-gray-300 mb-2">
              {highestRarityAchievement.description}
            </div>
            <div className={`text-xs font-medium ${
              highestRarityAchievement.rarity === 'common' ? 'text-gray-400' :
              highestRarityAchievement.rarity === 'rare' ? 'text-blue-400' :
              highestRarityAchievement.rarity === 'epic' ? 'text-purple-400' :
              'text-yellow-400'
            }`}>
              {highestRarityAchievement.rarity.toUpperCase()}
            </div>
            
            {earnedAchievements.length > 1 && (
              <div className="mt-2 pt-2 border-t border-gray-700">
                <div className="text-gray-400 text-xs">
                  +{earnedAchievements.length - 1} more achievements
                </div>
                <div className="mt-1 space-y-1">
                  {earnedAchievements.slice(1, 4).map(achievement => (
                    <div key={achievement.id} className="text-xs text-gray-300">
                      {achievement.icon} {achievement.name}
                    </div>
                  ))}
                  {earnedAchievements.length > 4 && (
                    <div className="text-xs text-gray-400">
                      ...and {earnedAchievements.length - 4} more
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Tooltip Arrow */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />
          </div>
        </div>
      )}
    </div>
  );
}