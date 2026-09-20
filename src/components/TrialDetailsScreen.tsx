import { useState } from 'react'
import type { Level } from '../types'
import { DECOY_SLOTS, type DecoyEntry, type TrialDetails } from '../data/session'
import { useLang } from '../i18n/LangContext'
import SignaturePad from './SignaturePad'

interface Props {
  details: TrialDetails
  onDetailsChange: (d: TrialDetails) => void
  onNext: (level: Level) => void
  onBack: () => void
  /** Level picked earlier in this trial, so coming back does not lose it */
  initialLevel?: Level | null
}

/**
 * Everything that is the same for every dog on the day: the level, the
 * paperwork line of the scoresheet, and the decoys with their signatures.
 */
export default function TrialDetailsScreen({ details, onDetailsChange, onNext, onBack, initialLevel }: Props) {
  const { t } = useLang()
  const [level, setLevel] = useState<Level | null>(initialLevel ?? null)
  const [error, setError] = useState('')

  const set = (k: keyof TrialDetails) => (v: string) => onDetailsChange({ ...details, [k]: v })

  const decoys: DecoyEntry[] = Array.from({ length: DECOY_SLOTS }, (_, i) => details.decoyList?.[i] ?? { name: '' })
  function setDecoy(i: number, patch: Partial<DecoyEntry>) {
    const list = decoys.map((d, j) => (j === i ? { ...d, ...patch } : d))
    onDetailsChange({ ...details, decoyList: list })
  }

  function next() {
    if (!level) { setError(t.alertSelectLevel); return }
    onNext(level)
  }

  return (
    <div className="participants-screen trial-screen">
      <div className="participants-header">
        <button className="part-back-btn" onClick={onBack}>{t.back}</button>
        <div className="participants-title">
          <h1>Mondioring <span>ScoreRing</span></h1>
          <p>{t.trialScreenTitle}</p>
        </div>
      </div>

      <p className="order-hint">{t.trialScreenHint}</p>

      <div className="trial-card">
        <div className="field-group">
          <label>{t.competitionLevel}</label>
          <div className="level-picker">
            {([1, 2, 3] as Level[]).map(l => (
              <button
                key={l}
                className={`level-btn${level === l ? ' selected' : ''}`}
                onClick={() => { setLevel(l); setError('') }}
              >
                {['I', 'II', 'III'][l - 1]}
              </button>
            ))}
          </div>
        </div>

        <div className="details-grid">
          {([
            ['date', t.detailDate, 'date'],
            ['organization', t.detailOrganization, 'text'],
            ['location', t.detailLocation, 'text'],
            ['club', t.detailClub, 'text'],
            ['judge', t.detailJudge, 'text'],
          ] as const).map(([key, label, type]) => (
            <div className="field-group" key={key}>
              <label htmlFor={`d-${key}`}>{label}</label>
              <input id={`d-${key}`} type={type} value={details[key] ?? ''} onChange={e => set(key)(e.target.value)} />
            </div>
          ))}
          <SignaturePad
            label={t.sigJudge}
            value={details.judgeSignature}
            onChange={v => onDetailsChange({ ...details, judgeSignature: v })}
          />
        </div>
      </div>

      <div className="trial-card">
        <h2 className="trial-card-title">{t.detailDecoys}</h2>
        {decoys.map((d, i) => (
          <div className="decoy-row" key={i}>
            <div className="field-group decoy-name">
              <label htmlFor={`decoy-${i}`}>{t.decoyLabel(i + 1)}</label>
              <input
                id={`decoy-${i}`}
                type="text"
                autoComplete="off"
                autoCapitalize="words"
                value={d.name}
                onChange={e => setDecoy(i, { name: e.target.value })}
              />
            </div>
            <div className="decoy-sig">
              <SignaturePad
                label={t.decoySigLabel}
                value={d.signature}
                onChange={v => setDecoy(i, { signature: v })}
              />
            </div>
          </div>
        ))}
      </div>

      {error && <div className="add-error order-error" role="alert">{error}</div>}

      <div className="participants-footer">
        <button className="start-trial-btn" onClick={next}>{t.toParticipantsBtn}</button>
      </div>
    </div>
  )
}
