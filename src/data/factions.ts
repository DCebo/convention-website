import { Faction, FactionContest, FactionId } from '@/types/factions';

export const FACTIONS: Record<FactionId, Faction> = {
  'mystic-guardians': {
    id: 'mystic-guardians',
    name: 'mystic-guardians',
    displayName: 'Mystic Guardians',
    description: 'Masters of ancient wisdom and mystical arts. The Mystic Guardians seek rare and powerful cards that hold secrets from forgotten realms.',
    theme: 'Fantasy & Magic',
    colors: {
      primary: '#6366f1', // Indigo
      secondary: '#8b5cf6', // Violet
      accent: '#f59e0b', // Amber
      background: '#f8fafc', // Slate 50
      text: '#1e293b', // Slate 800
    },
    motto: 'Knowledge is the greatest treasure',
    benefits: [
      'Exclusive access to rare card previews',
      'Priority seating at magic-themed tournaments',
      'Special Mystic Guardian badge and lanyard',
      'Access to faction-only trading sessions',
      '10% discount on mystical-themed merchandise'
    ],
    totalPoints: 0,
    memberCount: 0,
    isActive: true,
  },
  'shadow-collectors': {
    id: 'shadow-collectors',
    name: 'shadow-collectors',
    displayName: 'Shadow Collectors',
    description: 'Elite collectors who thrive in the shadows, seeking the rarest and most elusive cards. They value stealth, strategy, and the thrill of the hunt.',
    theme: 'Dark & Mysterious',
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
      'Invitation to exclusive shadow auctions',
      'Special Shadow Collector pin and certificate',
      'Access to private collector meetups',
      'Priority access to grading services'
    ],
    totalPoints: 0,
    memberCount: 0,
    isActive: true,
  },
  'crystal-knights': {
    id: 'crystal-knights',
    name: 'crystal-knights',
    displayName: 'Crystal Knights',
    description: 'Noble warriors who value honor, tradition, and the pristine condition of their collections. They champion fair play and sportsmanship.',
    theme: 'Honor & Tradition',
    colors: {
      primary: '#0ea5e9', // Sky 500
      secondary: '#06b6d4', // Cyan 500
      accent: '#10b981', // Emerald 500
      background: '#f0f9ff', // Sky 50
      text: '#0c4a6e', // Sky 900
    },
    motto: 'Honor above all, collection perfection eternal',
    benefits: [
      'Free card protection sleeves and cases',
      'Access to professional grading workshops',
      'Special Crystal Knight tournament entry',
      'Complimentary card authentication services',
      'VIP seating at championship events'
    ],
    totalPoints: 0,
    memberCount: 0,
    isActive: true,
  },
  'storm-runners': {
    id: 'storm-runners',
    name: 'storm-runners',
    displayName: 'Storm Runners',
    description: 'Fast-paced adventurers who love the excitement of sports cards and competitive play. They embody speed, energy, and the spirit of competition.',
    theme: 'Sports & Competition',
    colors: {
      primary: '#f97316', // Orange 500
      secondary: '#eab308', // Yellow 500
      accent: '#dc2626', // Red 600
      background: '#fffbeb', // Amber 50
      text: '#92400e', // Amber 800
    },
    motto: 'Speed, skill, and the thrill of victory',
    benefits: [
      'Priority access to sports card breaks',
      'Exclusive Storm Runner jersey and cap',
      'Free entry to speed-opening competitions',
      'Access to athlete meet-and-greet sessions',
      'Special sports memorabilia discounts'
    ],
    totalPoints: 0,
    memberCount: 0,
    isActive: true,
  },
};

export const FACTION_CONTEST: FactionContest = {
  id: 'convention-2024-faction-war',
  name: 'The Great Faction War 2024',
  description: 'Join one of four legendary factions and compete for glory! Earn points through purchases, activities, and special challenges. The faction with the most points wins exclusive prizes and bragging rights!',
  startDate: new Date('2024-01-01'),
  endDate: new Date('2024-12-31'),
  isActive: true,
  rules: [
    'Each attendee can join only one faction per convention',
    'Points are earned at a rate of 1 point per dollar spent with participating vendors',
    'Bonus points can be earned through special activities and challenges',
    'Points are tracked via QR codes provided with ticket purchases',
    'Final standings will be announced at the closing ceremony',
    'Faction membership is free with convention admission'
  ],
  prizes: {
    first: 'Exclusive faction champion trophy, premium card collection, and $500 vendor credit',
    second: 'Silver faction medal, special edition card set, and $300 vendor credit',
    third: 'Bronze faction badge, commemorative card pack, and $200 vendor credit',
    participation: 'Faction participation certificate and exclusive faction sticker set'
  },
  pointsPerDollar: 1,
  bonusActivities: [
    {
      id: 'tournament-participation',
      name: 'Tournament Participation',
      description: 'Participate in any official tournament',
      points: 50,
      isActive: true,
    },
    {
      id: 'social-media-share',
      name: 'Social Media Share',
      description: 'Share faction pride on social media with #FactionWar2024',
      points: 25,
      isActive: true,
    },
    {
      id: 'volunteer-activity',
      name: 'Volunteer Activity',
      description: 'Volunteer for convention activities',
      points: 100,
      isActive: true,
    },
    {
      id: 'faction-recruitment',
      name: 'Faction Recruitment',
      description: 'Successfully recruit a new member to your faction',
      points: 75,
      isActive: true,
    },
    {
      id: 'trivia-challenge',
      name: 'Faction Trivia Challenge',
      description: 'Complete the faction-themed trivia challenge',
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