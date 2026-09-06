import type { Level } from '../types'
import { getExercises } from './exercises'

export type Answer = number | 'ALL'

/** One thing worth memorising: an exercise's value, a jump height, a deduction. */
export interface PoolEntry {
  key: string
  kind: 'exPts' | 'ptsEx' | 'jump' | 'pen'
  exId: string
  penId?: string
  heightLabel?: string
  perUnit?: string
  /** The correct answer, except for 'ptsEx' where it is the points shown in the prompt */
  value: Answer
}

export interface Question {
  entry: PoolEntry
  /** Numeric answers for every kind but 'ptsEx', which answers with an exercise id */
  options: Answer[]
  exOptions?: string[]
}

export interface ItemStat { streak: number; due: number }
export type QuizStats = Record<string, ItemStat>

export const ROUND_SIZE = 10
export const QUESTION_SECONDS = 15

/** Spacing after each consecutive correct answer */
const INTERVALS_MS = [
  10 * 60 * 1000,
  24 * 60 * 60 * 1000,
  3 * 24 * 60 * 60 * 1000,
  7 * 24 * 60 * 60 * 1000,
  21 * 24 * 60 * 60 * 1000,
]

export function buildPool(level: Level): PoolEntry[] {
  const exercises = getExercises(level).filter(e => e.maxPts[level] > 0 || e.jumpOptions?.[level]?.length)
  const pool: PoolEntry[] = []

  // Several exercises can share a value (12 is both the send away and the
  // retrieve), so "which exercise is worth 12?" only has one right answer for
  // the values that belong to a single exercise.
  const shared = new Set<number>()
  const seen = new Set<number>()
  exercises.forEach(e => {
    if (e.jumpOptions?.[level]?.length) return
    const v = e.maxPts[level]
    if (seen.has(v)) shared.add(v)
    seen.add(v)
  })

  exercises.forEach(ex => {
    const pts = ex.maxPts[level]
    const heights = ex.jumpOptions?.[level] ?? []

    // A jump's value depends on the height, so ask about the heights instead
    if (heights.length) {
      heights.forEach(h => pool.push({
        key: `jump:${ex.id}:${h.label}`,
        kind: 'jump',
        exId: ex.id,
        heightLabel: h.label,
        value: h.pts,
      }))
    } else if (pts > 0) {
      pool.push({ key: `exPts:${ex.id}`, kind: 'exPts', exId: ex.id, value: pts })
      if (!shared.has(pts)) {
        pool.push({ key: `ptsEx:${ex.id}`, kind: 'ptsEx', exId: ex.id, value: pts })
      }
    }

    ex.penalties.forEach(p => {
      if (p.isGA) return
      if (p.pts === 0) return
      pool.push({
        key: `pen:${ex.id}:${p.id}`,
        kind: 'pen',
        exId: ex.id,
        penId: p.id,
        perUnit: p.perUnit ? p.unit : undefined,
        value: p.pts === 'ALL' ? 'ALL' : Math.abs(p.pts),
      })
    })
  })

  return pool
}

const isCore = (e: PoolEntry) => e.kind !== 'pen'

/**
 * A round leads with what is due — anything answered wrong comes back at once —
 * and keeps a mix so a beginner is not buried in obscure deductions.
 */
export function buildRound(pool: PoolEntry[], stats: QuizStats, size = ROUND_SIZE): PoolEntry[] {
  const now = Date.now()
  const rank = (e: PoolEntry) => {
    const s = stats[e.key]
    if (!s) return 1                       // unseen: worth asking, after anything overdue
    return s.due <= now ? 0 : 2            // due, then not yet due
  }
  const order = (a: PoolEntry, b: PoolEntry) =>
    rank(a) - rank(b) || (stats[a.key]?.due ?? 0) - (stats[b.key]?.due ?? 0) || Math.random() - 0.5

  const core = pool.filter(isCore).sort(order)
  const pen = pool.filter(e => !isCore(e)).sort(order)

  const coreWanted = Math.min(core.length, Math.ceil(size * 0.6))
  const picked = [...core.slice(0, coreWanted), ...pen.slice(0, size - coreWanted)]
  while (picked.length < size && core.length + pen.length > picked.length) {
    const rest = [...core, ...pen].filter(e => !picked.includes(e))
    if (!rest.length) break
    picked.push(rest[0])
  }
  return shuffle(picked).slice(0, size)
}

export function makeQuestion(entry: PoolEntry, pool: PoolEntry[]): Question {
  if (entry.kind === 'ptsEx') {
    const sameValue = new Set([entry.exId])
    const others = pool
      .filter(e => e.kind === 'ptsEx' && e.value !== entry.value && !sameValue.has(e.exId))
      .map(e => e.exId)
    return {
      entry,
      options: [],
      exOptions: shuffle([entry.exId, ...shuffle(unique(others)).slice(0, 3)]),
    }
  }

  const correct = entry.value
  const candidates = unique(
    pool
      .filter(e => e.kind === entry.kind)
      .map(e => e.value)
      .filter(v => v !== correct),
  )
  const distractors = shuffle(candidates).slice(0, 3)

  // Small pools (a level with few distinct values) need made-up but plausible answers
  if (typeof correct === 'number') {
    for (const delta of [1, 2, 5, -1, -2, 10]) {
      if (distractors.length >= 3) break
      const v = correct + delta
      if (v > 0 && v !== correct && !distractors.includes(v)) distractors.push(v)
    }
  }

  return { entry, options: shuffle([correct, ...distractors.slice(0, 3)]) }
}

export function recordAnswer(stats: QuizStats, key: string, correct: boolean): QuizStats {
  const prev = stats[key]?.streak ?? 0
  const streak = correct ? Math.min(prev + 1, INTERVALS_MS.length) : 0
  const due = correct ? Date.now() + INTERVALS_MS[streak - 1] : Date.now()
  return { ...stats, [key]: { streak, due } }
}

const storageKey = (level: Level) => `scorering.quiz.v1.L${level}`

export function loadStats(level: Level): QuizStats {
  try {
    const raw = localStorage.getItem(storageKey(level))
    return raw ? (JSON.parse(raw) as QuizStats) : {}
  } catch {
    return {}
  }
}

export function saveStats(level: Level, stats: QuizStats) {
  try {
    localStorage.setItem(storageKey(level), JSON.stringify(stats))
  } catch {
    // A private window or blocked storage just means no spacing between sessions
  }
}

export function masteredCount(pool: PoolEntry[], stats: QuizStats) {
  return pool.filter(e => (stats[e.key]?.streak ?? 0) >= 2).length
}

function unique<T>(arr: T[]): T[] {
  return [...new Set(arr)]
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}
