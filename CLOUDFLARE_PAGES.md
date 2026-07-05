# Cloudflare Pages 部署設定

這個專案是純靜態網站，可以直接部署到 Cloudflare Pages。建議使用 GitHub 自動部署，不要使用手動上傳，之後每次更新 `main` 分支都會自動重新部署。

## 建議設定

| 欄位 | 要填什麼 |
|---|---|
| Pages 來源 | Connect to Git / Import an existing Git repository |
| GitHub repo | `TechTWC/life` |
| Project name | `techtwc-life`；如果已被使用，改 `techtwc-life-ledger` |
| Production branch | `main` |
| Framework preset | `None` / 無框架 |
| Build command | `exit 0` |
| Build output directory | `/` |
| Root directory | 留空 |
| Environment variables | 不需要 |
| D1 database binding | 不需要 |
| Workers / Functions | 不需要 |

## 操作步驟

1. 打開 Cloudflare Dashboard。
2. 進入 **Workers & Pages**。
3. 按 **Create application**。
4. 選 **Pages**。
5. 選 **Connect to Git** 或 **Import an existing Git repository**。
6. 授權 GitHub，選 repo：`TechTWC/life`。
7. 進入設定頁後，照上方表格填。
8. 按 **Save and Deploy**。
9. 部署完成後會得到一個 `*.pages.dev` 網址。

## 為什麼這版不用 D1

目前 Life Ledger 的資料存在瀏覽器 `localStorage`。這樣可以先快速驗證使用流程，不需要帳號、不需要後端、不需要資料庫。

優點：

- 部署簡單。
- 沒有伺服器資料外洩風險。
- 不會產生資料庫費用。

限制：

- 換裝置不會自動同步。
- 清除瀏覽器資料可能遺失紀錄。
- 需要定期匯出 JSON 備份。

## 什麼時候才需要 D1 或後端

等你確認這個工具真的會每天使用，再升級到：

1. 登入帳號。
2. 多裝置同步。
3. 雲端備份。
4. 週報 / 月報長期資料分析。
5. 手機與電腦共用同一份資料。

到那時候才需要 Cloudflare D1、Workers 或其他後端服務。

## 已加入的 Cloudflare 檔案

- `_headers`：提供基本安全 headers。
- `index.html`：Cloudflare Pages 會從根目錄讀取首頁。

