import { WebsiteRequest, User } from '../types';

export const BUSINESS_CONFIG = {
  brandName: 'SiteForge',
  ownerName: 'Abdullah Zardari',
  phone: '7563026232',
  phoneDisplay: '+91 7563026232',
  phoneHref: 'tel:+917563026232',
  email: 'abdullahzardariofficial@gmail.com',
  emailHref: 'mailto:abdullahzardariofficial@gmail.com',
  whatsappHref: 'https://wa.me/917563026232',
  whatsappDefaultMsg: 'Hello Abdullah, I want to create a website. I would like to discuss my requirements.',
  tagline: 'Your Website. Your Brand. Built Professionally.',
  subheadline: "Tell us what you need, and we'll help turn your idea into a professional website.",
};

const USERS_KEY = 'siteforge_users_v1';
const REQUESTS_KEY = 'siteforge_requests_v1';
const MESSAGES_KEY = 'siteforge_messages_v1';
const CURRENT_USER_KEY = 'siteforge_session_user';

// Cryptographic SHA-256 helper for client-side password hashing
export async function hashPassword(password: string): Promise<string> {
  const salt = 'siteforge_secure_salt_2026_az_';
  const encoder = new TextEncoder();
  const data = encoder.encode(salt + password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

interface StoredUserAccount extends User {
  passwordHash: string;
}

// Initial seed data for demonstration and instant testing
const INITIAL_ADMIN: StoredUserAccount = {
  id: 'usr-admin-001',
  name: 'Abdullah Zardari',
  email: 'abdullahzardariofficial@gmail.com',
  phone: '7563026232',
  role: 'admin',
  createdAt: '2026-01-15T09:00:00.000Z',
  // Pre-hashed for "admin123"
  passwordHash: '86815ec62e783637e1933ea647614d642aa5c3c0ca6ab2ee8f121d5c2d3ca472',
};

const INITIAL_DEMO_CUSTOMER: StoredUserAccount = {
  id: 'usr-cust-101',
  name: 'Tariq Mansoor',
  email: 'tariq.mansoor@example.com',
  phone: '9876543210',
  role: 'customer',
  createdAt: '2026-02-10T14:30:00.000Z',
  // Pre-hashed for "customer123"
  passwordHash: '75069b20757a6e133fef77263b6ca140db422c5e53303666b6c00d463e264663',
};

const INITIAL_REQUESTS: WebsiteRequest[] = [
  {
    id: 'BWA-2026-0001',
    userId: 'usr-cust-101',
    userName: 'Tariq Mansoor',
    userEmail: 'tariq.mansoor@example.com',
    userPhone: '9876543210',
    status: 'In Development',
    createdAt: '2026-02-12T10:15:00.000Z',
    updatedAt: '2026-02-18T16:00:00.000Z',
    basicInfo: {
      fullName: 'Tariq Mansoor',
      businessName: 'Royal Oud Fragrances & Attar',
      phone: '9876543210',
      email: 'tariq.mansoor@example.com',
      city: 'Mumbai',
      state: 'Maharashtra',
      country: 'India',
    },
    websiteType: 'E-commerce',
    businessInfo: {
      description: 'Exclusive artisanal perfumes, attars, and luxury essential oil distillations.',
      servicesProducts: 'Pure Dehn Al Oud, Amber blends, Rose Taif, luxury gift boxes.',
      aboutBusiness: 'Family-run perfumery since 1998 moving into direct online retail across pan-India.',
      address: 'Shop 14, Crawford Market Complex, Mumbai 400001',
      googleMapsLink: 'https://maps.google.com/?q=Mumbai+Perfumes',
      whatsappNumber: '9876543210',
      instagramLink: 'https://instagram.com/royaloud.attar',
    },
    websiteRequirements: {
      mainPurpose: 'Showcase authentic oriental fragrances and accept direct WhatsApp orders & online payments.',
      pages: ['Home', 'About', 'Products', 'Gallery', 'Contact', 'FAQ', 'Testimonials'],
      customPages: 'Fragrance Pyramid Finder Guide',
    },
    designPreferences: {
      styles: ['Luxury', 'Elegant', 'Dark'],
      preferredColors: 'Deep Midnight Emerald (#062c21), Warm Champagne Gold (#e2b653)',
      referenceUrl: 'https://byredo.com',
      specialInstructions: 'Need mobile-first fast checkout and high-resolution scent notes cards.',
    },
    uploads: [
      {
        id: 'upl-01',
        name: 'royal_oud_emblem_logo.png',
        size: 342000,
        type: 'image/png',
        category: 'logo',
        uploadedAt: '2026-02-12T10:18:00.000Z',
      },
    ],
    adminNotes: [
      {
        id: 'not-01',
        text: 'Initial consultation completed via WhatsApp. Product photography catalog received.',
        createdAt: '2026-02-13T11:00:00.000Z',
        isClientVisible: true,
        authorName: 'Abdullah Zardari',
      },
      {
        id: 'not-02',
        text: 'Homepage hero and fragrance catalog mockups assembled. Moving into payment gateway config.',
        createdAt: '2026-02-18T16:00:00.000Z',
        isClientVisible: true,
        authorName: 'Abdullah Zardari',
      },
    ],
    estimatedCompletionDate: '2026-03-05',
    quoteTier: 'Professional Website',
  },
  {
    id: 'BWA-2026-0002',
    userId: 'usr-cust-101',
    userName: 'Tariq Mansoor',
    userEmail: 'tariq.mansoor@example.com',
    userPhone: '9876543210',
    status: 'Submitted',
    createdAt: '2026-03-01T08:30:00.000Z',
    updatedAt: '2026-03-01T08:30:00.000Z',
    basicInfo: {
      fullName: 'Tariq Mansoor',
      businessName: 'Mansoor Artisanal Leather Goods',
      phone: '9876543210',
      email: 'tariq.mansoor@example.com',
      city: 'Pune',
      state: 'Maharashtra',
      country: 'India',
    },
    websiteType: 'Business',
    businessInfo: {
      description: 'Handcrafted full-grain leather bags, wallets, and travel organizers.',
      servicesProducts: 'Custom leather embossing, corporate gift sets, bespoke briefcases.',
      aboutBusiness: 'Crafting lifetime leather goods with traditional saddle stitching.',
      address: 'Industrial Estate, Phase 2, Pune',
      whatsappNumber: '9876543210',
    },
    websiteRequirements: {
      mainPurpose: 'Generate B2B corporate inquiries and direct bespoke orders.',
      pages: ['Home', 'About', 'Services', 'Gallery', 'Contact', 'Pricing'],
    },
    designPreferences: {
      styles: ['Minimal', 'Modern', 'Corporate'],
      preferredColors: 'Warm Saddle Tan, Slate Navy, Clean Off-White',
      specialInstructions: 'Inquiry form should immediately send notification to WhatsApp.',
    },
    uploads: [],
    adminNotes: [],
    quoteTier: 'Basic Website',
  },
];

// Helper to broadcast storage events
export function notifyStoreChange() {
  window.dispatchEvent(new Event('siteforge_store_updated'));
}

export function getStoredUsers(): StoredUserAccount[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (!raw) {
      localStorage.setItem(USERS_KEY, JSON.stringify([INITIAL_ADMIN, INITIAL_DEMO_CUSTOMER]));
      return [INITIAL_ADMIN, INITIAL_DEMO_CUSTOMER];
    }
    const parsed = JSON.parse(raw);
    // Ensure admin exists
    if (!parsed.some((u: StoredUserAccount) => u.email === INITIAL_ADMIN.email)) {
      parsed.push(INITIAL_ADMIN);
      localStorage.setItem(USERS_KEY, JSON.stringify(parsed));
    }
    return parsed;
  } catch (err) {
    console.error('Error reading users from storage:', err);
    return [INITIAL_ADMIN, INITIAL_DEMO_CUSTOMER];
  }
}

export function saveUsers(users: StoredUserAccount[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  notifyStoreChange();
}

export function getStoredRequests(): WebsiteRequest[] {
  try {
    const raw = localStorage.getItem(REQUESTS_KEY);
    if (!raw) {
      localStorage.setItem(REQUESTS_KEY, JSON.stringify(INITIAL_REQUESTS));
      return INITIAL_REQUESTS;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading requests from storage:', err);
    return INITIAL_REQUESTS;
  }
}

export function saveRequests(requests: WebsiteRequest[]) {
  localStorage.setItem(REQUESTS_KEY, JSON.stringify(requests));
  notifyStoreChange();
}

export function getSessionUser(): User | null {
  try {
    const raw = localStorage.getItem(CURRENT_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setSessionUser(user: User | null) {
  if (user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(CURRENT_USER_KEY);
  }
  notifyStoreChange();
}

const INITIAL_MESSAGES = [
  {
    id: 'msg-01',
    requestId: 'BWA-2026-0001',
    senderId: 'usr-admin-001',
    senderName: 'Abdullah Zardari',
    senderRole: 'admin',
    text: 'Hello Tariq, I have begun structuring your luxury fragrance store with the dark emerald palette. Could you share your high-res product photos for the Dehn Al Oud collection?',
    timestamp: '2026-02-14T11:20:00.000Z',
    readByCustomer: true,
    readByAdmin: true,
  },
  {
    id: 'msg-02',
    requestId: 'BWA-2026-0001',
    senderId: 'usr-cust-101',
    senderName: 'Tariq Mansoor',
    senderRole: 'customer',
    text: 'Hi Abdullah, I uploaded the emblem logo and will send a Google Drive link with the remaining 20 perfume bottles shortly. Do you support UPI QR checkout?',
    timestamp: '2026-02-14T14:45:00.000Z',
    readByCustomer: true,
    readByAdmin: true,
  },
  {
    id: 'msg-03',
    requestId: 'BWA-2026-0001',
    senderId: 'usr-admin-001',
    senderName: 'Abdullah Zardari',
    senderRole: 'admin',
    text: 'Yes absolutely! Direct UPI instant QR code and WhatsApp order confirmation are both integrated in the Professional tier. We are on schedule for March 5th.',
    timestamp: '2026-02-15T09:10:00.000Z',
    readByCustomer: false,
    readByAdmin: true,
  },
];

export function getStoredMessages() {
  try {
    const raw = localStorage.getItem(MESSAGES_KEY);
    if (!raw) {
      localStorage.setItem(MESSAGES_KEY, JSON.stringify(INITIAL_MESSAGES));
      return INITIAL_MESSAGES;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading messages from storage:', err);
    return INITIAL_MESSAGES;
  }
}

export function saveMessages(messages: any[]) {
  localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
  notifyStoreChange();
}

