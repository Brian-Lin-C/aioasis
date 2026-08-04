import { describe, it, expect } from 'vitest'
import { filterTools } from '../src/lib/filter-tools'
import { tools } from '../src/data/tools'

describe('filterTools', () => {
  it('全部 + 空查询 = 全量', () => {
    expect(filterTools(tools, '全部', '')).toHaveLength(tools.length)
  })
  it('按分类过滤', () => {
    const r = filterTools(tools, '绘画', '')
    expect(r.length).toBeGreaterThan(0)
    expect(r.every((t) => t.category === '绘画')).toBe(true)
  })
  it('按关键词匹配名称与简介（大小写不敏感）', () => {
    const r = filterTools(tools, '全部', 'cursor')
    expect(r.some((t) => t.id === 'cursor')).toBe(true)
  })
  it('分类与关键词叠加', () => {
    const r = filterTools(tools, '对话', 'deepseek')
    expect(r).toHaveLength(1)
    expect(r[0].id).toBe('deepseek')
  })
  it('无命中返回空数组', () => {
    expect(filterTools(tools, '全部', '不存在的工具xyz')).toHaveLength(0)
  })
})
