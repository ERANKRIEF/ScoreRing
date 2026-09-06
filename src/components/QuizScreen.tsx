import { useEffect, useMemo, useRef, useState } from 'react'
import type { Level } from '../types'
import { getExercises, LEVEL_MAX } from '../data/exercises'
import {
  buildPool, buildRound, makeQuestion, recordAnswer,
  loadStats, saveStats, masteredCount,
  ROUND_SIZE, QUESTION_SECONDS,
  type Answer, type PoolEntry, type Question, type QuizStats,
} from '../data/quiz'
import { useLang } from '../i18n/LangContext'

interface Props {
  level: Level
  onBack: () => void
}

type Phase = 'start' | 'playing' | 'done'

interface Given { entry: PoolEntry; correct: boolean }

export default function QuizScreen({ level, onBack }: Props) {
  const { t, td } = useLang()
  const levelLabel = ['I', 'II', 'III'][level - 1]

  const pool = useMemo(() => buildPool(level), [level])
  const exercises = useMemo(() => getExercises(level), [level])

  const [stats, setStats] = useState<QuizStats>(() => loadStats(level))
  const [timed, setTimed] = useState(false)
  const [phase, setPhase] = useState<Phase>('start')
  const [questions, setQuestions] = useState<Question[]>([])
  const [idx, setIdx] = useState(0)
  const [picked, setPicked] = useState<Answer | string | null>(null)
  const [given, setGiven] = useState<Given[]>([])
  const [left, setLeft] = useState(QUESTION_SECONDS)
  const startedAt = useRef(0)
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => { setStats(loadStats(level)); setPhase('start') }, [level])

  const q = questions[idx]
  const answered = picked !== null

  // Countdown only while a timed question is unanswered
  useEffect(() => {
    if (phase !== 'playing' || !timed || answered) return
    setLeft(QUESTION_SECONDS)
    const started = Date.now()
    const id = setInterval(() => {
      const remaining = QUESTION_SECONDS - Math.floor((Date.now() - started) / 1000)
      if (remaining <= 0) { setLeft(0); answer(null) } else setLeft(remaining)
    }, 250)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, timed, idx, answered])

  const exName = (id: string) => {
    const ex = exercises.find(e => e.id === id)
    return t.exNames[id] || ex?.name || id
  }
  const penText = (exId: string, penId: string) => {
    const pen = exercises.find(e => e.id === exId)?.penalties.find(p => p.id === penId)
    return (pen && (td(pen.id, level) || pen.desc)) || penId
  }
  const answerText = (a: Answer) => (a === 'ALL' ? t.quizAllAnswer : t.quizPts(a))

  function start() {
    const round = buildRound(pool, stats)
    setQuestions(round.map(e => makeQuestion(e, pool)))
    setIdx(0)
    setPicked(null)
    setGiven([])
    setElapsed(0)
    startedAt.current = Date.now()
    setPhase('playing')
  }

  /** null means the clock ran out, which counts as a wrong answer */
  function answer(choice: Answer | string | null) {
    if (picked !== null || !q) return
    const correct = choice !== null && isCorrect(q, choice)
    setPicked(choice ?? '—')
    setGiven(g => [...g, { entry: q.entry, correct }])
    setStats(prev => {
      const next = recordAnswer(prev, q.entry.key, correct)
      saveStats(level, next)
      return next
    })
  }

  function next() {
    if (idx + 1 >= questions.length) {
      setElapsed(Math.round((Date.now() - startedAt.current) / 1000))
      setPhase('done')
      return
    }
    setIdx(i => i + 1)
    setPicked(null)
  }

  function isCorrect(question: Question, choice: Answer | string) {
    return question.entry.kind === 'ptsEx'
      ? choice === question.entry.exId
      : choice === question.entry.value
  }

  function promptOf(entry: PoolEntry) {
    switch (entry.kind) {
      case 'exPts': return t.quizAskExPts(exName(entry.exId), levelLabel)
      case 'ptsEx': return t.quizAskPtsEx(entry.value as number, levelLabel)
      case 'jump':  return t.quizAskJump(exName(entry.exId), entry.heightLabel!, levelLabel)
      case 'pen':   return t.quizAskPen(exName(entry.exId), penText(entry.exId, entry.penId!))
    }
  }

  const correctCount = given.filter(g => g.correct).length
  const mastered = masteredCount(pool, stats)

  // ── Start ────────────────────────────────────────────────
  if (phase === 'start') {
    const byDisc = ['ob', 'jmp', 'bit'] as const
    return (
      <div className="quiz-screen">
        <div className="topbar">
          <div className="topbar-left">
            <button className="part-back-btn" onClick={onBack}>{t.back}</button>
          </div>
          <div className="quiz-badge">{t.quizTitle} · {t.levelShort(levelLabel)}</div>
          <div className="topbar-score" />
        </div>

        <div className="quiz-start">
          <p className="practice-intro">{t.quizIntro(ROUND_SIZE)}</p>

          <div className="quiz-mode">
            <div className="jump-options-label">{t.quizModeLabel}</div>
            <div className="jump-chips">
              <button className={`jump-chip${timed ? '' : ' active'}`} onClick={() => setTimed(false)}>
                {t.quizUntimed}
              </button>
              <button className={`jump-chip${timed ? ' active' : ''}`} onClick={() => setTimed(true)}>
                {t.quizTimed(QUESTION_SECONDS)}
              </button>
            </div>
            <div className="quiz-mode-hint">{timed ? t.quizTimedHint : t.quizUntimedHint}</div>
          </div>

          <button className="start-btn" onClick={start}>{t.quizStartBtn}</button>

          <div className="quiz-progress-note">{t.quizMastered(mastered, pool.length)}</div>

          <div className="score-map">
            <div className="jump-options-label">{t.quizMapTitle(levelLabel, LEVEL_MAX[level])}</div>
            {byDisc.map(d => {
              const list = exercises.filter(e => e.discipline === d && e.maxPts[level] > 0)
              if (!list.length) return null
              const sum = list.reduce((s, e) => s + e.maxPts[level], 0)
              return (
                <div key={d} className="score-map-group">
                  <div className={`score-map-head ${d}`}>
                    <span>{t.disc[d]}</span>
                    <span>{sum} / {LEVEL_MAX[level]}</span>
                  </div>
                  {list.map(e => (
                    <div key={e.id} className="score-map-row">
                      <span className="smr-name">{exName(e.id)}</span>
                      <span className="smr-bar">
                        <i className={`smr-fill ${d}`} style={{ width: `${(e.maxPts[level] / 50) * 100}%` }} />
                      </span>
                      <span className="smr-pts">{e.maxPts[level]}</span>
                    </div>
                  ))}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  // ── Round summary ────────────────────────────────────────
  if (phase === 'done') {
    const missed = given.filter(g => !g.correct)
    return (
      <div className="quiz-screen">
        <div className="topbar">
          <div className="topbar-left">
            <button className="part-back-btn" onClick={() => setPhase('start')}>{t.back}</button>
          </div>
          <div className="quiz-badge">{t.quizTitle} · {t.levelShort(levelLabel)}</div>
          <div className="topbar-score" />
        </div>

        <div className="quiz-result">
          <div className="quiz-result-score">{correctCount}<span>/{questions.length}</span></div>
          {timed && <div className="quiz-result-time">{t.quizTime(elapsed)}</div>}

          {missed.length === 0 ? (
            <div className="quiz-perfect">{t.quizPerfect}</div>
          ) : (
            <div className="quiz-missed">
              <div className="jump-options-label">{t.quizMissedTitle(missed.length)}</div>
              {missed.map(({ entry }) => (
                <div key={entry.key} className="quiz-missed-row">
                  <span className="qm-q">{promptOf(entry)}</span>
                  <span className="qm-a">
                    {entry.kind === 'ptsEx' ? exName(entry.exId) : answerText(entry.value)}
                  </span>
                </div>
              ))}
            </div>
          )}

          <div className="quiz-result-actions">
            <button className="start-btn" onClick={start}>{t.quizAgainBtn}</button>
            <button className="part-back-btn" onClick={() => setPhase('start')}>{t.quizBackToStart}</button>
          </div>
        </div>
      </div>
    )
  }

  // ── Question ─────────────────────────────────────────────
  if (!q) return null
  const correctAnswer = q.entry.kind === 'ptsEx' ? q.entry.exId : q.entry.value
  const options: (Answer | string)[] = q.entry.kind === 'ptsEx' ? q.exOptions! : q.options

  return (
    <div className="quiz-screen">
      <div className="topbar">
        <div className="topbar-left">
          <button className="part-back-btn" onClick={() => setPhase('start')}>{t.back}</button>
        </div>
        <div className="quiz-badge">{idx + 1} / {questions.length}</div>
        <div className="topbar-score">
          <div className="total-score-display">
            <div className="score-num">{correctCount}</div>
            <div className="score-max">{t.quizCorrectLabel}</div>
          </div>
        </div>
      </div>

      {timed && (
        <div className="quiz-timer">
          <i style={{ width: `${(left / QUESTION_SECONDS) * 100}%` }} className={left <= 5 ? 'low' : ''} />
        </div>
      )}

      <div className="quiz-question">{promptOf(q.entry)}</div>
      {q.entry.perUnit && (
        <div className="quiz-question-note">
          {t.perUnitLabel(t.units[q.entry.perUnit] || q.entry.perUnit)}
        </div>
      )}

      <div className="quiz-options">
        {options.map(opt => {
          const isRight = opt === correctAnswer
          const chosen = picked === opt
          const cls = !answered ? '' : isRight ? ' right' : chosen ? ' wrong' : ' dim'
          return (
            <button
              key={String(opt)}
              className={`quiz-option${cls}`}
              disabled={answered}
              onClick={() => answer(opt)}
            >
              {q.entry.kind === 'ptsEx' ? exName(opt as string) : answerText(opt as Answer)}
            </button>
          )
        })}
      </div>

      {answered && (
        <div className="quiz-feedback">
          <div className={given[given.length - 1]?.correct ? 'qf-good' : 'qf-bad'}>
            {picked === '—'
              ? t.quizTimeUp
              : given[given.length - 1]?.correct ? t.quizRight : t.quizWrong}
          </div>
          {!given[given.length - 1]?.correct && (
            <div className="qf-answer">
              {t.quizCorrectIs(
                q.entry.kind === 'ptsEx' ? exName(q.entry.exId) : answerText(q.entry.value),
              )}
            </div>
          )}
          <button className="start-btn" onClick={next}>
            {idx + 1 >= questions.length ? t.quizFinishBtn : t.nextBtn}
          </button>
        </div>
      )}
    </div>
  )
}
