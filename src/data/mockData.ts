import { LanguageInfo, MachineryItem, LabourSquad, BookingOrder, UserProfile, UserRole } from '../types';

export const LANGUAGES: LanguageInfo[] = [
  {
    code: 'kn',
    native: 'ಕನ್ನಡ',
    name: 'Kannada (KA)',
    region: 'Karnataka & Cauvery Basin',
    sampleAudioText: 'ಕನ್ನಡ ಧ್ವನಿ ಮಾದರಿ: ಕಿಸಾನ್ ಬಂಧು, ಸ್ವಾಗತ!',
    welcomeText: '"ಕಿಸಾನ್ ಬಂಧು, ಸ್ವಾಗತ!" — ಬಿತ್ತನೆ, ಬಾಡಿಗೆ ಮತ್ತು ಬೆಳೆ ಪಾವತಿಗಳಿಗೆ ಪೂರ್ಣ ನೆರವು.'
  },
  {
    code: 'en',
    native: 'English',
    name: 'English (IN)',
    region: 'Pan-India & Administrative',
    sampleAudioText: 'English audio preview: Welcome Kisan to VAgriConnect fleet network.',
    welcomeText: '"Welcome Kisan!" — Comprehensive fleet scheduling, telemetry contracts, and bank-grade digital billing.'
  },
  {
    code: 'ta',
    native: 'தமிழ்',
    name: 'Tamil (TN)',
    region: 'Tamil Nadu & Delta Region',
    sampleAudioText: 'தமிழ் குரல் மாதிரி: வணக்கம் உழவரே!',
    welcomeText: '"வணக்கம் உழவரே!" — டிராக்டர் வாடகை, அறுவடை இயந்திரங்கள் மற்றும் சந்தை நிலவரங்கள்.'
  },
  {
    code: 'te',
    native: 'తెలుగు',
    name: 'Telugu (AP/TS)',
    region: 'Andhra Pradesh & Telangana',
    sampleAudioText: 'తెలుగు ఆడియో ప్రివ్యూ: స్వాగతం రైతు సోదరులకు!',
    welcomeText: '"స్వాగతం రైతు సోదరులకు!" — యంత్రాల అద్దె, డ్రైవర్ బుకింగ్ మరియు ప్రత్యక్ష చెల్లింపులు.'
  },
  {
    code: 'ml',
    native: 'മലയാളം',
    name: 'Malayalam (KL)',
    region: 'Kerala Krishi Network',
    sampleAudioText: 'മലയാളം ഓഡിയോ പ്രിവ്യൂ: സ്വാഗതം കർഷക സുഹൃത്തേ!',
    welcomeText: '"സ്വാഗതം കർഷക സുഹൃത്തേ!" — സുഗന്ധവ്യഞ്ജന വിപണി, യന്ത്രങ്ങൾ, കൃഷി സേവനങ്ങൾ.'
  }
];

