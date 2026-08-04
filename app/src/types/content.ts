export const CATEGORIES = [
  '对话',
  '绘画',
  '视频',
  '音频',
  '编程',
  '办公效率',
  '搜索研究',
  '开源模型',
] as const

export type Category = (typeof CATEGORIES)[number]

export interface Tool {
  id: string
  name: string
  nameEn?: string
  description: string
  url: string
  category: Category
  featured: boolean
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
