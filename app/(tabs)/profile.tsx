import { StyleSheet, View, Text, TouchableOpacity, Image, Alert, Platform } from 'react-native';
import { useState, useRef } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<any>(null);

  const pickImageMobile = async () => {
    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (!permission.granted) {
        Alert.alert('權限被拒絕', '需要訪問你的圖片庫來選擇頭像');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        setProfileImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const takePhotoMobile = async () => {
    try {
      const permission = await ImagePicker.requestCameraPermissionsAsync();
      
      if (!permission.granted) {
        Alert.alert('權限被拒絕', '需要訪問相機來拍攝頭像');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        setProfileImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageOptions = () => {
    if (Platform.OS === 'web') {
      pickImageWeb();
      return;
    }

    Alert.alert(
      '選擇頭像',
      '請選擇上傳方式',
      [
        { text: '從相冊選擇', onPress: pickImageMobile },
        { text: '拍攝新照片', onPress: takePhotoMobile },
        { text: '取消', onPress: () => {}, style: 'cancel' },
      ]
    );
  };

  const pickImageWeb = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleWebFileSelect = (event: any) => {
    const file = event.target?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) {
          setProfileImage(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
      <View style={styles.profileSection}>
        <Text style={[styles.title, { color: Colors[colorScheme ?? 'light'].text }]}>
          個人頭像
        </Text>
        
        <TouchableOpacity
          style={[
            styles.avatarContainer,
            { borderColor: Colors[colorScheme ?? 'light'].tint },
          ]}
          onPress={handleImageOptions}
        >
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.avatar} />
          ) : (
            <View style={styles.placeholderAvatar}>
              <Text style={styles.placeholderText}>+</Text>
            </View>
          )}
        </TouchableOpacity>

        <Text style={[styles.hint, { color: Colors[colorScheme ?? 'light'].tabIconDefault }]}>
          點擊頭像以選擇或拍攝照片
        </Text>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]}
          onPress={handleImageOptions}
        >
          <Text style={styles.buttonText}>
            {profileImage ? '更換頭像' : '上傳頭像'}
          </Text>
        </TouchableOpacity>

        {profileImage && (
          <TouchableOpacity
            style={[styles.button, styles.deleteButton]}
            onPress={() => setProfileImage(null)}
          >
            <Text style={styles.deleteButtonText}>刪除頭像</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Web 文件輸入 - 僅在 Web 平台顯示 */}
      {Platform.OS === 'web' && (
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleWebFileSelect}
          style={{ display: 'none' }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  profileSection: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  avatarContainer: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#f0f0f0',
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  placeholderAvatar: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E8E8E8',
  },
  placeholderText: {
    fontSize: 60,
    color: '#999',
  },
  hint: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
