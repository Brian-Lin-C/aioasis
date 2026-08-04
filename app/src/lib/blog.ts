import { marked } from 'marked'
import type { BlogPost, BlogPostMeta } from '../types/content'

export function parseFrontmatter(raw: string): {
  data: Record<string, unknown>
  body: string
} {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!match) return { data: {}, body: raw }
  const data: Record<string, unknown> = {}
  for (const line of match[1].split(/\r?\n/)) {
    const kv = line.match(/^(\w+):\s*(.*)$/)
    if (!kv) continue
    const [, key, value] = kv
    if (value.startsWith('[') && value.endsWith(']')) {
      data[key] = value
        .slice(1, -1)
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
    } else {
      data[key] = value.trim()
    }
  }
  return { data, body: match[2] }
}

export function computeReadingMinutes(text: string): number {
  const chars = text.replace(/\s/g, '').length
  return Math.max(1, Math.ceil(chars / 400))
}

const modules = import.meta.glob('../content/blog/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

export function loadPosts(): BlogPost[] {
  const posts: BlogPost[] = Object.entries(modules).map(([path, raw]) => {
    const slug = path.split('/').pop()!.replace(/\.md$/, '')
    const { data, body } = parseFrontmatter(raw)
    const meta: BlogPostMeta = {
      slug,
      title: String(data.title ?? slug),
      date: String(data.date ?? '1970-01-01'),
      tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
      excerpt: String(data.excerpt ?? ''),
      readingMinutes: computeReadingMinutes(body),
    }
    return { ...meta, html: marked.parse(body, { async: false }) as string }
  })
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getPost(slug: string): BlogPost | undefined {
  return loadPosts().find((p) => p.slug === slug)
}
