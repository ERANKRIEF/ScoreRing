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
}

export default function ResultsSummary({ level, details, completed, onRestart }: Props) {
  const { t } = useLang()
  const ranked = [...completed].sort((a, b) => b.total - a.total)
  const levelLabel = ['I', 'II', 'III'][level - 1]

  return (
    <div className="results-screen">
      <div className="results-header">
        <div>
          <h2>{t.trialResults} <span>{t.trialResultsSpan}</span></h2>
          <p className="results-subtitle">{t.resultsSubtitle(levelLabel, completed.length)}</p>
        </div>
        <div className="sheet-header-actions">
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

        {ranked.map((r, idx) => {
          const { key, cls } = qualify(level, r.total)
          const label = t.qual[key]
          const isFirst  = idx === 0
          const rankIcon = idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `${idx + 1}.`

          return (
            <div
              key={r.participant.id}
              className={`results-row${isFirst ? ' results-row--first' : ''}${idx % 2 === 0 ? '' : ' results-row--alt'}`}
            >
              <span className="rt-rank">{rankIcon}</span>
              <span className="rt-start">#{r.participant.startNumber}</span>
              <div className="rt-name">
                <span className="rt-handler">{r.participant.handlerName}</span>
                <span className="rt-dog">{r.participant.dogName}</span>
              </div>
              <span className={`rt-qual qualifier ${cls}`}>{label}</span>
              <span className="rt-score-val">{r.total}<span className="rt-max">/{r.max}</span></span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
