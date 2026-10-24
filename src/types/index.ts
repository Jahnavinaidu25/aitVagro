export type AppScreen =
  | 'login'
  | 'welcome'
  | 'language-selection'
  | 'role-onboarding'
  | 'dashboard'
  | 'marketplace'
  | 'machinery-detail'
  | 'unified-booking'
  | 'nearby-map'
  | 'labour-discovery'
  | 'checkout'
  | 'my-bookings'
  | 'provider-hub'
  | 'labour-lead-portal'
  | 'agri-officer-portal'
  | 'ai-assistant'
  | '3d-equipment-lab'
  | 'languages-accessibility'
  | 'operations';

export type LanguageCode = 'kn' | 'en' | 'ta' | 'te' | 'ml';

export type UserRole = 'farmer' | 'provider' | 'labour' | 'admin';

export interface UserProfile {
  id: string;
  role: UserRole;
  name: string;
  phone: string;
  avatarInitials: string;
  location: string;
  district: string;
  // Farmer specific
  landAcreage?: number;
  soilType?: string;
  primaryCrop?: string;
  rtcPahaniNumber?: string;
  // Provider specific
  fleetName?: string;
  fleetCount?: number;
  bankAccount?: string;
  // Labour lead specific
  squadName?: string;
  workersCount?: number;
  dailyWageRate?: number;
  // Officer specific
  officerDesignation?: string;
  chcJurisdiction?: string;
}

export interface LanguageInfo {
  code: LanguageCode;
  native: string;
  name: string;
  region: string;
  sampleAudioText: string;
  welcomeText: string;
}

export interface MachineryItem {
  id: string;
  name: string;
  model: string;
  hp: number;
  type: string;
  category: 'tractor' | 'harvester' | 'rotavator' | 'seeder' | 'sprayer';
  pricePerHour: number;
  pricePerAcre?: number;
  providerName: string;
  providerLocation: string;
  distanceKm: number;
  rating: number;
  reviewsCount: number;
  image: string;
  driverIncluded: boolean;
  dieselIncluded: boolean;
  status: 'Ready for Hire' | 'In Field' | 'Under Maintenance';
  tags: string[];
  depthCapacity?: string;
  fuelScheme?: string;
}

export interface LabourSquad {
  id: string;
  name: string;
  leadName: string;
  workersCount: number;
  wagePerPersonDay: number;
  cropSpecialization: string[];
  distanceKm: number;
  location: string;
  rating: number;
  completedJobs: number;
  image: string;
  certifiedBadges: string[];
  availableStatus: string;
  transportProvided: boolean;
}

export interface BookingOrder {
  id: string;
  serviceTitle: string;
  providerName: string;
  date: string;
  shift: string;
  farmLocation: string;
  acreage: number;
  status: 'requested' | 'accepted' | 'en-route' | 'in-progress' | 'completed';
  escrowAmount: number;
  escrowStatus: 'Secured' | 'Pending' | 'Disbursed' | 'Refunded';
  otpCode: string;
  tractorSpeed?: string;
  etaMinutes?: number;
}
