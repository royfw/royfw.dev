# royfw.dev

個人技術站。Astro + Starlight + TypeScript。

## Stack

- **Astro** 6.x
- **Starlight** 0.39(內建搜尋 / 暗色模式 / i18n / sidebar)
- **TypeScript** strict
- **i18n** 繁中(root)+ 英文
- **Search** Pagefind(build 後自動產生)
- **Deploy** Vercel / Docker(自架)雙模式

## Quick start

```bash
npm install
npm run dev          # http://localhost:4321
```

## Scripts

| 指令              | 作用                               |
| ----------------- | ---------------------------------- |
| `npm run dev`     | 開發伺服器(熱重載)                 |
| `npm run build`   | 產出靜態檔案到 `dist/`(含搜尋索引) |
| `npm run preview` | 預覽 build 結果                    |
| `npm run check`   | Astro 型別檢查 + `tsc --noEmit`    |
| `npm run format`  | Prettier 排版                      |

## 目錄

```
src/
├── content/
│   ├── docs/                    # 文件本體
│   │   ├── index.mdx            # 繁中首頁(root locale)
│   │   ├── guides/              # 繁中:入門
│   │   ├── docs/                # 繁中:正式文件
│   │   ├── notes/               # 繁中:筆記
│   │   ├── projects/            # 繁中:專案
│   │   └── en/                  # 英文版鏡像目錄
│   │       ├── index.mdx
│   │       ├── guides/
│   │       └── ...
│   └── i18n/                    # UI 字串覆寫
│       ├── zh-TW.json
│       └── en.json
├── assets/                      # 圖檔
├── styles/                      # 自訂 CSS
└── content.config.ts            # collections 定義

astro.config.mts                 # 主設定
```

## 新增文件

放在 `src/content/docs/{section}/{slug}.md` 或 `.mdx`。

最小 frontmatter:

```md
---
title: 文件標題
description: 一行說明,會出現在頁面 meta 與 list。
---

內容...
```

進階(調整 sidebar 順序、加 badge、標記草稿):

```md
---
title: 文件標題
description: ...
sidebar:
  order: 1
  badge:
    text: New
    variant: tip
draft: false
---
```

英文版放對應路徑:`src/content/docs/en/{section}/{slug}.md`。檔名相同,Starlight 會自動關聯兩個 locale。

## i18n 規則

- 預設 locale 是 `zh-TW`,走 root(URL 沒前綴)
- 英文走 `/en/...`
- 某篇只有繁中 → 英文路由 fallback 回繁中
- 內建 UI 字串(搜尋、目錄、上下頁)已支援 zh-TW,可在 `src/content/i18n/zh-TW.json` 覆寫

## 部署

### Vercel(推薦)

1. push 到 GitHub
2. Vercel import 這個 repo
3. Framework preset 會自動偵測為 Astro
4. `vercel.json` 已有 headers / 快取設定
5. 環境變數不用設

### 自架(Docker)

```bash
docker compose up -d --build
# 開 http://localhost:8080
```

反向代理(Caddy / nginx / Traefik)接過去就好。

範例 Caddyfile:

```caddyfile
royfw.dev {
    reverse_proxy localhost:8080
}
```

### 自架(裸機 nginx)

```bash
npm run build
# 把 dist/ 部署到 /var/www/royfw.dev
# nginx 設定參考 docker/nginx.conf
```

## 自訂

| 改什麼              | 改哪裡                                                    |
| ------------------- | --------------------------------------------------------- |
| 站名 / 描述         | `astro.config.mts` → `starlight.title` / `description`    |
| 主題色              | `src/styles/custom.css` → `--sl-hue-accent` / accent vars |
| 社交連結            | `astro.config.mts` → `starlight.social`                   |
| Sidebar 結構        | `astro.config.mts` → `starlight.sidebar`                  |
| 程式碼主題          | `astro.config.mts` → `starlight.expressiveCode.themes`    |
| Edit link 對應 repo | `astro.config.mts` → `starlight.editLink.baseUrl`         |

## 後續可加

- `starlight-blog` plugin — 如果 Notes 要做成時序型 blog
- `@astrojs/rss` — RSS feed
- `astro-icon` — 更彈性的 icon
- DocSearch / Algolia — 比 Pagefind 強的搜尋(但要付費 / 申請 OSS 額度)
- Cloudflare Web Analytics 或 Plausible — 不打 anthropic.com 那類問題的乾淨 analytics
