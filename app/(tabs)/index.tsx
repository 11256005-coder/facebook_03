import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function TabsIndex() {
  const router = useRouter();
  const colorScheme = useColorScheme();

  useEffect(() => {
    // 延遲重定向以確保路由器已初始化
    const timer = setTimeout(() => {
      router.replace('/(tabs)/messages');
    }, 0);

    return () => clearTimeout(timer);
  }, [router]);

  // 在重定向期間顯示加載指示器
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors[colorScheme ?? 'light'].background }}>
      <ActivityIndicator size="large" color={Colors[colorScheme ?? 'light'].tint} />
    </View>
  );
}


