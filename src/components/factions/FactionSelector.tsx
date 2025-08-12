'use client';

import { useState } from 'react';
import { FactionId } from '@/types/factions';
import { getAllFactions } from '@/data/factions';
import FactionCard from './FactionCard';

interface FactionSelectorProps {
  onFactionSelect: (factionId: FactionId) => void;
  selectedFactionId?: FactionId;
  disabled?: boolean;
  showStats?: boolean;
}

export default function FactionSelector({ 
  onFactionSelect, 
  selectedFactionId, 
  disabled = false,
  showStats = false 
}: FactionSelectorProps) {
  const [selectedFaction, setSelectedFaction] = useState<FactionId | undefined>(selectedFactionId);
  const factions = getAllFactions();

  const handleFactionSelect = (factionId: string) => {
    if (disabled) return;
    
    const newSelection = factionId as FactionId;
    setSelectedFaction(newSelection);
    onFactionSelect(newSelection);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Choose Your Faction
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Join one of four legendary factions and compete for glory! Each faction offers unique benefits 
          and represents different aspects of the convention community.
        </p>
      </div>

      {/* Faction Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {factions.map((faction) => (
          <FactionCard
            key={faction.id}
            faction={faction}
            isSelected={selectedFaction === faction.id}
            onSelect={handleFactionSelect}
            showStats={showStats}
            className={disabled ? 'opacity-50 cursor-not-allowed' : ''}
          />
        ))}
      </div>

      {/* Selection Confirmation */}
      {selectedFaction && !disabled && (
        <div className="text-center p-4 bg-green-50 border border-green-200 rounded-lg max-w-md mx-auto">
          <div className="flex items-center justify-center mb-2">
            <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-green-800 font-medium">Faction Selected!</span>
          </div>
          <p className="text-green-700 text-sm">
            You have chosen to join the <strong>{factions.find(f => f.id === selectedFaction)?.displayName}</strong>. 
            Complete your registration to officially join the faction war!
          </p>
        </div>
      )}

      {/* Disabled State Message */}
      {disabled && (
        <div className="text-center p-4 bg-gray-50 border border-gray-200 rounded-lg max-w-md mx-auto">
          <p className="text-gray-600 text-sm">
            Faction selection is currently disabled. Please complete your registration first.
          </p>
        </div>
      )}
    </div>
  );
}