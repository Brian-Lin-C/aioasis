import { describe, it, expect } from 'vitest'
import { parseFrontmatter, computeReadingMinutes } from '../src/lib/blog'

describe('parseFrontmatter', () => {
  it('解析 title/date/tags/excerpt', () => {
    const raw = `---\ntitle: 测试标题\ndate: 2026-08-05\ntags: [AI, 随笔]\nexcerpt: 这是一段摘要\n---\n\n正文内容`
    const { data, body } = parseFrontmatter(raw)
    expect(data.title).toBe('测试标题')
    expect(data.date).toBe('2026-08-05')
    expect(data.tags).toEqual(['AI', '随笔'])
    expect(data.excerpt).toBe('这是一段摘要')
    expect(body.trim()).toBe('正文内容')
  })

  it('无 frontmatter 时返回空 data 与原文', () => {
    const { data, body } = parseFrontmatter('只有正文')
    expect(data).toEqual({})
    expect(body).toBe('只有正文')
  })
})

describe('computeReadingMinutes', () => {
  it('按 400 字/分钟且下限 1', () => {
    expect(computeReadingMinutes('短')).toBe(1)
    expect(computeReadingMinutes('字'.repeat(800))).toBe(2)
    expect(computeReadingMinutes('字'.repeat(1000))).toBe(3)
  })
})
