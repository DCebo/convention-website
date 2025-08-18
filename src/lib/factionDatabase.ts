import { 
  Faction, 
  FactionMember, 
  PointTransaction, 
  QRCode, 
  FactionStats,
  FactionId 
} from '@/types/factions';

/**
 * Mock database implementation for faction system
 * In a real application, this would connect to a proper database
 */

// Mock storage using localStorage (for demo purposes)
const STORAGE_KEYS = {
  FACTIONS: 'faction_data',
  MEMBERS: 'faction_members',
  TRANSACTIONS: 'faction_transactions',
  QR_CODES: 'faction_qr_codes',
} as const;

// Helper functions for localStorage operations
const getStorageData = <T>(key: string): T[] => {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(key);
    if (!data) return [];
    
    const parsed = JSON.parse(data);
    
    // Convert date strings back to Date objects for specific keys
    if (key === STORAGE_KEYS.QR_CODES) {
      return parsed.map((item: QRCode) => ({
        ...item,
        createdAt: item.createdAt ? new Date(item.createdAt) : new Date(),
        usedAt: item.usedAt ? new Date(item.usedAt) : undefined,
        expiresAt: item.expiresAt ? new Date(item.expiresAt) : undefined,
      }));
    }
    
    if (key === STORAGE_KEYS.MEMBERS) {
      return parsed.map((item: FactionMember) => ({
        ...item,
        joinedAt: item.joinedAt ? new Date(item.joinedAt) : new Date(),
      }));
    }
    
    if (key === STORAGE_KEYS.TRANSACTIONS) {
      return parsed.map((item: PointTransaction) => ({
        ...item,
        timestamp: item.timestamp ? new Date(item.timestamp) : new Date(),
      }));
    }
    
    return parsed;
  } catch {
    return [];
  }
};

const setStorageData = <T>(key: string, data: T[]): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
};

// Faction operations
export const saveFactionData = (factions: Faction[]): void => {
  setStorageData(STORAGE_KEYS.FACTIONS, factions);
};

export const getFactionData = (): Faction[] => {
  return getStorageData<Faction>(STORAGE_KEYS.FACTIONS);
};

export const updateFactionStats = (factionId: string, totalPoints: number, memberCount: number): void => {
  const factions = getFactionData();
  const factionIndex = factions.findIndex(f => f.id === factionId);
  
  if (factionIndex !== -1) {
    factions[factionIndex].totalPoints = totalPoints;
    factions[factionIndex].memberCount = memberCount;
    saveFactionData(factions);
  }
};

// Member operations
export const saveFactionMember = (member: FactionMember): void => {
  const members = getStorageData<FactionMember>(STORAGE_KEYS.MEMBERS);
  const existingIndex = members.findIndex(m => m.userId === member.userId);
  
  if (existingIndex !== -1) {
    members[existingIndex] = member;
  } else {
    members.push(member);
  }
  
  setStorageData(STORAGE_KEYS.MEMBERS, members);
};

export const getFactionMember = (userId: string): FactionMember | null => {
  const members = getStorageData<FactionMember>(STORAGE_KEYS.MEMBERS);
  return members.find(m => m.userId === userId) || null;
};

export const getFactionMembers = (factionId: string): FactionMember[] => {
  const members = getStorageData<FactionMember>(STORAGE_KEYS.MEMBERS);
  return members.filter(m => m.factionId === factionId && m.isActive);
};

export const getAllFactionMembers = (): FactionMember[] => {
  return getStorageData<FactionMember>(STORAGE_KEYS.MEMBERS);
};

// Transaction operations
export const savePointTransaction = (transaction: PointTransaction): void => {
  const transactions = getStorageData<PointTransaction>(STORAGE_KEYS.TRANSACTIONS);
  transactions.push(transaction);
  setStorageData(STORAGE_KEYS.TRANSACTIONS, transactions);
  
  // Update member points
  const member = getFactionMember(transaction.userId);
  if (member) {
    member.totalPoints += transaction.points;
    saveFactionMember(member);
  }
};

export const getPointTransactions = (userId?: string, factionId?: string): PointTransaction[] => {
  const transactions = getStorageData<PointTransaction>(STORAGE_KEYS.TRANSACTIONS);
  
  return transactions.filter(t => {
    if (userId && t.userId !== userId) return false;
    if (factionId && t.factionId !== factionId) return false;
    return true;
  });
};

