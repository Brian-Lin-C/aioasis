import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import OasisScene from '../src/components/canvas/OasisScene'

describe('OasisScene', () => {
  it('渲染 canvas 且不崩溃', () => {
    const { container } = render(<OasisScene />)
    expect(container.querySelector('canvas')).toBeInTheDocument()
  })
})
