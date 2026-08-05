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
await send('Page.navigate', { url: 'https://aioasis.top/' })
await new Promise((r) => setTimeout(r, 20000))
console.log('live initial theme =', await evalJs('document.documentElement.dataset.theme'))
console.log('js asset =', await evalJs(`[...document.scripts].map(s=>s.src).filter(s=>s.includes('assets')).join(',')`))

// ① 点太阳
await click(Math.round(1440 * 0.88), Math.round(900 * 0.18))
await new Promise((r) => setTimeout(r, 250))
await shot('E:/LC/Documents/Kimi/Workspaces/绿洲AI主页/_palm/live_1_sun_mid.png')
await new Promise((r) => setTimeout(r, 1500))
console.log('after sun click =', await evalJs('document.documentElement.dataset.theme'))
await shot('E:/LC/Documents/Kimi/Workspaces/绿洲AI主页/_palm/live_1_sun_done.png')

// ② 点按钮
const b = JSON.parse(await evalJs(`(()=>{const b=[...document.querySelectorAll('header button')].find(b=>/模式/.test(b.getAttribute('aria-label')||''));const r=b.getBoundingClientRect();return JSON.stringify({x:r.x+r.width/2,y:r.y+r.height/2})})()`))
await click(b.x, b.y)
await new Promise((r) => setTimeout(r, 250))
await shot('E:/LC/Documents/Kimi/Workspaces/绿洲AI主页/_palm/live_2_btn_mid.png')
await new Promise((r) => setTimeout(r, 1500))
console.log('after btn click =', await evalJs('document.documentElement.dataset.theme'))
process.exit(0)
