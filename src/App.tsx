import { useEffect, useState } from 'react'
import type { Level, Participant, CompletedResult, ResultStatus } from './types'
import { useScoring } from './hooks/useScoring'
import { JUMP_RULE } from './data/exercises'
import { loadTrial, saveTrial, clearTrial, type TrialDetails } from './data/session'
import { LangProvider } from './i18n/LangContext'
import SetupScreen       from './components/SetupScreen'
import ParticipantsScreen from './components/ParticipantsScreen'
import ExerciseOrderScreen, { JUMP_SLOT } from './components/ExerciseOrderScreen'
import PracticeScreen from './components/PracticeScreen'
import QuizScreen from './components/QuizScreen'
import JudgeScreen       from './components/JudgeScreen'
import ScoreSheet        from './components/ScoreSheet'
import ResultsSummary    from './components/ResultsSummary'

type Screen = 'setup' | 'participants' | 'order' | 'practice' | 'quiz' | 'judge' | 'sheet' | 'results'

const SCORED: Screen[] = ['judge', 'sheet', 'results']

function AppInner() {
  const [screen, setScreen]         = useState<Screen>('setup')
  const [level, setLevel]           = useState<Level | null>(null)
  const [details, setDetails]       = useState<TrialDetails>({})
  const [participants, setParticipants] = useState<Participant[]>([])
  const [exerciseOrder, setExerciseOrder] = useState<string[]>([])
  const [currentIdx, setCurrentIdx] = useState(0)
  const [completed, setCompleted]   = useState<CompletedResult[]>([])
  const [jumpChoice, setJumpChoice] = useState('')
  const [resumable, setResumable]   = useState(() => loadTrial())

  const scoring = useScoring()

  // A trial in progress is written after every change, so a reload, a locked
  // phone or a service-worker update cannot lose a morning of judging.
  useEffect(() => {
    if (!SCORED.includes(screen) || !level) return
    saveTrial({
      v: 1,
      savedAt: Date.now(),
      screen: screen as 'judge' | 'sheet' | 'results',
      level,
      details,
      participants,
      order: exerciseOrder,
      currentIdx,
      completed,
      jumpChoice,
      scores: scoring.scores,
    })
  }, [screen, level, details, participants, exerciseOrder, currentIdx, completed, jumpChoice, scoring.scores])

  function resume() {
    const save = resumable
    if (!save) return
    setLevel(save.level)
    setDetails(save.details ?? {})
    setParticipants(save.participants)
    setExerciseOrder(save.order)
    setCurrentIdx(save.currentIdx)
    setCompleted(save.completed)
    const choice = save.jumpChoice || defaultJump(save.level)
    setJumpChoice(choice)
    scoring.restoreSession(save.level, runOrder(save.order, choice), save.scores)
    setResumable(null)
    setScreen(save.screen)
  }

  function discardSaved() {
    clearTrial()
    setResumable(null)
  }

  /** Each handler picks their own apparatus, so the slot is filled per competitor */
  function defaultJump(lvl: Level) { return JUMP_RULE[lvl].choose[0] ?? '' }
  function runOrder(order: string[], choice: string) {
    return order.flatMap(id => (id === JUMP_SLOT ? (choice ? [choice] : []) : [id]))
  }

  function changeJump(choice: string) {
    const order = runOrder(exerciseOrder, choice)
    setJumpChoice(choice)
    // Stay on the jump the judge is standing at, not back at the first exercise
    scoring.restoreSession(level!, order, scoring.scores, order.indexOf(choice))
  }

  // ── Setup → Participants ──────────────────────────────────
  function handleLevelSelected(lvl: Level) {
    setLevel(lvl)
    setScreen('participants')
  }

  // ── Participants → Exercise order ─────────────────────────
  function handleParticipantsDone(list: Participant[]) {
    setParticipants(list)
    setScreen('order')
  }

  // ── Exercise order → Judge (first competitor) ─────────────
  function handleOrderConfirmed(order: string[]) {
    const choice = defaultJump(level!)
    setExerciseOrder(order)
    setJumpChoice(choice)
    setCurrentIdx(0)
    setCompleted([])
    scoring.startSession(level!, runOrder(order, choice))
    setScreen('judge')
  }

  function handleShowSheet() { setScreen('sheet') }
  function handleBackToJudge() { setScreen('judge') }

  // ── Sheet → Next competitor (or results) ──────────────────
  function handleNextCompetitor(status: ResultStatus = 'scored') {
    const current = participants[currentIdx]
    const { total, max } = scoring.getTotals()
    const snapshot: CompletedResult = {
      participant: current,
      scores: { ...scoring.scores },
      // A dog that never ran has no score to report
      total: status === 'absent' ? 0 : total,
      max,
      status,
    }
    setCompleted(prev => {
      const existing = prev.findIndex(r => r.participant.id === current.id)
      if (existing >= 0) {
        const updated = [...prev]
        updated[existing] = snapshot
        return updated
      }
      return [...prev, snapshot]
    })

    const nextIdx = currentIdx + 1
    if (nextIdx >= participants.length) {
      setScreen('results')
    } else {
      const choice = defaultJump(level!)
      setCurrentIdx(nextIdx)
      setJumpChoice(choice)
      scoring.startSession(level!, runOrder(exerciseOrder, choice))
      setScreen('judge')
    }
  }

  // ── Results → restart ─────────────────────────────────────
  function handleRestart() {
    clearTrial()
    setScreen('setup')
    setLevel(null)
    setDetails({})
    setParticipants([])
    setExerciseOrder([])
    setCurrentIdx(0)
    setCompleted([])
  }

  // ── Render ────────────────────────────────────────────────
  if (screen === 'setup') {
    return (
      <SetupScreen
        details={details}
        onDetailsChange={setDetails}
        resumable={resumable}
        onResume={resume}
        onDiscardSaved={discardSaved}
        onNext={handleLevelSelected}
        onPractice={lvl => { setLevel(lvl); setScreen('practice') }}
        onQuiz={lvl => { setLevel(lvl); setScreen('quiz') }}
      />
    )
  }

  if (screen === 'practice') {
    return <PracticeScreen level={level!} onBack={handleRestart} />
  }

  if (screen === 'quiz') {
    return <QuizScreen level={level!} onBack={handleRestart} />
  }

  if (screen === 'participants') {
    return (
      <ParticipantsScreen
        level={level!}
        initial={participants}
        onStart={handleParticipantsDone}
        onBack={() => setScreen('setup')}
      />
    )
  }

  if (screen === 'order') {
    return (
      <ExerciseOrderScreen
        level={level!}
        onConfirm={handleOrderConfirmed}
        onBack={() => setScreen('participants')}
      />
    )
  }

  if (screen === 'results') {
    return (
      <ResultsSummary
        level={level!}
        details={details}
        completed={completed}
        onRestart={handleRestart}
      />
    )
  }

  if (!scoring.level) return null

  const currentParticipant = participants[currentIdx]

  if (screen === 'sheet') {
    return (
      <ScoreSheet
        {...scoring}
        level={scoring.level}
        details={details}
        participant={currentParticipant}
        competitorIndex={currentIdx}
        totalCompetitors={participants.length}
        onBack={handleBackToJudge}
        onNext={() => handleNextCompetitor('scored')}
      />
    )
  }

  return (
    <JudgeScreen
      {...scoring}
      level={scoring.level}
      handlerName={currentParticipant.handlerName}
      dogName={currentParticipant.dogName}
      startNumber={currentParticipant.startNumber}
      competitorIndex={currentIdx}
      totalCompetitors={participants.length}
      onShowSheet={handleShowSheet}
      onMarkStatus={status => handleNextCompetitor(status)}
      jumpAlternatives={JUMP_RULE[scoring.level].choose}
      jumpChoice={jumpChoice}
      onJumpChoice={changeJump}
    />
  )
}

export default function App() {
  return (
    <LangProvider>
      <AppInner />
    </LangProvider>
  )
}
