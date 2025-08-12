'use client';

import { useState, useEffect } from 'react';
import { Faction } from '@/types/factions';

interface FactionProgressBarProps {
  faction: Faction;
  currentPoints: number;
  maxPoints: number;
  animated?: boolean;
  showPercentage?: boolean;
  showPoints?: boolean;
  height?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function FactionProgressBar({
  faction,
  currentPoints,
  maxPoints,
  animated = true,
  showPercentage = false,
  showPoints = false,
  height = 'md',
  className = ''
}: FactionProgressBarProps) {
  const [animatedWidth, setAnimatedWidth] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const percentage = maxPoints > 0 ? (currentPoints / maxPoints) * 100 : 0;

  // Height classes
  const heightClasses = {
    sm: 'h-2',
    md: 'h-4',
    lg: 'h-6'
  };

  // Animate progress bar on mount
  useEffect(() => {
    if (!animated) {
      setAnimatedWidth(percentage);
      return;
    }

    const timer = setTimeout(() => {
      setIsVisible(true);
      setAnimatedWidth(percentage);
    }, 100);

    return () => clearTimeout(timer);
  }, [percentage, animated]);

  // Create gradient background
  const gradientStyle = {
    background: `linear-gradient(90deg, ${faction.colors.primary} 0%, ${faction.colors.secondary} 100%)`
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Labels */}
      {(showPoints || showPercentage) && (
        <div className="flex items-center justify-between text-sm">
          {showPoints && (
            <span className="font-medium text-gray-700">
              {currentPoints.toLocaleString()} / {maxPoints.toLocaleString()} points
            </span>
          )}
          {showPercentage && (
            <span 
              className="font-semibold"
              style={{ color: faction.colors.primary }}
            >
              {percentage.toFixed(1)}%
            </span>
          )}
        </div>
      )}

      {/* Progress Bar Container */}
      <div className="relative">
        <div 
          className={`w-full bg-gray-200 rounded-full overflow-hidden ${heightClasses[height]}`}
        >
          {/* Background Pattern */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `repeating-linear-gradient(
                45deg,
                transparent,
                transparent 4px,
                ${faction.colors.primary} 4px,
                ${faction.colors.primary} 8px
              )`
            }}
          />

          {/* Progress Fill */}
          <div
            className={`h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden ${
              animated ? 'transform-gpu' : ''
            }`}
            style={{
              width: `${animatedWidth}%`,
              ...gradientStyle
            }}
          >
            {/* Shine Effect */}
            {animated && isVisible && (
              <div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"
                style={{
                  animation: 'shine 2s ease-in-out infinite'
                }}
              />
            )}

            {/* Pulse Effect for Leading Faction */}
            {percentage > 80 && (
              <div
                className="absolute inset-0 bg-white opacity-20 animate-pulse"
                style={{
                  animation: 'pulse 1.5s ease-in-out infinite'
                }}
              />
            )}
          </div>
        </div>

        {/* Milestone Markers */}
        {maxPoints > 0 && (
          <div className="absolute inset-0 flex items-center">
            {[25, 50, 75].map(milestone => (
              <div
                key={milestone}
                className="absolute w-0.5 h-full bg-white opacity-60"
                style={{ left: `${milestone}%` }}
              >
                <div className="absolute -top-1 -left-2 w-4 h-1 bg-white rounded-full opacity-80" />
              </div>
            ))}
          </div>
        )}

        {/* Current Position Indicator */}
        {percentage > 0 && (
          <div
            className="absolute top-0 w-1 bg-white rounded-full opacity-80 transition-all duration-1000"
            style={{
              left: `${Math.min(animatedWidth, 99)}%`,
              height: '100%',
              boxShadow: `0 0 8px ${faction.colors.primary}`
            }}
          />
        )}
      </div>

      {/* Faction Motto */}
      {percentage > 50 && (
        <div className="text-center">
          <p 
            className="text-xs italic font-medium"
            style={{ color: faction.colors.primary }}
          >
            &ldquo;{faction.motto}&rdquo;
          </p>
        </div>
      )}

      <style jsx>{`
        @keyframes shine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}