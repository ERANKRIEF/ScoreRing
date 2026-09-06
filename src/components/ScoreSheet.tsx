import type { Level, Participant } from '../types'
import type { useScoring } from '../hooks/useScoring'
import type { TrialDetails } from '../data/session'
import { LEVEL_MAX } from '../data/exercises'
import { qualify } from '../data/qualify'
import { useLang } from '../i18n/LangContext'
import TrialHeader from './TrialHeader'

type ScoringHook = ReturnType<typeof useScoring>

interface Props extends ScoringHook {
  participant: Participant
  details: TrialDetails
  level: Level
  competitorIndex: number
  totalCompetitors: number
  onBack: () => void
  onNext: () => void
}

export default function ScoreSheet(props: Props) {
  const {
    exercises, level, getExerciseState, getExerciseMax,
    participant, details,
    competitorIndex, totalCompetitors,
    onBack, onNext,
  } = props

  const { handlerName, dogName, startNumber } = participant

  const { t } = useLang()

  const DISCS = [
    { key: 'ob',  label: t.obExercises,  cls: 'ob' },
    { key: 'jmp', label: t.jmpExercises, cls: 'jmp' },
    { key: 'bit', label: t.bitExercises, cls: 'bit' },
  ]

  let grandTotal = 0
  const grandMax = LEVEL_MAX[level]
  const disqNames: string[] = []

  const isLast   = competitorIndex >= totalCompetitors - 1
  const position = competitorIndex + 1

  return (
    <div className="sheet-screen">
      <div className="sheet-header">
        <div className="sheet-header-left">
          <h2>{t.scoreSheetTitle} <span>Sheet</span></h2>
          <div className="competitor-counter">
            {t.competitorCounter(position, totalCompetitors)}
          </div>
        </div>
        <div className="sheet-header-actions">
          <button className="sheet-back-btn" onClick={() => window.print()}>{t.printBtn}</button>
          <button className="sheet-back-btn" onClick={onBack}>{t.backToJudgingBtn}</button>
        </div>
      </div>

      <TrialHeader details={details} level={level} participant={participant} />

      <div className="sheet-meta">
        <div className="meta-item">
          <div className="mi-label">{t.startNumMeta}</div>
          <div className="mi-val">#{startNumber}</div>
        </div>
        <div className="meta-item">
          <div className="mi-label">{t.handlerMeta}</div>
          <div className="mi-val">{handlerName}</div>
        </div>
        <div className="meta-item">
          <div className="mi-label">{t.dogMeta}</div>
          <div className="mi-val">{dogName}</div>
        </div>
        <div className="meta-item">
          <div className="mi-label">{t.levelMeta}</div>
          <div className="mi-val">{t.levelShort(['I','II','III'][level-1])}</div>
        </div>
      </div>

      <div className="sheet-body">
        {DISCS.map(disc => {
          const exList = exercises.filter(e => e.discipline === disc.key)
          let discTotal = 0
          let discMax   = 0

          return (
            <div className="sheet-section" key={disc.key}>
              <div className={`sheet-section-title ${disc.cls}`}>{disc.label}</div>

              {exList.map(ex => {
                const mp    = getExerciseMax(ex)
                const state = getExerciseState(ex.id)
                const score = Math.max(0, mp - state.deductions)
                const exName = t.exNames[ex.id] || ex.name

                if (mp === 0) {
                  const notPerformed = !!ex.jumpOptions && state.jumpMax === null
                  return (
                    <div className="sheet-row" key={ex.id}>
                      <div className="sr-name">{exName}</div>
                      <div className="sr-deduct">—</div>
                      <div className="sr-score na">{notPerformed ? t.notPerformedLabel : t.naLabel}</div>
                    </div>
                  )
                }

                discTotal  += score
                discMax    += mp
                grandTotal += score
                if (state.disqualified) disqNames.push(exName)

                return (
                  <div key={ex.id}>
                    <div className="sheet-row">
                      <div className="sr-name">{exName}</div>
                      <div className="sr-deduct">-{state.deductions}</div>
                      <div className={`sr-score${score === 0 ? ' zero' : ''}`}>{score}</div>
                    </div>
                    {state.log.length > 0 && (
                      <div className="sheet-log-row">
                        {state.log.map((entry, i) => (
                          <div key={i} className="sheet-log-item">
                            {entry.isGA
                              ? `${entry.label} — ${entry.desc}`
                              : `${entry.pts} — ${entry.desc}`
                            }
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}

              <div className="sheet-subtotal">
                <div className="st-label">{t.subtotalLabel(disc.label.split(' ')[0])}</div>
                <div className="st-val">{discTotal} / {discMax}</div>
              </div>
            </div>
          )
        })}

        <GrandTotal level={level} total={grandTotal} max={grandMax} disqNames={disqNames} />

        <button className="next-competitor-btn" onClick={onNext}>
          {isLast ? t.finishTrialBtn : t.nextCompetitorBtn(position + 1, totalCompetitors)}
        </button>
      </div>
    </div>
  )
}

function GrandTotal({ level, total, max, disqNames }: {
  level: Level; total: number; max: number; disqNames: string[]
}) {
  const { t } = useLang()
  const { key, cls } = qualify(level, total)
  const label = t.qual[key]

  return (
    <div className="grand-total-card">
      <div className="gt-left">
        <h3>{t.finalResult}</h3>
        <div className={`qualifier ${cls}`}>{label}</div>
        {disqNames.length > 0 && (
          <div className="disq-badge">{t.dqLabel} {disqNames.join(', ')}</div>
        )}
      </div>
      <div className="gt-score">
        <div className="gt-num">{total}</div>
        <div className="gt-max">{t.outOfPts(max)}</div>
      </div>
    </div>
  )
}
