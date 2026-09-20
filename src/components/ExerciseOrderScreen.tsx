import { useState } from 'react'
import type { Level } from '../types'
import { getExercises, JUMP_RULE } from '../data/exercises'
import { useLang } from '../i18n/LangContext'

export const FIXED_LAST_ID = 'searchescort'
/** The handler picks the apparatus at the ring, so the order holds a slot for it */
export const JUMP_SLOT = '__jump__'

interface Props {
  level: Level
  onConfirm: (orderedIds: string[]) => void
  onBack: () => void
}

export default function ExerciseOrderScreen({ level, onConfirm, onBack }: Props) {
  const { t } = useLang()
  const all = getExercises(level)
  const fixedLast = all.find(e => e.id === FIXED_LAST_ID)
  const orderable = all.filter(e => e.id !== FIXED_LAST_ID)
  // The scoresheet's asterisks decide which jumps the handler picks and which
  // are compulsory at this level.
  const rule = JUMP_RULE[level]
  const quota = rule.pick
  const optionalIds = orderable.filter(e => rule.choose.includes(e.id)).map(e => e.id)
  const chooseJumps = quota > 0 && optionalIds.length > quota

  // Rows to number: the choosable jumps collapse into one slot per pick, because
  // which apparatus runs is a decision each handler makes for their own dog.
  type Row = { id: string; name: string; discipline: string; slot: boolean }
  const rows: Row[] = []
  orderable.forEach(e => {
    if (!chooseJumps || !optionalIds.includes(e.id)) {
      rows.push({ id: e.id, name: t.exNames[e.id] || e.name, discipline: e.discipline, slot: false })
      return
    }
    if (rows.some(r => r.slot)) return
    for (let i = 0; i < quota; i++) {
      rows.push({ id: `${JUMP_SLOT}${i}`, name: t.jumpSlotName, discipline: 'jmp', slot: true })
    }
  })

  function defaults() {
    const nums: Record<string, string> = {}
    rows.forEach((r, i) => { nums[r.id] = String(i + 1) })
    return nums
  }

  const [nums, setNums] = useState<Record<string, string>>(defaults)
  const [error, setError] = useState('')

  const levelLabel = ['I', 'II', 'III'][level - 1]

  /**
   * Type a number into an exercise and it takes that slot; whichever exercise
   * held it takes the number just vacated, so the running order stays a
   * complete sequence and no duplicate can be produced by editing.
   */
  function setNum(id: string, v: string) {
    setError('')
    setNums(prev => {
      const next = { ...prev, [id]: v }
      const n = parseInt(v, 10)
      if (isNaN(n)) return next

      const others = Object.keys(prev).filter(
        k => k !== id && parseInt(prev[k], 10) === n,
      )
      if (!others.length) return next

      const vacated = parseInt(prev[id], 10)
      const taken = new Set(
        Object.keys(next)
          .filter(k => !others.includes(k))
          .map(k => parseInt(next[k], 10))
          .filter(x => !isNaN(x)),
      )
      others.forEach(k => {
        let give = !isNaN(vacated) && !taken.has(vacated) ? vacated : 1
        while (taken.has(give)) give++
        next[k] = String(give)
        taken.add(give)
      })
      return next
    })
  }

  function confirm() {
    if (rows.some(r => nums[r.id].trim() === '')) { setError(t.errOrderMissing); return }

    const parsed = rows.map(r => ({ id: r.slot ? JUMP_SLOT : r.id, n: parseInt(nums[r.id], 10) }))
    if (parsed.some(p => isNaN(p.n) || p.n < 1)) { setError(t.errOrderMissing); return }

    const seen = new Set<number>()
    for (const p of parsed) {
      if (seen.has(p.n)) { setError(t.errOrderDuplicate(p.n)); return }
      seen.add(p.n)
    }
    const ordered = parsed.sort((a, b) => a.n - b.n).map(p => p.id)
    if (fixedLast) ordered.push(fixedLast.id)
    onConfirm(ordered)
  }

  return (
    <div className="participants-screen">
      <div className="participants-header">
        <button className="part-back-btn" onClick={onBack}>{t.back}</button>
        <div className="participants-title">
          <h1>Mondioring <span>ScoreRing</span></h1>
          <p>{t.orderTitle(levelLabel)}</p>
        </div>
      </div>

      <p className="order-hint">{t.orderHint}</p>
      {chooseJumps && <p className="order-hint order-hint--jumps">{t.orderSlotHint(levelLabel, quota)}</p>}
      {error && <div className="add-error order-error" role="alert">{error}</div>}

      <div className="order-list">
        {rows.map(row => (
          <div key={row.id} className={`order-row disc-${row.discipline}${row.slot ? ' order-row--slot' : ''}`}>
            <input
              type="number"
              inputMode="numeric"
              min="1"
              max={rows.length}
              value={nums[row.id]}
              onChange={e => setNum(row.id, e.target.value)}
              onFocus={e => e.target.select()}
              aria-label={row.name}
            />
            <div className="order-info">
              <span className="order-name">{row.name}</span>
              <span className="order-disc">
                {row.slot ? t.jumpSlotHint : t.disc[row.discipline]}
              </span>
            </div>
          </div>
        ))}
        {fixedLast && (
          <div className={`order-row order-row--fixed disc-${fixedLast.discipline}`}>
            <div className="order-fixed-num">{rows.length + 1}</div>
            <div className="order-info">
              <span className="order-name">{t.exNames[fixedLast.id] || fixedLast.name}</span>
              <span className="order-disc">{t.orderFixedLast}</span>
            </div>
          </div>
        )}
      </div>

      <div className="participants-footer">
        <button
          className="part-back-btn"
          onClick={() => { setNums(defaults()); setError('') }}
        >
          {t.orderResetBtn}
        </button>
        <button className="start-trial-btn" onClick={confirm}>{t.orderConfirmBtn}</button>
      </div>
    </div>
  )
}
