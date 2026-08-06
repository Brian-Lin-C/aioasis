import { describe, it, expect } from 'vitest'
import { celestialPosition } from '../src/components/canvas/celestial'

const W = 1440
const H = 900

describe('真实时间天体弧带', () => {
  it('全天 24 小时 × 昼夜两种主题，天体都保持在顶部弧带内且不撞标题', () => {
    for (let h = 0; h < 24; h++) {
      const now = new Date(2026, 7, 6, h, 30)
      for (const isDay of [true, false]) {
        const cp = celestialPosition(W, H, isDay, now)
        expect(cp.x).toBeGreaterThanOrEqual(W * 0.77)
        expect(cp.x).toBeLessThanOrEqual(W * 0.93)
        expect(cp.y).toBeGreaterThanOrEqual(H * 0.11)
        expect(cp.y).toBeLessThanOrEqual(H * 0.27)
        expect(cp.warm).toBeGreaterThanOrEqual(0)
        expect(cp.warm).toBeLessThanOrEqual(1)
        expect(cp.p).toBeGreaterThanOrEqual(0)
        expect(cp.p).toBeLessThanOrEqual(1)
      }
    }
  })

  it('正午最高、日出日落最低（白昼抛物线）', () => {
    const noon = celestialPosition(W, H, true, new Date(2026, 7, 6, 12, 0))
    const dawn = celestialPosition(W, H, true, new Date(2026, 7, 6, 6, 0))
    const dusk = celestialPosition(W, H, true, new Date(2026, 7, 6, 18, 0))
    expect(noon.y).toBeLessThan(dawn.y)
    expect(noon.y).toBeLessThan(dusk.y)
    // 晨昏暖意：正午无暖色，日出日落暖色拉满
    expect(noon.warm).toBe(0)
    expect(dawn.warm).toBe(1)
    expect(dusk.warm).toBe(1)
    // 一天之内太阳自左向右
    expect(dawn.x).toBeLessThan(noon.x)
    expect(noon.x).toBeLessThan(dusk.x)
  })

  it('深夜时刻钳制到最近的升落点，不会跑出弧带', () => {
    const clamped = celestialPosition(W, H, true, new Date(2026, 7, 6, 2, 0))
    expect(clamped.p).toBe(0)
    const clampedNight = celestialPosition(W, H, false, new Date(2026, 7, 6, 12, 0))
    expect(clampedNight.p).toBeGreaterThanOrEqual(0)
    expect(clampedNight.p).toBeLessThanOrEqual(1)
  })
})
