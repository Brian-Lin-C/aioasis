export const CATEGORIES = [
  '对话',
  '绘画',
  '视频',
  '音频',
  '编程',
  '办公效率',
  '搜索研究',
  '开源模型',
  'Agent工作流',
  '提示词社区',
  '模型API',
  '设计3D',
] as const

export type Category = (typeof CATEGORIES)[number]

export type Pricing = '免费' | '部分免费' | '付费'
export type Origin = '国产' | '海外'

export interface Tool {
  id: string
  name: string
  nameEn?: string
  description: string
  url: string
  category: Category
  featured: boolean
  pricing: Pricing
  origin: Origin
  /** 国内是否可直连使用 */
  direct: boolean
  /** 一句话说明适合谁 / 什么场景 */
  bestFor: string
}

export interface BlogPostMeta {
  slug: string
  title: string
  date: string
  tags: string[]
  excerpt: string
  readingMinutes: number
}

export interface BlogPost extends BlogPostMeta {
  html: string
}

/* ── 绿洲小径 · Trails ───────────────────── */

export type TrailLevel = '新手' | '进阶' | '硬核'
export type TrailLang = '中文' | '英文' | '中英'
export type TrailKind = '官方文档' | '教程' | '练手项目' | '视频课' | '社区' | '工具书'

/** 小径上的一个路标：一条策展过的第三方学习资源 */
export interface TrailStep {
  id: string
  title: string
  /** 策展人一句话：为什么推荐它 */
  note: string
  url: string
  lang: TrailLang
  level: TrailLevel
  kind: TrailKind
  free: boolean
}

/** 一条学习路线：一串有序的路标 */
export interface Trail {
  id: string
  title: string
  en: string
  level: TrailLevel
  description: string
  steps: TrailStep[]
}
