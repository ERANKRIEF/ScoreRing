import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

function showErrorBanner(message: string) {
  let el = document.querySelector<HTMLDivElement>('.app-error-banner')
  if (!el) {
    el = document.createElement('div')
    el.className = 'app-error-banner'
    el.onclick = () => el?.remove()
    document.body.appendChild(el)
  }
  el.textContent = `⚠ ${message}\n(tap to dismiss)`
}

window.addEventListener('error', e => {
  showErrorBanner(`${e.message}\n${e.filename ?? ''}:${e.lineno ?? ''}`)
})
window.addEventListener('unhandledrejection', e => {
  const r = e.reason
  showErrorBanner(r instanceof Error ? `${r.message}\n${r.stack ?? ''}` : String(r))
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
