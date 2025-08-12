'use client';

import { Faction, FactionStats } from '@/types/factions';
import { useState } from 'react';

interface FactionSocialShareProps {
  faction: Faction;
  stats: FactionStats;
  rank: number;
  className?: string;
}

interface SharePlatform {
  name: string;
  icon: string;
  color: string;
  getUrl: (text: string, url?: string) => string;
}

const SHARE_PLATFORMS: SharePlatform[] = [
  {
    name: 'Twitter',
    icon: '𝕏',
    color: 'bg-black hover:bg-gray-800',
    getUrl: (text, url = '') => `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
  },
  {
    name: 'Facebook',
    icon: '📘',
    color: 'bg-blue-600 hover:bg-blue-700',
    getUrl: (text, url = '') => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`
  },
  {
    name: 'Reddit',
    icon: '🔴',
    color: 'bg-orange-600 hover:bg-orange-700',
    getUrl: (text, url = '') => `https://reddit.com/submit?title=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
  },
  {
    name: 'Discord',
    icon: '💬',
    color: 'bg-indigo-600 hover:bg-indigo-700',
    getUrl: (text) => `https://discord.com/channels/@me?message=${encodeURIComponent(text)}`
  }
];

export default function FactionSocialShare({
  faction,
  stats,
  rank,
  className = ''
}: FactionSocialShareProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);

  const generateShareText = (): string => {
    const rankText = rank === 1 ? '🏆 LEADING' : `#${rank}`;
    const prestigeText = stats.totalPoints.toLocaleString();
    const membersText = stats.memberCount.toLocaleString();
    
    return `${rankText} in the Multiverse Marketplace! 🏪✨\n\n` +
           `${faction.displayName} (${faction.theme})\n` +
           `📊 ${prestigeText} prestige | 👥 ${membersText} collectors\n` +
           `💪 "${faction.motto}"\n\n` +
           `Join the hunt for the Golden Seal! #MultiverseMarketplace2025 #${faction.name.replace('-', '')}`;
  };

  const generateShareUrl = (): string => {
    // In a real app, this would be the actual URL to the faction page
    return `${window.location.origin}/factions/${faction.id}`;
  };

  const handleShare = (platform: SharePlatform) => {
    const text = generateShareText();
    const url = generateShareUrl();
    const shareUrl = platform.getUrl(text, url);
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  const handleCopyToClipboard = async () => {
    try {
      const text = generateShareText() + '\n\n' + generateShareUrl();
      await navigator.clipboard.writeText(text);
      setCopiedToClipboard(true);
      setTimeout(() => setCopiedToClipboard(false), 2000);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  };

  const getRankEmoji = (): string => {
    switch (rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return '🏅';
    }
  };

  const getRankText = (): string => {
    switch (rank) {
      case 1: return 'Leading the charge!';
      case 2: return 'Close behind!';
      case 3: return 'In the running!';
      default: return 'Fighting strong!';
    }
  };

  return (
    <div className={`${className}`}>
      {/* Share Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`
          w-full flex items-center justify-center space-x-2 py-2 px-4 rounded-md text-sm font-medium
          transition-all duration-200 border-2
        `}
        style={{
          borderColor: faction.colors.primary,
          color: faction.colors.primary,
          backgroundColor: isExpanded ? `${faction.colors.primary}10` : 'transparent'
        }}
      >
        <span>{getRankEmoji()}</span>
        <span>Share Guild Progress</span>
        <svg 
          className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Expanded Share Options */}
      {isExpanded && (
        <div className="mt-3 p-4 rounded-lg border" style={{ backgroundColor: `${faction.colors.background}` }}>
          {/* Share Preview */}
          <div className="mb-4 p-3 bg-white rounded-lg border text-sm">
            <div className="font-bold mb-1" style={{ color: faction.colors.primary }}>
              {getRankEmoji()} {faction.displayName} - {getRankText()}
            </div>
            <div className="text-gray-600 mb-2">
              Rank #{rank} • {stats.totalPoints.toLocaleString()} prestige • {stats.memberCount.toLocaleString()} collectors
            </div>
            <div className="text-gray-500 italic text-xs">
              &ldquo;{faction.motto}&rdquo;
            </div>
          </div>

          {/* Platform Buttons */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            {SHARE_PLATFORMS.map((platform) => (
              <button
                key={platform.name}
                onClick={() => handleShare(platform)}
                className={`
                  flex items-center justify-center space-x-2 py-2 px-3 rounded-md text-white text-sm font-medium
                  transition-all duration-200 hover:scale-105 active:scale-95
                  ${platform.color}
                `}
              >
                <span>{platform.icon}</span>
                <span>{platform.name}</span>
              </button>
            ))}
          </div>

          {/* Copy to Clipboard */}
          <button
            onClick={handleCopyToClipboard}
            className={`
              w-full flex items-center justify-center space-x-2 py-2 px-3 rounded-md text-sm font-medium
              transition-all duration-200 border
              ${copiedToClipboard 
                ? 'bg-green-50 border-green-300 text-green-700' 
                : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
              }
            `}
          >
            {copiedToClipboard ? (
              <>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span>Copy to Clipboard</span>
              </>
            )}
          </button>

          {/* Share Tips */}
          <div className="mt-3 text-xs text-gray-500">
            <div className="flex items-start space-x-1">
              <span>💡</span>
              <div>
                <div className="font-medium">Share tips:</div>
                <ul className="mt-1 space-y-1 list-disc list-inside">
                  <li>Tag friends to recruit them to your guild</li>
                  <li>Use #MultiverseMarketplace2025 to join the conversation</li>
                  <li>Share your collecting achievements and rare finds</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}