import type { Level, Participant, ResultStatus, ScoreMap } from '../types'
import { decoyEntries, type TrialDetails } from '../data/session'
import { useLang } from '../i18n/LangContext'
import { buildSheetData } from './sheetData'
import { SHEET_COL_LABELS, SHEET_PARTIAL, type Maxima } from './sheetRows'
import './report.css'

export interface ReportPage {
  participant: Participant
  scores: ScoreMap
  status: ResultStatus
  remarks?: string
}

interface Props {
  level: Level
  details: TrialDetails
  page: ReportPage
}

const LOGO = `${import.meta.env.BASE_URL}icons/club-logo.png`

const fmt = (n: number | null) => (n === null ? '' : Number.isInteger(n) ? String(n) : n.toFixed(1))

/**
 * The club's A4 scoresheet, filled in. Labels are bilingual like the form
 * itself; the judge's observations come through in the app's language.
 */
export default function ReportSheet({ level, details, page }: Props) {
  const { t } = useLang()
  const { participant: p, scores, status, remarks } = page
  const data = buildSheetData(level, scores, status, t.sheetHeightNote)
  const col = data.levelCol
  const levelName = ['CAT 1', 'CAT 2', 'CAT 3'][level - 1]

  const maxCells = (m: Maxima) =>
    m.map((v, i) => (
      <td key={i} className={`a4-num${i === col ? ' a4-lvl' : ''}`}>{fmt(v)}</td>
    ))

  const Field = ({ en, he, value }: { en: string; he: string; value?: string }) => (
    <div className="a4-field">
      <span className="a4-field-label">{en} / {he}</span>
      <span className="a4-field-value">{value || ''}</span>
    </div>
  )

  const statusNote = status === 'absent' ? t.statusLabel.absent : status === 'eliminated' ? t.statusLabel.eliminated : ''

  return (
    <div className="a4-sheet" dir="ltr">
      {/* ── Header ── */}
      <div className="a4-block a4-header">
        <img className="a4-logo" src={LOGO} alt="" />
        <div className="a4-header-fields">
          <Field en="Organization" he="אירגון" value={details.organization} />
          <Field en="Data" he="תאריך" value={details.date} />
          <Field en="Location" he="מקום המבחן" value={details.location} />
          <Field en="Pedigree No" he="מספר סגיר" value={p.pedigree} />
          <Field en="Dog's Name" he="שם הכלב" value={p.dogName} />
          <Field en="Sex" he="מין" value={p.sex} />
          <Field en="Date of Birth" he="תאריך לידה" value={p.birthDate} />
          <Field en="Breed" he="גזע" value={p.breed} />
          <Field en="Handler Name" he="שם הנוהג" value={p.handlerName} />
          <Field en="Chip" he="מספר שבב" value={p.chip} />
          <Field en="Club" he="מועדון" value={details.club} />
          <Field en="Scorebook No" he="מספר פנקס עבודה" value={p.scorebook} />
          <Field en="Catalog No" he="מספר קטלוגי" value={p.catalog ?? String(p.startNumber)} />
          <Field en="Phone" he="טלפון" value={p.phone} />
        </div>
        <div className="a4-level">
          <span className="a4-level-name">{levelName}</span>
          <span className="a4-level-sub">Mondioring · ScoreRing</span>
          {statusNote && <span className="a4-status">{statusNote}</span>}
        </div>
      </div>
      <div className="a4-block a4-footnote">* jumping exercises chosen by the handler / תרגילי הקפיצה נבחרים על ידי הנוהג</div>

      {/* ── Score table ── */}
      <table className="a4-table">
        <colgroup>
          <col className="a4-c-no" /><col className="a4-c-ex" />
          <col className="a4-c-num" /><col className="a4-c-num" /><col className="a4-c-num" /><col className="a4-c-num" />
          <col className="a4-c-awarded" /><col className="a4-c-pen" /><col className="a4-c-obs" />
        </colgroup>
        <thead>
          <tr>
            <th rowSpan={2} className="a4-no">#</th>
            <th rowSpan={2} className="a4-ex">EXERCISE / התרגיל</th>
            <th colSpan={4}>SCORE / ניקוד</th>
            <th rowSpan={2} className="a4-awarded">Awarded<br />הוענק</th>
            <th rowSpan={2} className="a4-pen">Pen.<br />ענישה</th>
            <th rowSpan={2} className="a4-obs">OBSERVATIONS / הערות</th>
          </tr>
          <tr>
            {SHEET_COL_LABELS.map((l, i) => (
              <th key={l} className={`a4-num${i === col ? ' a4-lvl' : ''}`}>{l}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.cells.map(cell => {
            const { row } = cell
            const kids = (row.heights?.length ?? 0) + (row.subRows?.length ?? 0)
            const extra = row.observationLines ?? []
            return (
              <SheetRowGroup key={row.no}>
                <tr className={`a4-row a4-sec-${row.section}${kids ? ' a4-row--head' : ''}`}>
                  <td className="a4-no" rowSpan={1 + kids}>{row.no}</td>
                  <td className="a4-ex">
                    <span className="a4-ex-line">
                      <span className="a4-ex-en">{row.en}</span>
                      <span className="a4-ex-he">{row.he}</span>
                    </span>
                  </td>
                  {maxCells(row.maxima)}
                  <td className="a4-awarded a4-val">{cell.performed ? fmt(cell.awarded) : ''}</td>
                  <td className="a4-pen a4-val">{cell.performed && cell.pen ? fmt(cell.pen) : ''}</td>
                  <td className="a4-obs" dir={t.dir} rowSpan={1 + kids}>
                    {cell.observations.map((l, i) => <div key={i} className="a4-obs-line">{l}</div>)}
                    {extra.map(l => <div key={l} className="a4-obs-extra" dir="ltr">{l}</div>)}
                    {row.note && <div className="a4-note" dir="ltr">{row.note.en} / {row.note.he}</div>}
                  </td>
                </tr>

                {row.heights?.map(h => {
                  const taken = cell.performed && cell.heightLabel === h.label
                  return (
                    <tr key={h.label} className={`a4-sub a4-sec-${row.section}`}>
                      <td className="a4-ex a4-height">
                        <span className={`a4-box${taken ? ' on' : ''}`}>{taken ? '✓' : ''}</span>
                        {h.label}
                      </td>
                      {h.maxima.map((v, i) => (
                        <td key={i} className={`a4-num${i === col ? ' a4-lvl' : ''}`}>
                          {fmt(v)}{v !== null && h.starred?.includes(i as 0 | 1 | 2 | 3) ? '*' : ''}
                        </td>
                      ))}
                      <td className="a4-awarded" /><td className="a4-pen" />
                    </tr>
                  )
                })}

                {row.subRows?.map(sub => (
                  <tr key={sub.en} className={`a4-sub a4-sec-${row.section}`}>
                    <td className="a4-ex a4-subname">
                      <span className="a4-ex-line">
                        <span className="a4-ex-en">{sub.en}</span>
                        <span className="a4-ex-he">{sub.he}</span>
                      </span>
                    </td>
                    {maxCells(sub.maxima)}
                    <td className="a4-awarded" /><td className="a4-pen" />
                  </tr>
                ))}
              </SheetRowGroup>
            )
          })}
        </tbody>
        <tfoot>
          <tr className="a4-partial">
            <td colSpan={2} className="a4-ex a4-strong">PARTIAL / חלקי</td>
            {maxCells(SHEET_PARTIAL)}
            <td className="a4-awarded a4-val a4-strong">{status === 'absent' ? '' : fmt(data.awardedTotal)}</td>
            <td className="a4-pen a4-val a4-strong">{status === 'absent' ? '' : fmt(data.penTotal)}</td>
            <td className="a4-obs" />
          </tr>
          <tr className="a4-total">
            <td colSpan={2} className="a4-ex a4-strong">FINAL SCORE / ניקוד סופי</td>
            <td colSpan={4} className="a4-strong">TOTAL / סך הכל</td>
            <td className="a4-awarded a4-val a4-strong a4-big">{status === 'absent' ? '—' : fmt(data.awardedTotal)}</td>
            <td className="a4-pen" />
            <td className="a4-obs a4-qual" dir={t.dir}>
              {status === 'scored' ? t.qual[data.qualification] : statusNote}
            </td>
          </tr>
        </tfoot>
      </table>

      {/* ── Remarks and signatures ── */}
      <div className="a4-block a4-remarks">
        <span className="a4-side-label">Remarks / הערות</span>
        <div className="a4-remarks-body" dir={t.dir}>{remarks || ''}</div>
      </div>

      <div className="a4-block a4-signatures">
        {(decoyEntries(details).length ? decoyEntries(details) : [{ name: '' }]).map((d, i) => (
          <div className="a4-sig-row" key={i}>
            <span className="a4-side-label">{i === 0 ? 'Decoys / דיקויים' : ''}</span>
            <span className="a4-sig-name">{d.name}</span>
            <span className="a4-sig-label">Signature / חתימה</span>
            <span className="a4-sig-box">
              {d.signature && <img src={d.signature} alt="" />}
            </span>
          </div>
        ))}
        <div className="a4-sig-row">
          <span className="a4-side-label">Judge / שופט</span>
          <span className="a4-sig-name">{details.judge || ''}</span>
          <span className="a4-sig-label">Signature / חתימה</span>
          <span className="a4-sig-box">
            {details.judgeSignature && <img src={details.judgeSignature} alt="" />}
          </span>
        </div>
      </div>
    </div>
  )
}

/** Fragment stand-in so each exercise's rows stay adjacent in the table */
function SheetRowGroup({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
