import type { Level } from '../types'

export type QualKey =
  | 'excellent' | 'veryGood' | 'good' | 'sufficient' | 'insufficient'
  | 'qualified' | 'notQualified'

/**
 * The qualification a total earns. Level III is graded in four bands; Levels I
 * and II are a pass mark at 80% until the club supplies their bands.
 */
export function qualify(level: Level, total: number): { key: QualKey; cls: string } {
  if (level === 3) {
    if (total >= 360) return { key: 'excellent',    cls: 'excellent' }
    if (total >= 340) return { key: 'veryGood',     cls: 'very-good' }
    if (total >= 320) return { key: 'good',         cls: 'good' }
    if (total >= 300) return { key: 'sufficient',   cls: 'sufficient' }
    return { key: 'insufficient', cls: 'insufficient' }
  }
  const pass = level === 2 ? 240 : 160
  return total >= pass
    ? { key: 'qualified',    cls: 'excellent' }
    : { key: 'notQualified', cls: 'insufficient' }
}
