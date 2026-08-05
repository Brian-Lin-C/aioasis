import type { Trail, TrailLevel } from '../types/content'

export interface TrailFilter {
  query: string
  level: TrailLevel | '全部'
  onlyCn: boolean
  onlyDirect: boolean
}

/** 过滤小径：硬条件（难度/中文/直连）+ 关键词；空小径整体隐藏 */
export function filterTrails(trails: Trail[], f: TrailFilter): Trail[] {
  const q = f.query.trim().toLowerCase()
  return trails
    .map((t) => ({
      ...t,
      steps: t.steps.filter((s) => {
        if (f.level !== '全部' && s.level !== f.level) return false
        if (f.onlyCn && s.lang === '英文') return false
        if (f.onlyDirect && !s.direct) return false
        if (q && !`${s.title} ${s.note} ${t.title} ${t.en}`.toLowerCase().includes(q)) return false
        return true
      }),
    }))
    .filter((t) => t.steps.length > 0)
}
