import { describe, expect, it } from 'vitest'
import type { Level, ScoreMap } from '../types'
import { getExercises, LEVEL_MAX } from '../data/exercises'
import { SHEET_ROWS, SHEET_PARTIAL } from './sheetRows'
import { buildSheetData } from './sheetData'

const LEVELS: Level[] = [1, 2, 3]

describe('printed sheet matches the scoring data', () => {
  // The form is the FCI original and prints a few cells the club does not run
  // (the long jump at Level I); wherever the app scores an exercise, the two
  // must agree exactly.
  it.each(LEVELS)('level %i: every exercise the app scores carries the form\'s maximum', level => {
    const byId = new Map(getExercises(level).map(e => [e.id, e]))
    for (const row of SHEET_ROWS) {
      const ex = row.exId ? byId.get(row.exId) : undefined
      if (!ex || ex.maxPts[level] === 0) continue
      expect(row.maxima[level], `${row.exId} at level ${level}`).toBe(ex.maxPts[level])
    }
  })

  it.each(LEVELS)('level %i: every jump height the app offers is printed with the same points', level => {
    const byId = new Map(getExercises(level).map(e => [e.id, e]))
    for (const row of SHEET_ROWS.filter(r => r.heights)) {
      const app = byId.get(row.exId!)?.jumpOptions?.[level] ?? []
      for (const o of app) {
        const printed = row.heights!.find(h => h.label === o.label)
        expect(printed?.maxima[level], `${row.exId} ${o.label} at level ${level}`).toBe(o.pts)
      }
    }
  })

  it('partial totals on the form are the level maxima', () => {
    expect(SHEET_PARTIAL.slice(1)).toEqual([LEVEL_MAX[1], LEVEL_MAX[2], LEVEL_MAX[3]])
  })

  it('numbers rows 1 to 17 without gaps', () => {
    expect(SHEET_ROWS.map(r => r.no)).toEqual(Array.from({ length: 17 }, (_, i) => i + 1))
  })
})

describe('filling the sheet', () => {
  function run(ids: string[]): ScoreMap {
    const map: ScoreMap = {}
    ids.forEach(id => { map[id] = { deductions: 0, log: [], disqualified: false } })
    return map
  }

  it('a clean Level I run with the hurdle fills 200 and marks 1.00 m', () => {
    const ids = getExercises(1).map(e => e.id).filter(id => id !== 'palisade')
    const data = buildSheetData(1, run(ids))
    expect(data.awardedTotal).toBe(200)
    expect(data.penTotal).toBe(0)
    const hurdle = data.cells.find(c => c.row.exId === 'hurdle')!
    expect(hurdle.performed).toBe(true)
    expect(hurdle.heightLabel).toBe('1.00 m')
    const palisade = data.cells.find(c => c.row.exId === 'palisade')!
    expect(palisade.performed).toBe(false)
    expect(palisade.awarded).toBeNull()
  })

  it('a deduction shows in awarded, pen and observations', () => {
    const ids = getExercises(2).map(e => e.id).filter(id => id !== 'longjump')
    const scores = run(ids)
    scores.heel = { deductions: 4, log: [{ desc: 'הכלב מתחיל לפני אות השופט', pts: -4 }], disqualified: false }
    scores.hurdle = { deductions: 0, log: [], disqualified: false, jumpMax: 16 }
    const data = buildSheetData(2, scores)
    const heel = data.cells.find(c => c.row.exId === 'heel')!
    expect(heel.awarded).toBe(2)
    expect(heel.pen).toBe(4)
    expect(heel.observations).toEqual(['-4 · הכלב מתחיל לפני אות השופט'])
    const hurdle = data.cells.find(c => c.row.exId === 'hurdle')!
    expect(hurdle.awarded).toBe(16)
    expect(hurdle.pen).toBe(4)                    // 1.10 m instead of 1.20 m counts against the dog
    expect(hurdle.heightLabel).toBe('1.10 m')
    expect(data.awardedTotal).toBe(300 - 4 - 4)
    expect(data.penTotal).toBe(8)
  })

  it.each(LEVELS)('level %i: awarded and penalty always add up to the level total', level => {
    const rule = getExercises(level)
    const drop = level === 1 ? ['palisade'] : level === 2 ? ['palisade'] : []
    const ids = rule.map(e => e.id).filter(id => !drop.includes(id))
    const scores = run(ids)
    ids.forEach((id, i) => { scores[id] = { ...scores[id], deductions: i % 3 } })
    if (scores.hurdle) scores.hurdle.jumpMax = 12
    const data = buildSheetData(level, scores)
    expect(data.awardedTotal + data.penTotal).toBe(LEVEL_MAX[level])
  })

  it('an absent dog has an empty sheet', () => {
    const ids = getExercises(1).map(e => e.id).filter(id => id !== 'longjump' && id !== 'palisade')
    const data = buildSheetData(1, run(ids), 'absent')
    expect(data.awardedTotal).toBe(0)
    expect(data.cells.every(c => !c.performed)).toBe(true)
  })
})
