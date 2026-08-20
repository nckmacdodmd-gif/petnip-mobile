// =============================================================
// PETNIP — Service Worker
// Cache estático (app shell) + fallback offline básico
// =============================================================
 
const CACHE_NAME = "petnip-cache-v1";
 
const APP_SHELL = [
  "/",
  "/index.html",
  "/style.css",
  "/app.js",
  "/manifest.json",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/icons/apple-touch-icon.png"
];
 
// ---------- INSTALL: pré-cache do app shell ----------
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});
 
// ---------- ACTIVATE: limpa caches antigos ----------
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});
 
// ---------- FETCH: estratégia por tipo de requisição ----------
self.addEventListener("fetch", (event) => {
  const { request } = event;
 
  // Ignora requisições que não são GET (ex: POST de formulários)
  if (request.method !== "GET") return;
 
  const url = new URL(request.url);
  const isSameOrigin = url.origin === self.location.origin;
 
  // App shell (mesma origem): cache-first, com atualização em segundo plano
  if (isSameOrigin) {
    event.respondWith(
      caches.match(request).then((cached) => {
        const networkFetch = fetch(request)
          .then((response) => {
            if (response && response.status === 200) {
              const clone = response.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
            }
            return response;
          })
          .catch(() => cached);
 
        return cached || networkFetch;
      })
    );
    return;
  }
 
  // Recursos externos (ex: fotos, fontes): network-first, com fallback ao cache
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
        }
        return response;
      })
      .catch(() => caches.match(request))
  );
});
