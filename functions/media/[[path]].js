// functions/media/[[path]].js
//
// Serves files out of the R2 bucket bound as "ASSETS" (Pages project →
// Settings → Functions → R2 bucket bindings) at /media/<object-key>.
//
// Why this exists: the bucket (bosso-outreach-assets) is private — it also
// holds outreach email attachments — so it's never made public wholesale.
// This function is the only doorway into it from the public site, and it
// only ever serves whatever exact key is requested; it doesn't list the
// bucket or expose anything beyond that.
//
// Object keys with spaces (e.g. "Santi Mascots Bosso Mascot.mp4") work fine —
// just URL-encode the key when building the src, e.g.:
//   /media/Santi%20Mascots%20Bosso%20Mascot.mp4

export async function onRequestGet(context) {
  const { params, env, request } = context;

  const rawPath = Array.isArray(params.path) ? params.path.join('/') : (params.path || '');
  const key = decodeURIComponent(rawPath);
  if (!key) return new Response('Not found', { status: 404 });

  // Parse a Range header (e.g. "bytes=0-1023") so <video> can seek/scrub
  // instead of downloading the whole file before playback starts.
  const rangeHeader = request.headers.get('range');
  const getOptions = {};
  let requestedRange = null;
  if (rangeHeader) {
    const match = /bytes=(\d+)-(\d+)?/.exec(rangeHeader);
    if (match) {
      const start = parseInt(match[1], 10);
      const end = match[2] ? parseInt(match[2], 10) : undefined;
      requestedRange = { start, end };
      getOptions.range = end !== undefined
        ? { offset: start, length: end - start + 1 }
        : { offset: start };
    }
  }

  const object = await env.ASSETS.get(key, getOptions);
  if (!object) return new Response('Not found', { status: 404 });

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set('etag', object.httpEtag);
  headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  headers.set('Accept-Ranges', 'bytes');

  if (requestedRange && object.range) {
    const total = object.size;
    const start = object.range.offset;
    const length = object.range.length ?? (total - start);
    headers.set('Content-Range', `bytes ${start}-${start + length - 1}/${total}`);
    return new Response(object.body, { status: 206, headers });
  }

  return new Response(object.body, { headers });
}