export const MACHINERY_LIST: MachineryItem[] = [
  {
    id: 'mach-1',
    name: 'Mahindra Yuvo Tech+ 585 DI',
    model: '585 DI + Heavy Rotavator',
    hp: 49,
    type: 'Tractor 4WD',
    category: 'tractor',
    pricePerHour: 850,
    pricePerAcre: 1100,
    providerName: 'Shivaraj Patil (Sree Maruthi Agro)',
    providerLocation: 'Mandya Rural',
    distanceKm: 3.8,
    rating: 4.9,
    reviewsCount: 128,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBx1U0YoVpBljw1ar9NquZlUxXmdv9Sy0x8smxm-sIEyYK2KamsFebEi_nsF9W2P1loSm7ErhP7wVWPQsja4jvGueth3vkY5-lFXobThDq6pn110aIynQJNuyZgLvUooLCowyhhkhhn4VgrezX6ZSP5IHrm2LGw1d4tr-89wgeF5Q9V9f0EhHysm-W8gQs2oVvBdj5GTCEI0Y8t0gPed0p7APqNJ9o2G1XFNOsfaVuXDogCgO_VDSye',
    driverIncluded: true,
    dieselIncluded: false,
    status: 'Ready for Hire',
    tags: ['GPS Monitored', '49 HP • 4WD', 'Rotavator Attached', 'Wetland Specialized'],
    depthCapacity: '8.5 inches',
    fuelScheme: 'As per actuals'
  },
  {
    id: 'mach-2',
    name: 'Kubota Harvester DC-68G',
    model: 'DC-68G Mud Crawler',
    hp: 68,
    type: 'Combine Harvester',
    category: 'harvester',
    pricePerHour: 1800,
    pricePerAcre: 2400,
    providerName: 'Kaveri Agro Services',
    providerLocation: 'K.R. Pet Hub',
    distanceKm: 7.5,
    rating: 4.8,
    reviewsCount: 94,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCU9BgPYcY-MgZoTb5nX1CFuMGV20AX3RvJDOyWzBursnz2fUui4sq6hvbEEEv8P8sqx50Ib7ZGY8UUQ722ACEUNprfi54nOeUFSPZGH2J6lkjY5gxTbUzZEeY0N-etn9iyoACzoVbut-ooFgVKHdTXhKuZ4y0_WnEEbJRqSsPxlOZ_LcfiuWgmF73dfhELWoF8Idd5a7wOVud1AIZY2Gzmf27SBaNXezBpRDquzgJZvD3Q8di-agQY',
    driverIncluded: true,
    dieselIncluded: true,
    status: 'In Field',
    tags: ['Wet Paddy Special', 'Grain Loss < 1.5%', 'Track Type', 'High Demand'],
    depthCapacity: '1.2 Acre / Hr',
    fuelScheme: 'Included in rate'
  },
  {
    id: 'mach-3',
    name: 'New Holland 3630 TX Special Edition',
    model: '3630 TX + 9-Tyne Seeder',
    hp: 55,
    type: 'Multi-crop Tractor',
    category: 'seeder',
    pricePerHour: 950,
    pricePerAcre: 1350,
    providerName: 'Doddanna & Sons Equipment',
    providerLocation: 'Maddur Junction',
    distanceKm: 6.1,
    rating: 4.7,
    reviewsCount: 62,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApP9YJ9qsnKoAkLrL-OolBz4Pjhe0ZOX9lNWLzwZMdJ2GQgP3OXtwzgXiCXvdS5ZCGX3yi6gce0AY4qCQNoS2wTgE8t8E94DdfePCQBQiU5VH3ZuOiV3Aa2JvemJTT0ICMVCvMx-sktSJRneJUo8MDMO4ftILxByoeM1GFnHczMtIYFN8Ma_SioT7iuFyuzS1oHzicbG3_F2HK9-l4hOHKUGMHAzJfzZy0XnaJRV1SLcKHykQc0sGu',
    driverIncluded: true,
    dieselIncluded: true,
    status: 'Ready for Hire',
    tags: ['Multi-crop Seeder', '55 HP • Heavy Clutch', 'Certified Driver', 'Ready Today'],
    depthCapacity: 'Adjustable 6-9 in',
    fuelScheme: 'Included in rate'
  },
  {
    id: 'mach-4',
    name: 'John Deere 5050 D',
    model: '5050 D + Rotavator',
    hp: 50,
    type: 'Utility 4WD Tractor',
    category: 'tractor',
    pricePerHour: 850,
    pricePerAcre: 1150,
    providerName: 'Ramesh Gowda (Gowda Agro Fleet)',
    providerLocation: 'Maddur Taluk, Mandya',
    distanceKm: 4.2,
    rating: 4.92,
    reviewsCount: 248,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6tBc1s-_9pe4WWU77MojqUxoDss_MWYCm989Do_1ppkeNDnzRGf9VybisHNsEvRYgzRqp0c3dWtMAG-BZUsC9CIC6dHDVR_3KFW8OwH2v18aBJhW5ljaJ-XUg0k8xNHGLnga-t8OQckugXMAPkUcW_zvpMe1IjNS7NAGac1wlK3mHhwgqCAiCJ61BC7Q3_VixinEHuCOJ6z0j_QM2aYbAnMBt2wNs3Ydj6Y21JfjX0edLmHJNpqTs',
    driverIncluded: true,
    dieselIncluded: true,
    status: 'Ready for Hire',
    tags: ['50 HP • 4WD', 'Rotavator Attached', 'Diesel Inclusive', 'Govt. KYC Verified'],
    depthCapacity: '10 inch soil loosening',
    fuelScheme: 'Included in rate'
  },
  {
    id: 'mach-5',
    name: 'Shaktiman Rotavator 42B',
    model: 'SHK-42-2022',
    hp: 45,
    type: 'Rotary Tiller Implement',
    category: 'rotavator',
    pricePerHour: 450,
    pricePerAcre: 600,
    providerName: 'Gowda Agro Fleet',
    providerLocation: 'Gejjalagere, Mandya',
    distanceKm: 4.5,
    rating: 4.85,
    reviewsCount: 110,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDlC82dc_aXYK5x20xVlWFR0MbpkNlN9w4u5xbCY8Th3li-LaRz4l3Gu_0R6ZZIuE_Nh932yc1iTmS0RJloXwIUcgCx_aCPAuTdUNOVi5L2lAS_CYsmtHzc0l7PK16KT_XTyRLymNhXO5RhL4LmPKMh7V9SEHWoxi0GWNsXzXd2oQgcCdxv94AYKARw7BQHXxrbryXtye5JA_RLE-hVCp3ymh2LTmGe6AHFZvepQjVHgPRcBH6WhqjP',
    driverIncluded: false,
    dieselIncluded: false,
    status: 'Under Maintenance',
    tags: ['7 Feet Multi-speed', 'Blade sharpening', 'Attachment only', 'Quick Link'],
    depthCapacity: '8 inches',
    fuelScheme: 'PTO driven'
  }
];

