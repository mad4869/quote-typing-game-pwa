self.addEventListener('install', function (event) {
    console.log('Service worker installing...');
    event.waitUntil(
        caches.open('assets').then(function (cache) {
            cache.addAll([
                '/',
                'sw-register.js',
                './src/index.css',
                './src/main.tsx',
                'https://type.fit/api/quotes'
            ]);
        }).then(function () {
            console.log('Assets added to cache');
            return self.skipWaiting();
        }).catch(function (error) {
            console.error('Error during service worker install:', error);
        })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.open('assets').then(async function (cache) {
            try {
                const response = await cache.match(event.request);
                if (response) {
                    return response;
                }
                const networkResponse = await fetch(event.request);
                cache.put(event.request, networkResponse.clone());
                return networkResponse;
            } catch (error) {
                console.error('Fetching failed:', error);
                throw error;
            }
        })
    );
});