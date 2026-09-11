import type { GameLink, LinkSection } from '../types/content'

/**
 * 摸鱼直通车登记表。
 * 上架原则（与全站策展原则一致）：
 * 1. 纯中文界面——摸鱼是来放松的，不是来做阅读理解的
 * 2. 上架前在站内网络实测连通（curl 200），不收录打不开的站
 * 3. 点开即玩，不强制注册
 * 4. 有广告必须标注，不藏着掖着
 */
export const LINK_SECTIONS: LinkSection[] = ['单品神作', '摸鱼定制', '综合盒子', '怀旧经典']

export const gameLinks: GameLink[] = [
  /* ── 单品神作 ─────────────────────────── */
  {
    id: 'saolei',
    name: '扫雷',
    url: 'https://minesweeper.cn/',
    pitch: 'Windows 经典扫雷的中文独立站：四级难度、自适应屏幕，还有实时成绩榜可以卷。',
    section: '单品神作',
    tags: ['秒开', '免注册', '成绩榜'],
  },
  {
    id: 'shenlong',
    name: '召唤神龙',
    url: 'http://www.wesane.com/game/910/',
    pitch: '从一只蝌蚪一路吃到神龙，大鱼吃小鱼的终极形态。魔性，小心上头。',
    section: '单品神作',
    tags: ['免注册', '一局10分钟'],
  },
  {
    id: 'wuziqi',
    name: '五子棋对战',
    url: 'https://h.4399.com/play/202967.htm',
    pitch: '当年在作业本上画格子的游戏回来了。人机双人皆可，0.5M 轻量秒开。',
    section: '单品神作',
    tags: ['人机/双人', '免注册', '轻量'],
  },
  {
    id: 'xiangqi',
    name: '中国象棋 H5',
    url: 'https://h.4399.com/play/142022.htm',
    pitch: '0.21M 的极简象棋，打开就下，没有花里胡哨。',
    section: '单品神作',
    tags: ['免注册', '轻量'],
  },
  {
    id: 'shudu',
    name: '有趣的数独',
    url: 'https://www.4399.com/flash/239277.htm',
    pitch: '标准数独规则，安静烧脑，最适合"看起来在认真思考"。',
    section: '单品神作',
    tags: ['免注册', '静音友好'],
  },

  /* ── 摸鱼定制 ─────────────────────────── */
  {
    id: 'moyu',
    name: '摸鱼小游戏',
    url: 'https://moyu.aolifu.org/',
    pitch: '为摸鱼而生的合集站：植物大战僵尸、电子木鱼、超级马里奥……文案全是摸鱼梗。',
    section: '摸鱼定制',
    tags: ['合集站', '免注册', '摸鱼梗'],
  },
  {
    id: 'gityx',
    name: 'Git游戏',
    url: 'https://gityx.com/',
    pitch: '汉化放置挂机游戏合集：修仙、点击器、经营。挂上机最小化，它自己玩自己。',
    section: '摸鱼定制',
    tags: ['挂机', '免注册', '后台运行'],
  },

  /* ── 综合盒子 ─────────────────────────── */
  {
    id: 'poki-zh',
    name: 'Poki 中文版',
    url: 'https://poki.com/zh',
    pitch: '全球最大 HTML5 游戏盒子的官方中文版，质量天花板，即点即玩。',
    section: '综合盒子',
    tags: ['官方中文', '免注册', '质量高'],
  },
  {
    id: 'h4399',
    name: '4399 在线玩',
    url: 'https://h.4399.com/wap/',
    pitch: '4399 的 H5 频道：免下载、即点即玩，比主站清爽不少。',
    section: '综合盒子',
    tags: ['秒开', '免下载'],
  },
  {
    id: '4399',
    name: '4399',
    url: 'https://www.4399.com/',
    pitch: '童年回忆本忆。啥都有，广告也有——但它快啊。',
    section: '综合盒子',
    tags: ['秒开', '游戏最全', '广告多'],
  },
  {
    id: '7k7k',
    name: '7k7k',
    url: 'https://www.7k7k.com/',
    pitch: '和 4399 齐名的老牌盒子，双人小游戏特别多。',
    section: '综合盒子',
    tags: ['双人游戏', '广告多'],
  },
  {
    id: '2144',
    name: '2144 小游戏',
    url: 'https://www.2144.cn/',
    pitch: '休闲小游戏为主的老牌站，界面干净，加载快。',
    section: '综合盒子',
    tags: ['秒开', '界面干净'],
  },
  {
    id: '17yy',
    name: '17yy 经典小游戏',
    url: 'https://www.17yy.com/',
    pitch: '经典小游戏 + 无敌版大全，想爽一把就来这儿。',
    section: '综合盒子',
    tags: ['无敌版', '经典'],
  },
  {
    id: '360',
    name: '360 小游戏',
    url: 'https://fun.360.cn/',
    pitch: '大厂出品的清爽盒子，益智、棋牌、跑酷都有。',
    section: '综合盒子',
    tags: ['界面清爽', '免注册'],
  },
  {
    id: 'gamersky',
    name: '游民星空 H5',
    url: 'https://web.gamersky.com/',
    pitch: '游民星空出的精品 H5 频道，页游党狂喜。',
    section: '综合盒子',
    tags: ['精品页游', '免注册'],
  },

  /* ── 怀旧经典 ─────────────────────────── */
  {
    id: 'dos',
    name: '在线 DOS 游戏',
    url: 'https://dos.lol/',
    pitch: '金庸群侠传、大富翁、仙剑……DOS 时代的华语经典，浏览器里直接玩。',
    section: '怀旧经典',
    tags: ['华语经典', '免注册'],
  },
  {
    id: 'ra2',
    name: '网页红警',
    url: 'https://ra2web.com/',
    pitch: '红色警戒 2 网页版，还能联机对战。硬核摸鱼，慎重开局。',
    section: '怀旧经典',
    tags: ['可联机', '杀时间'],
  },
]
