import { StyleSheet, FlatList, TouchableOpacity, View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Conversation } from '@/types/chat';
import { mockConversations } from '@/constants/mockData';

export default function MessagesScreen() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const [conversations, setConversations] = useState<Conversation[]>([]);

  useEffect(() => {
    setConversations(mockConversations);
  }, []);

  const handleSelectConversation = (conversation: Conversation) => {
    router.push({
      pathname: '/chat-detail',
      params: { conversationId: conversation.id },
    });
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return '現在';
    if (diffMins < 60) return `${diffMins}分鐘前`;
    if (diffHours < 24) return `${diffHours}小時前`;
    if (diffDays < 7) return `${diffDays}天前`;
    return date.toLocaleDateString('zh-TW');
  };

  const renderItem = ({ item }: { item: Conversation }) => (
    <TouchableOpacity
      style={[
        styles.conversationItem,
        { borderBottomColor: Colors[colorScheme ?? 'light'].tabIconDefault },
      ]}
      onPress={() => handleSelectConversation(item)}
    >
      <View style={styles.avatarPlaceholder}>
        <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
      </View>
      <View style={styles.messageContent}>
        <Text
          style={[
            styles.senderName,
            { color: Colors[colorScheme ?? 'light'].text },
          ]}
        >
          {item.name}
        </Text>
        <Text
          style={[
            styles.lastMessage,
            { color: Colors[colorScheme ?? 'light'].tabIconDefault },
          ]}
          numberOfLines={1}
        >
          {item.lastMessage}
        </Text>
      </View>
      <Text
        style={[
          styles.timestamp,
          { color: Colors[colorScheme ?? 'light'].tabIconDefault },
        ]}
      >
        {formatTime(item.timestamp)}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
      <FlatList
        data={conversations}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        scrollEnabled={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  conversationItem: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  avatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  messageContent: {
    flex: 1,
  },
  senderName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  lastMessage: {
    fontSize: 14,
  },
  timestamp: {
    fontSize: 12,
    marginLeft: 8,
  },
});