export const LABOUR_SQUADS: LabourSquad[] = [
  {
    id: 'labour-1',
    name: "Kaveri Women's Self-Help Labour Group",
    leadName: 'Lakshmi M.',
    workersCount: 14,
    wagePerPersonDay: 450,
    cropSpecialization: ['Paddy Transplantation', 'SRI Precision Weeding', 'Organic Farm Care'],
    distanceKm: 4.2,
    location: 'Maddur, Mandya',
    rating: 4.9,
    completedJobs: 132,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPEws28CSfepopwRP3se9v2RtBG0p9Gw-9aqgTxibZ5fJZoPlP1td05YjOO0E65Bayfn4Sb7HDQYqBUgA0tGmcymTLQOnZbbs7WsxuMdb-AWaw0BJ9Kbttx7xazEAB34iX1jf5d3ZtqpHfdxHFhjvScN1UTG46aA7-cutgSXeja1x1BlHYbt7M9u5gAVD-uHuh61GvOtOvlXGrEbRuM2wt8chHWZqv3MHuNYPp0Ze8ti9uI0tUNaQ1',
    certifiedBadges: ['SHG Certified', 'Aadhaar Vetted', 'Suraksha Bima'],
    availableStatus: 'Available this Friday',
    transportProvided: true
  },
  {
    id: 'labour-2',
    name: 'Shri Maruthi Agro Labour Contractors',
    leadName: 'Nagaraju K.',
    workersCount: 25,
    wagePerPersonDay: 520,
    cropSpecialization: ['Sugarcane Cutting', 'De-topping', 'Trolley Heavy Loading', 'Mill Bundling'],
    distanceKm: 5.4,
    location: 'Gejjalagere, Mandya',
    rating: 4.8,
    completedJobs: 210,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZwmvAZTqkUZ20KMw9CsFwP4C-k8a1MV7AYbfwZ3UN5i1qj8RknvRAmPFbby31bLIw5iQP7KieCNpr5FeOHfuOEDUy1EN41lGHhVfIiRRwhCPIb6BCFlwRL9ODAMTCeyZY6wGNtCoDWyY8VD7n5aJ4i8afFTe77o0zf4iv5GdmVA4_UxkrzOklQcYF3W5D2Lk2kaMneJEZqhjaqf9vr7EwTNy4CB2FjHbVP9-T0I52Vm4Mv3VR96hM',
    certifiedBadges: ['APMC Registered', 'Weighbridge Verified', 'Bilingual Supervisors'],
    availableStatus: 'Instant Confirmation',
    transportProvided: true
  },
  {
    id: 'labour-3',
    name: 'Narayana Swamy (Certified Sprayer)',
    leadName: 'Narayana Swamy',
    workersCount: 1,
    wagePerPersonDay: 600,
    cropSpecialization: ['Battery Sprayer (16L & 20L)', 'Fungicide Specialist', 'Drone Ground Hand'],
    distanceKm: 2.5,
    location: 'Koppa Hobli, Mandya',
    rating: 4.95,
    completedJobs: 88,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDO4MRofulogygLZw5ArslwAlhe_9CUrjwDm8Ntn96tMG_4VcFQmXKVK5FNFD8regzwxH6Zud3Jdi1VNF1VDGMmi-JNrdMvV7fHIK8SM330fxgz6ctDIyvXJzW7leIKwFmpsY3rkJ2vkJ1M4BQEj6mhpWT06Z2cGUeDvN_f1u6Lu9iNqoD_tmVObvnuMZF7Z8ZgKy9dbvLuxS5rZHmAypU4ugandtb6UtBImfhJBUUlwzFG-Amr3HkY',
    certifiedBadges: ['KAU Certified', 'Has Own PPE & Gear', 'Raitha Suraksha Insured'],
    availableStatus: 'Available Tomorrow',
    transportProvided: false
  },
  {
    id: 'labour-4',
    name: 'Chamundeshwari Farmhands',
    leadName: 'Somanna',
    workersCount: 8,
    wagePerPersonDay: 480,
    cropSpecialization: ['Sowing & Nursery', 'Drip Lateral Laying', 'Vegetable Staking'],
    distanceKm: 6.8,
    location: 'Srirangapatna',
    rating: 4.7,
    completedJobs: 74,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBndq_yC74v9ZD4zSqXLNz2rmFZM27iz6EVBxDKyuMMUWRi_vPkMa-bpXGhW9jMDfcyGztxINph10HHJ8cN4pth0BHt641rDlypJEF8WAbeaBobGYu466COyMcHwfow3oZQle8rJUHHP5mr8ReryUm2M1CBlp48km7kd9ZCPmr21y0aO6FUP9s_8P446uvCZ2Uv8PWQgT4PRzA4n7bcpBoXUoOyohBNoXtDB33ywboZlA0CXzsMt3ZH',
    certifiedBadges: ['8 Workers Crew', 'Morning Shifts', 'Police Vetted'],
    availableStatus: 'Available Today',
    transportProvided: true
  }
];

