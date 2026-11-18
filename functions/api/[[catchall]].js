export async function onRequest(context) {
  const url = new URL(context.request.url);
  const backendUrl = new URL(url.pathname + url.search, 'https://af-final.onrender.com');
  const headers = new Headers(context.request.headers);
  headers.set('host', 'af-final.onrender.com');

  const proxyRequest = new Request(backendUrl, {
    method: context.request.method,
    headers: headers,
    body: ['GET', 'HEAD'].includes(context.request.method) ? undefined : context.request.body,
    redirect: 'follow',
  });

  return fetch(proxyRequest);
}
