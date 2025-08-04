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
  // Main Hall - North Wing
  { id: 'A-12', x: 15, y: 15, width: 8, height: 6, vendorId: 'tcg-masters' },
  { id: 'H-09', x: 25, y: 15, width: 8, height: 6, vendorId: 'retro-gaming-vault' },
  
  // Main Hall - South Wing
  { id: 'B-08', x: 15, y: 45, width: 8, height: 6, vendorId: 'sports-card-central' },
  
  // Main Hall - East Wing
  { id: 'C-15', x: 55, y: 30, width: 8, height: 6, vendorId: 'game-zone-accessories' },
  
  // Main Hall - West Wing
  { id: 'D-03', x: 15, y: 75, width: 8, height: 6, vendorId: 'collectors-paradise' },
  
  // Artist Alley
  { id: 'E-07', x: 82, y: 20, width: 6, height: 8, vendorId: 'pixel-art-prints' },
  
  // Main Hall - Center
  { id: 'F-11', x: 45, y: 60, width: 8, height: 6, vendorId: 'gamer-gear' },
  
  // Food Court
  { id: 'G-01', x: 70, y: 80, width: 10, height: 6, vendorId: 'convention-cafe' },
  
  // Additional booths for Melbourne vendors
  { id: 'A-15', x: 35, y: 15, width: 8, height: 6, vendorId: 'good-games-melbourne' },
  { id: 'A-18', x: 15, y: 25, width: 8, height: 6, vendorId: 'mindgames-melbourne' },
  { id: 'A-21', x: 25, y: 25, width: 8, height: 6, vendorId: 'games-laboratory' },
  { id: 'A-24', x: 35, y: 25, width: 8, height: 6, vendorId: 'next-level-games' },
  { id: 'A-27', x: 15, y: 35, width: 8, height: 6, vendorId: 'gameology-melbourne' },
  { id: 'A-30', x: 25, y: 35, width: 8, height: 6, vendorId: 'oz-game-shop' },
  
  { id: 'B-11', x: 25, y: 45, width: 8, height: 6, vendorId: 'card-zone-melbourne' },
  { id: 'B-14', x: 35, y: 45, width: 8, height: 6, vendorId: 'sports-card-world' },
  
  { id: 'C-18', x: 65, y: 30, width: 8, height: 6, vendorId: 'gaming-accessories-plus' },
  { id: 'C-21', x: 55, y: 40, width: 8, height: 6, vendorId: 'melbourne-card-supplies' },
  
  { id: 'D-06', x: 25, y: 75, width: 8, height: 6, vendorId: 'hobbyco-melbourne' },
  { id: 'D-09', x: 35, y: 75, width: 8, height: 6, vendorId: 'collectors-cache' },
  { id: 'D-12', x: 15, y: 85, width: 8, height: 6, vendorId: 'the-comic-shop' },
  { id: 'D-15', x: 25, y: 85, width: 8, height: 6, vendorId: 'anime-kingdom-melbourne' },
  { id: 'D-18', x: 35, y: 85, width: 8, height: 6, vendorId: 'retro-games-melbourne' },
  { id: 'D-21', x: 45, y: 85, width: 8, height: 6, vendorId: 'pop-culture-collectibles' },
  
  { id: 'E-10', x: 82, y: 30, width: 6, height: 8, vendorId: 'pixel-perfect-art' },
  
  { id: 'F-14', x: 50, y: 60, width: 8, height: 6, vendorId: 'geek-culture-melbourne' },
  { id: 'F-17', x: 55, y: 65, width: 8, height: 6, vendorId: 'melbourne-gaming-apparel' },
  
  { id: 'G-04', x: 80, y: 80, width: 10, height: 6, vendorId: 'melbourne-coffee-co' }
];