export const INITIAL_BOOKINGS: BookingOrder[] = [
  {
    id: 'VAG-2024-8921',
    serviceTitle: 'Mahindra 575 DI (50 HP) + 7-Blade Heavy Rotavator',
    providerName: 'Suresh Agri Services',
    date: 'Today, 24 Oct',
    shift: '08:30 AM - 12:30 PM (4h)',
    farmLocation: 'Plot B, North Field (Gowda Farmstead, Mandya)',
    acreage: 4.5,
    status: 'en-route',
    escrowAmount: 3400,
    escrowStatus: 'Secured',
    otpCode: '5921',
    tractorSpeed: '18 km/h',
    etaMinutes: 15
  },
  {
    id: 'VAG-2024-8935',
    serviceTitle: 'Paddy Sowing Labour Team (8 Female Workers Squad)',
    providerName: 'Basavaraj Labour Services',
    date: 'Tomorrow, 25 Oct',
    shift: '07:00 AM Call Time',
    farmLocation: 'East Marsh Terrace (3.0 Acres)',
    acreage: 3.0,
    status: 'accepted',
    escrowAmount: 3600,
    escrowStatus: 'Pending',
    otpCode: '8314'
  },
  {
    id: 'VAG-2024-8740',
    serviceTitle: 'Kubota Combine Harvester PRO-688Q (Paddy Harvest)',
    providerName: 'Cauvery Farm Hub',
    date: 'Oct 18, 2024',
    shift: 'Completed (3.5 hours recorded)',
    farmLocation: 'Plot 4A, South Basin (6.0 Acres)',
    acreage: 6.0,
    status: 'completed',
    escrowAmount: 14400,
    escrowStatus: 'Disbursed',
    otpCode: '7419'
  }
];

