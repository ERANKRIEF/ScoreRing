import { useEffect, useRef, useState } from 'react'
import type { Level } from '../types'
import type { TrialDetails } from '../data/session'
import { useLang } from '../i18n/LangContext'
import ReportSheet, { type ReportPage } from './ReportSheet'
import { sheetsToPdf, deliverPdf, reportFilename } from './exportPdf'

interface Props {
  level: Level
  details: TrialDetails
  pages: ReportPage[]
  onBack: () => void
}

const SHEET_W = 794
const SHEET_H = 1123

/**
 * Preview of the filled scoresheets, scaled to the phone, with one button that
 * turns them into a PDF and hands it to the share sheet (or downloads it).
 */
export default function ReportScreen({ level, details, pages, onBack }: Props) {
  const { t } = useLang()
  const [scale, setScale] = useState(1)
  const [busy, setBusy] = useState<string | null>(null)
  const [capturing, setCapturing] = useState(false)
  const frameRef = useRef<HTMLDivElement>(null)
  const captureRef = useRef<HTMLDivElement>(null)

  // Fit the 794px sheet to whatever width the screen offers, and shrink any
  // sheet that runs past one A4 page so it prints on one
  useEffect(() => {
    const fit = () => {
      const w = frameRef.current?.clientWidth ?? SHEET_W
      setScale(Math.min(1, w / SHEET_W))
      document.querySelectorAll<HTMLElement>('.report-page-scale .a4-sheet').forEach(el => {
        el.style.setProperty('--fit', '1')
        const h = el.scrollHeight
        if (h > SHEET_H) el.style.setProperty('--fit', String(SHEET_H / h))
      })
    }
    fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [pages])

  async function exportPdf() {
    setBusy(t.reportWorking(0, pages.length))
    setCapturing(true)
    try {
      // Give React a frame to mount the unscaled capture copies
      await new Promise(r => setTimeout(r, 60))
      const sheets = Array.from(captureRef.current?.querySelectorAll<HTMLElement>('.a4-sheet') ?? [])
      const blob = await sheetsToPdf(sheets, (done, total) => setBusy(t.reportWorking(done, total)))
      const first = pages[0].participant
      const name = pages.length === 1
        ? reportFilename(first.dogName, first.handlerName, details.date)
        : reportFilename(`Level${level}`, `${pages.length}`, details.date)
      const how = await deliverPdf(blob, name, t.reportTitle)
      setBusy(how === 'shared' ? t.reportShared : t.reportDownloaded)
    } catch (e) {
      setBusy(t.reportError(e instanceof Error ? e.message : String(e)))
    } finally {
      setCapturing(false)
    }
  }

  return (
    <div className="report-screen">
      <div className="topbar">
        <div className="topbar-left">
          <button className="part-back-btn" onClick={onBack}>{t.back}</button>
        </div>
        <div className="practice-badge">{t.reportTitle} · {pages.length}</div>
        <div className="topbar-score" />
      </div>

      {busy && <div className="report-status">{busy}</div>}

      <div className="report-pages">
        {pages.map((page, i) => (
          <div className="report-page-frame" ref={i === 0 ? frameRef : undefined} key={page.participant.id}
               style={{ height: `${1123 * scale}px` }}>
            <div className="report-page-scale" style={{ transform: `scale(${scale})` }}>
              <ReportSheet level={level} details={details} page={page} />
            </div>
          </div>
        ))}
      </div>

      {/* Unscaled copies photographed for the PDF; off-screen, only while exporting */}
      {capturing && (
        <div className="report-capture" ref={captureRef} aria-hidden="true">
          {pages.map(page => (
            <ReportSheet key={page.participant.id} level={level} details={details} page={page} />
          ))}
        </div>
      )}

      <div className="report-toolbar">
        <button className="part-back-btn" onClick={() => window.print()}>{t.printBtn}</button>
        <button className="start-btn" onClick={exportPdf} disabled={capturing}>
          {capturing ? t.reportWorkingShort : t.reportShareBtn}
        </button>
      </div>
    </div>
  )
}
