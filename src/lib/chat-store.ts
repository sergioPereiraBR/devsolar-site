export type ChatMessage = {
  id: string;
  from?: string;
  role?: 'user' | 'assistant';
  content?: string;
  text?: string;
  timestamp?: number;
  createdAt?: string;
};

const chatStore = new Map<string, ChatMessage[]>();

export function getMessages(phone: string): ChatMessage[] {
  return chatStore.get(phone) ?? [];
}

export function saveMessage(phone: string, message: ChatMessage) {
  const existing = chatStore.get(phone) ?? [];
  chatStore.set(phone, [...existing, message]);
}
