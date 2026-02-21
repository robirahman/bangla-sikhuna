// Bengali App — Service Worker
// Data files use stale-while-revalidate so deploys are reflected on next load.
// Other same-origin assets use cache-first for offline support.
// Bump CACHE_VERSION to force full cache refresh after major updates.
const CACHE_VERSION = "bengali-v5";
const PRECACHE_URLS = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./vocab.js",
  "./grammar.js",
  "./phrases.js",
  "./guide.html",
  "./vocab-pack-1.json",
  "./vocab-pack-2.json",
  "./vocab-pack-3.json",
  "./recipes.js",
  "./manifest.json",
];

// Data files that change between deploys — use stale-while-revalidate
const DATA_FILE_RE = /\/(vocab\.js|grammar\.js|phrases\.js|vocab-pack-\d+\.json)(\?.*)?$/;

function cacheAndReturn(request, response) {
  if (!response || response.status !== 200 || response.type === "opaque") return response;
  const clone = response.clone();
  caches.open(CACHE_VERSION).then((cache) => cache.put(request, clone));
  return response;
}

// Install: pre-cache core assets
self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_VERSION).then((cache) => cache.addAll(PRECACHE_URLS)));
  // Activate immediately without waiting for existing tabs to close
  self.skipWaiting();
});

// Activate: delete old cache versions
self.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k)))));
  // Take control of all open tabs immediately
  self.clients.claim();
});

// Fetch: stale-while-revalidate for data files; cache-first for everything else
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Only intercept same-origin GET requests
  if (event.request.method !== "GET" || url.origin !== self.location.origin) return;

  // Google Fonts — network-only (not cached; fails gracefully offline)
  if (url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com") return;

  if (DATA_FILE_RE.test(url.pathname)) {
    // Stale-while-revalidate: serve cached immediately, update in background
    event.respondWith(
      caches.open(CACHE_VERSION).then((cache) =>
        cache.match(event.request).then((cached) => {
          const networkFetch = fetch(event.request)
            .then((response) => {
              return cacheAndReturn(event.request, response);
            })
            .catch(() => null);
          return cached || networkFetch;
        })
      )
    );
  } else {
    // Cache-first for shell / static assets
    event.respondWith(
      caches.match(event.request).then((cached) => {
        if (cached) return cached;
        return fetch(event.request).then((response) => cacheAndReturn(event.request, response));
      })
    );
  }
});
