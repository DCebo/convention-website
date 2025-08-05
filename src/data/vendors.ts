import { Vendor, VendorCategory } from '@/types/vendors';

export const vendors: Vendor[] = [
  {
    id: 'tcg-masters',
    name: 'TCG Masters',
    description: 'Premium trading card games and rare collectibles. Specializing in Pokemon, Magic: The Gathering, and Yu-Gi-Oh! with competitive prices and authentic cards.',
    category: 'TCG Cards',
    boothNumber: 'A-12',
    location: 'Main Hall - North Wing',
    contact: {
      email: 'info@tcgmasters.com',
      phone: '(555) 123-4567',
      website: 'https://tcgmasters.com',
      social: {
        facebook: 'tcgmasters',
        instagram: 'tcg_masters_official'
      }
    },
    specialties: ['Pokemon Cards', 'Magic: The Gathering', 'Yu-Gi-Oh!', 'Rare Singles'],
    featured: true,
    logo: 'https://via.placeholder.com/120x80/4F46E5/FFFFFF?text=TCG+Masters'
  },
  {
    id: 'sports-card-central',
    name: 'Sports Card Central',
    description: 'Your one-stop shop for vintage and modern sports cards. From rookie cards to hall of fame legends, we have cards for every collector.',
    category: 'Sports Cards',
    boothNumber: 'B-08',
    location: 'Main Hall - South Wing',
    contact: {
      email: 'sales@sportscardscentral.com',
      phone: '(555) 987-6543',
      website: 'https://sportscardscentral.com',
      social: {
        twitter: 'sportscardcentral',
        instagram: 'sports_card_central'
      }
    },
    specialties: ['Baseball Cards', 'Basketball Cards', 'Football Cards', 'Vintage Collections'],
    featured: true,
    logo: 'https://via.placeholder.com/120x80/10B981/FFFFFF?text=Sports+Central'
  },
  {
    id: 'game-zone-accessories',
    name: 'Game Zone Accessories',
    description: 'Complete your gaming setup with our premium accessories. Card sleeves, deck boxes, playmats, and storage solutions for serious collectors.',
    category: 'Gaming Accessories',
    boothNumber: 'C-15',
    location: 'Main Hall - East Wing',
    contact: {
      email: 'support@gamezoneaccessories.com',
      website: 'https://gamezoneaccessories.com',
      social: {
        facebook: 'gamezoneaccessories',
        instagram: 'game_zone_acc'
      }
    },
    specialties: ['Card Sleeves', 'Deck Boxes', 'Playmats', 'Storage Solutions'],
    featured: false
  },
  {
    id: 'collectors-paradise',
    name: 'Collectors Paradise',
    description: 'Rare collectibles and memorabilia from your favorite franchises. Action figures, statues, and limited edition items for passionate collectors.',
    category: 'Collectibles',
    boothNumber: 'D-03',
    location: 'Main Hall - West Wing',
    contact: {
      email: 'hello@collectorsparadise.com',
      phone: '(555) 456-7890',
      website: 'https://collectorsparadise.com',
      social: {
        facebook: 'collectorsparadise',
        twitter: 'collectors_par',
        instagram: 'collectors_paradise'
      }
    },
    specialties: ['Action Figures', 'Statues', 'Limited Editions', 'Anime Collectibles'],
    featured: false
  },
  {
    id: 'pixel-art-prints',
    name: 'Pixel Art Prints',
    description: 'Beautiful gaming-inspired artwork and prints. Original designs and fan art celebrating your favorite games and characters.',
    category: 'Art & Prints',
    boothNumber: 'E-07',
    location: 'Artist Alley - Section A',
    contact: {
      email: 'artist@pixelartprints.com',
      website: 'https://pixelartprints.com',
      social: {
        instagram: 'pixel_art_prints',
        twitter: 'pixelartprints'
      }
    },
    specialties: ['Gaming Art', 'Custom Prints', 'Posters', 'Stickers'],
    featured: false
  },
  {
    id: 'gamer-gear',
    name: 'Gamer Gear',
    description: 'Show your gaming pride with our exclusive apparel and merchandise. T-shirts, hoodies, and accessories featuring your favorite games.',
    category: 'Apparel',
    boothNumber: 'F-11',
    location: 'Main Hall - Center',
    contact: {
      email: 'orders@gamergear.com',
      phone: '(555) 321-9876',
      website: 'https://gamergear.com',
      social: {
        facebook: 'gamergearbrand',
        instagram: 'gamer_gear_official'
      }
    },
    specialties: ['T-Shirts', 'Hoodies', 'Hats', 'Gaming Merchandise'],
    featured: false
  },
  {
    id: 'convention-cafe',
    name: 'Convention Cafe',
    description: 'Fuel your convention experience with our delicious food and beverages. Fresh sandwiches, snacks, and specialty drinks to keep you energized.',
    category: 'Food & Beverages',
    boothNumber: 'G-01',
    location: 'Food Court - Main Entrance',
    contact: {
      phone: '(555) 111-2222'
    },
    specialties: ['Sandwiches', 'Snacks', 'Coffee', 'Energy Drinks'],
    featured: false
  },
  {
    id: 'retro-gaming-vault',
    name: 'Retro Gaming Vault',
    description: 'Step back in time with our collection of vintage gaming cards and retro collectibles. Rare finds from the golden age of gaming.',
    category: 'Collectibles',
    boothNumber: 'H-09',
    location: 'Main Hall - North Wing',
    contact: {
      email: 'vintage@retrogamingvault.com',
      website: 'https://retrogamingvault.com',
      social: {
        instagram: 'retro_gaming_vault',
        facebook: 'retrogamingvault'
      }
    },
    specialties: ['Vintage Cards', 'Retro Games', 'Classic Consoles', 'Rare Finds'],
    featured: true,
    logo: 'https://via.placeholder.com/120x80/7C3AED/FFFFFF?text=Retro+Vault'
  },
  // Melbourne-based vendors
  {
    id: 'good-games-melbourne',
    name: 'Good Games Melbourne',
    description: 'Melbourne\'s premier gaming store with extensive TCG collections, board games, and tournament hosting. Known for their competitive Magic: The Gathering and Pokemon events.',
    category: 'TCG Cards',
    boothNumber: 'A-15',
    location: 'Main Hall - North Wing',
    contact: {
      email: 'melbourne@goodgames.com.au',
      phone: '(03) 9654-8888',
      website: 'https://goodgames.com.au',
      social: {
        facebook: 'goodgamesmelbourne',
        instagram: 'goodgames_melbourne'
      }
    },
    specialties: ['Magic: The Gathering', 'Pokemon TCG', 'Board Games', 'Tournament Hosting'],
    featured: true,
    logo: 'https://via.placeholder.com/120x80/DC2626/FFFFFF?text=Good+Games'
  },
  {
    id: 'mindgames-melbourne',
    name: 'Mind Games Melbourne',
    description: 'Iconic Melbourne game store specializing in TCGs, miniatures, and collectibles. A cornerstone of Melbourne\'s gaming community since 1980.',
    category: 'TCG Cards',
    boothNumber: 'A-18',
    location: 'Main Hall - North Wing',
    contact: {
      email: 'info@mindgames.com.au',
      phone: '(03) 9670-8355',
      website: 'https://mindgames.com.au',
      social: {
        facebook: 'mindgamesmelbourne',
        instagram: 'mindgames_melbourne'
      }
    },
    specialties: ['Yu-Gi-Oh!', 'Warhammer', 'Miniatures', 'Collectible Cards'],
    featured: false
  },
  {
    id: 'games-laboratory',
    name: 'Games Laboratory',
    description: 'Melbourne\'s hub for tabletop gaming and TCGs. Offering rare cards, gaming supplies, and hosting regular tournaments in their spacious venue.',
    category: 'TCG Cards',
    boothNumber: 'A-21',
    location: 'Main Hall - North Wing',
    contact: {
      email: 'contact@gameslaboratory.com.au',
      phone: '(03) 9663-3731',
      website: 'https://gameslaboratory.com.au',
      social: {
        facebook: 'gameslaboratory',
        instagram: 'games_laboratory'
      }
    },
    specialties: ['Flesh and Blood', 'Magic: The Gathering', 'Pokemon', 'Tabletop Games'],
    featured: false
  },
  {
    id: 'next-level-games',
    name: 'Next Level Games',
    description: 'Melbourne\'s competitive gaming destination. Specializing in tournament-level cards and accessories for serious players.',
    category: 'TCG Cards',
    boothNumber: 'A-24',
    location: 'Main Hall - North Wing',
    contact: {
      email: 'info@nextlevelgames.com.au',
      phone: '(03) 9429-8088',
      website: 'https://nextlevelgames.com.au',
      social: {
        facebook: 'nextlevelgamesmelbourne',
        instagram: 'nextlevel_games_melb'
      }
    },
    specialties: ['Competitive Play', 'Tournament Singles', 'Deck Building', 'Pro Accessories'],
    featured: false
  },
  {
    id: 'hobbyco-melbourne',
    name: 'Hobbyco Melbourne',
    description: 'Large hobby retailer with extensive collectibles section. From trading cards to model kits, they have something for every collector.',
    category: 'Collectibles',
    boothNumber: 'D-06',
    location: 'Main Hall - West Wing',
    contact: {
      email: 'melbourne@hobbyco.com.au',
      phone: '(03) 9650-2373',
      website: 'https://hobbyco.com.au',
      social: {
        facebook: 'hobbycoaustralia',
        instagram: 'hobbyco_australia'
      }
    },
    specialties: ['Model Kits', 'Collectible Figures', 'Trading Cards', 'Hobby Supplies'],
    featured: false
  },
  {
    id: 'gameology-melbourne',
    name: 'Gameology Melbourne',
    description: 'Modern gaming store focusing on the latest TCGs and board games. Known for their excellent customer service and community events.',
    category: 'TCG Cards',
    boothNumber: 'A-27',
    location: 'Main Hall - North Wing',
    contact: {
      email: 'melbourne@gameology.com.au',
      phone: '(03) 8060-3030',
      website: 'https://gameology.com.au',
      social: {
        facebook: 'gameologymelbourne',
        instagram: 'gameology_melbourne'
      }
    },
    specialties: ['Modern TCGs', 'Board Games', 'Community Events', 'New Releases'],
    featured: false
  },
  {
    id: 'oz-game-shop',
    name: 'Oz Game Shop',
    description: 'Australian gaming retailer with a strong Melbourne presence. Offering competitive prices on TCGs, video games, and collectibles.',
    category: 'TCG Cards',
    boothNumber: 'A-30',
    location: 'Main Hall - North Wing',
    contact: {
      email: 'support@ozgameshop.com',
      phone: '1300-MY-GAME',
      website: 'https://ozgameshop.com',
      social: {
        facebook: 'ozgameshop',
        instagram: 'oz_game_shop'
      }
    },
    specialties: ['Competitive Pricing', 'Import Games', 'TCG Singles', 'Video Games'],
    featured: false
  },
  {
    id: 'collectors-cache',
    name: 'Collectors Cache',
    description: 'Melbourne\'s premium collectibles store specializing in rare and vintage items. From vintage cards to limited edition figures.',
    category: 'Collectibles',
    boothNumber: 'D-09',
    location: 'Main Hall - West Wing',
    contact: {
      email: 'info@collectorscache.com.au',
      phone: '(03) 9555-7777',
      website: 'https://collectorscache.com.au',
      social: {
        facebook: 'collectorscachemelb',
        instagram: 'collectors_cache_melb'
      }
    },
    specialties: ['Vintage Cards', 'Limited Editions', 'Rare Collectibles', 'Graded Cards'],
    featured: true,
    logo: 'https://via.placeholder.com/120x80/F59E0B/FFFFFF?text=Collectors+Cache'
  },
  {
    id: 'the-comic-shop',
    name: 'The Comic Shop',
    description: 'Melbourne institution combining comics with trading cards. A treasure trove for collectors of all ages with knowledgeable staff.',
    category: 'Collectibles',
    boothNumber: 'D-12',
    location: 'Main Hall - West Wing',
    contact: {
      email: 'info@thecomicshop.com.au',
      phone: '(03) 9654-8322',
      website: 'https://thecomicshop.com.au',
      social: {
        facebook: 'thecomicshopmelbourne',
        instagram: 'comic_shop_melbourne'
      }
    },
    specialties: ['Comic Books', 'Trading Cards', 'Graphic Novels', 'Collectible Comics'],
    featured: false
  },
  {
    id: 'card-zone-melbourne',
    name: 'Card Zone Melbourne',
    description: 'Dedicated card shop with focus on sports cards and TCGs. Known for their extensive single card inventory and fair pricing.',
    category: 'Sports Cards',
    boothNumber: 'B-11',
    location: 'Main Hall - South Wing',
    contact: {
      email: 'melbourne@cardzone.com.au',
      phone: '(03) 9876-5432',
      website: 'https://cardzone.com.au',
      social: {
        facebook: 'cardzonemelbourne',
        instagram: 'card_zone_melbourne'
      }
    },
    specialties: ['AFL Cards', 'NRL Cards', 'Basketball Cards', 'Single Cards'],
    featured: false
  },
  {
    id: 'sports-card-world',
    name: 'Sports Card World',
    description: 'Melbourne\'s premier sports card destination. Specializing in Australian sports with extensive AFL, NRL, and cricket card collections.',
    category: 'Sports Cards',
    boothNumber: 'B-14',
    location: 'Main Hall - South Wing',
    contact: {
      email: 'info@sportscardworld.com.au',
      phone: '(03) 9123-4567',
      website: 'https://sportscardworld.com.au',
      social: {
        facebook: 'sportscardworldmelb',
        instagram: 'sports_card_world_melb'
      }
    },
    specialties: ['AFL Cards', 'NRL Cards', 'Cricket Cards', 'Signed Memorabilia'],
    featured: true
  },
  {
    id: 'gaming-accessories-plus',
    name: 'Gaming Accessories Plus',
    description: 'Melbourne supplier of premium gaming accessories. From ultra-pro sleeves to custom playmats, they have everything to protect your collection.',
    category: 'Gaming Accessories',
    boothNumber: 'C-18',
    location: 'Main Hall - East Wing',
    contact: {
      email: 'sales@gamingaccessoriesplus.com.au',
      phone: '(03) 9888-9999',
      website: 'https://gamingaccessoriesplus.com.au',
      social: {
        facebook: 'gamingaccessoriesplus',
        instagram: 'gaming_accessories_plus'
      }
    },
    specialties: ['Ultra Pro Products', 'Custom Playmats', 'Storage Solutions', 'Protective Sleeves'],
    featured: false
  },
  {
    id: 'melbourne-card-supplies',
    name: 'Melbourne Card Supplies',
    description: 'Local Melbourne business specializing in card protection and storage. Bulk pricing available for serious collectors and stores.',
    category: 'Gaming Accessories',
    boothNumber: 'C-21',
    location: 'Main Hall - East Wing',
    contact: {
      email: 'orders@melbournecardsupplies.com.au',
      phone: '(03) 9777-8888',
      website: 'https://melbournecardsupplies.com.au',
      social: {
        facebook: 'melbournecardsupplies',
        instagram: 'melbourne_card_supplies'
      }
    },
    specialties: ['Bulk Supplies', 'Storage Boxes', 'Toploaders', 'Penny Sleeves'],
    featured: false
  },
  {
    id: 'anime-kingdom-melbourne',
    name: 'Anime Kingdom Melbourne',
    description: 'Melbourne\'s anime and manga headquarters. Extensive collection of anime figures, manga, and Japanese trading cards.',
    category: 'Collectibles',
    boothNumber: 'D-15',
    location: 'Main Hall - West Wing',
    contact: {
      email: 'melbourne@animekingdom.com.au',
      phone: '(03) 9666-7777',
      website: 'https://animekingdom.com.au',
      social: {
        facebook: 'animekingdommelbourne',
        instagram: 'anime_kingdom_melbourne'
      }
    },
    specialties: ['Anime Figures', 'Manga', 'Japanese Cards', 'Cosplay Accessories'],
    featured: false
  },
  {
    id: 'retro-games-melbourne',
    name: 'Retro Games Melbourne',
    description: 'Nostalgic gaming store specializing in vintage video games and retro trading cards. A trip down memory lane for collectors.',
    category: 'Collectibles',
    boothNumber: 'D-18',
    location: 'Main Hall - West Wing',
    contact: {
      email: 'info@retrogamesmelbourne.com.au',
      phone: '(03) 9555-6666',
      website: 'https://retrogamesmelbourne.com.au',
      social: {
        facebook: 'retrogamesmelbourne',
        instagram: 'retro_games_melbourne'
      }
    },
    specialties: ['Retro Video Games', 'Vintage Cards', 'Console Accessories', 'Rare Finds'],
    featured: false
  },
  {
    id: 'pop-culture-collectibles',
    name: 'Pop Culture Collectibles',
    description: 'Melbourne store dedicated to pop culture memorabilia. From Funko Pops to limited edition collectibles from your favorite franchises.',
    category: 'Collectibles',
    boothNumber: 'D-21',
    location: 'Main Hall - West Wing',
    contact: {
      email: 'info@popculturecollectibles.com.au',
      phone: '(03) 9444-5555',
      website: 'https://popculturecollectibles.com.au',
      social: {
        facebook: 'popculturecollectiblesmelb',
        instagram: 'pop_culture_collectibles_melb'
      }
    },
    specialties: ['Funko Pop', 'Marvel Collectibles', 'Star Wars Items', 'Limited Editions'],
    featured: false
  },
  {
    id: 'geek-culture-melbourne',
    name: 'Geek Culture Melbourne',
    description: 'Celebrating geek culture with a wide range of collectibles, apparel, and accessories. Perfect for fans of all genres.',
    category: 'Apparel',
    boothNumber: 'F-14',
    location: 'Main Hall - Center',
    contact: {
      email: 'info@geekculturemelbourne.com.au',
      phone: '(03) 9333-4444',
      website: 'https://geekculturemelbourne.com.au',
      social: {
        facebook: 'geekculturemelbourne',
        instagram: 'geek_culture_melbourne'
      }
    },
    specialties: ['Geek T-Shirts', 'Gaming Hoodies', 'Collectible Pins', 'Fandom Merchandise'],
    featured: false
  },
  {
    id: 'melbourne-gaming-apparel',
    name: 'Melbourne Gaming Apparel',
    description: 'Local Melbourne brand creating custom gaming apparel. High-quality prints and designs celebrating gaming culture.',
    category: 'Apparel',
    boothNumber: 'F-17',
    location: 'Main Hall - Center',
    contact: {
      email: 'orders@melbournegamingapparel.com.au',
      phone: '(03) 9222-3333',
      website: 'https://melbournegamingapparel.com.au',
      social: {
        facebook: 'melbournegamingapparel',
        instagram: 'melbourne_gaming_apparel'
      }
    },
    specialties: ['Custom Designs', 'Gaming T-Shirts', 'Convention Exclusives', 'Local Art'],
    featured: false
  },
  {
    id: 'pixel-perfect-art',
    name: 'Pixel Perfect Art',
    description: 'Melbourne artist collective creating stunning gaming and anime artwork. Original pieces and high-quality prints available.',
    category: 'Art & Prints',
    boothNumber: 'E-10',
    location: 'Artist Alley - Section A',
    contact: {
      email: 'artists@pixelperfectart.com.au',
      phone: '(03) 9111-2222',
      website: 'https://pixelperfectart.com.au',
      social: {
        facebook: 'pixelperfectartmelb',
        instagram: 'pixel_perfect_art_melb'
      }
    },
    specialties: ['Original Artwork', 'Gaming Prints', 'Anime Art', 'Commission Work'],
    featured: false
  },
  {
    id: 'melbourne-coffee-co',
    name: 'Melbourne Coffee Co',
    description: 'Bringing Melbourne\'s famous coffee culture to the convention. Specialty coffee, pastries, and light meals to fuel your gaming.',
    category: 'Food & Beverages',
    boothNumber: 'G-04',
    location: 'Food Court - Main Entrance',
    contact: {
      email: 'info@melbournecoffeeco.com.au',
      phone: '(03) 9000-1111',
      social: {
        facebook: 'melbournecoffeeco',
        instagram: 'melbourne_coffee_co'
      }
    },
    specialties: ['Specialty Coffee', 'Pastries', 'Light Meals', 'Melbourne Blends'],
    featured: false
  }
];

export const vendorCategories: VendorCategory[] = [
  'TCG Cards',
  'Sports Cards',
  'Gaming Accessories',
  'Collectibles',
  'Art & Prints',
  'Apparel',
  'Food & Beverages'
];