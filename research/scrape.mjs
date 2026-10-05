// Captures each reference page (client-supplied links, tracking params removed):
// desktop hero + full-page screenshot, heading outline, CTAs and readable text.
import { chromium } from '/Users/tes/Documents/Business/Website building toolset/node_modules/playwright/index.mjs';
import fs from 'node:fs/promises';
const OUT = decodeURIComponent(new URL('./raw/', import.meta.url).pathname);
const refs = JSON.parse(await fs.readFile(new URL('./refs.json', import.meta.url)));
const slug = (u) => u.replace(/^https?:\/\/(www\.)?/, '').replace(/[^a-z0-9]+/gi, '-').replace(/-+$/, '').toLowerCase().slice(0, 60);
const browser = await chromium.launch();
for (const r of refs) {
  const id = slug(r.url);
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0 Safari/537.36' });
  try {
    await page.goto(r.url, { waitUntil: 'domcontentloaded', timeout: 45000 });
    await page.waitForTimeout(2500);
    await page.evaluate(() => { const re = /^(reject all|reject|decline|deny|necessary only|use necessary cookies only|essential only|only necessary)$/i; const b = [...document.querySelectorAll('button, a, [role=button]')].find((el) => re.test((el.innerText || '').trim())); if (b) b.click(); }).catch(() => {});
    await page.waitForTimeout(800);
    await page.screenshot({ path: `${OUT}${id}-hero.jpg`, type: 'jpeg', quality: 60 });
    await page.screenshot({ path: `${OUT}${id}-full.jpg`, type: 'jpeg', quality: 45, fullPage: true }).catch(() => {});
    const data = await page.evaluate(() => {
      const t = (el) => (el.innerText || '').replace(/\s+/g, ' ').trim();
      const main = document.querySelector('main') || document.body;
      return {
        title: document.title,
        headings: [...document.querySelectorAll('h1,h2,h3')].map((h) => `${h.tagName}: ${t(h)}`).filter((x) => x.length > 4).slice(0, 60),
        ctas: [...new Set([...document.querySelectorAll('a.btn, a.button, button, a[class*="btn"], a[class*="button"]')].map(t).filter((x) => x && x.length < 40))].slice(0, 25),
        text: t(main).slice(0, 9000),
      };
    });
    await fs.writeFile(`${OUT}${id}.json`, JSON.stringify({ ...r, id, ...data }, null, 2));
    console.log('ok ', r.name, data.headings.length, 'headings');
  } catch (e) { console.log('ERR', r.name, String(e.message).slice(0, 120)); }
  await page.close();
}
await browser.close();
