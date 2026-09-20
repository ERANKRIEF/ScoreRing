import type { Level, CompletedResult } from '../types'
import type { TrialDetails } from '../data/session'
import { qualify } from '../data/qualify'
import { useLang } from '../i18n/LangContext'
import TrialHeader from './TrialHeader'

interface Props {
  level: Level
  details: TrialDetails
  completed: CompletedResult[]
  onRestart: () => void
  onReport: () => void
}

export default function ResultsSummary({ level, details, completed, onRestart, onReport }: Props) {
  const { t } = useLang()
  // A dog that did not run is listed but not placed
  const ran = completed.filter(r => (r.status ?? 'scored') === 'scored')
  const notRanked = completed.filter(r => (r.status ?? 'scored') !== 'scored')
  const ranked = [...ran].sort((a, b) => b.total - a.total)
  const levelLabel = ['I', 'II', 'III'][level - 1]

  return (
    <div className="results-screen">
      <div className="results-header">
        <div>
          <h2>{t.trialResults} <span>{t.trialResultsSpan}</span></h2>
          <p className="results-subtitle">{t.resultsSubtitle(levelLabel, completed.length)}</p>
        </div>
        <div className="sheet-header-actions">
          <button className="new-trial-btn" onClick={onReport}>{t.reportAllBtn}</button>
          <button className="new-trial-btn" onClick={() => window.print()}>{t.printBtn}</button>
          <button className="new-trial-btn" onClick={onRestart}>{t.newTrialBtn}</button>
        </div>
      </div>

      <TrialHeader details={details} level={level} />

      <div className="results-body">
        <div className="results-table-header">
          <span className="rt-rank">{t.rankCol}</span>
          <span className="rt-start">#</span>
          <span className="rt-name">{t.handlerDogColResults}</span>
          <span className="rt-qual">{t.resultCol}</span>
          <span className="rt-score">{t.scoreCol}</span>
        </div>

        {[...ranked, ...notRanked].map((r, idx) => {
          const out = (r.status ?? 'scored') !== 'scored'
          const { key, cls } = qualify(level, r.total)
          const label = out ? t.statusLabel[r.status!] : t.qual[key]
          const isFirst  = idx === 0 && !out
          const rankIcon = out ? '—' : idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `${idx + 1}.`

          return (
            <div
              key={r.participant.id}
              className={`results-row${isFirst ? ' results-row--first' : ''}${out ? ' results-row--out' : ''}${idx % 2 === 0 ? '' : ' results-row--alt'}`}
            >
              <span className="rt-rank">{rankIcon}</span>
              <span className="rt-start">#{r.participant.startNumber}</span>
              <div className="rt-name">
                <span className="rt-handler">{r.participant.handlerName}</span>
                <span className="rt-dog">{r.participant.dogName}</span>
              </div>
              <span className={`rt-qual qualifier ${out ? 'insufficient' : cls}`}>{label}</span>
              <span className="rt-score-val">
                {out && r.status === 'absent' ? '—' : r.total}
                {!(out && r.status === 'absent') && <span className="rt-max">/{r.max}</span>}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
