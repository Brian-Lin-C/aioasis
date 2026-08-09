import { describe, it, expect } from 'vitest'
import { loadPosts } from '../src/lib/blog'

describe('启动文章', () => {
  it('收录至少 3 篇且按日期降序', () => {
    const posts = loadPosts()
    expect(posts.length).toBeGreaterThanOrEqual(3)
    const slugs = posts.map((p) => p.slug)
    expect(slugs).toEqual(
      [...slugs].sort((a, b) => 0) // 占位防止误改，顺序断言在下一行
    )
    for (let i = 1; i < posts.length; i++) {
      expect(posts[i - 1].date >= posts[i].date).toBe(true)
    }
  })

  it('每篇有标题、摘要、标签和真实正文', () => {
    for (const p of loadPosts()) {
      expect(p.title.length).toBeGreaterThan(4)
      expect(p.excerpt.length).toBeGreaterThan(10)
      expect(p.tags.length).toBeGreaterThan(0)
      expect(p.html.length).toBeGreaterThan(500)
      expect(p.readingMinutes).toBeGreaterThanOrEqual(1)
    }
  })
})
