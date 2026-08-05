import { describe, it, expect } from 'vitest'
import { trails } from '../src/data/trails'
import { filterTrails } from '../src/lib/filter-trails'

const base = { query: '', level: '全部' as const, onlyCn: false, onlyDirect: false }

describe('trails 数据', () => {
  it('至少 1 条小径且 id 唯一', () => {
    expect(trails.length).toBeGreaterThanOrEqual(1)
    expect(new Set(trails.map((t) => t.id)).size).toBe(trails.length)
  })

  it('每条小径有标题、英文、描述和至少 3 个路标', () => {
    for (const t of trails) {
      expect(t.title.length).toBeGreaterThan(0)
      expect(t.en.length).toBeGreaterThan(0)
      expect(t.description.length).toBeGreaterThan(0)
      expect(['新手', '进阶', '硬核']).toContain(t.level)
      expect(t.steps.length).toBeGreaterThanOrEqual(3)
    }
  })

  it('每个路标字段合法且 id 全局唯一', () => {
    const ids: string[] = []
    for (const t of trails) {
      for (const s of t.steps) {
        ids.push(s.id)
        expect(s.title.length).toBeGreaterThan(0)
        expect(s.note.length).toBeGreaterThan(0)
        expect(s.url).toMatch(/^https:\/\//)
        expect(['中文', '英文', '中英']).toContain(s.lang)
        expect(['新手', '进阶', '硬核']).toContain(s.level)
        expect(['官方文档', '教程', '练手项目', '视频课', '社区', '工具书']).toContain(s.kind)
        expect(typeof s.free).toBe('boolean')
        expect(typeof s.direct).toBe('boolean')
      }
    }
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('中文可读的路标占多数（国内用户优先）', () => {
    const all = trails.flatMap((t) => t.steps)
    const cn = all.filter((s) => s.lang !== '英文')
    expect(cn.length).toBeGreaterThan(all.length / 3)
  })

  it('每条小径前两个路标里必有中文可读且国内直连的（新手入口零门槛）', () => {
    for (const t of trails) {
      const head = t.steps.slice(0, 2)
      expect(head.some((s) => s.lang !== '英文' && s.direct)).toBe(true)
    }
  })
})

describe('filterTrails', () => {
  it('默认返回全部小径与路标', () => {
    const r = filterTrails(trails, base)
    expect(r.length).toBe(trails.length)
    expect(r.reduce((n, t) => n + t.steps.length, 0)).toBe(
      trails.reduce((n, t) => n + t.steps.length, 0)
    )
  })

  it('按难度过滤', () => {
    const r = filterTrails(trails, { ...base, level: '新手' })
    expect(r.every((t) => t.steps.every((s) => s.level === '新手'))).toBe(true)
    expect(r.length).toBeGreaterThan(0)
  })

  it('中文可读开关排除纯英文路标', () => {
    const r = filterTrails(trails, { ...base, onlyCn: true })
    expect(r.every((t) => t.steps.every((s) => s.lang !== '英文'))).toBe(true)
  })

  it('国内直连开关排除需代理路标', () => {
    const r = filterTrails(trails, { ...base, onlyDirect: true })
    expect(r.every((t) => t.steps.every((s) => s.direct))).toBe(true)
  })

  it('关键词搜索命中标题/点评/小径名', () => {
    const r = filterTrails(trails, { ...base, query: 'postgres' })
    expect(r.length).toBeGreaterThan(0)
    expect(filterTrails(trails, { ...base, query: '不存在的词xyz' }).length).toBe(0)
  })
})
