import fs from 'node:fs'
const list = await (await fetch('http://127.0.0.1:9222/json')).json()
const page = list.find((t) => t.type === 'page')
const ws = new WebSocket(page.webSocketDebuggerUrl)
let id = 0
const pending = new Map()
const send = (m, p = {}) => new Promise((res, rej) => { const i = ++id; pending.set(i, { res, rej }); ws.send(JSON.stringify({ id: i, method: m, params: p })) })
ws.onmessage = (ev) => { const m = JSON.parse(ev.data); if (m.id && pending.has(m.id)) { const p = pending.get(m.id); pending.delete(m.id); m.error ? p.rej(new Error(JSON.stringify(m.error))) : p.res(m.result) } }
await new Promise((r) => (ws.onopen = r))
const evalJs = async (expression) => (await send('Runtime.evaluate', { expression, returnByValue: true })).result.value
const click = async (x, y) => {
  await send('Input.dispatchMouseEvent', { type: 'mousePressed', x, y, button: 'left', clickCount: 1 })
  await send('Input.dispatchMouseEvent', { type: 'mouseReleased', x, y, button: 'left', clickCount: 1 })
}
const shot = async (name) => { const s = await send('Page.captureScreenshot', { format: 'png' }); fs.writeFileSync(name, Buffer.from(s.data, 'base64')) }
const SCAN = `(()=>{
  const c=[...document.querySelectorAll('canvas')].find(c=>c.width>500); if(!c) return 'null';
  const d=c.getContext('2d').getImageData(0,0,c.width,Math.floor(c.height*0.45)).data;
  for(let y=0;y<Math.floor(c.height*0.45);y++)for(let x=0;x<c.width;x++){
    const i=(y*c.width+x)*4;
    if(d[i]>240&&d[i+1]>215&&d[i+2]>130&&d[i+2]<220&&d[i+3]>60) return JSON.stringify({x,y});
  }
  return 'null';
})()`

await send('Page.enable')
await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false })
await send('Page.addScriptToEvaluateOnNewDocument', { source: `let __n=0;Math.random=()=>{__n++;return __n<1500?0.9:0.1};localStorage.setItem('oasis-theme','dark');` })
await send('Page.navigate', { url: 'http://localhost:5199/' })

let pos = 'null'
for (let i = 0; i < 22 && pos === 'null'; i++) {
  await new Promise((r) => setTimeout(r, 600))
  pos = await evalJs(SCAN)
}
console.log('meteor head at', pos)
if (pos === 'null') { console.log('NO METEOR'); process.exit(1) }
await shot('E:/LC/Documents/Kimi/Workspaces/绿洲AI主页/_palm/wish_before.png')
const p = JSON.parse(pos)
await click(p.x, p.y)
await new Promise((r) => setTimeout(r, 450))
await shot('E:/LC/Documents/Kimi/Workspaces/绿洲AI主页/_palm/wish_after.png')
console.log('done')
process.exit(0)
