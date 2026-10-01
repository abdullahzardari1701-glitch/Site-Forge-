import { User } from '../types';
import {
  getStoredUsers,
  saveUsers,
  getSessionUser,
  setSessionUser,
  hashPassword,
} from './storage';

export interface AuthResponse {
  success: boolean;
  user?: User;
  error?: string;
}

export const authService = {
  getCurrentUser(): User | null {
    return getSessionUser();
  },

  async register(
    name: string,
    email: string,
    phone: string,
    password: string,
    confirmPassword: string
  ): Promise<AuthResponse> {
    // 1. Validation
    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPhone = phone.trim().replace(/[^\d+]/g, '');

    if (!cleanName || cleanName.length < 2) {
      return { success: false, error: 'Please enter your full name.' };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!cleanEmail || !emailRegex.test(cleanEmail)) {
      return { success: false, error: 'Please provide a valid email address.' };
    }

    if (!cleanPhone || cleanPhone.length < 10) {
      return { success: false, error: 'Please enter a valid phone number (at least 10 digits).' };
    }

    if (!password || password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters long.' };
    }

    if (password !== confirmPassword) {
      return { success: false, error: 'Passwords do not match.' };
    }

    // 2. Uniqueness check
    const users = getStoredUsers();
    const existing = users.find(u => u.email === cleanEmail);
    if (existing) {
      return { success: false, error: 'An account with this email address already exists. Please log in.' };
    }

    // 3. Hash password and save
    const passwordHash = await hashPassword(password);
    const newUser = {
      id: `usr-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`,
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      role: 'customer' as const,
      createdAt: new Date().toISOString(),
      passwordHash,
    };

    users.push(newUser);
    saveUsers(users);

    // Strip password hash before setting session
    const sessionUser: User = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      role: newUser.role,
      createdAt: newUser.createdAt,
    };

    setSessionUser(sessionUser);
    return { success: true, user: sessionUser };
  },

  async login(email: string, password: string): Promise<AuthResponse> {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !password) {
      return { success: false, error: 'Please enter both your email address and password.' };
    }

    const users = getStoredUsers();
    const user = users.find(u => u.email === cleanEmail);

    if (!user) {
      return { success: false, error: 'No account found with this email. Please check your spelling or register.' };
    }

    const computedHash = await hashPassword(password);
    if (user.passwordHash !== computedHash) {
      return { success: false, error: 'Invalid password. Please verify and try again.' };
    }

    const sessionUser: User = {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      createdAt: user.createdAt,
    };

    setSessionUser(sessionUser);
    return { success: true, user: sessionUser };
  },

  // One-click demo login for reviewing the Admin Dashboard or Customer perspective
  async demoLoginAs(role: 'admin' | 'customer'): Promise<AuthResponse> {
    const targetEmail =
      role === 'admin' ? 'abdullahzardariofficial@gmail.com' : 'tariq.mansoor@example.com';
    const users = getStoredUsers();
    const user = users.find(u => u.email === targetEmail);

    if (user) {
      const sessionUser: User = {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        createdAt: user.createdAt,
      };
      setSessionUser(sessionUser);
      return { success: true, user: sessionUser };
    }

    return { success: false, error: 'Demo user not found.' };
  },

  logout() {
    setSessionUser(null);
  },

  updateProfile(userId: string, data: { name?: string; phone?: string }): AuthResponse {
    const users = getStoredUsers();
    const index = users.findIndex(u => u.id === userId);
    if (index === -1) {
      return { success: false, error: 'User not found.' };
    }

    if (data.name) users[index].name = data.name.trim();
    if (data.phone) users[index].phone = data.phone.trim();

    saveUsers(users);

    const currentUser = getSessionUser();
    if (currentUser && currentUser.id === userId) {
      const updatedSession: User = {
        ...currentUser,
        name: users[index].name,
        phone: users[index].phone,
      };
      setSessionUser(updatedSession);
      return { success: true, user: updatedSession };
    }

    return { success: true };
  },
};
