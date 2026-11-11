export const INITIAL_RESTAURANTS = [
  {
    id: 1,
    name: "L'Étoile Dorée",
    cuisine: "French Fine Dining",
    location: "Downtown, Manhattan, NY",
    address: "452 Lexington Avenue, New York, NY 10017",
    rating: 4.9,
    reviewCount: 342,
    priceRange: "$$$$",
    featured: true,
    openingHours: "Tue-Sun: 5:30 PM - 11:00 PM",
    phone: "+1 (212) 555-0198",
    description: "Three Michelin-starred contemporary French gastronomy masterminded by Chef Antoine Moreau. Offering seasonal tasting menus paired with rare Grand Cru vintages in an opulent art-deco dining sanctuary.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80"
    ],
    facilities: [
      "Valet Parking",
      "Sommelier Service",
      "Private VIP Dining",
      "Dress Code Enforced",
      "Wheelchair Accessible",
      "Cocktail Lounge"
    ],
    menu: [
      { id: 101, name: "Caviar Oscietre & Brioche", category: "Starters", price: 65, description: "Royal Baerii caviar, toasted golden brioche, crème fraîche crue, chives." },
      { id: 102, name: "Foie Gras Poêlé au Safran", category: "Starters", price: 48, description: "Pan-seared duck liver, saffron-poached pear, aged port wine reduction." },
      { id: 103, name: "Homard Bleu Rôti au Beurre Noisette", category: "Mains", price: 95, description: "Breton blue lobster, brown butter emulsion, tender sea succulents, coral glaze." },
      { id: 104, name: "Pigeonneau Fermier en Croûte", category: "Mains", price: 82, description: "Roasted squab breast, truffled potato mousseline, baby leeks, jus perlé." },
      { id: 105, name: "Soufflé Grand Marnier Impérial", category: "Desserts", price: 32, description: "Warm grand marnier soufflé, Tahitian vanilla bean anglaise, candied orange zest." },
      { id: 106, name: "Château Margaux Premier Grand Cru 2015", category: "Wine & Cocktails", price: 240, description: "By the glass or bottle. Velvety tannins, dark cherries, notes of cedar and violet." }
    ]
  },
  {
    id: 2,
    name: "Sakura Omakase & Bar",
    cuisine: "Japanese Omakase",
    location: "West End, Boston, MA",
    address: "188 Newbury St, Boston, MA 02116",
    rating: 4.8,
    reviewCount: 289,
    priceRange: "$$$$",
    featured: true,
    openingHours: "Mon-Sat: 6:00 PM - 10:30 PM",
    phone: "+1 (617) 555-0812",
    description: "An intimate 14-seat Hinoki wood counter experience curated by Master Itamae Kenji Takahashi. Direct morning Tokyo Toyosu Market air-shipments transformed into 20 ethereal courses of Edomae nigiri.",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=1200&q=80"
    ],
    facilities: [
      "Hinoki Omakase Counter",
      "Rare Sake Sommelier",
      "Direct Market Imports",
      "Omakase Only",
      "Valet Parking"
    ],
    menu: [
      { id: 201, name: "Hokkaido Uni & King Crab Chawanmushi", category: "Starters", price: 38, description: "Silken savory egg custard, sea urchin, Alaskan king crab, dashi gelee." },
      { id: 202, name: "Otoro Tataki with Black Truffle", category: "Starters", price: 46, description: "Seared fatty bluefin tuna belly, shaved Italian black summer truffle, nikiri shoyu." },
      { id: 203, name: "A5 Miyazaki Wagyu Nigiri", category: "Mains", price: 60, description: "Charcoal blow-torched A5 Japanese beef, smoked sea salt, freshly grated shizuoka wasabi." },
      { id: 204, name: "Chef's 18-Piece Signature Nigiri Flight", category: "Mains", price: 185, description: "Including Kinmedai, Nodoguro, Shima Aji, Kohada, Uni, Botan Ebi, and Anago." },
      { id: 205, name: "Matcha Kaiseki Mille-Feuille", category: "Desserts", price: 24, description: "Ceremonial Uji matcha cream layers, caramelized puff pastry, yuzu sorbet." }
    ]
  },
  {
    id: 3,
    name: "The Charcoal & Prime Grill",
    cuisine: "Steakhouse & Bar",
    location: "Financial District, Chicago, IL",
    address: "210 S LaSalle St, Chicago, IL 60604",
    rating: 4.7,
    reviewCount: 512,
    priceRange: "$$$",
    featured: true,
    openingHours: "Daily: 4:30 PM - Midnight",
    phone: "+1 (312) 555-0341",
    description: "Dry-aged heritage steaks grilled over Argentine quebracho charcoal coals. Boasting an expansive 1,200-label subterranean wine cellar and handcrafted bourbon cocktails in high-ceiling mahogany grandeur.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=1200&q=80"
    ],
    facilities: [
      "In-House Dry Age Room",
      "Outdoor Heated Patio",
      "Whiskey & Bourbon Bar",
      "Live Jazz Quintet (Fri/Sat)",
      "Private Boardrooms"
    ],
    menu: [
      { id: 301, name: "Thick-Cut Maple Glazed Nueske Bacon", category: "Starters", price: 28, description: "Black pepper crust, bourbon-infused Vermont maple syrup, pickled mustard seeds." },
      { id: 302, name: "45-Day Dry Aged Prime Bone-In Ribeye (22oz)", category: "Mains", price: 110, description: "Charred to perfection, roasted bone marrow butter, confit garlic clove bulb." },
      { id: 303, name: "Chilean Sea Bass Glazed with Miso", category: "Mains", price: 68, description: "Sweet mirin reduction, ginger bok choy, shiitake broth." },
      { id: 304, name: "Truffle Macaroni & Fontina Cheese", category: "Starters", price: 24, description: "Cavatappi, 3-year aged white cheddar, Italian summer truffle shavings." },
      { id: 305, name: "Molten Valrhona Chocolate Lava Dome", category: "Desserts", price: 22, description: "Bourbon salted caramel center, Madagascar vanilla bean gelato." }
    ]
  },
  {
    id: 4,
    name: "Trattoria Bella Vista",
    cuisine: "Modern Italian",
    location: "North End, Miami, FL",
    address: "740 Ocean Drive, Miami Beach, FL 33139",
    rating: 4.8,
    reviewCount: 420,
    priceRange: "$$$",
    featured: false,
    openingHours: "Daily: 12:00 PM - 11:30 PM",
    phone: "+1 (305) 555-0678",
    description: "Sun-drenched coastal Italian romance overlooking turquoise waters. Hand-rolled pasta prepared fresh hourly, wild-caught Mediterranean crudo, and wood-fired Neapolitan pizzas.",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1200&q=80"
    ],
    facilities: [
      "Oceanfront Terrace",
      "Wood-Fired Pizza Oven",
      "Handmade Pasta Bar",
      "Cocktail Garden",
      "Pet Friendly Patio"
    ],
    menu: [
      { id: 401, name: "Burrata Pugliese di Andria", category: "Starters", price: 26, description: "Heirloom organic tomatoes, basil pesto genovese, aged balsamic di Modena." },
      { id: 402, name: "Tagliolini al Tartufo Nero", category: "Mains", price: 44, description: "Hand-extruded egg ribbons, Normandy butter, Parmigiano-Reggiano 36 months, fresh black truffles." },
      { id: 403, name: "Branzino Cileno all'Isolana", category: "Mains", price: 54, description: "Whole roasted Mediterranean sea bass, taggiasca olives, caper berries, lemon thyme." },
      { id: 404, name: "Tiramisu Tradizionale al Mascarpone", category: "Desserts", price: 18, description: "Espresso-soaked savoiardi, light mascarpone cream, dark cocoa dust." }
    ]
  },
  {
    id: 5,
    name: "Amber Sky Lounge & Dining",
    cuisine: "Pan-Asian Contemporary",
    location: "Marina Bay, San Francisco, CA",
    address: "500 Embarcadero, San Francisco, CA 94105",
    rating: 4.9,
    reviewCount: 395,
    priceRange: "$$$$",
    featured: true,
    openingHours: "Wed-Sun: 5:00 PM - 1:00 AM",
    phone: "+1 (415) 555-0923",
    description: "Perched high above the city skyline on the 48th floor, featuring floor-to-ceiling panoramic glass windows, inventive Pan-Asian fusion cuisine, and illuminated cocktail mixology.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&w=1200&q=80"
    ],
    facilities: [
      "Rooftop Skyline View",
      "DJ Lounge (Thu-Sat)",
      "VIP Private Cabanas",
      "Valet Parking",
      "Mixologist Bar"
    ],
    menu: [
      { id: 501, name: "Crispy Duck Bao Buns (3pcs)", category: "Starters", price: 29, description: "Confit duck leg, hoisin plum reduction, pickled cucumber, scallion curls." },
      { id: 502, name: "Glazed Black Cod in Sweet Saikyo Miso", category: "Mains", price: 62, description: "Alaskan sablefish marinated 72 hours, hajikami ginger, yuzu pea puree." },
      { id: 503, name: "Wok-Charred Mongolian Lamb Chops", category: "Mains", price: 58, description: "Australian rack of lamb, crushed cumin crust, garlic chili crisp glaze." },
      { id: 504, name: "Smoked Yuzu Dragon Cocktail", category: "Wine & Cocktails", price: 26, description: "Japanese Roku Gin, fresh yuzu juice, elderflower liqueur, rosemary smoke bubble." }
    ]
  },
  {
    id: 6,
    name: "Saffron & Silk Palace",
    cuisine: "Contemporary Indian",
    location: "Georgetown, Washington, DC",
    address: "1230 Wisconsin Ave NW, Washington, DC 20007",
    rating: 4.8,
    reviewCount: 264,
    priceRange: "$$$",
    featured: false,
    openingHours: "Tue-Sun: 5:00 PM - 10:30 PM",
    phone: "+1 (202) 555-0145",
    description: "A royal culinary journey through ancient princely courts of India reimagined with modern culinary techniques. Smoked slow-cooked biryanis, tandoor-roasted delicacies, and decadent artisanal sauces.",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=1200&q=80"
    ],
    facilities: [
      "Royal Private Banquet Room",
      "Clay Tandoor Live Display",
      "Halal Certified",
      "Full Cocktail Bar",
      "Valet Parking"
    ],
    menu: [
      { id: 601, name: "Truffle & Aged Cheddar Kulcha", category: "Starters", price: 18, description: "Oven-baked bread stuffed with English vintage cheddar and white truffle oil." },
      { id: 602, name: "24-Hour Dum Pukht Lamb Shank Biryani", category: "Mains", price: 46, description: "Sealed dough crust pot, fragrant aged basmati rice, royal saffron, tender marrow shank." },
      { id: 603, name: "Lobster Malabar Moilee", category: "Mains", price: 52, description: "Maine lobster tail, coconut milk, curry leaves, crushed green peppercorns." },
      { id: 604, name: "Pistachio Kulfi with Edible Gold Leaf", category: "Desserts", price: 20, description: "Traditional churned frozen milk dessert, crushed Iranian pistachios, rose saffron reduction." }
    ]
  }
];

