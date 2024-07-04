export const headerConfig = {
  links: [
    {
      text: '首页',
      href: '/',
    },
    // {
    //   text: '诗词 + AI',
    //   href: '/ai',
    // },
    {
      text: '每日一诗 🔥',
      href: '/today',
    },
    {
      text: '诗集',
      // href: '/collections',
      links: [
        {
          text: '所有诗集 🔥',
          href: '/collections',
        },
        {
          text: '唐诗三百首',
          href: '/collections/1',
        },
        {
          text: '宋词三百首',
          href: '/collections/2',
        },
        {
          text: '元曲三百首',
          href: '/collections/109',
        },
        {
          text: '给孩子的诗',
          href: '/collections/3',
        },
      ],
    },
    {
      text: '诗词',
      links: [
        {
          text: '按朝代检索 🔥',
          href: '/dynasties',
        },
        {
          text: '所有诗人',
          href: '/authors',
        },
        {
          text: '所有诗词',
          href: '/works',
        },
      ],
    },
  ],
  actions: [
    // {
    //   text: 'Search',
    //   href: '/search',
    //   target: '_self',
    // }
  ],
};