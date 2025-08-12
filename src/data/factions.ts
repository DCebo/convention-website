import { Faction, FactionContest, FactionId } from '@/types/factions';

export const FACTIONS: Record<FactionId, Faction> = {
  'mystic-guardians': {
    id: 'mystic-guardians',
    name: 'mystic-guardians',
    displayName: 'Mystic Guardians Guild',
    description: 'Masters of ancient wisdom and mystical arts. The Mystic Guardians specialize in acquiring rare magical items, enchanted comics, and cards that hold secrets from forgotten realms.',
    theme: 'Fantasy & Magic Collectors',
    colors: {
      primary: '#6366f1', // Indigo
      secondary: '#8b5cf6', // Violet
      accent: '#f59e0b', // Amber
      background: '#f8fafc', // Slate 50
      text: '#1e293b', // Slate 800
    },
    motto: 'Knowledge is the greatest treasure',
    benefits: [
      'Exclusive access to rare magical item previews',
      'Priority access to fantasy-themed booths',
      'Special Mystic Guardian guild badge and lanyard',
      'Access to guild-only trading sessions',
      '10% discount on mystical-themed merchandise'
    ],
    totalPoints: 0,
    memberCount: 0,
    isActive: true,
  },
  'shadow-collectors': {
    id: 'shadow-collectors',
    name: 'shadow-collectors',
    displayName: 'Shadow Collectors Guild',
    description: 'Elite collectors who thrive in the shadows, seeking the rarest and most elusive items across the multiverse. They value stealth, strategy, and the thrill of uncovering hidden treasures.',
    theme: 'Dark & Mysterious Relics',
    colors: {
      primary: '#1f2937', // Gray 800
      secondary: '#374151', // Gray 700
      accent: '#ef4444', // Red 500
      background: '#f9fafb', // Gray 50
      text: '#111827', // Gray 900
    },
    motto: 'In darkness, we find the rarest treasures',
    benefits: [
      'Early access to limited edition releases',
      'Invitation to exclusive shadow marketplace auctions',
      'Special Shadow Collector guild pin and certificate',
      'Access to private guild meetups',
      'Priority access to rare item authentication'
    ],
    totalPoints: 0,
    memberCount: 0,
    isActive: true,
  },
  'crystal-knights': {
    id: 'crystal-knights',
    name: 'crystal-knights',
    displayName: 'Crystal Knights Guild',
    description: 'Noble collectors who value honor, tradition, and the pristine condition of their acquisitions. They champion fair trading practices and maintain the highest standards in the marketplace.',
    theme: 'Honor & Tradition Keepers',
    colors: {
      primary: '#0ea5e9', // Sky 500
      secondary: '#06b6d4', // Cyan 500
      accent: '#10b981', // Emerald 500
      background: '#f0f9ff', // Sky 50
      text: '#0c4a6e', // Sky 900
    },
    motto: 'Honor above all, collection perfection eternal',
    benefits: [
      'Free item protection sleeves and cases',
      'Access to professional grading workshops',
      'Special Crystal Knight marketplace privileges',
      'Complimentary item authentication services',
      'VIP access to premium marketplace areas'
    ],
    totalPoints: 0,
    memberCount: 0,
    isActive: true,
  },
  'storm-runners': {
    id: 'storm-runners',
    name: 'storm-runners',
    displayName: 'Storm Runners Guild',
    description: 'Fast-paced adventurers who specialize in sports memorabilia and competitive collecting. They embody speed, energy, and the thrill of the hunt for athletic treasures.',
    theme: 'Sports & Competition Collectors',
    colors: {
      primary: '#f97316', // Orange 500
      secondary: '#eab308', // Yellow 500
      accent: '#dc2626', // Red 600
      background: '#fffbeb', // Amber 50
      text: '#92400e', // Amber 800
    },
    motto: 'Speed, skill, and the thrill of victory',
    benefits: [
      'Priority access to sports memorabilia booths',
      'Exclusive Storm Runner guild jersey and cap',
      'Free entry to speed-collecting competitions',
      'Access to athlete meet-and-greet sessions',
      'Special sports memorabilia marketplace discounts'
    ],
    totalPoints: 0,
    memberCount: 0,
    isActive: true,
  },
};

export const FACTION_CONTEST: FactionContest = {
  id: 'convention-2025-guild-competition',
  name: 'The Multiverse Marketplace Guild Competition 2025',
  description: 'Get recruited into one of four collector guilds and compete for the Golden Seal! Earn prestige through trading, exploring booths, and uncovering secret QR deal markers. The guild with the most prestige wins the championship title!',
  startDate: new Date('2025-01-01'),
  endDate: new Date('2025-12-31'),
  isActive: true,
  rules: [
    'Each attendee is recruited into one guild upon arrival',
    'Prestige is earned through trading, exploring booths, and marketplace activities',
    'Bonus prestige can be earned by uncovering secret QR deal markers',
    'Prestige is tracked via QR codes found throughout the marketplace',
    'Final standings will be announced at the closing ceremony',
    'Guild membership is free with convention admission'
  ],
  prizes: {
    first: 'The Golden Seal of the Collector\'s Guild, premium collector\'s cache, and $500 marketplace credit',
    second: 'Silver Guild Medal, special edition collector set, and $300 marketplace credit',
    third: 'Bronze Guild Badge, commemorative collector pack, and $200 marketplace credit',
    participation: 'Guild participation certificate and exclusive guild sticker set'
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
      description: 'Share guild pride on social media with #MultiverseMarketplace2025',
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
      name: 'Collector\'s Challenge',
      description: 'Complete the guild-themed collector challenge',
      points: 40,
      isActive: true,
    }
  ]
};

export const getFactionById = (id: FactionId): Faction => {
  return FACTIONS[id];
};

export const getAllFactions = (): Faction[] => {
  return Object.values(FACTIONS);
};

export const getFactionsByTheme = (theme: string): Faction[] => {
  return Object.values(FACTIONS).filter(faction => 
    faction.theme.toLowerCase().includes(theme.toLowerCase())
  );
};