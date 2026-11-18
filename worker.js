export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Forward API requests to the live Render backend connected to MongoDB
    if (url.pathname.startsWith('/api/')) {
      const backendUrl = new URL(url.pathname + url.search, 'https://af-final.onrender.com');
      const headers = new Headers(request.headers);
      headers.set('host', 'af-final.onrender.com');

      const proxyRequest = new Request(backendUrl, {
        method: request.method,
        headers: headers,
        body: ['GET', 'HEAD'].includes(request.method) ? undefined : request.body,
        redirect: 'follow',
      });

      return fetch(proxyRequest);
    }

    // Serve static assets from dist/
    return env.ASSETS.fetch(request);
  }
};