export const INITIAL_TABLES = [
  // Restaurant 1: L'Étoile Dorée
  { id: 101, restaurantId: 1, tableNumber: "T-01", zone: "Romantic Window", capacity: 2, status: "AVAILABLE", x: 1, y: 1 },
  { id: 102, restaurantId: 1, tableNumber: "T-02", zone: "Romantic Window", capacity: 2, status: "AVAILABLE", x: 2, y: 1 },
  { id: 103, restaurantId: 1, tableNumber: "T-03", zone: "Main Hall", capacity: 4, status: "AVAILABLE", x: 1, y: 2 },
  { id: 104, restaurantId: 1, tableNumber: "T-04", zone: "Main Hall", capacity: 4, status: "AVAILABLE", x: 2, y: 2 },
  { id: 105, restaurantId: 1, tableNumber: "T-05", zone: "Main Hall", capacity: 6, status: "AVAILABLE", x: 3, y: 2 },
  { id: 106, restaurantId: 1, tableNumber: "T-06", zone: "Terrace Garden", capacity: 4, status: "AVAILABLE", x: 1, y: 3 },
  { id: 107, restaurantId: 1, tableNumber: "T-07", zone: "Terrace Garden", capacity: 4, status: "AVAILABLE", x: 2, y: 3 },
  { id: 108, restaurantId: 1, tableNumber: "VIP-1", zone: "Private Salon VIP", capacity: 8, status: "AVAILABLE", x: 3, y: 3 },

  // Restaurant 2: Sakura Omakase
  { id: 201, restaurantId: 2, tableNumber: "BAR-1", zone: "Hinoki Omakase Counter", capacity: 2, status: "AVAILABLE", x: 1, y: 1 },
  { id: 202, restaurantId: 2, tableNumber: "BAR-2", zone: "Hinoki Omakase Counter", capacity: 2, status: "AVAILABLE", x: 2, y: 1 },
  { id: 203, restaurantId: 2, tableNumber: "BAR-3", zone: "Hinoki Omakase Counter", capacity: 2, status: "AVAILABLE", x: 3, y: 1 },
  { id: 204, restaurantId: 2, tableNumber: "T-04", zone: "Garden Tatami Room", capacity: 4, status: "AVAILABLE", x: 1, y: 2 },
  { id: 205, restaurantId: 2, tableNumber: "T-05", zone: "Garden Tatami Room", capacity: 6, status: "AVAILABLE", x: 2, y: 2 },
  { id: 206, restaurantId: 2, tableNumber: "VIP-2", zone: "Imperial Zen Salon", capacity: 10, status: "AVAILABLE", x: 3, y: 2 },

  // Restaurant 3: The Charcoal & Prime Grill
  { id: 301, restaurantId: 3, tableNumber: "T-10", zone: "Booth Seating", capacity: 4, status: "AVAILABLE", x: 1, y: 1 },
  { id: 302, restaurantId: 3, tableNumber: "T-11", zone: "Booth Seating", capacity: 4, status: "AVAILABLE", x: 2, y: 1 },
  { id: 303, restaurantId: 3, tableNumber: "T-12", zone: "Grand Dining Room", capacity: 6, status: "AVAILABLE", x: 1, y: 2 },
  { id: 304, restaurantId: 3, tableNumber: "T-13", zone: "Grand Dining Room", capacity: 8, status: "AVAILABLE", x: 2, y: 2 },
  { id: 305, restaurantId: 3, tableNumber: "PATIO-1", zone: "Outdoor Heated Patio", capacity: 4, status: "AVAILABLE", x: 3, y: 1 },
  { id: 306, restaurantId: 3, tableNumber: "PATIO-2", zone: "Outdoor Heated Patio", capacity: 6, status: "AVAILABLE", x: 3, y: 2 },

  // Restaurant 4: Trattoria Bella Vista
  { id: 401, restaurantId: 4, tableNumber: "OC-1", zone: "Oceanfront Deck", capacity: 2, status: "AVAILABLE", x: 1, y: 1 },
  { id: 402, restaurantId: 4, tableNumber: "OC-2", zone: "Oceanfront Deck", capacity: 4, status: "AVAILABLE", x: 2, y: 1 },
  { id: 403, restaurantId: 4, tableNumber: "IN-1", zone: "Piazza Hall", capacity: 4, status: "AVAILABLE", x: 1, y: 2 },
  { id: 404, restaurantId: 4, tableNumber: "IN-2", zone: "Piazza Hall", capacity: 6, status: "AVAILABLE", x: 2, y: 2 },

  // Restaurant 5: Amber Sky Lounge
  { id: 501, restaurantId: 5, tableNumber: "SKY-1", zone: "Panoramic Window", capacity: 2, status: "AVAILABLE", x: 1, y: 1 },
  { id: 502, restaurantId: 5, tableNumber: "SKY-2", zone: "Panoramic Window", capacity: 4, status: "AVAILABLE", x: 2, y: 1 },
  { id: 503, restaurantId: 5, tableNumber: "LOUNGE-1", zone: "Center Lounge", capacity: 6, status: "AVAILABLE", x: 1, y: 2 },
  { id: 504, restaurantId: 5, tableNumber: "VIP-CABANA", zone: "VIP Skyline Cabana", capacity: 8, status: "AVAILABLE", x: 2, y: 2 },

  // Restaurant 6: Saffron Palace
  { id: 601, restaurantId: 6, tableNumber: "COURT-1", zone: "Maharaja Court", capacity: 4, status: "AVAILABLE", x: 1, y: 1 },
  { id: 602, restaurantId: 6, tableNumber: "COURT-2", zone: "Maharaja Court", capacity: 6, status: "AVAILABLE", x: 2, y: 1 },
  { id: 603, restaurantId: 6, tableNumber: "ROYAL-1", zone: "Private Banquet Suite", capacity: 12, status: "AVAILABLE", x: 3, y: 1 }
];

