export interface FactionBenefit {
  title: string;
  description: string;
}

export interface Faction {
  id: string;
  name: string;
  displayName: string;
  description: string;
  theme: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  logo?: string;
  motto: string;
  benefits: FactionBenefit[]; // changed from string[]
  totalPoints: number;
  memberCount: number;
  isActive: boolean;
}

export interface FactionMember {
  id: string;
  userId: string;
  factionId: string;
  joinedAt: Date;
  totalPoints: number;
  isActive: boolean;
  displayName?: string;
}

export interface PointTransaction {
  id: string;
  userId: string;
  factionId: string;
  points: number;
  type: 'purchase' | 'bonus' | 'penalty' | 'manual';
  description: string;
  vendorId?: string;
  ticketId?: string;
  qrCodeId?: string;
  timestamp: Date;
  verifiedBy?: string;
}

export interface QRCode {
  id: string;
  code: string;
  userId: string;
  factionId: string;
  ticketId?: string;
  purchaseAmount: number;
  pointsAwarded: number;
  isUsed: boolean;
  createdAt: Date;
  usedAt?: Date;
  expiresAt?: Date;
}

export interface FactionContest {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  rules: string[];
  prizes: {
    first: string;
    second: string;
    third: string;
    participation: string;
  };
  pointsPerDollar: number;
  bonusActivities: {
    id: string;
    name: string;
    description: string;
    points: number;
    isActive: boolean;
  }[];
}

export type FactionId = 'vaultbreakers' | 'relickeepers' | 'riftwalkers' | 'chronoguards';

export interface FactionStats {
  factionId: string;
  totalPoints: number;
  memberCount: number;
  averagePointsPerMember: number;
  rank: number;
  pointsFromPurchases: number;
  pointsFromBonuses: number;
  topMembers: {
    userId: string;
    displayName: string;
    points: number;
  }[];
}