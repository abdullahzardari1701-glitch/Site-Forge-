import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage, User } from '../types';
import { messageService } from '../services/messageService';
import { BUSINESS_CONFIG } from '../services/storage';
import { 
  Send, 
  User as UserIcon, 
  ShieldCheck, 
  MessageCircle, 
  Clock, 
  CheckCheck,
  Check
} from 'lucide-react';

interface RequestChatBoxProps {
  requestId: string;
  currentUser: User;
  onMessageSent?: () => void;
  compact?: boolean;
}

export const RequestChatBox: React.FC<RequestChatBoxProps> = ({
  requestId,
  currentUser,
  onMessageSent,
  compact = false,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const loadMessages = () => {
    const list = messageService.getMessagesForRequest(requestId);
    setMessages(list);
    messageService.markAsRead(requestId, currentUser.role);
  };

  useEffect(() => {
    loadMessages();

    // Listen for storage events (real-time broadcast across components/tabs)
    const handleStorageUpdate = () => {
      loadMessages();
    };

    window.addEventListener('siteforge_store_updated', handleStorageUpdate);
    return () => {
      window.removeEventListener('siteforge_store_updated', handleStorageUpdate);
    };
  }, [requestId, currentUser.role]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || sending) return;

    setSending(true);
    const res = messageService.sendMessage(requestId, currentUser, inputText);
    if (res.success) {
      setInputText('');
      loadMessages();
      if (onMessageSent) onMessageSent();
    }
    setSending(false);
  };

  const whatsappPrefill = `${BUSINESS_CONFIG.whatsappHref}?text=${encodeURIComponent(
    `Hello Abdullah, I am inquiring regarding my SiteForge request [${requestId}].`
  )}`;

  return (
    <div className={`flex flex-col bg-slate-950/80 border border-slate-800 rounded-2xl overflow-hidden ${
      compact ? 'h-96' : 'h-[440px]'
    }`}>
      {/* Chat Header */}
      <div className="px-4 py-3 bg-slate-900/90 border-b border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <div>
            <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
              <span>Project Discussion</span>
              <span className="text-cyan-400 font-mono text-[11px] font-normal">[{requestId}]</span>
            </h4>
            <p className="text-[10px] text-slate-400">
              Direct chat between Customer & Lead Developer Abdullah Zardari
            </p>
          </div>
        </div>

        <a
          href={whatsappPrefill}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-950/50 border border-emerald-800/60 text-emerald-400 hover:text-emerald-300 text-[10px] font-semibold transition-colors"
          title="Continue conversation on WhatsApp"
        >
          <MessageCircle className="w-3 h-3" />
          <span className="hidden sm:inline">WhatsApp Backup</span>
        </a>
      </div>

      {/* Messages Scroll View */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500">
            <MessageCircle className="w-8 h-8 text-slate-700 mb-2" />
            <p className="text-xs text-slate-400 font-medium">No messages yet for this request</p>
            <p className="text-[11px] text-slate-500 max-w-xs mt-1">
              Send a message below to ask questions about your layout, provide new references, or discuss timeline.
            </p>
          </div>
        ) : (
          messages.map((msg) => {
            const isMe = msg.senderId === currentUser.id;
            const isAdminSender = msg.senderRole === 'admin';

            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
              >
                {/* Sender badge */}
                <div className="flex items-center gap-1.5 mb-1 px-1 text-[10px] text-slate-400">
                  {isAdminSender ? (
                    <span className="text-amber-400 font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      <span>{msg.senderName} (Lead Developer)</span>
                    </span>
                  ) : (
                    <span className="text-cyan-400 font-semibold flex items-center gap-1">
                      <UserIcon className="w-3 h-3" />
                      <span>{msg.senderName}</span>
                    </span>
                  )}
                  <span>·</span>
                  <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>

                {/* Message Bubble */}
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                    isMe
                      ? 'bg-cyan-500 text-slate-950 font-medium rounded-br-none shadow-sm'
                      : isAdminSender
                      ? 'bg-slate-900 border border-amber-500/30 text-slate-100 rounded-bl-none'
                      : 'bg-slate-900 border border-slate-800 text-slate-100 rounded-bl-none'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                </div>

                {/* Read indicator */}
                {isMe && (
                  <div className="flex items-center gap-1 text-[9px] text-slate-500 mt-0.5 px-1">
                    {msg.readByAdmin || msg.readByCustomer ? (
                      <span className="flex items-center gap-0.5 text-cyan-400">
                        <CheckCheck className="w-3 h-3" />
                        <span>Seen</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-0.5 text-slate-500">
                        <Check className="w-3 h-3" />
                        <span>Sent</span>
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <form onSubmit={handleSend} className="p-3 bg-slate-900/90 border-t border-slate-800/80 flex items-center gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={`Message ${currentUser.role === 'admin' ? 'client...' : 'Abdullah Zardari...'}`}
          className="flex-1 px-3.5 py-2 text-xs bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
        />
        <button
          type="submit"
          disabled={!inputText.trim() || sending}
          className="p-2 text-xs font-semibold text-cyan-950 bg-cyan-400 rounded-xl hover:bg-cyan-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shrink-0 cursor-pointer"
          aria-label="Send message"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
