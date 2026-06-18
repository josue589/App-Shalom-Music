const CACHE_NAME = 'louvor-app-v1';

self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
    // Para chamadas da API do Google, sempre busca da rede (não usa cache)
    if (event.request.url.includes('script.google.com')) {
        return;
    }
    
    // Para os outros arquivos (HTML, JS), tenta usar o cache para abrir mais rápido
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});