import { useEffect, useRef, useState } from 'react'
import { useLang } from '../i18n/LangContext'

/** Times the exercises that carry a limit: the minute of absence, the escort, a retrieve. */
export default function Stopwatch({ onClose }: { onClose: () => void }) {
  const { t } = useLang()
  const [running, setRunning] = useState(false)
  const [ms, setMs] = useState(0)
  const [target, setTarget] = useState<number | null>(null)
  const from = useRef(0)
  const base = useRef(0)

  useEffect(() => {
    if (!running) return
    from.current = Date.now()
    const id = setInterval(() => setMs(base.current + (Date.now() - from.current)), 100)
    return () => clearInterval(id)
  }, [running])

  function toggle() {
    if (running) { base.current = ms; setRunning(false) } else setRunning(true)
  }
  function reset() { base.current = 0; setMs(0); setRunning(false) }

  const secs = Math.floor(ms / 1000)
  const passed = target !== null && secs >= target
  const clock = `${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, '0')}`

  const PRESETS = [15, 60, 120, 180]

  return (
    <div className="stopwatch">
      <div className="sw-row">
        <div className={`sw-clock${passed ? ' passed' : ''}`}>{clock}</div>
        <button className="sw-btn" onClick={toggle}>{running ? t.swPause : t.swStart}</button>
        <button className="sw-btn" onClick={reset}>{t.swReset}</button>
        <button className="sw-btn sw-close" onClick={onClose} aria-label={t.swClose}>✕</button>
      </div>
      <div className="sw-presets">
        <span className="sw-label">{t.swTargetLabel}</span>
        {PRESETS.map(p => (
          <button
            key={p}
            className={`jump-chip${target === p ? ' active' : ''}`}
            onClick={() => setTarget(target === p ? null : p)}
          >
            {p < 60 ? t.swSeconds(p) : `${p / 60}:00`}
          </button>
        ))}
      </div>
      {passed && <div className="sw-passed-note">{t.swPassed(target!)}</div>}
    </div>
  )
}
