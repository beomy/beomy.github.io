const STATIC_FILES = [
  '/index.html',
  '/css/swiper.css',
  '/polyfill.js',
  '/spinner/lottie.min.js',
  '/spinner/lottie.json',
];
const CACHE_URLS = [
  '/img/',
  '/images/',
  '/m/banner/',
  '/tourimg.wonderscdn.app/',
  '/spinner/',
];

const STATIC_CACHE_NAME = 'static-v1';
const RUNTIME_CACHE_NAME = 'dynamic-v1';

self.addEventListener('install', function (event) {
  // Cache static files
  event.waitUntil(
    self.caches.open(STATIC_CACHE_NAME).then(function (cache) {
      return cache.addAll(STATIC_FILES).then(self.skipWaiting());
    }),
  );
});

self.addEventListener('activate', function (event) {
  // old cache 삭제
  event.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(keyList.map(function (key) {
        if (![STATIC_CACHE_NAME, RUNTIME_CACHE_NAME].includes(key)) {
          return caches.delete(key);
        }
      }));
    }),
  );

  return self.clients.claim();
});

self.addEventListener('fetch', function (event) {
  // cache 응답 및 갱신
  if (isMatchedUrl(event.request.url)) {
    event.respondWith(fromCache(event.request));
    event.waitUntil(updateCache(event.request));
  }
});

// 존재하는 cache로 요청 응답
function fromCache (request) {
  return caches.open(RUNTIME_CACHE_NAME).then(function (cache) {
    return cache.match(request).then(function (matching) {
      return matching || fetch(request);
    });
  });
}

// 새로운 response로 cache 갱신
function updateCache (request) {
  return caches.open(RUNTIME_CACHE_NAME).then(function (cache) {
    return fetch(request).then(function (response) {
      return cache.put(request, response);
    });
  });
}

// 요청 URL이 cache할 URL을 포함하고 있는지 여부 반환
function isMatchedUrl (requestUrl) {
  for (let i = 0; i < CACHE_URLS.length; i++) {
    if (requestUrl.indexOf(CACHE_URLS[i]) > -1) {
      return true;
    }
  }
}
