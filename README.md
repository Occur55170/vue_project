# Vue 管理後台系統

這是一個使用 Vue 3、Vite 和 TailwindCSS 開發的管理後台專案。

## 🚀 快速開始 (How to start)

### 1. 安裝依賴套件

請在專案根目錄開啟終端機，執行以下指令來安裝所有需要的套件：

```bash
npm install
```

### 2. 環境變數設定 (.env)

專案啟動前，請確保根目錄有一個 `.env` 檔案（如果沒有請自行建立）。裡面必須包含打 API 時需要的變數：

```env
VITE_API_URL=https://api-frontend-interview-server.metcfire.com.tw
VITE_API_TOKEN=yourEnglishName
```

### 3. 啟動本地開發伺服器

設定好環境變數後，執行以下指令啟動專案：

```bash
npm run dev
```

成功後，終端機會顯示網址 `http://localhost:3000`，你可以按住 `Command` (Mac) 或 `Ctrl` (Windows) 點擊網址，即可在瀏覽器預覽網頁。
