// Latir PWA Service Worker
const CACHE_NAME = 'latir-v1';
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(['./', './manifest.json'])));
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch', e => {
  if (e.request.url.includes('wixsite.com')) return;
  e.respondWith(caches.match(e.request).then(c => c || fetch(e.request)));
});
