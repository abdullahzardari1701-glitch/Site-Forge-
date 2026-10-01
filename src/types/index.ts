export type UserRole = 'customer' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  createdAt: string;
}

export type RequestStatus =
  | 'Submitted'
  | 'Under Review'
  | 'Requirements Confirmed'
  | 'In Development'
  | 'Review Required'
  | 'Completed'
  | 'Cancelled';

export interface UploadedFileItem {
  id: string;
  name: string;
  size: number;
  type: string;
  dataUrl?: string;
  category: 'logo' | 'business_photos' | 'product_images' | 'documents' | 'other';
  uploadedAt: string;
}

export interface RequestAdminNote {
  id: string;
  text: string;
  createdAt: string;
  isClientVisible: boolean;
  authorName: string;
}

export interface ChatMessage {
  id: string;
  requestId: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  text: string;
  timestamp: string;
  readByCustomer: boolean;
  readByAdmin: boolean;
}

export interface WebsiteRequest {
  id: string; // e.g. "BWA-2026-0001"
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  status: RequestStatus;
  createdAt: string;
  updatedAt: string;
  
  // Step 1: Basic Information
  basicInfo: {
    fullName: string;
    businessName: string;
    phone: string;
    email: string;
    city: string;
    state: string;
    country: string;
  };

  // Step 2: Website Type
  websiteType: string;

  // Step 3: Business Information
  businessInfo: {
    description: string;
    servicesProducts: string;
    aboutBusiness: string;
    address: string;
    googleMapsLink?: string;
    whatsappNumber?: string;
    instagramLink?: string;
    facebookLink?: string;
    youtubeLink?: string;
    otherLinks?: string;
  };

  // Step 4: Website Requirements
  websiteRequirements: {
    mainPurpose: string;
    pages: string[];
    customPages?: string;
  };

  // Step 5: Design Preferences
  designPreferences: {
    styles: string[];
    preferredColors: string;
    referenceUrl?: string;
    specialInstructions?: string;
  };

  // Step 6: Uploads
  uploads: UploadedFileItem[];

  // Admin additions
  adminNotes: RequestAdminNote[];
  estimatedCompletionDate?: string;
  quoteTier?: string;
}

export interface CategoryCardData {
  id: string;
  title: string;
  categoryKey: string;
  description: string;
  features: string[];
  icon: string;
  badge?: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  idealFor: string;
  features: string[];
  popular?: boolean;
}
