/**
 * Install Service Worker
 */
self.addEventListener('install', e => {
    console.log('[Service Worker], Installing Service Worker ...', e);
    e.waitUntil(
        caches.open('static')
        .then(cache => {
            console.log('[Service Worker] Precaching App Shell');
            cache.addAll([
                '/',
                '/index.html',
                '/css/styles.css',
                '/img/*.jpg',
                '/js/main.js',
                '/js/restaurant_info.js',
                '/js/dbhelper.js'
            ]);
        })
    );
});

/**
 * Activate Service Worker
 */
self.addEventListener('activate', e => {
    console.log('[Service Worker], Activating Service Worker ...', e);
    return self.clients.claim();
});

/**
 * Fetch event request and cache dynamically
 */
self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request)
        .then(response => {
            if(response) {
                return response;
            } else {
                fetch(e.request)
                .then(res => {
                    caches.open('dynamic')
                    .then(cache => {
                        cache.put(e.request.url, res.clone());
                        return res;
                    });
                });
            }
        })
    );
});