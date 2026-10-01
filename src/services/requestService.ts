import { WebsiteRequest, RequestStatus, RequestAdminNote, User } from '../types';
import { getStoredRequests, saveRequests } from './storage';

export const requestService = {
  // Generate unique Request ID like BWA-2026-0003
  generateRequestId(): string {
    const existing = getStoredRequests();
    const year = new Date().getFullYear();
    const count = existing.length + 1;
    const padded = String(count).padStart(4, '0');
    return `BWA-${year}-${padded}`;
  },

  getAllRequests(): WebsiteRequest[] {
    return getStoredRequests().sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  },

  getUserRequests(userId: string): WebsiteRequest[] {
    const all = getStoredRequests();
    return all
      .filter(r => r.userId === userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  getRequestById(id: string): WebsiteRequest | null {
    const all = getStoredRequests();
    return all.find(r => r.id === id) || null;
  },

  createRequest(
    data: Omit<WebsiteRequest, 'id' | 'createdAt' | 'updatedAt' | 'status' | 'adminNotes'>,
    currentUser: User
  ): { success: boolean; request?: WebsiteRequest; error?: string } {
    try {
      const requests = getStoredRequests();
      const requestId = this.generateRequestId();
      const now = new Date().toISOString();

      const newRequest: WebsiteRequest = {
        ...data,
        id: requestId,
        userId: currentUser.id,
        userName: currentUser.name,
        userEmail: currentUser.email,
        userPhone: currentUser.phone,
        status: 'Submitted',
        createdAt: now,
        updatedAt: now,
        adminNotes: [
          {
            id: `not-sys-${Date.now()}`,
            text: 'Website request received successfully. Our lead developer Abdullah Zardari will review your specifications.',
            createdAt: now,
            isClientVisible: true,
            authorName: 'System',
          },
        ],
      };

      requests.unshift(newRequest);
      saveRequests(requests);

      return { success: true, request: newRequest };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Failed to submit website request.' };
    }
  },

  updateRequestStatus(
    requestId: string,
    newStatus: RequestStatus,
    adminName: string,
    noteText?: string
  ): { success: boolean; error?: string } {
    const requests = getStoredRequests();
    const index = requests.findIndex(r => r.id === requestId);
    if (index === -1) {
      return { success: false, error: 'Request not found.' };
    }

    requests[index].status = newStatus;
    requests[index].updatedAt = new Date().toISOString();

    if (noteText && noteText.trim()) {
      const newNote: RequestAdminNote = {
        id: `not-${Date.now()}`,
        text: noteText.trim(),
        createdAt: new Date().toISOString(),
        isClientVisible: true,
        authorName: adminName,
      };
      requests[index].adminNotes.push(newNote);
    }

    saveRequests(requests);
    return { success: true };
  },

  addAdminNote(
    requestId: string,
    noteText: string,
    isClientVisible: boolean,
    authorName: string
  ): { success: boolean; error?: string } {
    const requests = getStoredRequests();
    const index = requests.findIndex(r => r.id === requestId);
    if (index === -1) {
      return { success: false, error: 'Request not found.' };
    }

    const newNote: RequestAdminNote = {
      id: `not-${Date.now()}`,
      text: noteText.trim(),
      createdAt: new Date().toISOString(),
      isClientVisible,
      authorName,
    };

    requests[index].adminNotes.push(newNote);
    requests[index].updatedAt = new Date().toISOString();

    saveRequests(requests);
    return { success: true };
  },

  deleteRequest(requestId: string): { success: boolean; error?: string } {
    const requests = getStoredRequests();
    const filtered = requests.filter(r => r.id !== requestId);
    saveRequests(filtered);
    return { success: true };
  },
};
