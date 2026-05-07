// 部署到 Cloudflare Workers
// 1. npm install -g wrangler
// 2. wrangler deploy cf-worker.js --name zhihu-daily-proxy
// 3. 得到 https://zhihu-daily-proxy.workers.dev

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const target = `https://daily.zhihu.com/api/4${url.pathname}${url.search}`;

    const resp = await fetch(target, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        'Accept': 'application/json',
      },
    });

    const newResp = new Response(resp.body, resp);
    newResp.headers.set('Access-Control-Allow-Origin', '*');
    newResp.headers.set('Cache-Control', 'public, max-age=300');
    return newResp;
  },
};
