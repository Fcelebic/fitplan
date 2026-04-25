const CACHE='fitplan-v7';

self.addEventListener('install',e=>{
  e.waitUntil(self.skipWaiting());
});

self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});

self.addEventListener('fetch',e=>{
  if(e.request.url.includes('youtube.com'))return;
  e.respondWith(
    fetch(e.request).then(res=>{
      if(res.ok){const c=res.clone();caches.open(CACHE).then(cache=>cache.put(e.request,c))}
      return res;
    }).catch(()=>caches.match(e.request))
  );
});
