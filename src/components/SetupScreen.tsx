import { useState } from 'react'
import type { Level } from '../types'
import type { TrialDetails, TrialSave } from '../data/session'
import { useLang } from '../i18n/LangContext'
import type { Lang } from '../i18n/translations'

interface Props {
  details: TrialDetails
  onDetailsChange: (d: TrialDetails) => void
  resumable: TrialSave | null
  onResume: () => void
  onDiscardSaved: () => void
  onNext: (level: Level) => void
  onPractice: (level: Level) => void
  onQuiz: (level: Level) => void
}

const LANG_OPTS: { key: Lang; flag: string; label: string }[] = [
  { key: 'en', flag: '🇬🇧', label: 'EN' },
  { key: 'fr', flag: '🇫🇷', label: 'FR' },
  { key: 'he', flag: '🇮🇱', label: 'עב' },
]

export default function SetupScreen(props: Props) {
  const { details, onDetailsChange, resumable, onResume, onDiscardSaved, onNext, onPractice, onQuiz } = props
  const { t, lang, setLang } = useLang()
  const [level, setLevel] = useState<Level | null>(null)
  const [showDetails, setShowDetails] = useState(false)

  function withLevel(run: (l: Level) => void) {
    if (!level) { alert(t.alertSelectLevel); return }
    run(level)
  }

  const set = (k: keyof TrialDetails) => (v: string) => onDetailsChange({ ...details, [k]: v })

  return (
    <div className="setup-screen">
      <div className="lang-picker">
        {LANG_OPTS.map(opt => (
          <button
            key={opt.key}
            className={`lang-btn${lang === opt.key ? ' active' : ''}`}
            onClick={() => setLang(opt.key)}
            aria-label={opt.key}
          >
            <span className="lang-flag">{opt.flag}</span>
            <span className="lang-code">{opt.label}</span>
          </button>
        ))}
      </div>

      <div className="setup-logo">
        <h1>FCI <span>Mondioring</span></h1>
        <p>{t.appTagline}</p>
      </div>

      {resumable && (
        <div className="resume-card">
          <div className="resume-text">
            <strong>{t.resumeTitle}</strong>
            <span>{t.resumeDetail(
              ['I', 'II', 'III'][resumable.level - 1],
              resumable.participants.length,
              new Date(resumable.savedAt).toLocaleString(),
            )}</span>
          </div>
          <div className="resume-actions">
            <button className="start-btn" onClick={onResume}>{t.resumeBtn}</button>
            <button className="part-back-btn" onClick={onDiscardSaved}>{t.resumeDiscardBtn}</button>
          </div>
        </div>
      )}

      <div className="setup-card">
        <h2>{t.newTrial}</h2>

        <div className="field-group">
          <label>{t.competitionLevel}</label>
          <div className="level-picker">
            {([1, 2, 3] as Level[]).map(l => (
              <button
                key={l}
                className={`level-btn${level === l ? ' selected' : ''}`}
                onClick={() => setLevel(l)}
              >
                {['I', 'II', 'III'][l - 1]}
              </button>
            ))}
          </div>
        </div>

        <button
          className="details-toggle"
          onClick={() => setShowDetails(v => !v)}
          aria-expanded={showDetails}
        >
          {showDetails ? '▾' : '▸'} {t.trialDetailsTitle}
        </button>

        {showDetails && (
          <div className="details-grid">
            {([
              ['date', t.detailDate, 'date'],
              ['location', t.detailLocation, 'text'],
              ['club', t.detailClub, 'text'],
              ['judge', t.detailJudge, 'text'],
              ['decoys', t.detailDecoys, 'text'],
            ] as const).map(([key, label, type]) => (
              <div className="field-group" key={key}>
                <label htmlFor={`d-${key}`}>{label}</label>
                <input
                  id={`d-${key}`}
                  type={type}
                  value={details[key] ?? ''}
                  onChange={e => set(key)(e.target.value)}
                />
              </div>
            ))}
          </div>
        )}

        <button className="start-btn" onClick={() => withLevel(onNext)}>
          {t.addParticipantsBtn}
        </button>

        <button className="practice-btn" onClick={() => withLevel(onPractice)}>
          {t.practiceBtn}
          <span>{t.practiceBtnHint}</span>
        </button>

        <button className="practice-btn quiz-entry-btn" onClick={() => withLevel(onQuiz)}>
          {t.quizBtn}
          <span>{t.quizBtnHint}</span>
        </button>
      </div>

      <div className="app-version">v{__APP_VERSION__}</div>
    </div>
  )
}
