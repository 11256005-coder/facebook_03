import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: true,
        tabBarButton: HapticTab,
      }}
      sceneContainerStyle={{
        backgroundColor: Colors[colorScheme ?? 'light'].background,
      }}
      initialRouteName="messages">
      <Tabs.Screen
        name="messages"
        options={{
          title: '聊天',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="message.fill" color={color} />,
          headerTitle: 'Messenger',
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: '個人資料',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.fill" color={color} />,
          headerTitle: '我的頭像',
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
