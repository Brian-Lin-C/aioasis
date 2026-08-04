import type { Tool, Category } from '../types/content'

export function filterTools(
  list: Tool[],
  category: Category | '全部',
  query: string
): Tool[] {
  const q = query.trim().toLowerCase()
  return list.filter((t) => {
    if (category !== '全部' && t.category !== category) return false
    if (!q) return true
    return [t.name, t.nameEn ?? '', t.description]
      .join(' ')
      .toLowerCase()
      .includes(q)
  })
}
