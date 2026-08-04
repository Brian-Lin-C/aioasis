import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import MaskReveal from '../src/components/motion/MaskReveal'
import Magnetic from '../src/components/motion/Magnetic'
import Preloader from '../src/components/motion/Preloader'

describe('motion 组件', () => {
  it('MaskReveal 渲染子内容', () => {
    render(<MaskReveal>绿洲</MaskReveal>)
    expect(screen.getByText('绿洲')).toBeInTheDocument()
  })
  it('Magnetic 渲染子内容', () => {
    render(<Magnetic><button>进入</button></Magnetic>)
    expect(screen.getByText('进入')).toBeInTheDocument()
  })
  it('Preloader 显示 LOCATING OASIS', () => {
    render(<Preloader onDone={() => {}} />)
    expect(screen.getByText(/LOCATING OASIS/)).toBeInTheDocument()
  })
})
