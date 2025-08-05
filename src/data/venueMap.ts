export interface BoothPosition {
  id: string;
  x: number; // percentage from left
  y: number; // percentage from top
  width: number; // percentage width
  height: number; // percentage height
  vendorId?: string;
}

export interface VenueSection {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
}

export const venueSections: VenueSection[] = [
  {
    id: 'main-hall-north',
    name: 'Main Hall - North Wing',
    x: 10,
    y: 10,
    width: 35,
    height: 25,
    color: '#e3f2fd'
  },
  {
    id: 'main-hall-south',
    name: 'Main Hall - South Wing',
    x: 10,
    y: 40,
    width: 35,
    height: 25,
    color: '#f3e5f5'
  },
  {
    id: 'main-hall-east',
    name: 'Main Hall - East Wing',
    x: 50,
    y: 25,
    width: 25,
    height: 25,
    color: '#e8f5e8'
  },
  {
    id: 'main-hall-west',
    name: 'Main Hall - West Wing',
    x: 10,
    y: 70,
    width: 25,
    height: 20,
    color: '#fff3e0'
  },
  {
    id: 'main-hall-center',
    name: 'Main Hall - Center',
    x: 40,
    y: 55,
    width: 20,
    height: 15,
    color: '#fce4ec'
  },
  {
    id: 'artist-alley',
    name: 'Artist Alley - Section A',
    x: 80,
    y: 10,
    width: 15,
    height: 40,
    color: '#f1f8e9'
  },
  {
    id: 'food-court',
    name: 'Food Court - Main Entrance',
    x: 65,
    y: 75,
    width: 30,
    height: 15,
    color: '#fff8e1'
  }
];

