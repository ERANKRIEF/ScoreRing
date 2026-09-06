import { useState } from 'react'
import type { Level } from '../types'
import { getExercises, JUMP_RULE, LEVEL_MAX } from '../data/exercises'
import { useLang } from '../i18n/LangContext'

export const FIXED_LAST_ID = 'searchescort'

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

  const isOptional = (id: string) => chooseJumps && optionalIds.includes(id)
  const firstOptIdx = orderable.findIndex(e => isOptional(e.id))
  const fixedBefore = firstOptIdx < 0 ? orderable.length : orderable.slice(0, firstOptIdx).filter(e => !isOptional(e.id)).length
  // Running numbers held for the picked jumps, e.g. [7] at Level I, [9] at Level II
  const jumpSlots = Array.from({ length: quota }, (_, i) => fixedBefore + 1 + i)

  function defaults() {
    const nums: Record<string, string> = {}
    let n = 1
    let reserved = false
    orderable.forEach(e => {
      if (isOptional(e.id)) {
        if (!reserved) { n += quota; reserved = true }
        nums[e.id] = ''
        return
      }
      nums[e.id] = String(n++)
    })
    return nums
  }

  const [nums, setNums] = useState<Record<string, string>>(defaults)
  const [picked, setPicked] = useState<string[]>([])
  const [error, setError] = useState('')

  const levelLabel = ['I', 'II', 'III'][level - 1]

  // Highest score the chosen jumps allow. Jump heights carry different points,
  // so some combinations cannot reach the level's maximum.
  const achievable = all
    .filter(e => !isOptional(e.id) || picked.includes(e.id))
    .reduce((sum, e) => sum + e.maxPts[level], 0)
  const levelMax = LEVEL_MAX[level]

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
        k => k !== id && parseInt(prev[k], 10) === n && isActive(k),
      )
      if (!others.length) return next

      const vacated = parseInt(prev[id], 10)
      const taken = new Set(
        Object.keys(next)
          .filter(k => !others.includes(k) && isActive(k))
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

  function isActive(id: string) {
    return orderable.some(e => e.id === id) && (!isOptional(id) || picked.includes(id))
  }

  /** Tap a jump to include it in the trial; over quota, the earliest pick drops out. */
  function toggleJump(id: string) {
    setError('')
    setPicked(prev => {
      if (prev.includes(id)) {
        setNums(n => ({ ...n, [id]: '' }))
        return prev.filter(j => j !== id)
      }
      const next = [...prev, id]
      const dropped = next.length > quota ? next.shift() : undefined
      setNums(n => {
        const out = { ...n }
        if (dropped) out[dropped] = ''
        const used = new Set(next.map(j => out[j]).filter(Boolean))
        out[id] = String(jumpSlots.find(s => !used.has(String(s))) ?? jumpSlots[0])
        return out
      })
      return next
    })
  }

  function confirm() {
    if (chooseJumps && picked.length !== quota) { setError(t.errOrderJumps(quota)); return }

    const active = orderable.filter(e => isActive(e.id))
    if (active.some(e => nums[e.id].trim() === '')) { setError(t.errOrderMissing); return }

    const parsed = active.map(e => ({ id: e.id, n: parseInt(nums[e.id], 10) }))
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
          <h1>FCI <span>Mondioring</span></h1>
          <p>{t.orderTitle(levelLabel)}</p>
        </div>
      </div>

      <p className="order-hint">{t.orderHint}</p>
      {chooseJumps && <p className="order-hint order-hint--jumps">{t.orderJumpsHint(levelLabel, quota)}</p>}
      {chooseJumps && picked.length === quota && achievable < levelMax && (
        <p className="order-hint order-hint--short">{t.orderMaxNote(achievable, levelMax)}</p>
      )}
      {error && <div className="add-error order-error" role="alert">{error}</div>}

      <div className="order-list">
        {orderable.map(ex => {
          const opt = isOptional(ex.id)
          const on = !opt || picked.includes(ex.id)
          const name = t.exNames[ex.id] || ex.name
          return (
            <div key={ex.id} className={`order-row disc-${ex.discipline}${on ? '' : ' order-row--excluded'}`}>
              {opt ? (
                <button
                  className={`jump-pick${on ? ' on' : ''}`}
                  onClick={() => toggleJump(ex.id)}
                  aria-pressed={on}
                >
                  {on ? '✓' : '+'}
                </button>
              ) : null}
              <input
                type="number"
                inputMode="numeric"
                min="1"
                max={orderable.length}
                value={nums[ex.id]}
                disabled={!on}
                onChange={e => setNum(ex.id, e.target.value)}
                onFocus={e => e.target.select()}
                aria-label={name}
              />
              <div className="order-info">
                <span className="order-name">{name}</span>
                <span className="order-disc">
                  {on
                    ? opt ? t.jumpPerformedLabel : t.disc[ex.discipline]
                    : t.notPerformedLabel}
                </span>
              </div>
            </div>
          )
        })}
        {fixedLast && (
          <div className={`order-row order-row--fixed disc-${fixedLast.discipline}`}>
            <div className="order-fixed-num">
              {orderable.length - (chooseJumps ? optionalIds.length - quota : 0) + 1}
            </div>
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
          onClick={() => { setNums(defaults()); setPicked([]); setError('') }}
        >
          {t.orderResetBtn}
        </button>
        <button className="start-trial-btn" onClick={confirm}>{t.orderConfirmBtn}</button>
      </div>
    </div>
  )
}
