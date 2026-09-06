import { useState, useCallback } from 'react'
import type { Exercise, ExerciseState, Level, LogEntry, Penalty, ScoreMap } from '../types'
import { getExercises, LEVEL_MAX } from '../data/exercises'

const EMPTY: ExerciseState = { deductions: 0, log: [], disqualified: false }

function makeInitialScores(exercises: Exercise[]): ScoreMap {
  const map: ScoreMap = {}
  exercises.forEach(ex => { map[ex.id] = { ...EMPTY } })
  return map
}

/**
 * Effective max points per exercise. A jump counts the points of the height
 * recorded for it, or its nominal (highest) height until one is recorded, so an
 * untouched sheet already shows the level's full total (200 / 300 / 400).
 */
function effectiveMaxMap(exercises: Exercise[], scores: ScoreMap, level: Level): Map<string, number> {
  const map = new Map<string, number>()
  exercises.forEach(e => {
    const jm = scores[e.id]?.jumpMax
    map.set(e.id, e.jumpOptions && typeof jm === 'number' ? jm : e.maxPts[level])
  })
  return map
}

export function useScoring() {
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [scores, setScores] = useState<ScoreMap>({})
  const [level, setLevel] = useState<Level | null>(null)
  const [currentExIndex, setCurrentExIndex] = useState(0)

  const startSession = useCallback((lvl: Level, order?: string[]) => {
    let exs = getExercises(lvl)
    if (order) {
      // The order list is authoritative: exercises left out (unchosen jumps) are dropped
      const rank = new Map(order.map((id, i) => [id, i]))
      exs = exs.filter(e => rank.has(e.id)).sort((a, b) => rank.get(a.id)! - rank.get(b.id)!)
    }
    setLevel(lvl)
    setExercises(exs)
    setScores(makeInitialScores(exs))
    setCurrentExIndex(0)
  }, [])

  /** Put a saved trial back exactly as it was */
  const restoreSession = useCallback((lvl: Level, order: string[], saved: ScoreMap, exIndex = 0) => {
    const rank = new Map(order.map((id, i) => [id, i]))
    const exs = getExercises(lvl)
      .filter(e => rank.has(e.id))
      .sort((a, b) => rank.get(a.id)! - rank.get(b.id)!)
    setLevel(lvl)
    setExercises(exs)
    setScores({ ...makeInitialScores(exs), ...saved })
    setCurrentExIndex(Math.min(exIndex, Math.max(0, exs.length - 1)))
  }, [])

  const applyDeduction = useCallback((exId: string, pen: Penalty, amount: number) => {
    setScores(prev => {
      const st = prev[exId]
      const available = effectiveMaxMap(exercises, prev, level!).get(exId)! - st.deductions
      const actual = Math.min(amount, available)
      const entry: LogEntry = { desc: pen.desc, pts: -actual }
      return {
        ...prev,
        [exId]: {
          ...st,
          deductions: st.deductions + actual,
          log: [...st.log, entry],
        },
      }
    })
  }, [exercises, level])

  const applyDisqualify = useCallback((exId: string, pen: Penalty) => {
    setScores(prev => {
      const st = prev[exId]
      const maxPts = effectiveMaxMap(exercises, prev, level!).get(exId)!
      const entry: LogEntry = { desc: pen.desc, pts: -maxPts, isDisq: true }
      return {
        ...prev,
        [exId]: {
          ...st,
          deductions: maxPts,
          log: [...st.log, entry],
          disqualified: true,
        },
      }
    })
  }, [exercises, level])

  const applyGA = useCallback((exId: string, pen: Penalty) => {
    setScores(prev => {
      const st = prev[exId]
      const entry: LogEntry = { desc: pen.desc, pts: 0, label: pen.label || 'G.A.', isGA: true }
      return {
        ...prev,
        [exId]: { ...st, log: [...st.log, entry] },
      }
    })
  }, [])

  const undoLog = useCallback((exId: string, idx: number) => {
    setScores(prev => {
      const st = prev[exId]
      const entry = st.log[idx]
      const newLog = st.log.filter((_, i) => i !== idx)
      return {
        ...prev,
        [exId]: {
          ...st,
          deductions: Math.max(0, st.deductions + entry.pts),
          log: newLog,
          disqualified: entry.isDisq ? false : st.disqualified,
        },
      }
    })
  }, [])

  const resetExercise = useCallback((exId: string) => {
    setScores(prev => ({
      ...prev,
      [exId]: { ...EMPTY, jumpMax: prev[exId]?.jumpMax },
    }))
  }, [])

  /**
   * Record the height the handler jumped. Which jumps are performed is settled
   * on the order screen, so this only changes the exercise's own maximum;
   * switching height clears any penalties already tapped on it.
   */
  const setJumpMax = useCallback((exId: string, pts: number) => {
    setScores(prev => ({ ...prev, [exId]: { ...EMPTY, jumpMax: pts } }))
  }, [])

  const getExerciseMax = useCallback((ex: Exercise): number => {
    return level ? (effectiveMaxMap(exercises, scores, level).get(ex.id) ?? 0) : 0
  }, [exercises, level, scores])

  const getExerciseScore = useCallback((exId: string): number => {
    if (!level) return 0
    const mp = effectiveMaxMap(exercises, scores, level).get(exId) ?? 0
    return Math.max(0, mp - (scores[exId]?.deductions ?? 0))
  }, [exercises, level, scores])

  const getExerciseState = useCallback((exId: string): ExerciseState => {
    return scores[exId] ?? EMPTY
  }, [scores])

  const getTotals = useCallback(() => {
    if (!level) return { total: 0, max: 0 }
    const maxes = effectiveMaxMap(exercises, scores, level)
    let total = 0
    exercises.forEach(ex => {
      total += Math.max(0, (maxes.get(ex.id) ?? 0) - (scores[ex.id]?.deductions ?? 0))
    })
    return { total, max: LEVEL_MAX[level] }
  }, [exercises, level, scores])

  const goToDisc = useCallback((disc: string) => {
    const idx = exercises.findIndex(e => e.discipline === disc)
    if (idx >= 0) setCurrentExIndex(idx)
  }, [exercises])

  const navigateEx = useCallback((dir: number) => {
    setCurrentExIndex(prev => Math.max(0, Math.min(exercises.length - 1, prev + dir)))
  }, [exercises.length])

  return {
    exercises,
    scores,
    level,
    currentExIndex,
    setCurrentExIndex,
    startSession,
    restoreSession,
    applyDeduction,
    applyDisqualify,
    applyGA,
    undoLog,
    resetExercise,
    setJumpMax,
    getExerciseMax,
    getExerciseScore,
    getExerciseState,
    getTotals,
    goToDisc,
    navigateEx,
  }
}
