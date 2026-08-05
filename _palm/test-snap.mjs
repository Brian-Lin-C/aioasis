import fs from 'node:fs'
const list = await (await fetch('http://127.0.0.1:9222/json')).json()
const page = list.find((t) => t.type === 'page')
const ws = new WebSocket(page.webSocketDebuggerUrl)
let id = 0
const pending = new Map()
const send = (m, p = {}) => new Promise((res, rej) => { const i = ++id; pending.set(i, { res, rej }); ws.send(JSON.stringify({ id: i, method: m, params: p })) })
ws.onmessage = (ev) => { const m = JSON.parse(ev.data); if (m.id && pending.has(m.id)) { const p = pending.get(m.id); pending.delete(m.id); m.error ? p.rej(new Error(JSON.stringify(m.error))) : p.res(m.result) } }
await new Promise((r) => (ws.onopen = r))
const click = async (x, y) => {
  await send('Input.dispatchMouseEvent', { type: 'mousePressed', x, y, button: 'left', clickCount: 1 })
  await send('Input.dispatchMouseEvent', { type: 'mouseReleased', x, y, button: 'left', clickCount: 1 })
}
const evalJs = async (expression) => (await send('Runtime.evaluate', { expression, returnByValue: true })).result.value
const shot = async (name) => { const s = await send('Page.captureScreenshot', { format: 'png' }); fs.writeFileSync(name, Buffer.from(s.data, 'base64')) }
await send('Page.enable')
await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false })
await send('Page.navigate', { url: 'http://localhost:5199/' })
await new Promise((r) => setTimeout(r, 15000))
// 点光晕边缘（偏离太阳中心 70,70）：涟漪应从太阳中心荡开
await click(Math.round(1440 * 0.88) + 70, Math.round(900 * 0.18) + 70)
await new Promise((r) => setTimeout(r, 250))
await shot('E:/LC/Documents/Kimi/Workspaces/绿洲AI主页/_palm/snap_edge_mid.png')
await new Promise((r) => setTimeout(r, 1500))
console.log('theme =', await evalJs('document.documentElement.dataset.theme'), '（应为 dark）')
process.exit(0)
