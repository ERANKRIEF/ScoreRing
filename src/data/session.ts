import type { CompletedResult, Level, Participant, ScoreMap } from '../types'

export interface TrialDetails {
  date?: string
  location?: string
  club?: string
  judge?: string
  decoys?: string
}

/** Everything needed to put a half-scored trial back on screen */
export interface TrialSave {
  v: 1
  savedAt: number
  screen: 'judge' | 'sheet' | 'results'
  level: Level
  details: TrialDetails
  participants: Participant[]
  order: string[]
  currentIdx: number
  completed: CompletedResult[]
  scores: ScoreMap
}

const KEY = 'scorering.trial.v1'

export function saveTrial(save: TrialSave) {
  try {
    localStorage.setItem(KEY, JSON.stringify(save))
  } catch {
    // Out of quota or blocked storage: judging continues, only resume is lost
  }
}

export function loadTrial(): TrialSave | null {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as TrialSave
    return parsed && parsed.v === 1 && parsed.participants?.length ? parsed : null
  } catch {
    return null
  }
}

export function clearTrial() {
  try {
    localStorage.removeItem(KEY)
  } catch {
    // Nothing to do — a stale save is offered again and can be dismissed
  }
}
