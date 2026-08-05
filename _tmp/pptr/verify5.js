const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: false,
    args: ['--window-size=1400,900', '--window-position=0,0'],
  });
  const page = (await browser.pages())[0];
  await page.setViewport({ width: 1400, height: 820 });
  await page.goto('https://aioasis.top', { waitUntil: 'networkidle2', timeout: 60000 });
  await new Promise(r => setTimeout(r, 3000));

  // Ctrl + '+' 两次：100% -> 110% -> 125%
  await page.keyboard.down('Control');
  await page.keyboard.press('=');
  await new Promise(r => setTimeout(r, 400));
  await page.keyboard.press('=');
  await new Promise(r => setTimeout(r, 400));
  await page.keyboard.up('Control');
  await new Promise(r => setTimeout(r, 1500));

  const info = await page.evaluate(() => {
    const c = document.querySelector('canvas[data-oasis-scene]');
    const r = c ? c.getBoundingClientRect() : null;
    window.__clips = [];
    const orig = Element.prototype.animate;
    Element.prototype.animate = function (...args) {
      try { window.__clips.push(JSON.stringify(args[0]) + ' || pseudo:' + (args[1] && args[1].pseudoElement)); } catch (e) {}
      return orig.apply(this, args);
    };
    return {
      dpr: window.devicePixelRatio,
      inner: { w: window.innerWidth, h: window.innerHeight },
      rect: r && { left: Math.round(r.left), top: Math.round(r.top), width: Math.round(r.width), height: Math.round(r.height) },
      celestial: r && { x: Math.round(r.left + r.width * 0.88), y: Math.round(r.top + r.height * 0.18) },
    };
  });
  console.log('INFO:', JSON.stringify(info));

  await page.click('button[aria-label*="切换"]');
  await new Promise(r => setTimeout(r, 120));
  await page.screenshot({ path: 'zoom125-mid1.png' });
  await new Promise(r => setTimeout(r, 180));
  await page.screenshot({ path: 'zoom125-mid2.png' });
  await new Promise(r => setTimeout(r, 1500));
  const clips = await page.evaluate(() => window.__clips);
  console.log('CLIPS:', JSON.stringify(clips));
  await browser.close();
  console.log('done');
})().catch(e => { console.error('ERR', e.message); process.exit(1); });