export interface MandiRate {
  id: string;
  crop: string;
  variety: string;
  market: string;
  district: string;
  modalPrice: number;
  minPrice: number;
  maxPrice: number;
  changePercent: number;
  unit: string;
  arrivalTons: number;
  mspGovt: number;
  updateTime: string;
}

export const MANDI_RATES: MandiRate[] = [
  {
    id: 'm-1',
    crop: 'Paddy (Dhan)',
    variety: 'Sona Masuri (Fine)',
    market: 'Mandya APMC Yard',
    district: 'Mandya, KA',
    modalPrice: 2450,
    minPrice: 2200,
    maxPrice: 2600,
    changePercent: 4.2,
    unit: 'Quintal',
    arrivalTons: 180,
    mspGovt: 2320,
    updateTime: '15 mins ago'
  },
  {
    id: 'm-2',
    crop: 'Sugarcane',
    variety: 'Co 86032 (High Recovery)',
    market: 'Mysuru Sugar Mill Gate',
    district: 'Mysuru, KA',
    modalPrice: 3250,
    minPrice: 3100,
    maxPrice: 3380,
    changePercent: 1.8,
    unit: 'Tonne',
    arrivalTons: 1240,
    mspGovt: 3150,
    updateTime: '40 mins ago'
  },
  {
    id: 'm-3',
    crop: 'Finger Millet (Ragi)',
    variety: 'GPU-28 Certified',
    market: 'Ramanagara APMC',
    district: 'Ramanagara, KA',
    modalPrice: 4100,
    minPrice: 3850,
    maxPrice: 4250,
    changePercent: -0.6,
    unit: 'Quintal',
    arrivalTons: 65,
    mspGovt: 4290,
    updateTime: '1 hour ago'
  },
  {
    id: 'm-4',
    crop: 'Maize (Yellow Corn)',
    variety: 'Hybrid Feed Grade',
    market: 'Hassan Central Market',
    district: 'Hassan, KA',
    modalPrice: 2220,
    minPrice: 2050,
    maxPrice: 2340,
    changePercent: 2.5,
    unit: 'Quintal',
    arrivalTons: 210,
    mspGovt: 2090,
    updateTime: '2 hours ago'
  },
  {
    id: 'm-5',
    crop: 'Tender Coconut',
    variety: 'Mandya Special Nut',
    market: 'Maddur Tender Coconut Market',
    district: 'Mandya, KA',
    modalPrice: 38,
    minPrice: 32,
    maxPrice: 44,
    changePercent: 5.5,
    unit: 'Piece',
    arrivalTons: 45000,
    mspGovt: 30,
    updateTime: '30 mins ago'
  }
];

