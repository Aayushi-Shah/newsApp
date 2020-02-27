importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js');
const staticAssets = [
    './',
    './styles.css',
    './app.js',
    './fallback.json',
    './images/fetch-dog.jpeg'
]

workbox.precaching.precacheAndRoute(staticAssets)
workbox.routing.registerRoute(new RegExp('https://newsapi.org/(.*)'), new workbox.strategies.NetworkFirst())
workbox.routing.registerRoute(/.*\.(png|jpg|jpeg|gif)/, new workbox.strategies.CacheFirst({
    cacheName: 'new-images',
    cacheExpiration : {maxEntries: 20, maxAgeseconds: 12 * 60 * 60},
    cacheableResponse : { statuses: [0,200] }
}))