export const boothPositions: BoothPosition[] = [
  // Main Hall - North Wing (x: 10-45, y: 10-35) - Leave space for title
  { id: 'A-12', x: 12, y: 16, width: 5, height: 3, vendorId: 'tcg-masters' },
  { id: 'A-15', x: 19, y: 16, width: 5, height: 3, vendorId: 'good-games-melbourne' },
  { id: 'A-18', x: 26, y: 16, width: 5, height: 3, vendorId: 'mindgames-melbourne' },
  { id: 'A-21', x: 33, y: 16, width: 5, height: 3, vendorId: 'games-laboratory' },
  
  { id: 'A-24', x: 12, y: 21, width: 5, height: 3, vendorId: 'next-level-games' },
  { id: 'A-27', x: 19, y: 21, width: 5, height: 3, vendorId: 'gameology-melbourne' },
  { id: 'A-30', x: 26, y: 21, width: 5, height: 3, vendorId: 'oz-game-shop' },
  { id: 'H-09', x: 33, y: 21, width: 5, height: 3, vendorId: 'retro-gaming-vault' },
  
  { id: 'A-33', x: 12, y: 26, width: 5, height: 3, vendorId: undefined }, // Available booth
  { id: 'A-36', x: 19, y: 26, width: 5, height: 3, vendorId: undefined }, // Available booth
  { id: 'A-39', x: 26, y: 26, width: 5, height: 3, vendorId: undefined }, // Available booth
  { id: 'A-42', x: 33, y: 26, width: 5, height: 3, vendorId: undefined }, // Available booth
  
  // Main Hall - South Wing (x: 10-45, y: 40-65) - Leave space for title
  { id: 'B-08', x: 12, y: 46, width: 5, height: 3, vendorId: 'sports-card-central' },
  { id: 'B-11', x: 19, y: 46, width: 5, height: 3, vendorId: 'card-zone-melbourne' },
  { id: 'B-14', x: 26, y: 46, width: 5, height: 3, vendorId: 'sports-card-world' },
  { id: 'B-17', x: 33, y: 46, width: 5, height: 3, vendorId: undefined }, // Available booth
  
  { id: 'B-20', x: 12, y: 51, width: 5, height: 3, vendorId: undefined }, // Available booth
  { id: 'B-23', x: 19, y: 51, width: 5, height: 3, vendorId: undefined }, // Available booth
  { id: 'B-26', x: 26, y: 51, width: 5, height: 3, vendorId: undefined }, // Available booth
  { id: 'B-29', x: 33, y: 51, width: 5, height: 3, vendorId: undefined }, // Available booth
  
  { id: 'B-32', x: 12, y: 56, width: 5, height: 3, vendorId: undefined }, // Available booth
  { id: 'B-35', x: 19, y: 56, width: 5, height: 3, vendorId: undefined }, // Available booth
  { id: 'B-38', x: 26, y: 56, width: 5, height: 3, vendorId: undefined }, // Available booth
  { id: 'B-41', x: 33, y: 56, width: 5, height: 3, vendorId: undefined }, // Available booth
  
  // Main Hall - East Wing (x: 50-75, y: 25-50) - Leave space for title
  { id: 'C-15', x: 52, y: 31, width: 5, height: 3, vendorId: 'game-zone-accessories' },
  { id: 'C-18', x: 59, y: 31, width: 5, height: 3, vendorId: 'gaming-accessories-plus' },
  { id: 'C-21', x: 66, y: 31, width: 5, height: 3, vendorId: 'melbourne-card-supplies' },
  
  { id: 'C-24', x: 52, y: 36, width: 5, height: 3, vendorId: undefined }, // Available booth
  { id: 'C-27', x: 59, y: 36, width: 5, height: 3, vendorId: undefined }, // Available booth
  { id: 'C-30', x: 66, y: 36, width: 5, height: 3, vendorId: undefined }, // Available booth
  
  { id: 'C-33', x: 52, y: 41, width: 5, height: 3, vendorId: undefined }, // Available booth
  { id: 'C-36', x: 59, y: 41, width: 5, height: 3, vendorId: undefined }, // Available booth
  { id: 'C-39', x: 66, y: 41, width: 5, height: 3, vendorId: undefined }, // Available booth
  
  // Main Hall - West Wing (x: 10-35, y: 70-90) - Leave space for title
  { id: 'D-03', x: 12, y: 76, width: 5, height: 3, vendorId: 'collectors-paradise' },
  { id: 'D-06', x: 19, y: 76, width: 5, height: 3, vendorId: 'hobbyco-melbourne' },
  { id: 'D-09', x: 26, y: 76, width: 5, height: 3, vendorId: 'collectors-cache' },
  
  { id: 'D-12', x: 12, y: 81, width: 5, height: 3, vendorId: 'the-comic-shop' },
  { id: 'D-15', x: 19, y: 81, width: 5, height: 3, vendorId: 'anime-kingdom-melbourne' },
  { id: 'D-18', x: 26, y: 81, width: 5, height: 3, vendorId: 'retro-games-melbourne' },
  
  { id: 'D-21', x: 12, y: 86, width: 5, height: 3, vendorId: 'pop-culture-collectibles' },
  { id: 'D-24', x: 19, y: 86, width: 5, height: 3, vendorId: undefined }, // Available booth
  { id: 'D-27', x: 26, y: 86, width: 5, height: 3, vendorId: undefined }, // Available booth
  
  // Artist Alley (x: 80-95, y: 10-50) - Vertical layout, leave space for title
  { id: 'E-07', x: 82, y: 16, width: 4, height: 5, vendorId: 'pixel-art-prints' },
  { id: 'E-10', x: 82, y: 23, width: 4, height: 5, vendorId: 'pixel-perfect-art' },
  { id: 'E-13', x: 82, y: 30, width: 4, height: 5, vendorId: undefined }, // Available booth
  { id: 'E-16', x: 82, y: 37, width: 4, height: 5, vendorId: undefined }, // Available booth
  { id: 'E-19', x: 82, y: 44, width: 4, height: 5, vendorId: undefined }, // Available booth
  
  { id: 'E-22', x: 88, y: 16, width: 4, height: 5, vendorId: undefined }, // Available booth
  { id: 'E-25', x: 88, y: 23, width: 4, height: 5, vendorId: undefined }, // Available booth
  { id: 'E-28', x: 88, y: 30, width: 4, height: 5, vendorId: undefined }, // Available booth
  { id: 'E-31', x: 88, y: 37, width: 4, height: 5, vendorId: undefined }, // Available booth
  { id: 'E-34', x: 88, y: 44, width: 4, height: 5, vendorId: undefined }, // Available booth
  
  // Main Hall - Center (x: 40-60, y: 55-70) - Leave space for title
  { id: 'F-11', x: 42, y: 61, width: 5, height: 3, vendorId: 'gamer-gear' },
  { id: 'F-14', x: 49, y: 61, width: 5, height: 3, vendorId: 'geek-culture-melbourne' },
  { id: 'F-17', x: 42, y: 66, width: 5, height: 3, vendorId: 'melbourne-gaming-apparel' },
  { id: 'F-20', x: 49, y: 66, width: 5, height: 3, vendorId: undefined }, // Available booth
  
  // Food Court (x: 65-95, y: 75-90) - Leave space for title
  { id: 'G-01', x: 67, y: 81, width: 6, height: 4, vendorId: 'convention-cafe' },
  { id: 'G-04', x: 75, y: 81, width: 6, height: 4, vendorId: 'melbourne-coffee-co' },
  { id: 'G-07', x: 83, y: 81, width: 6, height: 4, vendorId: undefined }, // Available booth
  { id: 'G-10', x: 67, y: 86, width: 6, height: 4, vendorId: undefined }, // Available booth
  { id: 'G-13', x: 75, y: 86, width: 6, height: 4, vendorId: undefined }, // Available booth
  { id: 'G-16', x: 83, y: 86, width: 6, height: 4, vendorId: undefined } // Available booth
];