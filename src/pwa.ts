import { registerSW } from 'virtual:pwa-register'

/**
 * Keeps an installed copy of the app from going stale.
 *
 * Two things can leave a device stuck on an old build: the service worker
 * only checks for updates when it can reach the network, and the site's
 * password gate answers those checks with 401 once the login cookie has
 * expired, so the cached app keeps serving itself forever. On every start we
 * therefore ask the server (never the cache) which version it holds. When it
 * answers with a different version, or with the password page, we drop the
 * service worker and its caches and reload, which brings the login screen
 * back and installs the current build. Offline the request just fails, and
 * the cached app keeps working as before.
 */
const VERSION_URL = `${import.meta.env.BASE_URL}version.json`
const RESET_KEY = 'scorering.pwa.reset'
const HOUR = 60 * 60 * 1000

export function startPwa() {
  if (!('serviceWorker' in navigator)) return

  registerSW({
    immediate: true,
    onRegisteredSW(_url, registration) {
      if (!registration) return
      setInterval(() => { registration.update().catch(() => {}) }, HOUR)
    },
  })

  void checkFreshness()
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') void checkFreshness()
  })
}

async function checkFreshness() {
  let res: Response
  try {
    res = await fetch(`${VERSION_URL}?t=${Date.now()}`, { cache: 'no-store', credentials: 'same-origin' })
  } catch {
    return // offline: keep the cached app
  }

  let stale = false
  if (res.status === 401 || res.status === 403) {
    stale = true // password gate: the cookie expired, the worker can no longer update
  } else if (res.ok && (res.headers.get('content-type') ?? '').includes('json')) {
    try {
      const { version } = (await res.json()) as { version?: string }
      stale = typeof version === 'string' && version !== __APP_VERSION__
    } catch { /* unreadable answer: leave things alone */ }
  }

  if (!stale) {
    try { sessionStorage.removeItem(RESET_KEY) } catch { /* ignore */ }
    return
  }
  try {
    if (sessionStorage.getItem(RESET_KEY)) return // one reset per tab session, never a loop
    sessionStorage.setItem(RESET_KEY, '1')
  } catch { /* ignore */ }

  await resetServiceWorker()
  window.location.reload()
}

export async function resetServiceWorker() {
  try {
    const regs = await navigator.serviceWorker.getRegistrations()
    await Promise.all(regs.map(r => r.unregister()))
  } catch { /* ignore */ }
  try {
    if ('caches' in window) {
      const keys = await caches.keys()
      await Promise.all(keys.map(k => caches.delete(k)))
    }
  } catch { /* ignore */ }
}
