export interface Message {
  id: string;
  text: string;
  sender: 'me' | 'other';
  timestamp: Date;
}

export interface Conversation {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: Date;
  messages: Message[];
  avatar?: string;
}
