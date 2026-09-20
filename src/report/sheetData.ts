import type { Level, ScoreMap, ResultStatus } from '../types'
import { getExercises, LEVEL_MAX } from '../data/exercises'
import { qualify, type QualKey } from '../data/qualify'
import { SHEET_ROWS, type SheetRow } from './sheetRows'

/** What the printed sheet needs for one exercise of one dog */
export interface SheetCell {
  row: SheetRow
  /** The exercise is part of this level and was run by this dog */
  performed: boolean
  max: number | null
  awarded: number | null
  pen: number | null
  observations: string[]
  /** For jumps: the height label the dog actually took */
  heightLabel?: string
}

export interface SheetData {
  cells: SheetCell[]
  levelCol: 1 | 2 | 3
  levelMax: number
  awardedTotal: number
  penTotal: number
  qualification: QualKey
  status: ResultStatus
}

/** One line per logged penalty, the way the judge saw it on screen */
function observationsOf(scores: ScoreMap, exId: string): string[] {
  const st = scores[exId]
  if (!st) return []
  return st.log.map(e => {
    if (e.isGA) return `${e.label ?? 'G.A.'} · ${e.desc}`
    const pts = Number.isInteger(e.pts) ? String(e.pts) : e.pts.toFixed(1)
    return `${pts} · ${e.desc}`
  })
}

export function buildSheetData(
  level: Level,
  scores: ScoreMap,
  status: ResultStatus = 'scored',
  heightNote?: (label: string, pts: number, nominal: number) => string,
): SheetData {
  const exercises = getExercises(level)
  const byId = new Map(exercises.map(e => [e.id, e]))
  const levelCol = level as 1 | 2 | 3
  let awardedTotal = 0
  let penTotal = 0

  const cells: SheetCell[] = SHEET_ROWS.map(row => {
    const ex = row.exId ? byId.get(row.exId) : undefined
    const st = row.exId ? scores[row.exId] : undefined
    const inRun = !!ex && !!st
    const nominal = ex ? ex.maxPts[level] : 0

    if (!inRun || nominal === 0 || status === 'absent') {
      return { row, performed: false, max: null, awarded: null, pen: null, observations: [] }
    }

    // A jump counts the height the handler took; other exercises their fixed value
    let max = nominal
    let heightLabel: string | undefined
    const heights = ex.jumpOptions?.[level]
    if (heights?.length) {
      const chosen = typeof st.jumpMax === 'number'
        ? heights.find(h => h.pts === st.jumpMax)
        : heights.reduce((a, b) => (b.pts > a.pts ? b : a))
      if (chosen) { max = chosen.pts; heightLabel = chosen.label }
    }

    // The form's own arithmetic: penalty = the level's value minus what was
    // awarded, so a lower jump counts against the dog like any other loss
    const awarded = Math.max(0, max - Math.min(st.deductions, max))
    const pen = nominal - awarded
    awardedTotal += awarded
    penTotal += pen

    const observations = observationsOf(scores, row.exId!)
    if (heightLabel && max < nominal && heightNote) {
      observations.unshift(heightNote(heightLabel, max, nominal))
    }

    return { row, performed: true, max: nominal, awarded, pen, observations, heightLabel }
  })

  return {
    cells,
    levelCol,
    levelMax: LEVEL_MAX[level],
    awardedTotal,
    penTotal,
    qualification: qualify(level, awardedTotal).key,
    status,
  }
}
