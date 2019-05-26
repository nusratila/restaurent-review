self.addEventListener('install', (event) => {
 event.waitUntil(
   caches.open('restaurant').then((cache) => {
     return cache.addAll([
       '/',
       '/index.html',
       '/restaurant.html',
       '/css/res-style-150px.css',
       '/css/res-style-700px.css',
       '/css/style-150px.css',
       '/css/style-700px.css',
       '/css/styles.css',
       '/js/dbhelper.js',
       '/js/main.js',
       '/js/restaurant_info.js',
       '/data/restaurants.json',
       '/img/',
       '/img/1.jpg',
       '/img/2.jpg',
       '/img/3.jpg',
       '/img/4.jpg',
       '/img/5.jpg',
       '/img/6.jpg',
       '/img/7.jpg',
       '/img/8.jpg',
       '/img/9.jpg',
       '/img/10.jpg',
     ]).then(() => {
      console.log('All files cached.');
     }).catch((error) => {
      console.log('Throw error while caching.', error);
     })
   })
 );
});

self.addEventListener('activate', (event) => {
  console.log('Activating service worker event called...');
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.open('restaurant').then((cache) => {
      return cache.match(event.request).then((response) => {
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});