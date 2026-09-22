const CACHE_NAME = "paco-del-canto-pwa-v4";
const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./version.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-192.png",
  "./icons/icon-maskable-512.png",
  "./icons/favicon-48.png",
  "./assets/doctor-placeholder.png"
];

const OPTIONAL_EXTERNAL = [
  "https://protesisdecadera.es/wp-content/uploads/2021/08/PACO-DEL-CANTO-SOBRE-MI-01.jpg",
  "https://protesisdecadera.es/wp-content/uploads/2021/08/PACO-DEL-CANTO-SOBRE-MI-02.jpg"
];

self.addEventListener("install", event => {
  self.skipWaiting();
  event.waitUntil((async()=>{
    const cache=await caches.open(CACHE_NAME);
    await cache.addAll(APP_SHELL);
    await Promise.allSettled(OPTIONAL_EXTERNAL.map(async url=>{
      const req=new Request(url,{mode:"no-cors",cache:"no-store"});
      const res=await fetch(req);
      await cache.put(req,res);
    }));
  })());
});

self.addEventListener("activate", event => {
  event.waitUntil((async()=>{
    const keys=await caches.keys();
    await Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", event => {
  const request=event.request;
  if(request.method!=="GET") return;

  if(request.mode==="navigate"){
    event.respondWith((async()=>{
      try{
        const response=await fetch(request,{cache:"no-store"});
        const cache=await caches.open(CACHE_NAME);
        cache.put("./index.html",response.clone());
        return response;
      }catch(e){
        return (await caches.match("./index.html")) || (await caches.match("./"));
      }
    })());
    return;
  }

  const url=new URL(request.url);

  if(url.origin===self.location.origin && url.pathname.endsWith("/version.json")){
    event.respondWith(fetch(request,{cache:"no-store"}).catch(()=>caches.match("./version.json")));
    return;
  }

  if(url.origin===self.location.origin){
    event.respondWith((async()=>{
      const cached=await caches.match(request);
      const network=fetch(request,{cache:"no-cache"}).then(async response=>{
        if(response && response.status===200){
          const cache=await caches.open(CACHE_NAME);
          cache.put(request,response.clone());
        }
        return response;
      }).catch(()=>null);
      return cached || (await network) || Response.error();
    })());
    return;
  }

  if(request.destination==="image"){
    event.respondWith((async()=>{
      const cached=await caches.match(request);
      if(cached) return cached;
      try{
        const response=await fetch(request);
        const cache=await caches.open(CACHE_NAME);
        cache.put(request,response.clone());
        return response;
      }catch(e){
        return cached || caches.match("./assets/doctor-placeholder.png");
      }
    })());
  }
});

self.addEventListener("message",event=>{
  if(event.data==="SKIP_WAITING") self.skipWaiting();
});
