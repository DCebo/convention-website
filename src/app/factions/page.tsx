'use client';

import { useState, useEffect } from 'react';
import { FactionSelector, QRCodeDisplay } from '@/components/factions';
import { FactionId, QRCode } from '@/types/factions';
import { FactionService } from '@/services/factionService';
import { FACTION_CONTEST } from '@/data/factions';

export default function FactionsPage() {
  const [selectedFaction, setSelectedFaction] = useState<FactionId | undefined>();
  const [userQRCodes, setUserQRCodes] = useState<QRCode[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string>('');
  
  // Mock user ID for demo purposes
  const mockUserId = 'demo-user-123';

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const member = await FactionService.getUserFaction(mockUserId);
      if (member && member.isActive) {
        setSelectedFaction(member.factionId as FactionId);
      }
      
      const qrCodes = await FactionService.getUserQRCodes(mockUserId);
      setUserQRCodes(qrCodes);
    } catch (error) {
      console.error('Failed to load user data:', error);
    }
  };

  const handleFactionSelect = async (factionId: FactionId) => {
    setIsLoading(true);
    setMessage('');
    
    try {
      const eligibility = await FactionService.canJoinFaction(mockUserId, factionId);
      
      if (!eligibility.canJoin) {
        setMessage(eligibility.reason || 'Cannot join faction');
        setIsLoading(false);
        return;
      }
      
      await FactionService.joinFaction(mockUserId, factionId, 'Demo User');
      setSelectedFaction(factionId);
      setMessage(`Successfully joined ${factionId.replace('-', ' ')}!`);
      
      // Reload user data to get welcome bonus
      await loadUserData();
    } catch (error) {
      setMessage('Failed to join faction. Please try again.');
      console.error('Failed to join faction:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateQRCode = async () => {
    if (!selectedFaction) {
      setMessage('Please select a faction first');
      return;
    }
    
    setIsLoading(true);
    try {
      const purchaseAmount = 25; // Mock purchase amount
      const qrCode = await FactionService.createPurchaseQRCode(
        mockUserId,
        selectedFaction,
        purchaseAmount,
        `ticket-${Date.now()}`
      );
      
      setUserQRCodes(prev => [...prev, qrCode]);
      setMessage(`QR Code created for $${purchaseAmount} purchase!`);
    } catch (error) {
      setMessage('Failed to create QR code');
      console.error('Failed to create QR code:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {FACTION_CONTEST.name}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {FACTION_CONTEST.description}
          </p>
        </div>

        {/* Contest Rules */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Contest Rules</h2>
          <ul className="space-y-2">
            {FACTION_CONTEST.rules.map((rule, index) => (
              <li key={index} className="flex items-start">
                <span className="text-purple-600 mr-2 mt-1">•</span>
                <span className="text-gray-700">{rule}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Message Display */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.includes('Failed') || message.includes('Cannot') 
              ? 'bg-red-50 border border-red-200 text-red-700'
              : 'bg-green-50 border border-green-200 text-green-700'
          }`}>
            {message}
          </div>
        )}

        {/* Faction Selection */}
        <div className="mb-8">
          <FactionSelector
            onFactionSelect={handleFactionSelect}
            selectedFactionId={selectedFaction}
            disabled={isLoading}
            showStats={true}
          />
        </div>

        {/* User Actions */}
        {selectedFaction && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Faction Dashboard</h2>
            
            <div className="flex flex-wrap gap-4 mb-6">
              <button
                onClick={handleCreateQRCode}
                disabled={isLoading}
                className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Creating...' : 'Create Demo QR Code ($25)'}
              </button>
              
              <button
                onClick={loadUserData}
                className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700"
              >
                Refresh Data
              </button>
            </div>

            {/* User QR Codes */}
            {userQRCodes.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Your QR Codes</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {userQRCodes.map((qrCode) => (
                    <QRCodeDisplay
                      key={qrCode.id}
                      qrCode={qrCode}
                      showDetails={true}
                      allowDownload={true}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Contest Prizes */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Contest Prizes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="text-2xl font-bold text-yellow-600 mb-2">🥇</div>
              <h3 className="font-semibold text-gray-900 mb-2">First Place</h3>
              <p className="text-sm text-gray-600">{FACTION_CONTEST.prizes.first}</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="text-2xl font-bold text-gray-600 mb-2">🥈</div>
              <h3 className="font-semibold text-gray-900 mb-2">Second Place</h3>
              <p className="text-sm text-gray-600">{FACTION_CONTEST.prizes.second}</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
              <div className="text-2xl font-bold text-orange-600 mb-2">🥉</div>
              <h3 className="font-semibold text-gray-900 mb-2">Third Place</h3>
              <p className="text-sm text-gray-600">{FACTION_CONTEST.prizes.third}</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
              <div className="text-2xl font-bold text-purple-600 mb-2">🎖️</div>
              <h3 className="font-semibold text-gray-900 mb-2">Participation</h3>
              <p className="text-sm text-gray-600">{FACTION_CONTEST.prizes.participation}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}