// QR Code operations
export const saveQRCode = (qrCode: QRCode): void => {
  const qrCodes = getStorageData<QRCode>(STORAGE_KEYS.QR_CODES);
  const existingIndex = qrCodes.findIndex(q => q.id === qrCode.id);
  
  if (existingIndex !== -1) {
    qrCodes[existingIndex] = qrCode;
  } else {
    qrCodes.push(qrCode);
  }
  
  setStorageData(STORAGE_KEYS.QR_CODES, qrCodes);
};

export const getQRCode = (codeId: string): QRCode | null => {
  const qrCodes = getStorageData<QRCode>(STORAGE_KEYS.QR_CODES);
  return qrCodes.find(q => q.id === codeId || q.code === codeId) || null;
};

export const getUserQRCodes = (userId: string): QRCode[] => {
  const qrCodes = getStorageData<QRCode>(STORAGE_KEYS.QR_CODES);
  return qrCodes.filter(q => q.userId === userId);
};

export const markQRCodeAsUsed = (codeId: string, verifiedBy?: string): boolean => {
  const qrCodes = getStorageData<QRCode>(STORAGE_KEYS.QR_CODES);
  const qrCodeIndex = qrCodes.findIndex(q => q.id === codeId || q.code === codeId);
  
  if (qrCodeIndex !== -1 && !qrCodes[qrCodeIndex].isUsed) {
    qrCodes[qrCodeIndex].isUsed = true;
    qrCodes[qrCodeIndex].usedAt = new Date();
    setStorageData(STORAGE_KEYS.QR_CODES, qrCodes);
    
    // Create point transaction
    const qrCode = qrCodes[qrCodeIndex];
    const transaction: PointTransaction = {
      id: `tx-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`,
      userId: qrCode.userId,
      factionId: qrCode.factionId,
      points: qrCode.pointsAwarded,
      type: 'purchase',
      description: `Points from QR code: ${qrCode.code}`,
      qrCodeId: qrCode.id,
      timestamp: new Date(),
      verifiedBy,
    };
    
    savePointTransaction(transaction);
    return true;
  }
  
  return false;
};

// Statistics and analytics
export const calculateFactionStats = (factionId: string): FactionStats => {
  const members = getFactionMembers(factionId);
  const transactions = getPointTransactions(undefined, factionId);
  
  const totalPoints = transactions.reduce((sum, t) => sum + t.points, 0);
  const memberCount = members.length;
  const averagePointsPerMember = memberCount > 0 ? totalPoints / memberCount : 0;
  
  const pointsFromPurchases = transactions
    .filter(t => t.type === 'purchase')
    .reduce((sum, t) => sum + t.points, 0);
    
  const pointsFromBonuses = transactions
    .filter(t => t.type === 'bonus')
    .reduce((sum, t) => sum + t.points, 0);
  
  // Calculate top members
  const memberPoints = members.map(member => ({
    userId: member.userId,
    displayName: member.displayName || `User ${member.userId.substring(0, 8)}`,
    points: member.totalPoints,
  })).sort((a, b) => b.points - a.points).slice(0, 10);
  
  return {
    factionId,
    totalPoints,
    memberCount,
    averagePointsPerMember,
    rank: 1, // This would be calculated relative to other factions
    pointsFromPurchases,
    pointsFromBonuses,
    topMembers: memberPoints,
  };
};

export const getAllFactionStats = (): FactionStats[] => {
  const factionIds: FactionId[] = ['vaultbreakers', 'relickeepers', 'riftwalkers', 'chronoguards'];
  const stats = factionIds.map(id => calculateFactionStats(id));
  
  // Calculate ranks
  stats.sort((a, b) => b.totalPoints - a.totalPoints);
  stats.forEach((stat, index) => {
    stat.rank = index + 1;
  });
  
  return stats;
};

// Utility functions
export const joinFaction = (userId: string, factionId: string, displayName?: string): FactionMember => {
  const existingMember = getFactionMember(userId);
  
  if (existingMember) {
    // Update existing member
    existingMember.factionId = factionId;
    existingMember.isActive = true;
    existingMember.displayName = displayName;
    saveFactionMember(existingMember);
    return existingMember;
  } else {
    // Create new member
    const newMember: FactionMember = {
      id: `member-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`,
      userId,
      factionId,
      joinedAt: new Date(),
      totalPoints: 0,
      isActive: true,
      displayName,
    };
    
    saveFactionMember(newMember);
    return newMember;
  }
};

export const leaveFaction = (userId: string): boolean => {
  const member = getFactionMember(userId);
  if (member) {
    member.isActive = false;
    saveFactionMember(member);
    return true;
  }
  return false;
};