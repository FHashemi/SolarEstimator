/// <reference lib="webworker" />
import { build, files, version } from '$service-worker';
const CACHE = `solar-estimator-shell-${version}`;
const ASSETS = [...build, ...files];
const sw = self as unknown as ServiceWorkerGlobalScope;
sw.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)));
  void sw.skipWaiting();
});
sw.addEventListener('activate', event => {
  event.waitUntil(Promise.all([caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith('solar-estimator-shell-') && k !== CACHE).map(k => caches.delete(k)))), sw.clients.claim()]));
});
sw.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET' || new URL(request.url).origin !== sw.location.origin) return;
  if (request.mode === 'navigate') {
    event.respondWith(fetch(request).then(response => { if(response.ok){const copy=response.clone();void caches.open(CACHE).then(c=>c.put(request,copy));}return response;}).catch(async ()=>await caches.match(request) || await caches.match('/') || Response.error()));
    return;
  }
  event.respondWith(caches.match(request).then(cached => cached || fetch(request).then(response => { if(response.ok){const copy=response.clone();void caches.open(CACHE).then(c=>c.put(request,copy));}return response;})));
});

