import { ChatMessage, UserRole, User } from '../types';
import { getStoredMessages, saveMessages, getStoredRequests } from './storage';

export const messageService = {
  getMessagesForRequest(requestId: string): ChatMessage[] {
    const all = getStoredMessages() as ChatMessage[];
    return all
      .filter(m => m.requestId === requestId)
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  },

  sendMessage(requestId: string, sender: User, text: string): { success: boolean; message?: ChatMessage; error?: string } {
    const cleanText = text.trim();
    if (!cleanText) {
      return { success: false, error: 'Message cannot be empty.' };
    }

    const all = getStoredMessages() as ChatMessage[];
    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      requestId,
      senderId: sender.id,
      senderName: sender.name,
      senderRole: sender.role,
      text: cleanText,
      timestamp: new Date().toISOString(),
      readByCustomer: sender.role === 'customer',
      readByAdmin: sender.role === 'admin',
    };

    all.push(newMessage);
    saveMessages(all);
    return { success: true, message: newMessage };
  },

  getUnreadCountForCustomer(userId: string): number {
    const userRequests = getStoredRequests().filter(r => r.userId === userId);
    const requestIds = new Set(userRequests.map(r => r.id));
    const all = getStoredMessages() as ChatMessage[];
    return all.filter(m => requestIds.has(m.requestId) && !m.readByCustomer && m.senderRole === 'admin').length;
  },

  getTotalMessageCountForCustomer(userId: string): number {
    const userRequests = getStoredRequests().filter(r => r.userId === userId);
    const requestIds = new Set(userRequests.map(r => r.id));
    const all = getStoredMessages() as ChatMessage[];
    return all.filter(m => requestIds.has(m.requestId)).length;
  },

  getUnreadCountForAdmin(): number {
    const all = getStoredMessages() as ChatMessage[];
    return all.filter(m => !m.readByAdmin && m.senderRole === 'customer').length;
  },

  markAsRead(requestId: string, userRole: UserRole): void {
    const all = getStoredMessages() as ChatMessage[];
    let changed = false;

    all.forEach(m => {
      if (m.requestId === requestId) {
        if (userRole === 'customer' && !m.readByCustomer) {
          m.readByCustomer = true;
          changed = true;
        } else if (userRole === 'admin' && !m.readByAdmin) {
          m.readByAdmin = true;
          changed = true;
        }
      }
    });

    if (changed) {
      saveMessages(all);
    }
  },
};
