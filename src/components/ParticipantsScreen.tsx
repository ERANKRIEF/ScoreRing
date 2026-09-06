import { useState } from 'react'
import type { Level, Participant } from '../types'
import { useLang } from '../i18n/LangContext'

interface Props {
  level: Level
  initial?: Participant[]
  onStart: (participants: Participant[]) => void
  onBack: () => void
}

/** Paperwork from the official sheet — offered, never required */
const EXTRA_FIELDS = ['breed', 'birthDate', 'chip', 'pedigree', 'scorebook', 'catalog'] as const
type ExtraKey = typeof EXTRA_FIELDS[number]
const emptyExtras = () => Object.fromEntries(EXTRA_FIELDS.map(k => [k, ''])) as Record<ExtraKey, string>

export default function ParticipantsScreen({ level, initial, onStart, onBack }: Props) {
  const { t } = useLang()
  const [participants, setParticipants] = useState<Participant[]>(initial ?? [])
  const [startNum, setStartNum] = useState(() =>
    String((initial ?? []).reduce((m, p) => Math.max(m, p.startNumber), 0) + 1))
  const [handler, setHandler] = useState('')
  const [dog, setDog] = useState('')
  const [extras, setExtras] = useState<Record<ExtraKey, string>>(emptyExtras)
  const [showExtras, setShowExtras] = useState(false)
  const [error, setError] = useState('')

  const levelLabel = ['I', 'II', 'III'][level - 1]

  function nextStartNumber(list: Participant[]) {
    return String(list.reduce((m, p) => Math.max(m, p.startNumber), 0) + 1)
  }

  function makeId() {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
      return crypto.randomUUID()
    }
    return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`
  }

  function addParticipant() {
    const num = parseInt(startNum, 10)
    if (!startNum || isNaN(num) || num < 1) {
      setError(t.errValidStartNum)
      return
    }
    if (participants.some(p => p.startNumber === num)) {
      setError(t.errStartNumUsed(num))
      return
    }
    if (!handler.trim()) {
      setError(t.errHandlerRequired)
      return
    }
    if (!dog.trim()) {
      setError(t.errDogRequired)
      return
    }
    setError('')
    const filledExtras = Object.fromEntries(
      EXTRA_FIELDS.map(k => [k, extras[k].trim()]).filter(([, v]) => v),
    )
    const newParticipant: Participant = {
      id: makeId(),
      startNumber: num,
      handlerName: handler.trim(),
      dogName: dog.trim(),
      ...filledExtras,
    }
    const updated = [...participants, newParticipant].sort((a, b) => a.startNumber - b.startNumber)
    setParticipants(updated)
    setStartNum(nextStartNumber(updated))
    setHandler('')
    setDog('')
    setExtras(emptyExtras())
  }

  function removeParticipant(id: string) {
    setParticipants(prev => prev.filter(p => p.id !== id))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    addParticipant()
  }

  function handleStart() {
    if (participants.length === 0) {
      setError(t.errAddAtLeastOne)
      return
    }
    onStart(participants)
  }

  return (
    <div className="participants-screen">
      <div className="participants-header">
        <button className="part-back-btn" onClick={onBack}>{t.back}</button>
        <div className="participants-title">
          <h1>FCI <span>Mondioring</span></h1>
          <p>{t.levelParticipants(levelLabel)}</p>
        </div>
      </div>

      {/* ── Add form ── */}
      <form className="add-participant-card" onSubmit={handleSubmit} noValidate>
        <div className="add-participant-fields">
          <div className="field-group field-group--num">
            <label htmlFor="p-num">{t.startNumLabel}</label>
            <input
              id="p-num"
              type="number"
              inputMode="numeric"
              min="1"
              placeholder="1"
              value={startNum}
              onChange={e => setStartNum(e.target.value)}
            />
          </div>
          <div className="field-group field-group--grow">
            <label htmlFor="p-handler">{t.handlerLabel}</label>
            <input
              id="p-handler"
              type="text"
              autoComplete="off"
              autoCapitalize="words"
              enterKeyHint="next"
              placeholder={t.handlerPlaceholder}
              value={handler}
              onChange={e => setHandler(e.target.value)}
            />
          </div>
          <div className="field-group field-group--grow">
            <label htmlFor="p-dog">{t.dogLabel}</label>
            <input
              id="p-dog"
              type="text"
              autoComplete="off"
              autoCapitalize="words"
              enterKeyHint="done"
              placeholder={t.dogPlaceholder}
              value={dog}
              onChange={e => setDog(e.target.value)}
            />
          </div>
          <button type="submit" className="add-btn">{t.addBtn}</button>
        </div>

        <button
          type="button"
          className="details-toggle"
          onClick={() => setShowExtras(v => !v)}
          aria-expanded={showExtras}
        >
          {showExtras ? '▾' : '▸'} {t.extraFieldsTitle}
        </button>

        {showExtras && (
          <div className="details-grid">
            {EXTRA_FIELDS.map(k => (
              <div className="field-group" key={k}>
                <label htmlFor={`x-${k}`}>{t.extraFields[k]}</label>
                <input
                  id={`x-${k}`}
                  type={k === 'birthDate' ? 'date' : 'text'}
                  autoComplete="off"
                  value={extras[k]}
                  onChange={e => setExtras(prev => ({ ...prev, [k]: e.target.value }))}
                />
              </div>
            ))}
          </div>
        )}
        {error && <div className="add-error" role="alert">{error}</div>}
      </form>

      {/* ── List ── */}
      {participants.length === 0 ? (
        <div className="participants-empty">
          {t.noParticipantsYet}
        </div>
      ) : (
        <div className="participants-list">
          <div className="participants-list-header">
            <span>{t.startNumLabel}</span>
            <span>{t.handlerDogCol}</span>
            <span></span>
          </div>
          {participants.map((p, idx) => (
            <div key={p.id} className={`participant-row${idx % 2 === 0 ? '' : ' alt'}`}>
              <div className="pr-num">{p.startNumber}</div>
              <div className="pr-info">
                <span className="pr-handler">{p.handlerName}</span>
                <span className="pr-dog">
                  {p.dogName}
                  {p.breed ? ` · ${p.breed}` : ''}
                </span>
              </div>
              <button className="pr-delete" onClick={() => removeParticipant(p.id)}>✕</button>
            </div>
          ))}
        </div>
      )}

      {/* ── Start ── */}
      <div className="participants-footer">
        <div className="participants-count">
          {t.competitorsRegistered(participants.length)}
        </div>
        <button
          className="start-trial-btn"
          onClick={handleStart}
          disabled={participants.length === 0}
        >
          {t.beginTrial}
        </button>
      </div>
    </div>
  )
}