export const WEATHER_FORECAST = {
  location: 'Maddur Taluk, Mandya District',
  currentTemp: 28,
  condition: 'Optimal Sowing Window (Partly Sunny)',
  humidity: 68,
  windSpeed: '12 km/h ENE',
  rainfallProbability: '15%',
  soilMoisture: 'Good (34% VWC at 15cm)',
  sprayAdvisory: 'Safe to spray until 4:00 PM today. Mild breeze, no rain expected.',
  days: [
    { day: 'Mon', temp: '29° / 20°', condition: 'Sunny', rain: '10%' },
    { day: 'Tue', temp: '28° / 21°', condition: 'Partly Cloudy', rain: '20%' },
    { day: 'Wed', temp: '27° / 21°', condition: 'Light Showers', rain: '65%' },
    { day: 'Thu', temp: '26° / 19°', condition: 'Scattered Rain', rain: '70%' },
    { day: 'Fri', temp: '28° / 20°', condition: 'Sunny', rain: '15%' }
  ]
};

export const FARM_PLOTS = [
  { id: 'plot-1', name: 'Plot A: Cauvery River Terrace', acreage: 4.5, crop: 'Sugarcane', soil: 'Red Clay Loam', status: 'Ready for Rotavator' },
  { id: 'plot-2', name: 'Plot B: East Marsh Paddock', acreage: 3.2, crop: 'Paddy (Sona Masuri)', soil: 'Wet Alluvial', status: 'Requires Transplanting' },
  { id: 'plot-3', name: 'Plot C: Dry Hilltop Acre', acreage: 2.8, crop: 'Finger Millet (Ragi)', soil: 'Gravelly Loam', status: 'Harvesting Completed' }
];

export const NOTIFICATIONS = [
  { id: 'n-1', title: 'Tractor En Route', time: '5m ago', message: 'Mahindra 585 DI is 1.8km away from Plot A. Driver: Ramesh.', unread: true },
  { id: 'n-2', title: 'APMC Price Alert', time: '1h ago', message: 'Paddy Sona Masuri prices up +4.2% today at Mandya APMC.', unread: true },
  { id: 'n-3', title: 'Escrow Payment Confirmed', time: '3h ago', message: '₹3,400 securely held in Kisan Escrow for Suresh Agri Services.', unread: false }
];

export const DEFAULT_PROFILES: Record<UserRole, UserProfile> = {
  farmer: {
    id: 'usr-farmer-1',
    role: 'farmer',
    name: 'Ramesh Gowda',
    phone: '98452 71092',
    avatarInitials: 'RG',
    location: 'Plot A, Maddur Taluk',
    district: 'Mandya District, Karnataka',
    landAcreage: 12.5,
    soilType: 'Red Sandy Clay Loam',
    primaryCrop: 'Sugarcane & Paddy (Sona Masuri)',
    rtcPahaniNumber: 'KA-MDY-2024-0982'
  },
  provider: {
    id: 'usr-provider-1',
    role: 'provider',
    name: 'Shivaraj Patil',
    phone: '94481 33201',
    avatarInitials: 'SP',
    location: 'Mandya Rural Equipment Yard',
    district: 'Mandya District, Karnataka',
    fleetName: 'Sree Maruthi Agro Fleet',
    fleetCount: 5,
    bankAccount: 'State Bank of India (A/c ...4819)'
  },
  labour: {
    id: 'usr-labour-1',
    role: 'labour',
    name: 'Lakshmi M.',
    phone: '97412 88564',
    avatarInitials: 'LM',
    location: 'Gejjalagere Hobli',
    district: 'Mandya District, Karnataka',
    squadName: "Kaveri Women's Self-Help Labour Group",
    workersCount: 14,
    dailyWageRate: 450
  },
  admin: {
    id: 'usr-admin-1',
    role: 'admin',
    name: 'Dr. Manjunath Swamy',
    phone: '94808 51230',
    avatarInitials: 'MS',
    location: 'Krishi Bhavan, Mandya Sub-division',
    district: 'Mandya District, Karnataka',
    officerDesignation: 'Assistant Director of Agriculture (ADA)',
    chcJurisdiction: 'Mandya & Maddur Custom Hiring Grid (8 CHCs)'
  }
};


