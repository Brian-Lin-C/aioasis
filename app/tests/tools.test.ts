import { describe, it, expect } from 'vitest'
import { tools, CATEGORIES } from '../src/data/tools'

describe('tools 数据', () => {
  it('至少 24 个条目且 id 唯一', () => {
    expect(tools.length).toBeGreaterThanOrEqual(24)
    expect(new Set(tools.map((t) => t.id)).size).toBe(tools.length)
  })

  it('每条都有合法分类、名称、简介、https 链接', () => {
    for (const t of tools) {
      expect(CATEGORIES).toContain(t.category)
      expect(t.name.length).toBeGreaterThan(0)
      expect(t.description.length).toBeGreaterThan(0)
      expect(t.url).toMatch(/^https:\/\//)
    }
  })

  it('恰好 8 个精选条目', () => {
    expect(tools.filter((t) => t.featured).length).toBe(8)
  })
})
