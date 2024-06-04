/* global module */

module.exports = {
    globDirectory: 'dist/',
    globPatterns: [
        '**/*.{html,js,css,woff2,woff,png,jpg,jpeg,svg,gif,ttf,otf}'
    ],
    swDest: 'dist/sw.js',
    runtimeCaching: [
        {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif)$/,
            handler: 'CacheFirst',
            options: {
                cacheName: 'images',
                expiration: {
                    maxEntries: 50,
                    maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
                },
            },
        },
        {
            urlPattern: /\.(?:woff2|woff|ttf|otf)$/,
            handler: 'CacheFirst',
            options: {
                cacheName: 'fonts',
                expiration: {
                    maxEntries: 20,
                    maxAgeSeconds: 365 * 24 * 60 * 60, // 1 Year
                },
            },
        },
        {
            urlPattern: /\.(?:js)$/,
            handler: 'NetworkFirst',
            options: {
                cacheName: 'javascript',
                expiration: {
                    maxEntries: 50,
                },
            },
        },
        {
            urlPattern: /\.(?:css)$/,
            handler: 'StaleWhileRevalidate',
            options: {
                cacheName: 'stylesheets',
                expiration: {
                    maxEntries: 50,
                },
            },
        },
        {
            urlPattern: new RegExp('https://type.fit/api/quotes'),
            handler: 'NetworkFirst',
            options: {
                cacheName: 'api',
                expiration: {
                    maxEntries: 50,
                },
            },
        },
    ],
};