export const INITIAL_BOOKINGS = [
  {
    id: 1,
    bookingReference: "BK-2026-90421",
    userId: 2,
    customerName: "Eleanor Vance",
    customerEmail: "eleanor.vance@example.com",
    customerPhone: "+1 (555) 234-5678",
    restaurantId: 1,
    restaurantName: "L'Étoile Dorée",
    tableId: 101,
    tableNumber: "T-01",
    zone: "Romantic Window",
    bookingDate: "2026-11-20",
    bookingTime: "19:30",
    guestCount: 2,
    specialRequests: "Celebrating our 5th wedding anniversary. Quiet corner appreciated.",
    status: "CONFIRMED",
    createdAt: "2026-11-10T14:22:00Z"
  },
  {
    id: 2,
    bookingReference: "BK-2026-90422",
    userId: 3,
    customerName: "Marcus Sterling",
    customerEmail: "marcus.sterling@example.com",
    customerPhone: "+1 (555) 876-5432",
    restaurantId: 3,
    restaurantName: "The Charcoal & Prime Grill",
    tableId: 304,
    tableNumber: "T-13",
    zone: "Grand Dining Room",
    bookingDate: "2026-11-22",
    bookingTime: "20:00",
    guestCount: 6,
    specialRequests: "Executive client dinner. Please bring the reserve wine list promptly.",
    status: "CONFIRMED",
    createdAt: "2026-11-11T09:15:00Z"
  },
  {
    id: 3,
    bookingReference: "BK-2026-90423",
    userId: 2,
    customerName: "Eleanor Vance",
    customerEmail: "eleanor.vance@example.com",
    customerPhone: "+1 (555) 234-5678",
    restaurantId: 2,
    restaurantName: "Sakura Omakase & Bar",
    tableId: 201,
    tableNumber: "BAR-1",
    zone: "Hinoki Omakase Counter",
    bookingDate: "2026-11-05",
    bookingTime: "18:00",
    guestCount: 2,
    specialRequests: "No shellfish allergies.",
    status: "COMPLETED",
    createdAt: "2026-10-28T11:00:00Z"
  }
];

export const INITIAL_USERS = [
  {
    id: 1,
    fullName: "Alexander Hamilton (Admin)",
    email: "admin@tableprime.com",
    role: "ADMIN",
    phone: "+1 (555) 000-0001",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 2,
    fullName: "Eleanor Vance",
    email: "customer@tableprime.com",
    role: "CUSTOMER",
    phone: "+1 (555) 234-5678",
    dietaryNotes: "Pescatarian, prefers sparkling water, window seats.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 3,
    fullName: "Marcus Sterling",
    email: "marcus.sterling@example.com",
    role: "CUSTOMER",
    phone: "+1 (555) 876-5432",
    dietaryNotes: "Enjoys dry-aged steaks and Burgundy pinot noir.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
  }
];

