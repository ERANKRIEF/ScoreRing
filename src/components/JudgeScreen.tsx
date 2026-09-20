import { useState, useRef, useEffect } from 'react'
import type { Level, Penalty, ResultStatus } from '../types'
import type { useScoring } from '../hooks/useScoring'
import { useLang } from '../i18n/LangContext'
import { useWakeLock } from '../hooks/useWakeLock'
import PenaltyModal from './PenaltyModal'
import Stopwatch from './Stopwatch'

type ScoringHook = ReturnType<typeof useScoring>

interface Props extends ScoringHook {
  handlerName: string
  dogName: string
  startNumber: number
  level: Level
  competitorIndex: number
  totalCompetitors: number
  onShowSheet: () => void
  onMarkStatus: (status: ResultStatus) => void
  /** Apparatus this handler may choose between, and the one currently in the running order */
  jumpAlternatives: string[]
  jumpChoice: string
  onJumpChoice: (id: string) => void
}

export default function JudgeScreen(props: Props) {
  const {
    exercises, level, currentExIndex,
    applyDeduction, applyDisqualify, applyGA,
    undoLog, resetExercise, setJumpMax,
    getExerciseState, getExerciseMax, getTotals,
    goToDisc, navigateEx,
    handlerName, dogName, startNumber,
    competitorIndex, totalCompetitors, onShowSheet, onMarkStatus,
    jumpAlternatives, jumpChoice, onJumpChoice,
  } = props

  const { t, td } = useLang()
  const [modalPen, setModalPen] = useState<Penalty | null>(null)
  const [modalExId, setModalExId] = useState<string | null>(null)
  const [confirmPen, setConfirmPen] = useState<Penalty | null>(null)
  const [showWatch, setShowWatch] = useState(false)
  const [confirmStatus, setConfirmStatus] = useState<ResultStatus | null>(null)

  useWakeLock(true)
  const totalRef = useRef<HTMLDivElement>(null)

  const isLastEx = currentExIndex === exercises.length - 1
  const ex = exercises[currentExIndex]
  if (!ex) return null

  const maxPts = getExerciseMax(ex)
  const state = getExerciseState(ex.id)
  // Which jumps are performed is settled on the order screen; here the judge
  // only records the height the handler chose. Until then the nominal (highest)
  // height counts, so the running total starts at the level's full maximum.
  const jumpOpts = ex.jumpOptions?.[level]
  const jumpDefault = jumpOpts ? Math.max(...jumpOpts.map(o => o.pts)) : 0
  const jumpPending = !!jumpOpts && state.jumpMax === undefined
  const jumpActive = state.jumpMax ?? jumpDefault
  const exScore = Math.max(0, maxPts - state.deductions)
  const { total, max } = getTotals()
  const currentDisc = ex.discipline

  const levelLabel = ['I', 'II', 'III'][level - 1]

  const DISCS = [
    { key: 'ob',  label: t.disc['ob'] },
    { key: 'jmp', label: t.disc['jmp'] },
    { key: 'bit', label: t.disc['bit'] },
  ]

  useEffect(() => {
    const el = totalRef.current
    if (!el) return
    el.classList.remove('flash')
    void el.offsetWidth
    el.classList.add('flash')
  }, [total])

  function handlePenalty(pen: Penalty) {
    // Wiping a whole exercise on one tap deserves a second's thought
    if (pen.pts === 'ALL') { setConfirmPen(pen); return }
    // Log the penalty in the judge's own language, not the English source text
    const p = { ...pen, desc: td(pen.id, level) || pen.desc }
    if (p.isGA) { applyGA(ex.id, p); return }
    if (p.pts === 0) return
    if (p.perUnit) { setModalExId(ex.id); setModalPen(pen); return }
    applyDeduction(ex.id, p, Math.abs(p.pts as number))
  }

  function confirmDisqualify() {
    if (!confirmPen) return
    applyDisqualify(ex.id, { ...confirmPen, desc: td(confirmPen.id, level) || confirmPen.desc })
    setConfirmPen(null)
  }

  function handleModalApply(exId: string, pen: Penalty, qty: number) {
    const amount = Math.abs(pen.pts as number) * qty
    const translatedDesc = td(pen.id, level)
    applyDeduction(exId, { ...pen, desc: translatedDesc ? `${translatedDesc} × ${qty}` : `${pen.desc} × ${qty}` }, amount)
  }

  return (
    <div className="judge-screen">
      {/* ── Top bar ── */}
      <div className="topbar">
        <div className="topbar-left">
          <div className="dog-info">#{startNumber} · {dogName} / {handlerName}</div>
          <div className="level-badge">
            {t.levelCompetitor(levelLabel, competitorIndex + 1, totalCompetitors)}
          </div>
        </div>
        <div className="topbar-score">
          <div className="total-score-display">
            <div className="score-num" ref={totalRef}>{total}</div>
            <div className="score-max">/ {max} pts</div>
          </div>
          <button
            className="watch-btn"
            onClick={() => setConfirmStatus('absent')}
            aria-label={t.markAbsent}
          >
            ⃠
          </button>
          <button
            className={`watch-btn${showWatch ? ' on' : ''}`}
            onClick={() => setShowWatch(v => !v)}
            aria-label={t.swTitle}
          >
            ⏱
          </button>
          <button className="sheet-btn" onClick={onShowSheet}>{t.scoresheetBtn}</button>
        </div>
      </div>

      {/* ── Discipline tabs ── */}
      <div className="disc-tabs">
        {DISCS.map(d => (
          <button
            key={d.key}
            className={`disc-tab${currentDisc === d.key ? ` active-${d.key}` : ''}`}
            onClick={() => goToDisc(d.key)}
          >
            {d.label}
          </button>
        ))}
      </div>

      {/* ── Exercise nav ── */}
      <div className="exercise-nav">
        <button
          className="ex-nav-btn"
          onClick={() => navigateEx(-1)}
          disabled={currentExIndex === 0}
        >
          {t.prevBtn}
        </button>
        <div className="ex-title-block">
          <div className="ex-name">{t.exNames[ex.id] || ex.name}</div>
          <div className="ex-meta">
            {ex.note ?? (maxPts > 0 ? t.maxPtsMeta(maxPts) : t.notScoredMeta)}
          </div>
        </div>
        {isLastEx ? (
          <button className="ex-nav-btn ex-nav-btn--finish" onClick={onShowSheet}>
            {t.toSheetBtn}
          </button>
        ) : (
          <button className="ex-nav-btn" onClick={() => navigateEx(1)}>
            {t.nextBtn}
          </button>
        )}
      </div>

      {isLastEx && (
        <button className="finish-dog-banner" onClick={onShowSheet}>
          <span>{t.toSheetHint}</span>
          <strong>{t.scoresheetBtn} →</strong>
        </button>
      )}

      {showWatch && <Stopwatch onClose={() => setShowWatch(false)} />}

      {/* ── Which jump, then how high ── */}
      {jumpOpts && jumpAlternatives.length > 1 && ex.id === jumpChoice && (
        <div className="jump-options jump-options--pick">
          <div className="jump-options-label">{t.judgeJumpPick}</div>
          <div className="jump-chips">
            {jumpAlternatives.map(id => (
              <button
                key={id}
                className={`jump-chip${id === jumpChoice ? ' active' : ''}`}
                onClick={() => onJumpChoice(id)}
              >
                {t.exNames[id] || id}
              </button>
            ))}
          </div>
        </div>
      )}

      {jumpOpts && (
        <div className="jump-options">
          <div className="jump-options-label">{t.jumpHeightLabel}</div>
          <div className="jump-chips">
            {jumpOpts.map(o => (
              <button
                key={o.label}
                className={`jump-chip${o.pts === jumpActive ? ' active' : ''}${jumpPending && o.pts === jumpActive ? ' pending' : ''}`}
                onClick={() => setJumpMax(ex.id, o.pts)}
              >
                {o.label} <strong>{o.pts}</strong>
              </button>
            ))}
          </div>
          {jumpPending && jumpOpts.length > 1 && (
            <div className="jump-default-note">{t.jumpDefaultNote}</div>
          )}
        </div>
      )}

      {/* ── Score strip ── */}
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

      {/* ── Penalty log ── */}
      <div className="penalty-log-bar">
        <span className="log-label">{t.tappedLabel}</span>
        {state.log.length === 0
          ? <span className="log-empty">{t.noneYetLabel}</span>
          : state.log.map((entry, i) => (
              <button key={i} className="log-tag" onClick={() => undoLog(ex.id, i)}>
                {entry.desc.length > 30 ? entry.desc.slice(0, 28) + '…' : entry.desc}
                {' '}<strong>{entry.pts > 0 ? '+' : ''}{entry.pts}</strong>
                <span className="undo-x">✕</span>
              </button>
            ))
        }
      </div>

      {/* ── Penalties ── */}
      <div className="penalties-area">
        {maxPts === 0
          ? <div className="not-scored">
              {t.notScoredMsg(levelLabel)}
            </div>
          : <>
              <div className="penalty-section-title">{t.tapToDeductHint}</div>
              <div className="penalty-btn-grid">
                {ex.penalties.map(pen => {
                  const isDisq = pen.pts === 'ALL'
                  const isGA   = pen.isGA
                  const ptsLabel = isDisq
                    ? (pen.label ?? t.disqualifyLabel)
                    : isGA
                    ? (pen.label ?? t.gaNoteLabel)
                    : typeof pen.pts === 'number' && pen.pts !== 0
                    ? String(pen.pts)
                    : (pen.label ?? t.noPenaltyLabel)

                  const desc = td(pen.id, level) || pen.desc

                  return (
                    <button
                      key={pen.id}
                      className={`penalty-btn${isDisq ? ' disqualify-btn' : ''}`}
                      onClick={() => handlePenalty(pen)}
                    >
                      <span className="pb-desc">
                        {desc}
                        {pen.perUnit && <em> ({t.perUnitLabel(t.units[pen.unit!] || pen.unit!)})</em>}
                      </span>
                      <span className={`pb-pts${isDisq ? ' disq' : isGA ? ' ga' : ''}`}>
                        {ptsLabel}
                      </span>
                    </button>
                  )
                })}
              </div>
            </>
        }
      </div>

      {/* ── Absent or eliminated ends this competitor's run ── */}
      {confirmStatus && (
        <div className="modal-overlay open" onClick={() => setConfirmStatus(null)}>
          <div className="modal-sheet" onClick={e => e.stopPropagation()}>
            <div className="modal-title">{t.markStatusTitle(dogName, handlerName)}</div>
            <div className="modal-desc">{t.markStatusBody}</div>
            <div className="status-actions">
              <button className="status-btn absent" onClick={() => onMarkStatus('absent')}>
                {t.markAbsent}
                <span>{t.markAbsentHint}</span>
              </button>
              <button className="status-btn eliminated" onClick={() => onMarkStatus('eliminated')}>
                {t.markEliminated}
                <span>{t.markEliminatedHint}</span>
              </button>
            </div>
            <button className="modal-cancel-btn" onClick={() => setConfirmStatus(null)}>
              {t.confirmCancel}
            </button>
          </div>
        </div>
      )}

      {/* ── Losing the exercise needs confirming ── */}
      {confirmPen && (
        <div className="modal-overlay open" onClick={() => setConfirmPen(null)}>
          <div className="modal-sheet" onClick={e => e.stopPropagation()}>
            <div className="modal-title">{t.confirmDisqTitle}</div>
            <div className="modal-desc">
              {td(confirmPen.id, level) || confirmPen.desc}
              <br />
              {t.confirmDisqBody(t.exNames[ex.id] || ex.name, maxPts)}
            </div>
            <div className="confirm-actions">
              <button className="modal-cancel-btn" onClick={() => setConfirmPen(null)}>{t.confirmCancel}</button>
              <button className="modal-apply-btn disq" onClick={confirmDisqualify}>{t.confirmDisqOk}</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Per-unit modal ── */}
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
