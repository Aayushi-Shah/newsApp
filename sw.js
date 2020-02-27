// Add CDN
importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js');

// Define staticAssets so they can we cached, and you do not need to make network call each time
const staticAssets = [
    './',
    './styles.css',
    './app.js',
    './fallback.json',
    './images/fetch-dog.jpeg'
]

// Cache staticAssets
workbox.precaching.precacheAndRoute(staticAssets)

// create a NetworkFirst instance
var networkFirst = new workbox.strategies.NetworkFirst({
    cacheName: 'cache-pages' 
  });
  
// check whether network call returns a response, if it fails render fallback.json
const customHandler = async (args) => {
    try {
        const response = await networkFirst.handle(args);
        return response || await caches.match('./fallback.json');
    } catch (error) {
        return await caches.match('./fallback.json');
    }
}; 

// call networkFirst function for the request
workbox.routing.registerRoute(new RegExp('https://newsapi.org/(.*)'), customHandler)

// render images from cache, if not available then call network
workbox.routing.registerRoute(/.*\.(png|jpg|jpeg|gif)/, new workbox.strategies.CacheFirst({
    cacheName: 'new-images',
    cacheExpiration : {maxEntries: 20, maxAgeseconds: 12 * 60 * 60},
    cacheableResponse : { statuses: [0,200] }
}))
