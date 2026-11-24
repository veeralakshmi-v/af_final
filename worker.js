export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Forward API requests to the live Render backend connected to MongoDB
    if (url.pathname.startsWith('/api/')) {
      const backendUrl = new URL(url.pathname + url.search, 'https://af-final.onrender.com');
      
      // Clean headers: strip internal Cloudflare and loop headers to prevent 429/403 loop detection on Render
      const cleanHeaders = new Headers();
      for (const [key, value] of request.headers.entries()) {
        const lower = key.toLowerCase();
        if (
          lower.startsWith('cf-') ||
          lower === 'cdn-loop' ||
          lower === 'x-real-ip' ||
          lower === 'x-forwarded-for' ||
          lower === 'x-forwarded-proto' ||
          lower === 'host'
        ) {
          continue;
        }
        cleanHeaders.set(key, value);
      }
      cleanHeaders.set('host', 'af-final.onrender.com');

      const body = ['GET', 'HEAD'].includes(request.method)
        ? undefined
        : await request.arrayBuffer();

      try {
        const proxyRequest = new Request(backendUrl.toString(), {
          method: request.method,
          headers: cleanHeaders,
          body: body,
          redirect: 'follow',
        });

        const response = await fetch(proxyRequest);
        const resHeaders = new Headers(response.headers);
        resHeaders.set('access-control-allow-origin', '*');
        resHeaders.set('access-control-allow-methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
        resHeaders.set('access-control-allow-headers', 'Content-Type, Authorization');

        return new Response(response.body, {
          status: response.status,
          statusText: response.statusText,
          headers: resHeaders
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: 'Backend unreachable: ' + err.message }), {
          status: 502,
          headers: { 'Content-Type': 'application/json', 'access-control-allow-origin': '*' }
        });
      }
    }

    // Serve static assets from dist/
    return env.ASSETS.fetch(request);
  }
};
