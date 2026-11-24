export async function onRequest(context) {
  const url = new URL(context.request.url);
  const backendUrl = new URL(url.pathname + url.search, 'https://af-final.onrender.com');
  
  // Clean headers: strip internal Cloudflare and loop headers to prevent 429/403 loop detection on Render
  const cleanHeaders = new Headers();
  for (const [key, value] of context.request.headers.entries()) {
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

  try {
    const proxyRequest = new Request(backendUrl, {
      method: context.request.method,
      headers: cleanHeaders,
      body: ['GET', 'HEAD'].includes(context.request.method) ? undefined : context.request.body,
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
