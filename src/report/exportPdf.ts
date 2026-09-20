/**
 * Turns rendered A4 sheets into a PDF. The sheet is drawn by the browser (so
 * Hebrew, fonts and layout are exactly what is on screen), photographed with
 * html2canvas and placed page by page with jsPDF. Both libraries load on first
 * use, so the judging screens never pay for them.
 */

const A4_W_MM = 210
const A4_H_MM = 297

export interface ExportProgress {
  (done: number, total: number): void
}

export async function sheetsToPdf(sheets: HTMLElement[], onProgress?: ExportProgress): Promise<Blob> {
  const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
    import('html2canvas'),
    import('jspdf'),
  ])

  const pdf = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' })

  for (let i = 0; i < sheets.length; i++) {
    const sheet = sheets[i]
    const canvas = await html2canvas(sheet, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
      logging: false,
      windowWidth: sheet.scrollWidth,
    })

    // A dog's sheet is one page. A sheet that ran long (many observations) is
    // shrunk to fit rather than split, and centred on the page.
    const ratio = canvas.height / canvas.width
    let wMm = A4_W_MM
    let hMm = wMm * ratio
    if (hMm > A4_H_MM) { hMm = A4_H_MM; wMm = hMm / ratio }
    const x = (A4_W_MM - wMm) / 2

    if (i > 0) pdf.addPage()
    pdf.addImage(canvas.toDataURL('image/jpeg', 0.92), 'JPEG', x, 0, wMm, hMm)
    onProgress?.(i + 1, sheets.length)
  }

  return pdf.output('blob')
}

/** Hand the PDF to the share sheet where there is one, otherwise download it */
export async function deliverPdf(blob: Blob, filename: string, title: string): Promise<'shared' | 'downloaded'> {
  const file = new File([blob], filename, { type: 'application/pdf' })
  const nav = navigator as Navigator & { canShare?: (d: ShareData) => boolean }
  if (nav.share && nav.canShare?.({ files: [file] })) {
    try {
      await nav.share({ files: [file], title })
      return 'shared'
    } catch (e) {
      // The user closed the share sheet — fall through to a download only if it was not a cancel
      if ((e as DOMException)?.name === 'AbortError') return 'shared'
    }
  }
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 10_000)
  return 'downloaded'
}

export function reportFilename(dogName: string, handlerName: string, date?: string) {
  const safe = (s: string) => s.replace(/[\\/:*?"<>|]+/g, '').trim().replace(/\s+/g, '_')
  const d = date || new Date().toISOString().slice(0, 10)
  return `ScoreRing_${safe(dogName)}_${safe(handlerName)}_${d}.pdf`
}
