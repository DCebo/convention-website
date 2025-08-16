import { Faction, FactionContest, FactionId } from '@/types/factions'

export const FACTIONS: Record<FactionId, Faction> = {
  vaultbreakers: {
    id: 'vaultbreakers',
    name: 'vaultbreakers',
    displayName: 'The Vaultbreakers',
    description:
      'Swift Strikers of the First Find. Vaultbreakers believe the best treasures go to those who seize them first. Masters of rapid appraisal and quick deals, they swoop in before rivals even notice a prize is on the table. They wear crimson sashes to symbolize the rush of the first claim.',
    theme: 'Swift Strikers of the First Find',
    colors: {
      primary: '#dc2626', // Red 600 (Crimson)
      secondary: '#ef4444', // Red 500
      accent: '#fbbf24', // Amber 400
      background: '#fef2f2', // Red 50
      text: '#7f1d1d', // Red 900
    },
    motto: 'First in, best dressed.',
    benefits: [
      'Early Bird Bonus – +25% points for purchases before 11:00 AM',
      'First Vendor Double – first vendor purchase of the day earns 2× points',
      'Section First Claim – first member to scan in a zone earns a faction-wide +2% boost for 30 minutes',
      'Crimson sash and priority queue access',
      'Exclusive early access to vendor previews',
    ],
    totalPoints: 0,
    memberCount: 0,
    isActive: true,
  },
  relickeepers: {
    id: 'relickeepers',
    name: 'relickeepers',
    displayName: 'The Relickeepers',
    description:
      'Strategists of the Slow Burn. Relickeepers are patient archivists who believe a true collector must know when to hold back and when to strike. They wait for just the right piece to surface, then secure it with flawless precision. Their green insignia represents growth, patience, and the enduring value of preserved history.',
    theme: 'Strategists of the Slow Burn',
    colors: {
      primary: '#059669', // Emerald 600 (Green)
      secondary: '#10b981', // Emerald 500
      accent: '#84cc16', // Lime 500
      background: '#ecfdf5', // Emerald 50
      text: '#064e3b', // Emerald 900
    },
    motto: 'Patience earns the prize.',
    benefits: [
      'Final Hour Surge – +30% points for purchases in the last hour of the day',
      'Combo Collector – spend 3 different vendors in 30 minutes for +10 bonus points',
      'Category Mastery – buy from 5 different collectible categories in a day for +5% faction-wide points',
      'Green insignia and strategic planning guides',
      'Access to exclusive preservation workshops',
    ],
    totalPoints: 0,
    memberCount: 0,
    isActive: true,
  },
  riftwalkers: {
    id: 'riftwalkers',
    name: 'riftwalkers',
    displayName: 'The Riftwalkers',
    description:
      'Opportunists of the Shifting Market. Riftwalkers have mastered the art of leaping between worlds — and deals — before others know they exist. They thrive on unpredictability, chasing rare finds wherever the multiverse opens a door. Their purple cloaks shimmer like the edges of the rifts they travel.',
    theme: 'Opportunists of the Shifting Market',
    colors: {
      primary: '#7c3aed', // Violet 600 (Purple)
      secondary: '#8b5cf6', // Violet 500
      accent: '#f59e0b', // Amber 500
      background: '#f5f3ff', // Violet 50
      text: '#3730a3', // Violet 800
    },
    motto: 'Fortune favors the fearless.',
    benefits: [
      'Faction Power Hour – one random hour per day where points are doubled for Riftwalkers',
      'Treasure Portals – hidden "rift" QR codes worth big bonuses',
      'Lucky Vendor – every 2 hours, a random vendor gives +20% points to this faction only',
      'Shimmering purple cloak and rift detector device',
      'Access to secret multiverse marketplace areas',
    ],
    totalPoints: 0,
    memberCount: 0,
    isActive: true,
  },
  chronoguards: {
    id: 'chronoguards',
    name: 'chronoguards',
    displayName: 'The Chronoguards',
    description:
      'Coordinated Keepers of Time. Chronoguards believe history belongs to those who work in harmony. Masters of synchronized acquisitions, they know that a single collector is strong, but a united guild is unstoppable. Their blue sigil is shaped like an hourglass, marking their mastery of timing and teamwork.',
    theme: 'Coordinated Keepers of Time',
    colors: {
      primary: '#2563eb', // Blue 600
      secondary: '#3b82f6', // Blue 500
      accent: '#06b6d4', // Cyan 500
      background: '#eff6ff', // Blue 50
      text: '#1e3a8a', // Blue 800
    },
    motto: 'Together, we keep the clock.',
    benefits: [
      'Squad Scan Bonus – scanning with 3+ members within 1 minute gives +15 bonus points to each',
      'Faction Rally – when 20 members complete a daily challenge, all members get +5% points for the rest of the day',
      'Relay Bonus – if 5 members buy from the same vendor within 1 hour, each gets +10 bonus points',
      'Blue hourglass sigil and synchronized timing devices',
      'Access to coordinated group activities and team challenges',
    ],
    totalPoints: 0,
    memberCount: 0,
    isActive: true,
  },
}

