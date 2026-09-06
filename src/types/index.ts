export type Discipline = 'ob' | 'jmp' | 'bit'
export type Level = 1 | 2 | 3

export interface Penalty {
  id: string
  desc: string
  pts: number | 'ALL'
  perUnit?: boolean
  unit?: string
  label?: string
  isGA?: boolean
}

export interface JumpOption {
  label: string
  pts: number
}

export interface Exercise {
  id: string
  discipline: Discipline
  name: string
  maxPts: Record<Level, number>
  note?: string
  penalties: Penalty[]
  jumpOptions?: Record<Level, JumpOption[]>
}

export interface LogEntry {
  desc: string
  pts: number
  label?: string
  isGA?: boolean
  isDisq?: boolean
}

export interface ExerciseState {
  deductions: number
  log: LogEntry[]
  disqualified: boolean
  /** Jumps only: chosen height's max points, or null when the jump is not performed */
  jumpMax?: number | null
}

export type ScoreMap = Record<string, ExerciseState>

export interface Participant {
  id: string
  startNumber: number
  handlerName: string
  dogName: string
  /** Optional paperwork from the official scoresheet — never required */
  breed?: string
  chip?: string
  pedigree?: string
  scorebook?: string
  catalog?: string
  birthDate?: string
}

/** A competitor who never ran is not the same as one who scored zero */
export type ResultStatus = 'scored' | 'absent' | 'eliminated'

export interface CompletedResult {
  participant: Participant
  scores: ScoreMap
  total: number
  max: number
  status?: ResultStatus
}
