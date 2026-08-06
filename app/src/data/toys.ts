import type { Toy } from '../types/content'

/**
 * 游戏厅登记表。
 * 收录新游戏：静态文件放进 public/toys/<slug>/，然后在这里加一条记录即可。
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
]
