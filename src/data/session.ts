import type { CompletedResult, Level, Participant, ScoreMap } from '../types'

export interface TrialDetails {
  date?: string
  organization?: string
  location?: string
  club?: string
  judge?: string
  /** Older saves kept the decoys as one line; new ones name up to three */
  decoys?: string
  decoyList?: DecoyEntry[]
  /** Finger-drawn signatures as PNG data URLs, collected before the trial */
  judgeSignature?: string
  decoysSignature?: string
}

export interface DecoyEntry {
  name: string
  signature?: string
}

export const DECOY_SLOTS = 3

/** The decoys as the sheet prints them: named entries first, else the old single line */
export function decoyEntries(d: TrialDetails): DecoyEntry[] {
  const named = (d.decoyList ?? []).filter(e => e.name.trim() || e.signature)
  if (named.length) return named
  if (d.decoys?.trim()) return [{ name: d.decoys.trim(), signature: d.decoysSignature }]
  return []
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
  /** Which apparatus the competitor being judged is running */
  jumpChoice?: string
  /** Judge's remarks per participant id, for the printed sheet */
  remarks?: Record<string, string>
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
