import { 
  FactionId, 
  FactionMember, 
  PointTransaction, 
  QRCode,
  FactionStats 
} from '@/types/factions';
import { 
  joinFaction as dbJoinFaction,
  leaveFaction as dbLeaveFaction,
  getFactionMember,
  savePointTransaction,
  saveQRCode,
  markQRCodeAsUsed,
  getUserQRCodes,
  getPointTransactions,
  calculateFactionStats,
  getAllFactionStats
} from '@/lib/factionDatabase';
import { generateQRCode } from '@/lib/qrcode';

/**
 * Service layer for faction operations
 */

export class FactionService {
  /**
   * Join a faction
   */
  static async joinFaction(
    userId: string, 
    factionId: FactionId, 
    displayName?: string
  ): Promise<FactionMember> {
    try {
      const member = dbJoinFaction(userId, factionId, displayName);
      
      // Award welcome bonus points
      const welcomeTransaction: PointTransaction = {
        id: `tx-welcome-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`,
        userId,
        factionId,
        points: 25,
        type: 'bonus',
        description: 'Welcome bonus for joining faction',
        timestamp: new Date(),
      };
      
      savePointTransaction(welcomeTransaction);
      
      return member;
    } catch (error) {
      console.error('Failed to join faction:', error);
      throw new Error('Failed to join faction');
    }
  }

  /**
   * Leave a faction
   */
  static async leaveFaction(userId: string): Promise<boolean> {
    try {
      return dbLeaveFaction(userId);
    } catch (error) {
      console.error('Failed to leave faction:', error);
      throw new Error('Failed to leave faction');
    }
  }

  /**
   * Get user's faction membership
   */
  static async getUserFaction(userId: string): Promise<FactionMember | null> {
    try {
      return getFactionMember(userId);
    } catch (error) {
      console.error('Failed to get user faction:', error);
      return null;
    }
  }

  /**
   * Create QR code for purchase
   */
  static async createPurchaseQRCode(
    userId: string,
    factionId: FactionId,
    purchaseAmount: number,
    ticketId?: string
  ): Promise<QRCode> {
    try {
      const qrCode = generateQRCode(userId, factionId, purchaseAmount, ticketId);
      saveQRCode(qrCode);
      return qrCode;
    } catch (error) {
      console.error('Failed to create QR code:', error);
      throw new Error('Failed to create QR code');
    }
  }

  /**
   * Redeem QR code for points
   */
  static async redeemQRCode(
    codeId: string,
    verifiedBy?: string
  ): Promise<{ success: boolean; points?: number; message: string }> {
    try {
      const success = markQRCodeAsUsed(codeId, verifiedBy);
      
      if (success) {
        // Get the QR code to return points awarded
        const qrCodes = getUserQRCodes(''); // This is a simplified approach
        const qrCode = qrCodes.find(q => q.id === codeId || q.code === codeId);
        
        return {
          success: true,
          points: qrCode?.pointsAwarded || 0,
          message: 'QR code redeemed successfully!'
        };
      } else {
        return {
          success: false,
          message: 'QR code is invalid or already used'
        };
      }
    } catch (error) {
      console.error('Failed to redeem QR code:', error);
      return {
        success: false,
        message: 'Failed to redeem QR code'
      };
    }
  }

  /**
   * Award bonus points
   */
  static async awardBonusPoints(
    userId: string,
    factionId: FactionId,
    points: number,
    description: string,
    _activityId?: string
  ): Promise<PointTransaction> {
    try {
      const transaction: PointTransaction = {
        id: `tx-bonus-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`,
        userId,
        factionId,
        points,
        type: 'bonus',
        description,
        timestamp: new Date(),
      };
      
      savePointTransaction(transaction);
      return transaction;
    } catch (error) {
      console.error('Failed to award bonus points:', error);
      throw new Error('Failed to award bonus points');
    }
  }

  /**
   * Get user's QR codes
   */
  static async getUserQRCodes(userId: string): Promise<QRCode[]> {
    try {
      return getUserQRCodes(userId);
    } catch (error) {
      console.error('Failed to get user QR codes:', error);
      return [];
    }
  }

  /**
   * Get user's point transactions
   */
  static async getUserTransactions(userId: string): Promise<PointTransaction[]> {
    try {
      return getPointTransactions(userId);
    } catch (error) {
      console.error('Failed to get user transactions:', error);
      return [];
    }
  }

  /**
   * Get faction statistics
   */
  static async getFactionStats(factionId: FactionId): Promise<FactionStats> {
    try {
      return calculateFactionStats(factionId);
    } catch (error) {
      console.error('Failed to get faction stats:', error);
      throw new Error('Failed to get faction stats');
    }
  }

  /**
   * Get all faction statistics (leaderboard)
   */
  static async getAllFactionStats(): Promise<FactionStats[]> {
    try {
      return getAllFactionStats();
    } catch (error) {
      console.error('Failed to get all faction stats:', error);
      return [];
    }
  }

  /**
   * Validate faction membership
   */
  static async validateMembership(userId: string, factionId: FactionId): Promise<boolean> {
    try {
      const member = await this.getUserFaction(userId);
      return member?.factionId === factionId && member.isActive;
    } catch (error) {
      console.error('Failed to validate membership:', error);
      return false;
    }
  }

  /**
   * Get user's total points
   */
  static async getUserPoints(userId: string): Promise<number> {
    try {
      const member = await this.getUserFaction(userId);
      return member?.totalPoints || 0;
    } catch (error) {
      console.error('Failed to get user points:', error);
      return 0;
    }
  }

  /**
   * Check if user can join faction (business rules)
   */
  static async canJoinFaction(userId: string, factionId: FactionId): Promise<{
    canJoin: boolean;
    reason?: string;
  }> {
    try {
      const existingMember = await this.getUserFaction(userId);
      
      if (existingMember && existingMember.isActive) {
        if (existingMember.factionId === factionId) {
          return {
            canJoin: false,
            reason: 'Already a member of this faction'
          };
        } else {
          return {
            canJoin: false,
            reason: 'Already a member of another faction. Leave current faction first.'
          };
        }
      }
      
      return { canJoin: true };
    } catch (error) {
      console.error('Failed to check faction eligibility:', error);
      return {
        canJoin: false,
        reason: 'Unable to verify faction eligibility'
      };
    }
  }
}