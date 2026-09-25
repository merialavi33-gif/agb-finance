const CACHE_NAME = 'yab-financial-v1';
const assetsToCache = [
  './',
  './index.html',
  './home.html',
  './add.html',
  './list.html',
  './goals.html',
  './reports.html',
  './settings.html',
  './manifest.json'
];

// 1. Install Event (ፋይሎችን መጫን እና ማቀዝቀዝ)
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(assetsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

// 2. Activate Event (አሮጌ ከሾችን ማጽዳት)
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 3. Fetch Event (ከኢንተርኔት ውጭ ሲሆን ከካሽ ማሳየት)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
      .catch(() => {
        // የኢንተርኔት ግንኙነት ሲቋረጥ እና ፋይሉ በካሽ ውስጥ ሳይኖር ሲቀር የሚታሳይ (ከተፈለገ)
      })
  );
});
