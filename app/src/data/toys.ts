import type { Toy } from '../types/content'

/**
 * 游戏厅登记表。
 * 收录新游戏：静态文件放进 public/toys/<slug>/，然后在这里加一条记录即可。
 * 收录他人开源游戏时必须：附带原 LICENSE 文件 + 填 author/repo/license 署名。
 */
export const toys: Toy[] = [
  {
    slug: 'cultivation-express',
    name: '我在修仙界送外卖',
    nameEn: 'Cultivation Express',
    description: '穿越修仙界重操旧业：接单、赶路、拿好评，雇佣骑手自动跑单，离线也在赚灵石。',
    tags: ['文字经营', '修仙', '放置挂机', '多结局'],
    author: 'LC',
  },
  {
    slug: 'liferestart',
    name: '人生重开模拟器',
    nameEn: 'Life Restart',
    description: '这垃圾人生一秒也不想待了——抽天赋、分配属性，一键重开你的传奇人生。',
    tags: ['文字模拟', '随机', '现象级'],
    author: '神戸小鳥',
    repo: 'https://github.com/VickScarlet/lifeRestart',
    license: 'MIT',
  },
  {
    slug: 'handle',
    name: '汉兜',
    nameEn: 'Handle',
    description: '汉字版 Wordle：十次机会猜一个四字成语，拼音部首都是线索。',
    tags: ['猜词', '中文', '每日一题'],
    author: 'Anthony Fu',
    repo: 'https://github.com/antfu/handle',
    license: 'MIT',
  },
  {
    slug: '2048',
    name: '2048',
    nameEn: '2048',
    description: '国民级数字拼图：滑动合并相同方块，谁能冲到 2048？',
    tags: ['益智', '数字', '经典'],
    author: 'Gabriele Cirulli',
    repo: 'https://github.com/gabrielecirulli/2048',
    license: 'MIT',
  },
  {
    slug: 'breaklock',
    name: '图案解锁',
    nameEn: 'Breaklock',
    description: '图案解锁 × 密码破译：每次尝试都会告诉你几点正确，推理出唯一解。',
    tags: ['解谜', '推理', '官方中文'],
    entry: 'zh/index.html',
    author: 'maxwellito',
    repo: 'https://github.com/maxwellito/breaklock',
    license: 'MIT',
  },
]
