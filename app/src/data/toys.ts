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
    description: '穿越修仙界重操旧业：接单、赶路、拿好评，从见习骑手送到证道成仙。',
    tags: ['文字经营', '修仙', '多结局'],
    author: 'LC',
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
    slug: 'adarkroom',
    name: '小黑屋',
    nameEn: 'A Dark Room',
    description: '从沙漠里一间小黑屋生火开始，一步步建起你的村落。文字生存神作，官方简中。',
    tags: ['文字生存', '经营', '官方中文'],
    author: 'Michael Townsend',
    repo: 'https://github.com/doublespeakgames/adarkroom',
    license: 'MPL-2.0',
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
