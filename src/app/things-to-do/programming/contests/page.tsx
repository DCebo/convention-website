'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { PageLayout } from '@/components/layout';
import { FactionSelector, QRCodeDisplay } from '@/components/factions';
import { FactionId, QRCode } from '@/types/factions';
import { FactionService } from '@/services/factionService';
import { FACTION_CONTEST } from '@/data/factions';

export default function ContestsPage() {
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
    <PageLayout className="bg-gray-50">
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex mb-8" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600">
                  Home
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                  </svg>
                  <span className="ml-1 text-sm font-medium text-gray-700">Things To Do</span>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                  </svg>
                  <span className="ml-1 text-sm font-medium text-gray-700">Programming</span>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                  </svg>
                  <span className="ml-1 text-sm font-medium text-gray-500">Contests</span>
                </div>
              </li>
            </ol>
          </nav>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Convention Contests
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Join exciting contests and competitions throughout the convention. Compete for amazing prizes and show off your skills!
            </p>
          </div>

          {/* Featured Contest - Faction War */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg shadow-lg mb-8 p-8 text-white">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">
                🏆 {FACTION_CONTEST.name}
              </h2>
              <p className="text-lg mb-6 max-w-3xl mx-auto">
                {FACTION_CONTEST.description}
              </p>
              <Link href="/factions" className="inline-flex items-center bg-black bg-opacity-20 rounded-full px-6 py-2 hover:bg-opacity-30 transition-colors">
                <svg className="w-5 h-5 mr-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span className="font-medium text-white">Contest Active Now!</span>
              </Link>
            </div>
          </div>

          {/* Contest Rules */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">How to Participate</h2>
            <ul className="space-y-2 text-center max-w-4xl mx-auto">
              {FACTION_CONTEST.rules.map((rule, index) => (
                <li key={index} className="flex items-start justify-center">
                  <span className="text-purple-600 mr-2 mt-1">•</span>
                  <span className="text-gray-700 text-left">{rule}</span>
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

          {/* Dashboard Link */}
          <div className="text-center mb-8">
            <Link 
              href="/factions"
              className="inline-flex items-center bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-3 px-8 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              View Live Faction Dashboard
            </Link>
            <p className="text-gray-600 text-sm mt-2">
              See real-time leaderboards, achievements, and faction progress
            </p>
          </div>

          {/* User Dashboard */}
          {selectedFaction && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Contest Dashboard</h2>
              
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
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Contest Prizes</h2>
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

          {/* Other Contests Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Other Contests & Competitions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Cosplay Contest */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">🎭 Cosplay Contest</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Show off your amazing costumes and compete for best in show!
                </p>
                <div className="text-xs text-gray-500">
                  <p><strong>When:</strong> Saturday 2:00 PM</p>
                  <p><strong>Where:</strong> Main Stage</p>
                  <p><strong>Prize:</strong> $500 + Trophy</p>
                </div>
              </div>

              {/* Trading Card Tournament */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">🃏 Trading Card Tournament</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Compete in various trading card game tournaments throughout the weekend.
                </p>
                <div className="text-xs text-gray-500">
                  <p><strong>When:</strong> All Weekend</p>
                  <p><strong>Where:</strong> Gaming Hall</p>
                  <p><strong>Entry:</strong> $10 per tournament</p>
                </div>
              </div>

              {/* Art Contest */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">🎨 Fan Art Contest</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Submit your original artwork for a chance to win amazing prizes!
                </p>
                <div className="text-xs text-gray-500">
                  <p><strong>Deadline:</strong> Friday 6:00 PM</p>
                  <p><strong>Where:</strong> Art Show Area</p>
                  <p><strong>Categories:</strong> Digital, Traditional, 3D</p>
                </div>
              </div>

              {/* Trivia Contest */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">🧠 Pop Culture Trivia</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Test your knowledge of comics, movies, games, and more!
                </p>
                <div className="text-xs text-gray-500">
                  <p><strong>When:</strong> Sunday 1:00 PM</p>
                  <p><strong>Where:</strong> Panel Room A</p>
                  <p><strong>Teams:</strong> 1-4 people</p>
                </div>
              </div>

              {/* Speed Building Contest */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">🔧 Speed Building Contest</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Race against time to build the best model or figure!
                </p>
                <div className="text-xs text-gray-500">
                  <p><strong>When:</strong> Saturday 4:00 PM</p>
                  <p><strong>Where:</strong> Workshop Area</p>
                  <p><strong>Materials:</strong> Provided</p>
                </div>
              </div>

              {/* Photography Contest */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">📸 Convention Photography</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Capture the best moments of the convention and win prizes!
                </p>
                <div className="text-xs text-gray-500">
                  <p><strong>Submit:</strong> Use #ConventionPhoto</p>
                  <p><strong>Deadline:</strong> Sunday 5:00 PM</p>
                  <p><strong>Categories:</strong> Cosplay, Candid, Artistic</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}