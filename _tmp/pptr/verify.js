const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    defaultViewport: { width: 1440, height: 900 },
  });
  const page = await browser.newPage();
  await page.goto('https://aioasis.top', { waitUntil: 'networkidle2', timeout: 60000 });
  await new Promise(r => setTimeout(r, 3000));

  const info = await page.evaluate(() => {
    const c = document.querySelector('canvas[data-oasis-scene]');
    const r = c ? c.getBoundingClientRect() : null;
    const btn = document.querySelector('button[aria-label*="切换"]');
    const br = btn ? btn.getBoundingClientRect() : null;
    window.__clips = [];
    const orig = Element.prototype.animate;
    Element.prototype.animate = function (...args) {
      try { window.__clips.push(JSON.stringify(args[0]) + ' || pseudo:' + (args[1] && args[1].pseudoElement)); } catch (e) {}
      return orig.apply(this, args);
    };
    return {
      hasCanvas: !!c,
      rect: r && { left: Math.round(r.left), top: Math.round(r.top), width: Math.round(r.width), height: Math.round(r.height) },
      celestial: r && { x: Math.round(r.left + r.width * 0.88), y: Math.round(r.top + r.height * 0.18) },
      btn: br && { x: Math.round(br.left + br.width / 2), y: Math.round(br.top + br.height / 2) },
      theme: document.documentElement.dataset.theme,
      vtSupported: typeof document.startViewTransition,
      inner: { w: window.innerWidth, h: window.innerHeight },
    };
  });
  console.log('INFO:', JSON.stringify(info));

  await page.click('button[aria-label*="切换"]');
  await new Promise(r => setTimeout(r, 1800));

  const clips = await page.evaluate(() => window.__clips);
  console.log('CLIPS:', JSON.stringify(clips));
  const theme2 = await page.evaluate(() => document.documentElement.dataset.theme);
  console.log('THEME AFTER:', theme2);
  await browser.close();
})().catch(e => { console.error('ERR', e.message); process.exit(1); });
