import { describe, it, expect } from 'vitest'
import { tools, CATEGORIES } from '../src/data/tools'

describe('tools 数据', () => {
  it('至少 60 个条目且 id 唯一', () => {
    expect(tools.length).toBeGreaterThanOrEqual(60)
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

  it('每条都有合法的价格/产地/直连/适用人群标签', () => {
    for (const t of tools) {
      expect(['免费', '部分免费', '付费']).toContain(t.pricing)
      expect(['国产', '海外']).toContain(t.origin)
      expect(typeof t.direct).toBe('boolean')
      expect(t.bestFor.length).toBeGreaterThan(0)
    }
  })

  it('恰好 8 个精选条目', () => {
    expect(tools.filter((t) => t.featured).length).toBe(8)
  })
})
