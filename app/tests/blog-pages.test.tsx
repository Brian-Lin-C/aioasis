import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import BlogList from '../src/pages/BlogList'
import BlogPost from '../src/pages/BlogPost'

describe('博客页', () => {
  it('列表页显示 3 篇文章标题', () => {
    render(<MemoryRouter><BlogList /></MemoryRouter>)
    expect(screen.getByText(/我的 AI 工具箱/)).toBeInTheDocument()
    expect(screen.getByText(/为什么我把这里叫作/)).toBeInTheDocument()
    expect(screen.getByText(/从爱好者到创作者/)).toBeInTheDocument()
  })

  it('详情页渲染文章正文', () => {
    render(
      <MemoryRouter initialEntries={['/blog/why-oasis']}>
        <Routes>
          <Route path="/blog/:slug" element={<BlogPost />} />
        </Routes>
      </MemoryRouter>
    )
    expect(screen.getByText(/为什么我把这里叫作/)).toBeInTheDocument()
  })

  it('未知 slug 显示 404 提示', () => {
    render(
      <MemoryRouter initialEntries={['/blog/not-exist']}>
        <Routes>
          <Route path="/blog/:slug" element={<BlogPost />} />
        </Routes>
      </MemoryRouter>
    )
    expect(screen.getByText(/迷失在沙漠里/)).toBeInTheDocument()
  })
})
