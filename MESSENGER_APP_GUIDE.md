# Facebook Messenger App

這是一個使用 React Native + Expo 開發的類似 Facebook Messenger 的聊天應用。

## 功能特點

### 1. 聊天列表 (Messages Tab)
- 顯示所有聯絡人的聊天列表
- 每個聯絡人顯示：姓名、最後一條訊息、訊息時間
- 點擊聯絡人進入聊天詳情頁面
- 自動計算相對時間（如「5分鐘前」、「2小時前」）

### 2. 聊天詳情
- 顯示與特定聯絡人的完整對話歷史
- 實時訊息發送功能
- 訊息時間戳記
- 區分自己和對方的訊息（藍色氣泡 vs 灰色氣泡）

### 3. 個人頭像設定 (Profile Tab)
- 顯示個人頭像預覽
- 可以透過兩種方式上傳頭像：
  - 從相冊選擇圖片
  - 使用相機拍攝新照片
- 支援裁剪功能（保持正方形比例）
- 可以刪除已上傳的頭像

## 技術棧

- **框架**：React Native + Expo Router
- **語言**：TypeScript
- **路由**：Expo Router (基於文件系統)
- **UI 組件**：React Native
- **圖片選擇**：expo-image-picker
- **導航**：Bottom Tab Navigation

## 項目結構

```
app/
├── _layout.tsx                 # 根層導航配置
├── chat-detail.tsx             # 聊天詳情頁面
├── (tabs)/
│   ├── _layout.tsx            # Tab 導航配置
│   ├── messages.tsx           # 聊天列表頁面
│   ├── profile.tsx            # 個人頭像設定頁面
│   ├── index.tsx              # Home 頁面
│   └── explore.tsx            # Explore 頁面

constants/
├── mockData.ts                 # 模擬聊天數據
└── theme.ts                    # 主題配置

types/
└── chat.ts                     # 聊天類型定義
```

## 使用方法

### 安裝依賴
```bash
npm install
# 或
yarn install
```

### 啟動應用
```bash
npm start
# 選擇平台：
# - 'i' for iOS
# - 'a' for Android
# - 'w' for Web
```

### 主要功能說明

#### 1. 查看聊天列表
- 打開應用後，默認進入「聊天」Tab
- 顯示所有模擬聊天對話
- 每個對話顯示最後一條訊息和時間戳記

#### 2. 進行聊天
- 點擊列表中的任何聯絡人
- 進入聊天詳情頁面
- 在底部輸入框輸入訊息
- 點擊「送出」按鈕發送訊息
- 新訊息會實時顯示在對話中

#### 3. 設定頭像
- 切換到「個人資料」Tab
- 點擊頭像區域或「上傳頭像」按鈕
- 選擇「從相冊選擇」或「拍攝新照片」
- 裁剪並確認選擇
- 頭像會保存到應用狀態

## 數據模型

### Conversation (聊天)
```typescript
{
  id: string              // 唯一識別碼
  name: string            // 聯絡人名稱
  lastMessage: string     // 最後一條訊息
  timestamp: Date         // 訊息時間
  messages: Message[]     // 訊息列表
  avatar?: string         // 頭像 URI（可選）
}
```

### Message (訊息)
```typescript
{
  id: string              // 唯一識別碼
  text: string            // 訊息文本
  sender: 'me' | 'other' // 發送者
  timestamp: Date         // 發送時間
}
```

## 權限配置

應用需要以下權限：
- **相機權限**：拍攝頭像照片
- **圖片庫權限**：選擇頭像圖片

首次使用時會自動請求這些權限。

## 樣式和主題

應用支持亮色和暗色主題，自動適應系統主題設置。
- 主要顏色：藍色 (#007AFF)
- 自動響應主題切換

## 未來改進方向

- [ ] 實現實際的後端數據同步
- [ ] 添加聊天搜索功能
- [ ] 支持聊天記錄持久化
- [ ] 添加訊息編輯和刪除功能
- [ ] 支持圖片消息發送
- [ ] 添加已讀狀態標記
- [ ] 實現打字指示器
- [ ] 支持語音消息

## 注意事項

- 當前使用的是模擬數據，頁面刷新後會重置
- 頭像設置存儲在應用內存中，應用重啟後會清除
- 發送的新訊息是客戶端即時添加，未真實連接後端

## 開發者

基於 Expo + React Native 開發框架
