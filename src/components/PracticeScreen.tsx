import { useEffect, useMemo, useRef, useState } from 'react'
import type { Level, Penalty, ScoreMap } from '../types'
import { useScoring } from '../hooks/useScoring'
import { getExercises, JUMP_RULE, LEVEL_MAX } from '../data/exercises'
import { qualify } from '../data/qualify'
import { useLang } from '../i18n/LangContext'
import PenaltyModal from './PenaltyModal'

interface Props {
  level: Level
  onBack: () => void
}

export default function PracticeScreen({ level, onBack }: Props) {
  const { t, td } = useLang()
  const {
    exercises, scores, currentExIndex, setCurrentExIndex, startSession, restoreSession,
    applyDeduction, applyDisqualify, applyGA, undoLog, resetExercise,
    setJumpMax, getExerciseMax, getExerciseState, getTotals,
  } = useScoring()

  const rule = JUMP_RULE[level]
  // Practice runs one legal jump set, like a real trial, so the totals match
  // the scoresheet; the competitor switches which optional jump is in play.
  const [chosenJump, setChosenJump] = useState(rule.choose[0] ?? '')
  const [query, setQuery] = useState('')
  const [modalPen, setModalPen] = useState<Penalty | null>(null)
  const [modalExId, setModalExId] = useState<string | null>(null)

  // Switching the jump keeps everything tapped on the other exercises
  const keep = useRef<ScoreMap>({})
  keep.current = scores
  useEffect(() => {
    const order = getExercises(level)
      .filter(e => !rule.choose.includes(e.id) || e.id === chosenJump)
      .map(e => e.id)
    restoreSession(level, order, keep.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level, chosenJump, restoreSession])

  const levelLabel = ['I', 'II', 'III'][level - 1]
  const levelMax = LEVEL_MAX[level]
  const { total } = getTotals()
  const lost = levelMax - total

  const exName = (id: string, fallback: string) => t.exNames[id] || fallback
  const penDesc = (pen: Penalty) => td(pen.id, level) || pen.desc

  // Competitors look for the mistake, not the exercise, so search every penalty
  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (q.length < 2) return null
    return exercises.flatMap(ex =>
      ex.penalties
        .filter(p => penDesc(p).toLowerCase().includes(q))
        .map(p => ({ ex, pen: p })),
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, exercises, level, t])

  const ex = exercises[currentExIndex]
  if (!ex) return null

  const maxPts = getExerciseMax(ex)
  const state = getExerciseState(ex.id)
  const exScore = Math.max(0, maxPts - state.deductions)
  const jumpOpts = ex.jumpOptions?.[level]
  const jumpActive = state.jumpMax ?? (jumpOpts ? Math.max(...jumpOpts.map(o => o.pts)) : 0)

  /** What the competitor is really asking: what am I left with after this mistake? */
  function outcomeOf(pen: Penalty, exMax: number, exRemaining: number) {
    if (pen.isGA) return t.practiceNoDeduct
    if (pen.pts === 'ALL') return t.practiceAllLost
    if (pen.pts === 0) return t.practiceNoDeduct
    const after = Math.max(0, exRemaining - Math.abs(pen.pts as number))
    return t.practiceRemains(after, exMax)
  }

  function handlePenalty(pen: Penalty) {
    const p = { ...pen, desc: penDesc(pen) }
    if (p.isGA) { applyGA(ex.id, p); return }
    if (p.pts === 'ALL') { applyDisqualify(ex.id, p); return }
    if (p.pts === 0) return
    if (p.perUnit) { setModalExId(ex.id); setModalPen(pen); return }
    applyDeduction(ex.id, p, Math.abs(p.pts as number))
  }

  function handleModalApply(exId: string, pen: Penalty, qty: number) {
    const desc = penDesc(pen)
    applyDeduction(exId, { ...pen, desc: `${desc} × ${qty}` }, Math.abs(pen.pts as number) * qty)
  }

  function penaltyLabel(pen: Penalty) {
    if (pen.pts === 'ALL') return pen.label ?? t.disqualifyLabel
    if (pen.isGA) return pen.label ?? t.gaNoteLabel
    if (typeof pen.pts === 'number' && pen.pts !== 0) return String(pen.pts)
    return pen.label ?? t.noPenaltyLabel
  }

  const { key: qualKey, cls: qualCls } = qualify(level, total)
  const qualLabel = t.qual[qualKey]

  // Browsing wraps around: there is no running order to respect here
  const step = (d: number) =>
    setCurrentExIndex((currentExIndex + d + exercises.length) % exercises.length)

  return (
    <div className="judge-screen practice-screen">
      <div className="topbar">
        <div className="topbar-left">
          <button className="part-back-btn" onClick={onBack}>{t.back}</button>
        </div>
        <div className="practice-badge">{t.practiceTitle} · {t.levelShort(levelLabel)}</div>
        <div className="topbar-score">
          <div className="total-score-display">
            <div className="score-num">{total}</div>
            <div className="score-max">/ {levelMax}</div>
          </div>
        </div>
      </div>

      <p className="practice-intro">{t.practiceIntro}</p>

      {rule.choose.length > 1 && (
        <div className="jump-options">
          <div className="jump-options-label">{t.practiceJumpChoice}</div>
          <div className="jump-chips">
            {getExercises(level)
              .filter(e => rule.choose.includes(e.id))
              .map(e => (
                <button
                  key={e.id}
                  className={`jump-chip${e.id === chosenJump ? ' active' : ''}`}
                  onClick={() => setChosenJump(e.id)}
                >
                  {exName(e.id, e.name)}
                </button>
              ))}
          </div>
        </div>
      )}

      <div className="practice-tools">
        <input
          type="search"
          className="practice-search"
          placeholder={t.practiceSearch}
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <select
          className="practice-select"
          value={currentExIndex}
          onChange={e => { setCurrentExIndex(Number(e.target.value)); setQuery('') }}
        >
          {exercises.map((e, i) => (
            <option key={e.id} value={i}>{exName(e.id, e.name)}</option>
          ))}
        </select>
      </div>

      {results ? (
        <div className="penalties-area">
          <div className="penalty-section-title">{t.practiceResults(results.length)}</div>
          {results.length === 0 && <div className="not-scored">{t.practiceNoResults}</div>}
          <div className="penalty-btn-grid">
            {results.map(({ ex: rex, pen }) => {
              const rMax = getExerciseMax(rex)
              return (
                <button
                  key={`${rex.id}-${pen.id}`}
                  className={`penalty-btn${pen.pts === 'ALL' ? ' disqualify-btn' : ''}`}
                  onClick={() => {
                    setCurrentExIndex(exercises.findIndex(e => e.id === rex.id))
                    setQuery('')
                  }}
                >
                  <span className="pb-desc">
                    <span className="pb-where">{exName(rex.id, rex.name)}</span>
                    {penDesc(pen)}
                    {pen.perUnit && <em> ({t.perUnitLabel(t.units[pen.unit!] || pen.unit!)})</em>}
                    <span className="pb-after">{outcomeOf(pen, rMax, rMax)}</span>
                  </span>
                  <span className={`pb-pts${pen.pts === 'ALL' ? ' disq' : pen.isGA ? ' ga' : ''}`}>
                    {penaltyLabel(pen)}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      ) : (
        <>
          <div className="exercise-nav">
            <button className="ex-nav-btn" onClick={() => step(-1)}>{t.prevBtn}</button>
            <div className="ex-title-block">
              <div className="ex-name">{exName(ex.id, ex.name)}</div>
              <div className="ex-meta">
                {maxPts > 0 ? t.maxPtsMeta(maxPts) : t.notScoredMeta}
                {' · '}{currentExIndex + 1}/{exercises.length}
              </div>
            </div>
            <button className="ex-nav-btn" onClick={() => step(1)}>{t.nextBtn}</button>
          </div>

          {jumpOpts && (
            <div className="jump-options">
              <div className="jump-options-label">{t.jumpHeightLabel}</div>
              <div className="jump-chips">
                {jumpOpts.map(o => (
                  <button
                    key={o.label}
                    className={`jump-chip${o.pts === jumpActive ? ' active' : ''}`}
                    onClick={() => setJumpMax(ex.id, o.pts)}
                  >
                    {o.label} <strong>{o.pts}</strong>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="score-strip">
            <div className="score-block max">
              <div className="sb-val">{maxPts}</div>
              <div className="sb-label">{t.maxLabel}</div>
            </div>
            <div className="score-divider" />
            <div className="score-block deducted">
              <div className="sb-val">-{state.deductions}</div>
              <div className="sb-label">{t.deductedLabel}</div>
            </div>
            <div className="score-divider" />
            <div className="score-block current">
              <div className="sb-val">{exScore}</div>
              <div className="sb-label">{t.scoreLabel}</div>
            </div>
            <div className="score-divider" />
            <button className="reset-ex-btn" onClick={() => resetExercise(ex.id)}>{t.resetBtn}</button>
          </div>

          {state.log.length > 0 && (
            <div className="penalty-log-bar">
              <span className="log-label">{t.tappedLabel}</span>
              {state.log.map((entry, i) => (
                <button key={i} className="log-tag" onClick={() => undoLog(ex.id, i)}>
                  {entry.desc.length > 30 ? entry.desc.slice(0, 28) + '…' : entry.desc}
                  {' '}<strong>{entry.pts > 0 ? '+' : ''}{entry.pts}</strong>
                  <span className="undo-x">✕</span>
                </button>
              ))}
            </div>
          )}

          <div className="penalties-area">
            {maxPts === 0 ? (
              <div className="not-scored">{t.notScoredMsg(levelLabel)}</div>
            ) : (
              <>
                <div className="penalty-section-title">{t.practiceTapHint}</div>
                <div className="penalty-btn-grid">
                  {ex.penalties.map(pen => (
                    <button
                      key={pen.id}
                      className={`penalty-btn${pen.pts === 'ALL' ? ' disqualify-btn' : ''}`}
                      onClick={() => handlePenalty(pen)}
                    >
                      <span className="pb-desc">
                        {penDesc(pen)}
                        {pen.perUnit && <em> ({t.perUnitLabel(t.units[pen.unit!] || pen.unit!)})</em>}
                        <span className="pb-after">{outcomeOf(pen, maxPts, exScore)}</span>
                      </span>
                      <span className={`pb-pts${pen.pts === 'ALL' ? ' disq' : pen.isGA ? ' ga' : ''}`}>
                        {penaltyLabel(pen)}
                      </span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </>
      )}

      <div className="practice-footer">
        <div className="practice-tally">
          <span className="pt-lost">{t.practiceLost} <strong>{lost}</strong></span>
          <span className="pt-left">{t.practiceRemaining} <strong>{total}</strong></span>
          <span className={`qualifier ${qualCls}`}>{qualLabel}</span>
        </div>
        <button
          className="part-back-btn"
          onClick={() => startSession(level, getExercises(level)
            .filter(e => !rule.choose.includes(e.id) || e.id === chosenJump)
            .map(e => e.id))}
        >
          {t.practiceResetAll}
        </button>
      </div>

      <PenaltyModal
        penalty={modalPen}
        exId={modalExId}
        level={level}
        onApply={handleModalApply}
        onClose={() => { setModalPen(null); setModalExId(null) }}
      />
    </div>
  )
}
