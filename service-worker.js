const CACHE_NAME = 'earn-app-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/scripts.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
});