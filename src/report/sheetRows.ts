/**
 * The official club scoresheet, row by row. Numbers are the maxima printed on
 * the form for Brevet and Categories 1–3; a null is a blank cell. The Category
 * columns are checked against the scoring data by a test, so the printed sheet
 * and the app can never disagree.
 */

export type SheetLevelCol = 0 | 1 | 2 | 3   // BM, CAT 1, CAT 2, CAT 3
export type Maxima = [number | null, number | null, number | null, number | null]

export interface SheetHeight {
  label: string
  maxima: Maxima
  /** Starred on the form: a height the handler may choose at that level */
  starred?: SheetLevelCol[]
}

export interface SheetSubRow {
  en: string
  he: string
  maxima: Maxima
}

export interface SheetRow {
  no: number
  /** The app's exercise id; null for rows the app does not score separately */
  exId: string | null
  en: string
  he: string
  section: 'ob' | 'jmp' | 'bit'
  maxima: Maxima
  heights?: SheetHeight[]
  subRows?: SheetSubRow[]
  /** Free lines printed in the observations column (e.g. 1′ F / 2′ F / 3′ F) */
  observationLines?: string[]
  note?: { en: string; he: string }
}

export const SHEET_ROWS: SheetRow[] = [
  { no: 1, exId: 'heel',      section: 'ob', en: 'Heel without leash',          he: 'רגלי ללא רצועה',           maxima: [6, 6, 6, 6] },
  { no: 2, exId: 'absence',   section: 'ob', en: 'Absence of the handler',      he: 'היעדרות נוהג לדקה',        maxima: [10, 10, 10, 10] },
  { no: 3, exId: 'food',      section: 'ob', en: 'Refusal of food',             he: 'סירוב למזון',              maxima: [4, 5, 10, 10] },
  { no: 4, exId: 'sendaway',  section: 'ob', en: 'Sending out ahead',           he: 'שליחה קדימה',              maxima: [null, 12, 12, 12] },
  { no: 5, exId: 'retrieve',  section: 'ob', en: 'Retrieve of thrown object',   he: 'החזרת עצם שנזרק',          maxima: [10, 12, 12, 12] },
  { no: 6, exId: 'positions', section: 'ob', en: 'Positions',                   he: 'מיקומים לפי הוראת שופט',   maxima: [null, 10, 20, 20] },
  { no: 7, exId: 'search',    section: 'ob', en: 'Search for object',           he: 'חיפוש עצם',                maxima: [null, null, 15, 15] },

  {
    no: 8, exId: 'palisade', section: 'jmp', en: 'Palisade', he: 'קיר קפיצה', maxima: [null, 15, 15, 15],
    heights: [
      { label: '1.80 m', maxima: [null, 15, 12, 5],  starred: [1, 2] },
      { label: '1.90 m', maxima: [null, null, 13, 7], starred: [2] },
      { label: '2.00 m', maxima: [null, null, 14, 9], starred: [2] },
      { label: '2.10 m', maxima: [null, null, 15, 11], starred: [2] },
      { label: '2.20 m', maxima: [null, null, null, 13] },
      { label: '2.30 m', maxima: [null, null, null, 15] },
    ],
  },
  {
    no: 9, exId: 'hurdle', section: 'jmp', en: 'Hurdle', he: 'משוכה', maxima: [10, 15, 20, 20],
    heights: [
      { label: '0.80 m', maxima: [10, null, null, null] },
      { label: '1.00 m', maxima: [null, 15, 12, 12], starred: [1] },
      { label: '1.10 m', maxima: [null, null, 16, 16] },
      { label: '1.20 m', maxima: [null, null, 20, 20] },
    ],
  },
  {
    no: 10, exId: 'longjump', section: 'jmp', en: 'Long Jump', he: 'קפיצה לרוחק', maxima: [null, 15, 15, 20],
    heights: [
      { label: '3.00 m', maxima: [null, 15, 10, 12], starred: [1, 2] },
      { label: '3.50 m', maxima: [null, null, 15, 16], starred: [2] },
      { label: '4.00 m', maxima: [null, null, null, 20] },
    ],
  },

  {
    no: 11, exId: 'facebaton', section: 'bit', en: 'Face attack', he: 'תקיפה חזיתית עם מקל במבוק', maxima: [30, 50, 40, 50],
    subRows: [
      { en: 'Departure',              he: 'התחלה',       maxima: [5, 10, 10, 10] },
      { en: 'Attack',                 he: 'תקיפה',       maxima: [20, 30, 20, 30] },
      { en: 'Termination and recall', he: 'סיום וחזרה',  maxima: [5, 10, 10, 10] },
    ],
  },
  {
    no: 12, exId: 'flee', section: 'bit', en: 'Flee Attack', he: 'בריחה מתקיפה', maxima: [null, 50, 30, 30],
    subRows: [
      { en: 'Departure',              he: 'התחלה',       maxima: [null, 10, 10, 10] },
      { en: 'Attack',                 he: 'תקיפה',       maxima: [null, 30, 10, 10] },
      { en: 'Termination and recall', he: 'סיום וחזרה',  maxima: [null, 10, 10, 10] },
    ],
  },
  { no: 13, exId: 'defence', section: 'bit', en: 'Defence of handler', he: 'הגנה על הנוהג', maxima: [30, 30, 30, 30] },
  {
    no: 14, exId: 'searchescort', section: 'bit', en: 'Search and escort', he: 'חיפוש וליווי', maxima: [null, null, 40, 40],
    subRows: [
      { en: 'Discovery', he: 'מציאת החפץ', maxima: [null, null, 10, 10] },
      { en: 'Escort',    he: 'ליווי',       maxima: [null, null, 30, 30] },
    ],
    observationLines: ["1' F", "2' F", "3' F"],
  },
  {
    no: 15, exId: 'faceacc', section: 'bit', en: 'Accessories attack', he: 'תקיפה חזיתית עם אביזרים', maxima: [null, null, 40, 50],
    subRows: [
      { en: 'Departure',              he: 'התחלה',       maxima: [null, null, 10, 10] },
      { en: 'Attack',                 he: 'תקיפה',       maxima: [null, null, 20, 30] },
      { en: 'Termination and recall', he: 'סיום וחזרה',  maxima: [null, null, 10, 10] },
    ],
  },
  {
    no: 16, exId: 'stoppedFlee', section: 'bit', en: 'Stopped flee attack', he: 'תקיפה מדומה', maxima: [null, null, null, 30],
    subRows: [
      { en: 'Departure',    he: 'התחלה',        maxima: [null, null, null, 10] },
      { en: 'False Attack', he: 'תקיפה מדומה',  maxima: [null, null, null, 20] },
    ],
    note: { en: 'Call the dog out of 3m allowed to:', he: 'קריאה לכלב מעל ל-3 מטר' },
  },
  {
    no: 17, exId: 'guardobj', section: 'bit', en: 'Guard an object', he: 'שמירה על חפץ', maxima: [null, null, null, 30],
    observationLines: ['1° P.', '2° P.', '3° P.'],
  },
]

export const SHEET_PARTIAL: Maxima = [100, 200, 300, 400]
export const SHEET_COL_LABELS = ['BM', 'CAT 1', 'CAT 2', 'CAT 3'] as const
