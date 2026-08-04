import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Home from '../src/pages/Home'

describe('首页', () => {
  it('含 Hero 标语与四个区块', () => {
    render(<MemoryRouter><Home /></MemoryRouter>)
    expect(screen.getByText('AI OASIS')).toBeInTheDocument()
    expect(screen.getByText(/在数字沙漠里/)).toBeInTheDocument()
    expect(screen.getByText('关于这片绿洲')).toBeInTheDocument()
    expect(screen.getByText('绿洲驿站')).toBeInTheDocument()
    expect(screen.getByText('最新观测')).toBeInTheDocument()
  })
})
