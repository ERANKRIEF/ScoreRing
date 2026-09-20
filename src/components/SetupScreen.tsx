import { useState } from 'react'
import type { Level } from '../types'
import type { TrialSave } from '../data/session'
import { useLang } from '../i18n/LangContext'
import type { Lang } from '../i18n/translations'

interface Props {
  resumable: TrialSave | null
  onResume: () => void
  onDiscardSaved: () => void
  onStart: () => void
  onPractice: (level: Level) => void
  onQuiz: (level: Level) => void
}

const LANG_OPTS: { key: Lang; flag: string; label: string }[] = [
  { key: 'en', flag: '🇬🇧', label: 'EN' },
  { key: 'fr', flag: '🇫🇷', label: 'FR' },
  { key: 'he', flag: '🇮🇱', label: 'עב' },
]

/** The home screen: one way into judging, one card for training, nothing to scroll */
export default function SetupScreen(props: Props) {
  const { resumable, onResume, onDiscardSaved, onStart, onPractice, onQuiz } = props
  const { t, lang, setLang } = useLang()
  const [trainLevel, setTrainLevel] = useState<Level | null>(null)
  const [confirmDiscard, setConfirmDiscard] = useState(false)

  function withLevel(run: (l: Level) => void) {
    if (!trainLevel) { alert(t.alertSelectLevel); return }
    run(trainLevel)
  }

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
        <h1>Mondioring <span>ScoreRing</span></h1>
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
            <button className="part-back-btn" onClick={() => setConfirmDiscard(true)}>{t.resumeDiscardBtn}</button>
          </div>
        </div>
      )}

      <button className="start-btn start-judging-btn" onClick={onStart}>
        {t.startJudgingBtn}
        <span>{t.startJudgingHint}</span>
      </button>

      <div className="setup-card training-card">
        <h2>{t.trainingTitle}</h2>
        <div className="field-group">
          <label>{t.trainingLevelLabel}</label>
          <div className="level-picker">
            {([1, 2, 3] as Level[]).map(l => (
              <button
                key={l}
                className={`level-btn${trainLevel === l ? ' selected' : ''}`}
                onClick={() => setTrainLevel(l)}
              >
                {['I', 'II', 'III'][l - 1]}
              </button>
            ))}
          </div>
        </div>

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

      {confirmDiscard && (
        <div className="modal-overlay open" onClick={() => setConfirmDiscard(false)}>
          <div className="modal-sheet" onClick={e => e.stopPropagation()}>
            <div className="modal-title">{t.discardConfirmTitle}</div>
            <div className="modal-desc">{t.discardConfirmBody}</div>
            <div className="confirm-actions">
              <button className="modal-cancel-btn" onClick={() => setConfirmDiscard(false)}>{t.confirmCancel}</button>
              <button className="modal-apply-btn disq" onClick={() => { setConfirmDiscard(false); onDiscardSaved() }}>
                {t.discardConfirmOk}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
