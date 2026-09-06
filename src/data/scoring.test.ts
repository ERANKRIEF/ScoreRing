import { describe, expect, it } from 'vitest'
import type { Level } from '../types'
import { getExercises, JUMP_RULE, LEVEL_MAX } from './exercises'
import { qualify } from './qualify'
import { buildPool } from './quiz'

const LEVELS: Level[] = [1, 2, 3]

/** Every combination of jumps the handler may legally choose at a level */
function jumpChoices(level: Level) {
  const rule = JUMP_RULE[level]
  const optional = getExercises(level).filter(e => rule.choose.includes(e.id))
  const combos = (arr: typeof optional, k: number): (typeof optional)[] =>
    k === 0 ? [[]] : arr.flatMap((v, i) => combos(arr.slice(i + 1), k - 1).map(c => [v, ...c]))
  return combos(optional, rule.pick)
}

describe('level totals', () => {
  it.each(LEVELS)('level %i reaches its maximum with every legal jump choice', level => {
    const rule = JUMP_RULE[level]
    const exercises = getExercises(level)
    const fixed = exercises
      .filter(e => !rule.choose.includes(e.id))
      .reduce((sum, e) => sum + e.maxPts[level], 0)

    const choices = jumpChoices(level)
    expect(choices.length).toBeGreaterThan(0)
    for (const combo of choices) {
      const total = fixed + combo.reduce((sum, e) => sum + e.maxPts[level], 0)
      expect(total).toBe(LEVEL_MAX[level])
    }
  })

  it('matches the club scoresheet', () => {
    expect(LEVEL_MAX).toEqual({ 1: 200, 2: 300, 3: 400 })
  })
})

describe('jump rules', () => {
  it('runs one jump at Level I, and not the long jump', () => {
    const ids = getExercises(1).filter(e => e.jumpOptions).map(e => e.id)
    expect(ids).toEqual(['palisade', 'hurdle'])
    expect(JUMP_RULE[1].pick).toBe(1)
  })

  it('makes the hurdle compulsory at Level II', () => {
    expect(JUMP_RULE[2].compulsory).toEqual(['hurdle'])
    expect(JUMP_RULE[2].choose).toEqual(['palisade', 'longjump'])
    expect(JUMP_RULE[2].pick).toBe(1)
  })

  it('runs all three jumps at Level III with no choice', () => {
    expect(JUMP_RULE[3].pick).toBe(0)
    expect(JUMP_RULE[3].compulsory).toHaveLength(3)
  })

  it.each(LEVELS)('level %i offers a height for every jump it runs', level => {
    for (const ex of getExercises(level).filter(e => e.jumpOptions)) {
      const heights = ex.jumpOptions![level]
      expect(heights.length).toBeGreaterThan(0)
      expect(Math.max(...heights.map(h => h.pts))).toBe(ex.maxPts[level])
    }
  })
})

describe('penalties', () => {
  it.each(LEVELS)('level %i never deducts more than an exercise is worth', level => {
    for (const ex of getExercises(level)) {
      const max = ex.maxPts[level]
      if (max === 0) continue
      for (const pen of ex.penalties) {
        if (pen.pts === 'ALL' || pen.perUnit) continue
        expect(Math.abs(pen.pts)).toBeLessThanOrEqual(max)
      }
    }
  })

  it('gives every penalty a unique id within its exercise', () => {
    for (const level of LEVELS) {
      for (const ex of getExercises(level)) {
        const ids = ex.penalties.map(p => p.id)
        expect(new Set(ids).size).toBe(ids.length)
      }
    }
  })
})

describe('qualification', () => {
  it('grades Level III in bands', () => {
    expect(qualify(3, 400).key).toBe('excellent')
    expect(qualify(3, 345).key).toBe('veryGood')
    expect(qualify(3, 325).key).toBe('good')
    expect(qualify(3, 300).key).toBe('sufficient')
    expect(qualify(3, 299).key).toBe('insufficient')
  })

  it('passes Levels I and II at 80%', () => {
    expect(qualify(1, 160).key).toBe('qualified')
    expect(qualify(1, 159).key).toBe('notQualified')
    expect(qualify(2, 240).key).toBe('qualified')
    expect(qualify(2, 239).key).toBe('notQualified')
  })
})

describe('score drill', () => {
  it.each(LEVELS)('level %i only asks "which exercise" when one exercise fits', level => {
    const exercises = getExercises(level)
    const asked = buildPool(level).filter(e => e.kind === 'ptsEx')
    for (const entry of asked) {
      const sharing = exercises.filter(
        e => !e.jumpOptions && e.maxPts[level] === entry.value,
      )
      expect(sharing.map(e => e.id)).toEqual([entry.exId])
    }
  })

  it.each(LEVELS)('level %i has something to ask about every exercise', level => {
    const pool = buildPool(level)
    for (const ex of getExercises(level)) {
      if (ex.maxPts[level] === 0 && !ex.jumpOptions?.[level]?.length) continue
      expect(pool.some(e => e.exId === ex.id)).toBe(true)
    }
  })
})
