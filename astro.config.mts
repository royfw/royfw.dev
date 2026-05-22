// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://royfw.dev',
  trailingSlash: 'ignore',

  integrations: [
    starlight({
      title: {
        'zh-TW': 'royfw.dev',
        en: 'royfw.dev',
      },
      description: 'Roy Fang — Engineering notes, docs, and projects.',

      // i18n:zh-TW 為 root(/path),英文走 /en/path
      defaultLocale: 'root',
      locales: {
        root: {
          label: '繁體中文',
          lang: 'zh-TW',
        },
        en: {
          label: 'English',
          lang: 'en',
        },
      },

      // 社交連結 — 換成你自己的
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/royfw',
        },
      ],

      // 自訂樣式
      customCss: ['./src/styles/custom.css'],

      // logo(放好檔案再開)
      // logo: {
      //   src: './src/assets/logo.svg',
      //   replacesTitle: false,
      // },

      // 編輯連結 — 換成你的 repo
      editLink: {
        baseUrl: 'https://github.com/royfw/royfw.dev/edit/main/',
      },

      // 最後更新時間(需要在 git 環境)
      lastUpdated: true,

      // 自訂元件
      components: {
        LastUpdated: './src/components/starlight/LastUpdated.astro',
      },

      // 上下頁
      pagination: true,

      // 側邊欄 — 每個 locale 自己的 label
      sidebar: [
        {
          label: 'Guides',
          translations: { 'zh-TW': '入門' },
          items: [
            {
              autogenerate: { directory: 'guides' },
            }
          ]
        },
        {
          label: 'Docs',
          translations: { 'zh-TW': '文件' },
          items: [
            {
              autogenerate: { directory: 'docs' },
            }
          ]
        },
        {
          label: 'Notes',
          translations: { 'zh-TW': '筆記' },
          items: [
            {
              autogenerate: { directory: 'notes' },
            }
          ]
        },
        {
          label: 'Projects',
          translations: { 'zh-TW': '專案' },
          items: [
            {
              autogenerate: { directory: 'projects' },
            }
          ]
        },
        {
          label: 'VenVia',
          translations: { 'zh-TW': 'VenVia' },
          items: [
            {
              autogenerate: { directory: 'venvia' },
            }
          ]
        },
      ],

      // 程式碼區塊 — Expressive Code 設定
      expressiveCode: {
        themes: ['github-dark', 'github-light'],
        styleOverrides: {
          borderRadius: '0.5rem',
          codeFontFamily:
            "'JetBrains Mono', 'Fira Code', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
        },
      },

      // head 注入 — analytics / favicon 之類在這裡加
      head: [
        {
          tag: 'meta',
          attrs: { name: 'theme-color', content: '#0a0a0a' },
        },
      ],
    }),

    sitemap({
      i18n: {
        defaultLocale: 'zh-TW',
        locales: {
          'zh-TW': 'zh-TW',
          en: 'en',
        },
      },
    }),
  ],
});
