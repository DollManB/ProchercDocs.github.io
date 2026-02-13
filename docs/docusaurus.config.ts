import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'ProchercEngine Documentation',
  tagline: 'Руководство по использованию движка',
  favicon: 'img/favicon.png',


  url: 'https://DollManB.github.io',
  baseUrl: '/pe_docs/',

  organizationName: 'DollManB',
  projectName: 'pe_docs',

  onBrokenLinks: 'throw',
  i18n: {
    defaultLocale: 'ru',
    locales: ['ru'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'ProchercEngine Docs',
      logo: {
        alt: 'Логотип Мода',
        src: 'img/favicon.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'modSidebar',
          position: 'left',
          label: 'Документация',
        }
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '⠀',
          items: [
            {
              label: '⠀⠀⠀⠀⠀',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Discord',
              href: 'https://discord.gg/fUUJTtcYBq',
            },
            {
              label: 'Telegram',
              href: 'https://t.me/akadollman'
            }
          ],
        }
      ],
      copyright: `⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀Copyright © ${new Date().getFullYear()} ProchercEngine, Inc. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;