export const FACTION_CONTEST: FactionContest = {
  id: 'collectors-guild-chronicles-2025',
  name: "The Collector's Guild Chronicles 2025",
  description:
    "For centuries, the Collector's Guild has quietly ruled the Multiverse Market — a hidden nexus where worlds collide and treasures beyond imagination are traded. Every decade, the Guild gathers at Collect-It Con to determine which faction will hold the Golden Seal, the mark of supreme collecting prestige. This year, the Seal is up for grabs. Four legendary guilds are vying for dominance — each with a unique philosophy, trading style, and field strategy.",
  startDate: new Date('2025-11-29'),
  endDate: new Date('2025-11-29'),
  isActive: true,
  rules: [
    'Choose your faction upon arrival at the convention',
    'Each faction has unique buffs and bonuses throughout the day',
    'Points are earned through purchases, vendor visits, and special activities',
    'Faction-specific challenges unlock additional bonuses',
    'The victorious faction is crowned at the Sealing Ceremony',
    'All participants receive faction-specific rewards and recognition',
  ],
  prizes: {
    first:
      "The Golden Seal of the Collector's Guild, faction banner raised in the Guild Hall, names etched in the Guild Ledger, and premium collector's vault",
    second:
      'Silver Seal of Honor, special edition faction collector set, and $300 marketplace credit',
    third:
      'Bronze Seal of Recognition, commemorative faction pack, and $200 marketplace credit',
    participation:
      'Faction membership certificate, exclusive faction insignia, and Guild Chronicles participation badge',
  },
  pointsPerDollar: 1,
  bonusActivities: [
    {
      id: 'marketplace-exploration',
      name: 'Marketplace Exploration',
      description: 'Visit and explore different vendor booths',
      points: 50,
      isActive: true,
    },
    {
      id: 'social-media-share',
      name: 'Social Media Share',
      description:
        'Share guild pride on social media with #MultiverseMarketplace2025',
      points: 25,
      isActive: true,
    },
    {
      id: 'volunteer-activity',
      name: 'Volunteer Activity',
      description: 'Volunteer for marketplace activities',
      points: 100,
      isActive: true,
    },
    {
      id: 'guild-recruitment',
      name: 'Guild Recruitment',
      description: 'Successfully recruit a new member to your guild',
      points: 75,
      isActive: true,
    },
    {
      id: 'collector-challenge',
      name: "Collector's Challenge",
      description: 'Complete the guild-themed collector challenge',
      points: 40,
      isActive: true,
    },
  ],
}

export const getFactionById = (id: FactionId): Faction => {
  return FACTIONS[id]
}

export const getAllFactions = (): Faction[] => {
  return Object.values(FACTIONS)
}

export const getFactionsByTheme = (theme: string): Faction[] => {
  return Object.values(FACTIONS).filter((faction) =>
    faction.theme.toLowerCase().includes(theme.toLowerCase())
  )
}
