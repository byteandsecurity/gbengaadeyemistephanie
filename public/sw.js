const CACHE_NAME = "portfolio-pwa-v2";
const OFFLINE_URL = "/offline";
const PRECACHE_URLS = [
    "/",
    "/software",
    "/cybersecurity",
    "/works",
    "/about",
    OFFLINE_URL,
    "/induction.jpg",
    "/icon.svg",
    "/manifest.webmanifest",
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then(async (cache) => {
                await Promise.all(
                    PRECACHE_URLS.map(async (url) => {
                        try {
                            const response = await fetch(url, { cache: "reload" });
                            if (response.ok) {
                                await cache.put(url, response);
                            }
                        } catch {
                            // Skip individual asset errors so valid routes still cache
                        }
                    }),
                );
            })
            .then(() => self.skipWaiting()),
    );
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches
            .keys()
            .then((keys) =>
                Promise.all(
                    keys
                        .filter((key) => key !== CACHE_NAME)
                        .map((key) => caches.delete(key)),
                ),
            )
            .then(() => self.clients.claim()),
    );
});

self.addEventListener("fetch", (event) => {
    const { request } = event;
    if (request.method !== "GET") return;

    const url = new URL(request.url);
    if (url.origin !== self.location.origin) return;

    // Never cache admin routes or API endpoints
    if (url.pathname.startsWith("/admin") || url.pathname.startsWith("/api")) {
        return;
    }

    // Page navigations: network-first, fallback to cache, then /offline
    if (request.mode === "navigate") {
        event.respondWith(
            fetch(request)
                .then((response) => {
                    if (response.ok) {
                        const copy = response.clone();
                        caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
                    }
                    return response;
                })
                .catch(async () => {
                    const cached = await caches.match(request);
                    return cached || (await caches.match(OFFLINE_URL)) || Response.error();
                }),
        );
        return;
    }

    // Static assets & media: cache-first, populate cache on fetch
    if (
        url.pathname.startsWith("/_next/static/") ||
        /\.(?:png|jpg|jpeg|webp|svg|ico|woff2?|css|js)$/i.test(url.pathname)
    ) {
        event.respondWith(
            caches.match(request).then((cached) => {
                if (cached) return cached;
                return fetch(request).then((response) => {
                    if (response.ok) {
                        const copy = response.clone();
                        caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
                    }
                    return response;
                });
            }),
        );
    }
});