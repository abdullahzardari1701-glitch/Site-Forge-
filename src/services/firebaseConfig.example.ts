/**
 * @file firebaseConfig.example.ts
 * 
 * PRODUCTION FIREBASE / SUPABASE INTEGRATION ARCHITECTURE GUIDE
 * -------------------------------------------------------------
 * SiteForge is architected with a decoupled data & auth service layer.
 * To connect to a live Firebase backend:
 * 
 * 1. Install dependencies:
 *    npm install firebase
 * 
 * 2. Configure Firebase project credentials in .env:
 *    VITE_FIREBASE_API_KEY="..."
 *    VITE_FIREBASE_AUTH_DOMAIN="..."
 *    VITE_FIREBASE_PROJECT_ID="..."
 *    VITE_FIREBASE_STORAGE_BUCKET="..."
 *    VITE_FIREBASE_MESSAGING_SENDER_ID="..."
 *    VITE_FIREBASE_APP_ID="..."
 * 
 * 3. Firestore Collections Schema:
 *    - `users/{userId}`:
 *        id: string
 *        name: string
 *        email: string
 *        phone: string
 *        role: 'customer' | 'admin'
 *        createdAt: timestamp
 * 
 *    - `websiteRequests/{requestId}`:
 *        id: string (e.g. BWA-2026-0001)
 *        userId: string (reference to users/{userId})
 *        userName: string
 *        userEmail: string
 *        userPhone: string
 *        status: 'Submitted' | 'Under Review' | 'Requirements Confirmed' | 'In Development' | 'Review Required' | 'Completed' | 'Cancelled'
 *        basicInfo: { fullName, businessName, phone, email, city, state, country }
 *        websiteType: string
 *        businessInfo: { description, servicesProducts, aboutBusiness, address, googleMapsLink, ... }
 *        websiteRequirements: { mainPurpose, pages: string[], customPages }
 *        designPreferences: { styles: string[], preferredColors, referenceUrl, specialInstructions }
 *        uploads: array of { id, name, size, type, downloadUrl, category, uploadedAt }
 *        adminNotes: array of { id, text, createdAt, isClientVisible, authorName }
 *        createdAt: timestamp
 *        updatedAt: timestamp
 * 
 * 4. Recommended Firestore Security Rules (firestore.rules):
 * -----------------------------------------------------------
 *  rules_version = '2';
 *  service cloud.firestore {
 *    match /databases/{database}/documents {
 *      function isAuthenticated() {
 *        return request.auth != null;
 *      }
 *      function isAdmin() {
 *        return isAuthenticated() && 
 *          request.auth.token.email == 'abdullahzardariofficial@gmail.com';
 *      }
 *      function isOwner(userId) {
 *        return isAuthenticated() && request.auth.uid == userId;
 *      }
 * 
 *      match /users/{userId} {
 *        allow read: if isOwner(userId) || isAdmin();
 *        allow write: if isOwner(userId) || isAdmin();
 *      }
 * 
 *      match /websiteRequests/{requestId} {
 *        allow read: if isAdmin() || (isAuthenticated() && resource.data.userId == request.auth.uid);
 *        allow create: if isAuthenticated() && request.resource.data.userId == request.auth.uid;
 *        allow update: if isAdmin() || (isAuthenticated() && resource.data.userId == request.auth.uid && request.resource.data.userId == resource.data.userId);
 *        allow delete: if isAdmin();
 *      }
 *    }
 *  }
 */

export const FIREBASE_INTEGRATION_METADATA = {
  version: '2.0.0',
  architecture: 'Decoupled Service Adapter Pattern',
  targetServices: ['Firebase Firestore', 'Firebase Authentication', 'Firebase Cloud Storage'],
  alternativeTarget: 'Supabase Database & Auth (PostgreSQL Row Level Security)',
};
