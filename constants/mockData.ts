import { Conversation } from '@/types/chat';

export const mockConversations: Conversation[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    lastMessage: '看起來很不錯！',
    timestamp: new Date(Date.now() - 3600000),
    messages: [
      {
        id: '1',
        text: '嘿，你好嗎？',
        sender: 'other',
        timestamp: new Date(Date.now() - 7200000),
      },
      {
        id: '2',
        text: '我很好，謝謝！最近怎麼樣？',
        sender: 'me',
        timestamp: new Date(Date.now() - 6800000),
      },
      {
        id: '3',
        text: '很不錯，已經完成了項目。',
        sender: 'other',
        timestamp: new Date(Date.now() - 4000000),
      },
      {
        id: '4',
        text: '恭喜！',
        sender: 'me',
        timestamp: new Date(Date.now() - 3900000),
      },
      {
        id: '5',
        text: '看起來很不錯！',
        sender: 'other',
        timestamp: new Date(Date.now() - 3600000),
      },
    ],
  },
  {
    id: '2',
    name: 'Bob Smith',
    lastMessage: '等等，明天再聊？',
    timestamp: new Date(Date.now() - 7200000),
    messages: [
      {
        id: '1',
        text: '你在嗎？',
        sender: 'other',
        timestamp: new Date(Date.now() - 10800000),
      },
      {
        id: '2',
        text: '我在這裡',
        sender: 'me',
        timestamp: new Date(Date.now() - 10400000),
      },
      {
        id: '3',
        text: '等等，明天再聊？',
        sender: 'other',
        timestamp: new Date(Date.now() - 7200000),
      },
    ],
  },
  {
    id: '3',
    name: 'Carol Davis',
    lastMessage: '下週見！',
    timestamp: new Date(Date.now() - 86400000),
    messages: [
      {
        id: '1',
        text: '下週一起吃午飯？',
        sender: 'other',
        timestamp: new Date(Date.now() - 86400000),
      },
      {
        id: '2',
        text: '好啊，聽起來不錯！',
        sender: 'me',
        timestamp: new Date(Date.now() - 86200000),
      },
      {
        id: '3',
        text: '下週見！',
        sender: 'other',
        timestamp: new Date(Date.now() - 86400000),
      },
    ],
  },
  {
    id: '4',
    name: 'David Wilson',
    lastMessage: '謝謝，非常有幫助！',
    timestamp: new Date(Date.now() - 172800000),
    messages: [
      {
        id: '1',
        text: '你能幫我看一下代碼嗎？',
        sender: 'other',
        timestamp: new Date(Date.now() - 172800000),
      },
      {
        id: '2',
        text: '當然可以，發給我吧',
        sender: 'me',
        timestamp: new Date(Date.now() - 172500000),
      },
      {
        id: '3',
        text: '謝謝，非常有幫助！',
        sender: 'other',
        timestamp: new Date(Date.now() - 172800000),
      },
    ],
  },
];
