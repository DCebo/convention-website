'use client';

import { Faction } from '@/types/factions';
import { useState } from 'react';

interface FactionCardProps {
  faction: Faction;
  isSelected?: boolean;
  onSelect?: (factionId: string) => void;
  showStats?: boolean;
  className?: string;
}

export default function FactionCard({ 
  faction, 
  isSelected = false, 
  onSelect, 
  showStats = false,
  className = '' 
}: FactionCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSelect = () => {
    if (onSelect) {
      onSelect(faction.id);
    }
  };

  return (
    <div 
      className={`
        relative overflow-hidden rounded-lg border-2 transition-all duration-300 cursor-pointer
        ${isSelected 
          ? `border-4 shadow-lg transform scale-105` 
          : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
        }
        ${className}
      `}
      style={{
        borderColor: isSelected ? faction.colors.primary : undefined,
        backgroundColor: faction.colors.background,
      }}
      onClick={handleSelect}
    >
      {/* Faction Header */}
      <div 
        className="p-6 text-white relative text-center"
        style={{ backgroundColor: faction.colors.primary }}
      >
        <div className="flex items-center justify-center relative">
          <div>
            <h3 className="text-xl font-bold">{faction.displayName}</h3>
            <p className="text-sm opacity-90">{faction.theme}</p>
          </div>
          {isSelected && (
            <div className="absolute top-0 right-0 bg-white rounded-full p-2">
              <svg className="w-6 h-6" style={{ color: faction.colors.primary }} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>
        
        {/* Motto */}
        <div className="mt-3 italic text-sm opacity-90">
          &ldquo;{faction.motto}&rdquo;
        </div>
      </div>

      {/* Faction Content */}
      <div className="p-6 text-center" style={{ color: faction.colors.text }}>
        <p className="text-sm mb-4 leading-relaxed">
          {faction.description}
        </p>

        {/* Stats Section */}
        {showStats && (
          <div className="mb-4 p-3 rounded-md text-center" style={{ backgroundColor: faction.colors.background }}>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-semibold">Members:</span>
                <span className="ml-2">{faction.memberCount.toLocaleString()}</span>
              </div>
              <div>
                <span className="font-semibold">Points:</span>
                <span className="ml-2">{faction.totalPoints.toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}

        {/* Benefits Toggle */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(!isExpanded);
          }}
          className="flex items-center justify-center w-full text-sm font-medium mb-2 hover:opacity-80"
          style={{ color: faction.colors.primary }}
        >
          <span>Faction Benefits</span>
          <svg 
            className={`w-4 h-4 ml-2 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Benefits List */}
        {isExpanded && (
          <ul className="text-xs space-y-1 text-left max-w-xs mx-auto">
            {faction.benefits.map((benefit, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-2 mt-1">•</span>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Selection Indicator */}
      {isSelected && (
        <div 
          className="absolute top-0 right-0 w-0 h-0 border-l-[30px] border-b-[30px] border-l-transparent"
          style={{ borderBottomColor: faction.colors.accent }}
        >
          <svg 
            className="absolute -bottom-6 -right-5 w-4 h-4 text-white"
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      )}
    </div>
  );
}