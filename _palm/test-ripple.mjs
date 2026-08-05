/* CDP 回归：光晕边缘点击应切换；导航链接点击不应切换 */
import fs from 'node:fs'

const list = await (await fetch('http://127.0.0.1:9222/json')).json()
const page = list.find((t) => t.type === 'page')
const ws = new WebSocket(page.webSocketDebuggerUrl)
let id = 0
const pending = new Map()
const send = (method, params = {}) =>
  new Promise((res, rej) => {
    const i = ++id
    pending.set(i, { res, rej })
    ws.send(JSON.stringify({ id: i, method, params }))
  })
ws.onmessage = (ev) => {
  const m = JSON.parse(ev.data)
  if (m.id && pending.has(m.id)) {
    const p = pending.get(m.id)
    pending.delete(m.id)
    m.error ? p.rej(new Error(JSON.stringify(m.error))) : p.res(m.result)
  }
}
await new Promise((r) => (ws.onopen = r))
const click = async (x, y) => {
  await send('Input.dispatchMouseEvent', { type: 'mousePressed', x, y, button: 'left', clickCount: 1 })
  await send('Input.dispatchMouseEvent', { type: 'mouseReleased', x, y, button: 'left', clickCount: 1 })
}
const theme = async () =>
  (await send('Runtime.evaluate', { expression: `document.documentElement.dataset.theme`, returnByValue: true })).result.value

await send('Page.enable')
await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false })
await send('Page.navigate', { url: 'http://localhost:5199/' })
await new Promise((r) => setTimeout(r, 15000))
console.log('initial =', await theme())

// ① 光晕边缘（太阳中心右下 100px，旧半径 72 点不到，新半径 117 可以）
await click(Math.round(1440 * 0.88) + 70, Math.round(900 * 0.18) + 70)
await new Promise((r) => setTimeout(r, 1500))
console.log('after glow-edge click =', await theme(), '（应为 dark）')

// ② 点回白天（月亮中心）
await click(Math.round(1440 * 0.88), Math.round(900 * 0.18))
await new Promise((r) => setTimeout(r, 1500))
console.log('after moon click =', await theme(), '（应为 light）')

// ③ 点击导航"观测"链接 —— 不应切换主题
const { result } = await send('Runtime.evaluate', {
  expression: `(()=>{const a=[...document.querySelectorAll('header nav a')].find(a=>/观测/.test(a.textContent));const r=a.getBoundingClientRect();return JSON.stringify({x:r.x+r.width/2,y:r.y+r.height/2})})()`,
  returnByValue: true,
})
const nav = JSON.parse(result.value)
await click(nav.x, nav.y)
await new Promise((r) => setTimeout(r, 1500))
const t = await theme()
const { result: url } = await send('Runtime.evaluate', { expression: 'location.pathname', returnByValue: true })
console.log('after nav click =', t, '（应为 light）', 'path =', url.result.value, '（应为 /blog）')
process.exit(0)
