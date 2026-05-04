import { StyleSheet, View, Text, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Conversation, Message } from '@/types/chat';
import { mockConversations } from '@/constants/mockData';

export default function ChatDetailScreen() {
  const colorScheme = useColorScheme();
  const { conversationId } = useLocalSearchParams();
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    if (conversationId) {
      const conv = mockConversations.find((c) => c.id === conversationId);
      if (conv) {
        setConversation(conv);
        setMessages(conv.messages);
      }
    }
  }, [conversationId]);

  const handleSendMessage = () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: (messages.length + 1).toString(),
        text: inputText,
        sender: 'me',
        timestamp: new Date(),
      };
      setMessages([...messages, newMessage]);
      setInputText('');
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('zh-TW', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const renderMessageItem = ({ item }: { item: Message }) => (
    <View
      style={[
        styles.messageRow,
        item.sender === 'me' ? styles.myMessageRow : styles.otherMessageRow,
      ]}
    >
      {item.sender === 'other' && (
        <View style={styles.avatarSmall}>
          <Text style={styles.avatarSmallText}>
            {conversation?.name.charAt(0)}
          </Text>
        </View>
      )}
      <View
        style={[
          styles.messageBubble,
          item.sender === 'me'
            ? styles.myBubble
            : styles.otherBubble,
        ]}
      >
        <Text style={styles.messageText}>{item.text}</Text>
        <Text style={styles.messageTime}>{formatTime(item.timestamp)}</Text>
      </View>
      {item.sender === 'me' && (
        <View style={styles.avatarSmall}>
          <Text style={styles.avatarSmallText}>我</Text>
        </View>
      )}
    </View>
  );

  if (!conversation) {
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: Colors[colorScheme ?? 'light'].background },
        ]}
      >
        <Text>載入中...</Text>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: Colors[colorScheme ?? 'light'].background },
      ]}
    >
      <View
        style={[
          styles.header,
          { borderBottomColor: Colors[colorScheme ?? 'light'].tabIconDefault },
        ]}
      >
        <Text style={[styles.headerTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
          {conversation.name}
        </Text>
      </View>

      <FlatList
        data={messages}
        renderItem={renderMessageItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesList}
        scrollEnabled={true}
      />

      <View
        style={[
          styles.inputArea,
          { borderTopColor: Colors[colorScheme ?? 'light'].tabIconDefault },
        ]}
      >
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: Colors[colorScheme ?? 'light'].tabIconDefault + '20',
              color: Colors[colorScheme ?? 'light'].text,
            },
          ]}
          placeholder="輸入訊息..."
          placeholderTextColor={Colors[colorScheme ?? 'light'].tabIconDefault}
          value={inputText}
          onChangeText={setInputText}
          multiline
          maxHeight={100}
        />
        <TouchableOpacity
          style={[
            styles.sendButton,
            { backgroundColor: Colors[colorScheme ?? 'light'].tint },
            !inputText.trim() && styles.sendButtonDisabled,
          ]}
          onPress={handleSendMessage}
          disabled={!inputText.trim()}
        >
          <Text style={styles.sendButtonText}>送出</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  messagesList: {
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  messageRow: {
    flexDirection: 'row',
    marginVertical: 6,
    alignItems: 'flex-end',
  },
  myMessageRow: {
    justifyContent: 'flex-end',
  },
  otherMessageRow: {
    justifyContent: 'flex-start',
  },
  avatarSmall: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  avatarSmallText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  messageBubble: {
    maxWidth: '75%',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginHorizontal: 4,
  },
  myBubble: {
    backgroundColor: '#007AFF',
  },
  otherBubble: {
    backgroundColor: '#E5E5EA',
  },
  messageText: {
    fontSize: 14,
    color: '#000',
  },
  messageTime: {
    fontSize: 10,
    color: '#999',
    marginTop: 2,
  },
  inputArea: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderTopWidth: 1,
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 8,
    fontSize: 14,
  },
  sendButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
