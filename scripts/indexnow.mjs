/**
 * IndexNow URL submission script for denverai.co
 * Run after each production deploy: node scripts/indexnow.mjs
 */

const KEY = '6e2e026da6b74cddbf04a259591ed71c';
const HOST = 'denverai.co';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/IndexNow';

async function getSitemapUrls() {
  try {
    const res = await fetch(`https://${HOST}/sitemap-0.xml`);
    const xml = await res.text();
    const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
    return urls;
  } catch (e) {
    console.error('Failed to fetch sitemap:', e.message);
    return [];
  }
}

async function submitToIndexNow(urls) {
  if (urls.length === 0) {
    console.log('No URLs to submit');
    return;
  }

  console.log(`Submitting ${urls.length} URLs to IndexNow...`);

  const body = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls,
  };

  const res = await fetch(INDEXNOW_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  });

  if (res.ok || res.status === 200 || res.status === 202) {
    console.log(`✓ Submitted ${urls.length} URLs — HTTP ${res.status}`);
  } else {
    const text = await res.text();
    console.error(`✗ Failed — HTTP ${res.status}: ${text}`);
  }
}

const urls = await getSitemapUrls();
await submitToIndexNow(urls);
