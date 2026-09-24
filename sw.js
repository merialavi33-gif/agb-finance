const CACHE_NAME = 'agb-finance-v1';
const assetsToCache = [
  'index.html',
  'home.html',
  'add.html',
  'list.html',
  'goals.html',
  'reports.html',
  'settings.html',
  'manifest.json',
  'icon.svg'
];

// ዌብሳይቱ ሲጫን ፋይሎችን መያዝ (Install)
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assetsToCache);
    })
  );
});

// አዳዲስ ፋይሎችን ማሻሻል (Activate)
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// ከካሽ (Cache) በመጠቀም ፈጣን ምላሽ መስጠት
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
