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
  await page.screenshot({ path: 'shot-before.png' });
  await page.click('button[aria-label*="切换"]');
  await new Promise(r => setTimeout(r, 220));
  await page.screenshot({ path: 'shot-mid.png' });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: 'shot-after.png' });
  await browser.close();
  console.log('done');
})().catch(e => { console.error('ERR', e.message); process.exit(1); });
