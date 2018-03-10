self.addEventListener('install', e => {
    console.log('[Service Worker], Installing Service Worker ...', e);
    e.waitUntil(
        caches.open('static')
        .then(cache => {
            console.log('[Service Worker] Precaching App Shell');
            cache.addAll([
                '/',
                '/index.html',
                '/restaurant.html',
                '/css/styles.css',
                '/img/*.jpg',
                '/js/main.js',
                '/js/restaurant_info.js',
                '/js/dbhelper.js'
            ]);
        })
    );
});

self.addEventListener('activate', e => {
    console.log('[Service Worker], Activating Service Worker ...', e);
    return self.clients.claim();
});

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request)
        .then(response=> {
            return response || fetch(e.request);
        })
    );
});