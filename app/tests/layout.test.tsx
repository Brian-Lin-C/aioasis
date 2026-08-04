import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import SiteHeader from '../src/components/layout/SiteHeader'
import SiteFooter from '../src/components/layout/SiteFooter'

describe('布局', () => {
  it('Header 含品牌与三个编号导航项', () => {
    render(<MemoryRouter><SiteHeader /></MemoryRouter>)
    expect(screen.getByText(/AI绿洲/)).toBeInTheDocument()
    expect(screen.getByText('首页')).toBeInTheDocument()
    expect(screen.getByText('驿站')).toBeInTheDocument()
    expect(screen.getByText('观测')).toBeInTheDocument()
  })
  it('Footer 含 GitHub 链接与版权', () => {
    render(<MemoryRouter><SiteFooter /></MemoryRouter>)
    const link = screen.getByRole('link', { name: /GitHub/i })
    expect(link).toHaveAttribute('href', 'https://github.com/brian-lin-c')
    expect(screen.getByText(/© 2026 AI绿洲/)).toBeInTheDocument()
  })
})
