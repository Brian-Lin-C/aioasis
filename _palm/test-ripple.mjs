/* CDP 回归：太阳/按钮/月亮/按钮 交替点击，验证每次主题真正切换且涟漪起点正确 */
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
const shot = async (name) => {
  const s = await send('Page.captureScreenshot', { format: 'png' })
  fs.writeFileSync(name, Buffer.from(s.data, 'base64'))
}
const theme = async () => {
  const { result } = await send('Runtime.evaluate', {
    expression: `document.documentElement.dataset.theme`,
    returnByValue: true,
  })
  return result.value
}
const btnPos = async () => {
  const { result } = await send('Runtime.evaluate', {
    expression: `(()=>{const b=[...document.querySelectorAll('header button')].find(b=>/模式/.test(b.getAttribute('aria-label')||''));const r=b.getBoundingClientRect();return JSON.stringify({x:r.x+r.width/2,y:r.y+r.height/2})})()`,
    returnByValue: true,
  })
  return JSON.parse(result.value)
}

await send('Page.enable')
await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false })
await send('Page.navigate', { url: 'http://localhost:5199/' })
await new Promise((r) => setTimeout(r, 15000))
console.log('initial theme =', await theme())

const step = async (label, x, y) => {
  await click(x, y)
  await new Promise((r) => setTimeout(r, 200))
  await shot(`E:/LC/Documents/Kimi/Workspaces/绿洲AI主页/_palm/rt_${label}.png`)
  await new Promise((r) => setTimeout(r, 1800))
  console.log(label, '→ theme =', await theme())
}

await step('1_sun', Math.round(1440 * 0.88), Math.round(900 * 0.18))
const b1 = await btnPos()
await step('2_btn', b1.x, b1.y)
await step('3_moon', Math.round(1440 * 0.88), Math.round(900 * 0.18))
const b2 = await btnPos()
await step('4_btn', b2.x, b2.y)
process.exit(0)
