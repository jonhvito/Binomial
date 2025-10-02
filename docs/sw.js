// Service Worker para Calculadora de Probabilidade Binomial
// Cache inteligente para funcionalidade offline

const CACHE_NAME = 'binomial-calculator-v1.0.0';
const STATIC_CACHE_NAME = 'binomial-static-v1.0.0';
const DYNAMIC_CACHE_NAME = 'binomial-dynamic-v1.0.0';

// Recursos estáticos para cache
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/src/main.tsx',
  '/src/App.tsx',
  '/src/index.css',
  // Fontes
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap',
  'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap',
  // Ícones Lucide
  '/node_modules/lucide-react/dist/esm/icons/calculator.js',
  '/node_modules/lucide-react/dist/esm/icons/bar-chart-3.js',
  '/node_modules/lucide-react/dist/esm/icons/book-open.js',
  '/node_modules/lucide-react/dist/esm/icons/help-circle.js',
  '/node_modules/lucide-react/dist/esm/icons/settings.js',
  '/node_modules/lucide-react/dist/esm/icons/menu.js',
  '/node_modules/lucide-react/dist/esm/icons/x.js',
  '/node_modules/lucide-react/dist/esm/icons/chevron-right.js',
  '/node_modules/lucide-react/dist/esm/icons/github.js',
  '/node_modules/lucide-react/dist/esm/icons/trending-up.js',
  '/node_modules/lucide-react/dist/esm/icons/pie-chart.js',
  '/node_modules/lucide-react/dist/esm/icons/compass.js',
  '/node_modules/lucide-react/dist/esm/icons/graduation-cap.js',
  '/node_modules/lucide-react/dist/esm/icons/sun.js',
  '/node_modules/lucide-react/dist/esm/icons/moon.js'
];

// Estratégias de cache
const CACHE_STRATEGIES = {
  // Cache First - para assets estáticos
  CACHE_FIRST: 'cache-first',
  // Network First - para dados dinâmicos
  NETWORK_FIRST: 'network-first',
  // Stale While Revalidate - para recursos que podem ser atualizados
  STALE_WHILE_REVALIDATE: 'stale-while-revalidate'
};

// Instalação do Service Worker
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...');
  
  event.waitUntil(
    Promise.all([
      // Cache dos assets estáticos
      caches.open(STATIC_CACHE_NAME).then((cache) => {
        console.log('[SW] Caching static assets...');
        return cache.addAll(STATIC_ASSETS);
      }),
      
      // Cache da aplicação principal
      caches.open(CACHE_NAME).then((cache) => {
        console.log('[SW] Caching main application...');
        return cache.addAll(['/', '/index.html']);
      })
    ]).then(() => {
      console.log('[SW] Installation complete');
      return self.skipWaiting();
    })
  );
});

// Ativação do Service Worker
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...');
  
  event.waitUntil(
    Promise.all([
      // Limpar caches antigos
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME && 
                cacheName !== STATIC_CACHE_NAME && 
                cacheName !== DYNAMIC_CACHE_NAME) {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      
      // Assumir controle imediatamente
      self.clients.claim()
    ]).then(() => {
      console.log('[SW] Activation complete');
    })
  );
});

// Interceptação de requests
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Pular requests não-GET
  if (request.method !== 'GET') {
    return;
  }
  
  // Pular requests para APIs externas (exceto fontes)
  if (url.origin !== location.origin && !url.hostname.includes('fonts.googleapis.com')) {
    return;
  }
  
  event.respondWith(handleRequest(request));
});

// Função para lidar com requests
async function handleRequest(request) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  
  try {
    // Estratégia Cache First para assets estáticos
    if (isStaticAsset(pathname)) {
      return await cacheFirst(request, STATIC_CACHE_NAME);
    }
    
    // Estratégia Network First para páginas HTML
    if (isHTMLRequest(request)) {
      return await networkFirst(request, CACHE_NAME);
    }
    
    // Estratégia Stale While Revalidate para outros recursos
    return await staleWhileRevalidate(request, DYNAMIC_CACHE_NAME);
    
  } catch (error) {
    console.error('[SW] Error handling request:', error);
    
    // Fallback para página offline
    if (isHTMLRequest(request)) {
      return await getOfflinePage();
    }
    
    // Fallback genérico
    return new Response('Offline - Recurso não disponível', {
      status: 503,
      statusText: 'Service Unavailable'
    });
  }
}

// Estratégia Cache First
async function cacheFirst(request, cacheName) {
  const cachedResponse = await caches.match(request);
  
  if (cachedResponse) {
    console.log('[SW] Serving from cache:', request.url);
    return cachedResponse;
  }
  
  console.log('[SW] Fetching and caching:', request.url);
  const networkResponse = await fetch(request);
  
  if (networkResponse.ok) {
    const cache = await caches.open(cacheName);
    cache.put(request, networkResponse.clone());
  }
  
  return networkResponse;
}

// Estratégia Network First
async function networkFirst(request, cacheName) {
  try {
    console.log('[SW] Trying network first:', request.url);
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('[SW] Network failed, trying cache:', request.url);
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    throw error;
  }
}

// Estratégia Stale While Revalidate
async function staleWhileRevalidate(request, cacheName) {
  const cachedResponse = await caches.match(request);
  
  const fetchPromise = fetch(request).then((networkResponse) => {
    if (networkResponse.ok) {
      const cache = caches.open(cacheName);
      cache.then(c => c.put(request, networkResponse.clone()));
    }
    return networkResponse;
  }).catch(() => cachedResponse);
  
  return cachedResponse || fetchPromise;
}

// Verificar se é um asset estático
function isStaticAsset(pathname) {
  const staticExtensions = ['.js', '.css', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.woff', '.woff2', '.ttf'];
  return staticExtensions.some(ext => pathname.endsWith(ext)) || 
         pathname.includes('/assets/') ||
         pathname.includes('fonts.googleapis.com');
}

// Verificar se é um request HTML
function isHTMLRequest(request) {
  return request.headers.get('accept')?.includes('text/html') ||
         request.url.endsWith('.html') ||
         request.url === location.origin + '/' ||
         request.url === location.origin;
}

// Página offline personalizada
async function getOfflinePage() {
  const offlineHTML = `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Offline - Calculadora Binomial</title>
      <style>
        body {
          font-family: 'Inter', system-ui, sans-serif;
          margin: 0;
          padding: 20px;
          background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .container {
          text-align: center;
          max-width: 500px;
          background: white;
          padding: 40px;
          border-radius: 20px;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        }
        .icon {
          font-size: 64px;
          margin-bottom: 20px;
        }
        h1 {
          color: #0f172a;
          margin-bottom: 16px;
        }
        p {
          color: #64748b;
          line-height: 1.6;
          margin-bottom: 24px;
        }
        .btn {
          background: #0ea5e9;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }
        .btn:hover {
          background: #0284c7;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="icon">📊</div>
        <h1>Você está offline</h1>
        <p>
          A Calculadora de Probabilidade Binomial não está disponível no momento.
          Verifique sua conexão com a internet e tente novamente.
        </p>
        <button class="btn" onclick="window.location.reload()">
          Tentar Novamente
        </button>
      </div>
    </body>
    </html>
  `;
  
  return new Response(offlineHTML, {
    headers: { 'Content-Type': 'text/html' }
  });
}

// Mensagens do Service Worker
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_NAME });
  }
});

console.log('[SW] Service Worker loaded successfully');
