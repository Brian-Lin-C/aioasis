import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import NavPage from '../src/pages/NavPage'

describe('导航页', () => {
  it('渲染全部工具与分类按钮', () => {
    render(<MemoryRouter><NavPage /></MemoryRouter>)
    expect(screen.getByText('全部')).toBeInTheDocument()
    expect(screen.getByText('绿洲驿站')).toBeInTheDocument()
    expect(screen.getAllByRole('link').length).toBeGreaterThanOrEqual(24)
  })
})
