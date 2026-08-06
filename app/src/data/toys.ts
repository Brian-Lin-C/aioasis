import type { Toy } from '../types/content'

/**
 * 游戏厅登记表。
 * 收录新游戏：静态文件放进 public/toys/<slug>/，然后在这里加一条记录即可。
 */
export const toys: Toy[] = [
  // 示例（收录时删掉注释，换成真实游戏）：
  // {
  //   slug: 'snake',
  //   name: '贪吃蛇',
  //   nameEn: 'SNAKE',
  //   description: '经典贪吃蛇，触屏可玩',
  //   tags: ['街机', '休闲'],
  //   author: 'Brian',
  // },
]
