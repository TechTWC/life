# Life Ledger

一個用來記錄「每天做了哪些事、怎麼花時間」的個人生活管理網站。

這個版本刻意做成純前端靜態網站：不用登入、不需要資料庫、不需要後端。資料會存在你目前瀏覽器的 `localStorage`，你可以匯出 JSON 或 CSV 備份。

## 核心目標

- 看見每天的時間實際流向，而不是只憑感覺回想。
- 把時間分成「投資人生、必要維持、恢復休息、流失時間」。
- 用「專注一段、休息一段」的提醒工作流，避免長時間陷入工作或分心。
- 每天收工時留下回顧，讓生活可以調整、累積、迭代。

## 功能

- 選擇日期並記錄每日意圖。
- 用計時器記錄當下活動。
- 手動補記開始時間、結束時間、分類、時間價值與備註。
- 自動統計今日已記錄時間、投資人生時間、流失時間與掌舵感分數。
- 依分類顯示今日時間分布。
- 每日回顧欄位：完成、浪費、明天防線、給自己的話。
- 休息提醒：可設定專注分鐘與休息分鐘，支援瀏覽器通知。
- 匯出 JSON、匯出 CSV、匯入 JSON。
- 支援 GitHub Pages 與 Cloudflare Pages 部署。

## 本機使用

直接打開 `index.html` 即可使用。

也可以用任何靜態伺服器：

```bash
python -m http.server 8000
```

然後打開瀏覽器：

```text
http://localhost:8000
```

## Cloudflare Pages 部署

這個專案可以直接放到 Cloudflare Pages。建議使用 GitHub 自動部署，不要使用手動上傳。

詳細設定請看 [`CLOUDFLARE_PAGES.md`](CLOUDFLARE_PAGES.md)。

簡要設定：

| 欄位 | 要填什麼 |
|---|---|
| GitHub repo | `TechTWC/life` |
| Production branch | `main` |
| Framework preset | `None` / 無框架 |
| Build command | `exit 0` |
| Build output directory | `/` |
| Root directory | 留空 |
| Environment variables | 不需要 |
| D1 database binding | 不需要 |

## GitHub Pages 部署

此 repo 已包含 `.github/workflows/pages.yml`。推送到 `main` 後，GitHub Actions 會嘗試部署靜態網站。

若第一次部署沒有出現頁面，請到 GitHub repo 的 **Settings → Pages**，把 Source 設為 **GitHub Actions**，再重新執行 workflow。

## 資料與隱私

目前所有紀錄都只存在瀏覽器 localStorage。這代表：

- 優點：資料不會送到伺服器。
- 風險：清除瀏覽器資料或更換裝置可能遺失紀錄。

建議定期使用「匯出 JSON」備份。

## 下一步可做

- 加上週/月報表。
- 加上目標系統，例如健康、學習、工作、關係的週目標。
- 加上雲端同步，例如 Supabase、Firebase 或 GitHub Gist。
- 加上行動版 PWA icon 與離線快取。
