import { useState, useEffect } from 'react'
import type { Level, Penalty } from '../types'
import { useLang } from '../i18n/LangContext'

interface Props {
  penalty: Penalty | null
  exId: string | null
  level: Level
  onApply: (exId: string, penalty: Penalty, qty: number) => void
  onClose: () => void
}

export default function PenaltyModal({ penalty, exId, level, onApply, onClose }: Props) {
  const { t, td } = useLang()
  const [qty, setQty] = useState(1)

  useEffect(() => {
    if (penalty) setQty(1)
  }, [penalty])

  if (!penalty || !exId) return null

  const ptsPerUnit = typeof penalty.pts === 'number' ? penalty.pts : 0
  const desc = td(penalty.id, level) || penalty.desc
  const unitLabel = t.units[penalty.unit!] || penalty.unit || ''

  function handleApply() {
    if (!penalty || !exId) return
    onApply(exId, penalty, qty)
    onClose()
  }

  return (
    <div className={`modal-overlay${penalty ? ' open' : ''}`} onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className="modal-sheet">
        <div className="modal-title">
          {desc.length > 50 ? desc.slice(0, 48) + '…' : desc}
        </div>
        <div className="modal-desc">
          {t.modalEachUnit(unitLabel, ptsPerUnit)}
        </div>

        <div className="qty-row">
          <button className="qty-btn" onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
          <div className="qty-val">{qty}</div>
          <button className="qty-btn" onClick={() => setQty(q => q + 1)}>+</button>
        </div>

        <button className="modal-apply-btn" onClick={handleApply}>
          {t.applyBtn(Math.abs(ptsPerUnit) * qty)}
        </button>
        <button className="modal-cancel-btn" onClick={onClose}>{t.cancelBtn}</button>
      </div>
    </div>
  )
}
