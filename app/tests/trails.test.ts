import { describe, it, expect } from 'vitest'
import { trails } from '../src/data/trails'

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
      }
    }
    expect(new Set(ids).size).toBe(ids.length)
  })
})
