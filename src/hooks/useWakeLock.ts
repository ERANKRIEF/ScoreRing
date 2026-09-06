import { useEffect } from 'react'

/**
 * Keeps the screen awake while judging. Unsupported browsers (including older
 * iOS) simply do nothing; the lock is also re-taken after the tab is hidden,
 * because the system releases it then.
 */
export function useWakeLock(active: boolean) {
  useEffect(() => {
    if (!active) return
    type Sentinel = { release: () => Promise<void> }
    const nav = navigator as Navigator & { wakeLock?: { request: (t: 'screen') => Promise<Sentinel> } }
    if (!nav.wakeLock) return

    let sentinel: Sentinel | null = null
    let dropped = false

    const acquire = async () => {
      try {
        sentinel = await nav.wakeLock!.request('screen')
      } catch {
        // Denied (battery saver, no user gesture) — judging is unaffected
      }
    }
    const onVisible = () => { if (document.visibilityState === 'visible' && !dropped) acquire() }

    acquire()
    document.addEventListener('visibilitychange', onVisible)
    return () => {
      dropped = true
      document.removeEventListener('visibilitychange', onVisible)
      sentinel?.release().catch(() => {})
    }
  }, [active])
}
