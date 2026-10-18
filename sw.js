// Kite service worker.
// 1) Notifications work on phones and tapping one brings Kite forward.
// 2) The app shell (page, logos, React) is kept on the device so Kite opens fast.
//    Pages and files update in the background; the newest version shows on the next open.
const CACHE = 'kite-shell-v2';
const SHELL = ['./', 'index.html', 'logo-light.png', 'logo-dark.png', 'icon-light.png'];

self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).catch(() => {}));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

function cacheable(url) {
  if (url.origin === self.location.origin) return true;
  return url.hostname === 'cdnjs.cloudflare.com' || url.hostname === 'cdn.jsdelivr.net';
}

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (!cacheable(url)) return;           // API calls and uploaded photos always go to the network
  e.respondWith(
    caches.open(CACHE).then(async (cache) => {
      const hit = await cache.match(req);
      const net = fetch(req)
        .then((res) => {
          if (res && res.ok && (res.type === 'basic' || res.type === 'cors')) cache.put(req, res.clone());
          return res;
        })
        .catch(() => hit);
      return hit || net;
    })
  );
});

self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  e.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
      for (const c of list) if ('focus' in c) return c.focus();
      if (self.clients.openWindow) return self.clients.openWindow('./');
    })
  );
});
