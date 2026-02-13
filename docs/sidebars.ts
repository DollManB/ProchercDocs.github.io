import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  modSidebar: [
    'mod-introduction',
    'items',
    {
      type: 'category',
      label: 'API Документация',
      items: [
        {
          type: 'category',
          label: 'Hitbox API',
          items: [
            'api/HitboxAPI/entered',
          ],
        },
        {
          type: 'category',
          label: 'Player API',
          items: [
            'api/PlayerAPI/entered',
            'api/PlayerAPI/sendMessage',
            'api/PlayerAPI/getNamePlayer',
            'api/PlayerAPI/ServerPlayer'
          ],
        },
        {
          type: 'category',
          label: 'World API',
          items: [
            'api/WorldAPI/entered',
          ],
        },
        {
          type: 'category',
          label: 'Server API',
          items: [
            'api/ServerAPI/entered',
            'api/ServerAPI/getOnlinePlayer',
            'api/ServerAPI/getPlayerByName',
            'api/ServerAPI/getRandomPlayer',
            'api/ServerAPI/broadcast',
            'api/ServerAPI/executeCommand'
          ],
        },
      ],
    },
  ],
};

export default sidebars;