const list = await (await fetch('http://127.0.0.1:9222/json')).json()
const page = list.find((t) => t.type === 'page')
const ws = new WebSocket(page.webSocketDebuggerUrl)
let id = 0
const pending = new Map()
const send = (m, p = {}) => new Promise((res, rej) => { const i = ++id; pending.set(i, { res, rej }); ws.send(JSON.stringify({ id: i, method: m, params: p })) })
ws.onmessage = (ev) => { const m = JSON.parse(ev.data); if (m.id && pending.has(m.id)) { const p = pending.get(m.id); pending.delete(m.id); m.error ? p.rej(new Error(JSON.stringify(m.error))) : p.res(m.result) } }
await new Promise((r) => (ws.onopen = r))
const evalJs = async (expression) => (await send('Runtime.evaluate', { expression, returnByValue: true })).result.value
await send('Page.enable')
await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false })
await send('Page.addScriptToEvaluateOnNewDocument', { source: `let __n=0;Math.random=()=>{__n++;return __n<1500?0.9:0.1};localStorage.setItem('oasis-theme','dark');` })
await send('Page.navigate', { url: 'http://localhost:5199/' })
await new Promise((r) => setTimeout(r, 4200))
console.log(await evalJs(`(()=>{
  const c=[...document.querySelectorAll('canvas')].find(c=>c.width>500);
  if(!c) return 'no canvas';
  const ctx=c.getContext('2d');
  const H=Math.floor(c.height*0.45);
  const d=ctx.getImageData(0,0,c.width,H).data;
  let bright=0, warm=0, total=0;
  for(let i=0;i<d.length;i+=4){
    if(d[i+3]>10) total++;
    if(d[i]>200&&d[i+1]>200&&d[i+2]>200) bright++;
    if(d[i]>180&&d[i+1]>130&&d[i+2]<220&&d[i]>d[i+2]+30) warm++;
  }
  return JSON.stringify({theme:document.documentElement.dataset.theme, cw:c.width, ch:c.height, total, bright, warm});
})()`))
process.exit(0)
