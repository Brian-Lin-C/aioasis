/** 真实时间联动：把本地时刻映射为天体在画面顶部弧带上的位置。
 *  - 白昼按 6→18 点、夜晚按 18→次日 6 点推进，弧带 x∈[0.78,0.92]w、y∈[0.12,0.26]h（抛物线，正午最高）
 *  - 晨昏时分 warm→1，用于给太阳染上暖意橙调；夜晚不使用 warm
 *  - 主题始终由用户手动切换，这里只决定"天体画在哪"，不干预日夜状态 */
export interface CelestialPos {
  /** 相对画布宽高的像素坐标（不含视差偏移） */
  x: number
  y: number
  /** 晨昏暖意 0..1（正午/子夜为 0，日出日落前后为 1） */
  warm: number
  /** 时刻进度 0..1（日出→日落 / 月升→月落） */
  p: number
}

export function celestialPosition(
  w: number,
  h: number,
  isDay: boolean,
  now: Date = new Date(),
): CelestialPos {
  const hour = now.getHours() + now.getMinutes() / 60
  const raw = isDay ? (hour - 6) / 12 : ((hour + 24 - 18) % 24) / 12
  const p = Math.min(1, Math.max(0, raw))
  const x = w * (0.78 + 0.14 * p)
  const y = h * (0.12 + 0.14 * (2 * p - 1) ** 2)
  const edge = Math.abs(p - 0.5) * 2 // 0 正午 → 1 升落点
  const warm = Math.min(1, Math.max(0, (edge - 0.55) / 0.35))
  return { x, y, warm, p }
}
