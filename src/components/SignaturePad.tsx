import { useEffect, useRef } from 'react'
import { useLang } from '../i18n/LangContext'

interface Props {
  label: string
  value?: string
  onChange: (dataUrl: string | undefined) => void
}

/**
 * A finger-drawn signature, kept as a small PNG data URL so it survives in the
 * trial save and can be laid onto the printed sheet.
 */
export default function SignaturePad({ label, value, onChange }: Props) {
  const { t } = useLang()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const drawing = useRef(false)
  const drew = useRef(false)

  useEffect(() => {
    const c = canvasRef.current
    const ctx = c?.getContext('2d')
    if (!c || !ctx) return                       // no 2D canvas here: nothing to draw on
    ctx.clearRect(0, 0, c.width, c.height)
    if (value) {
      const img = new Image()
      img.onload = () => ctx.drawImage(img, 0, 0, c.width, c.height)
      img.src = value
    }
  }, [value])

  function point(e: React.PointerEvent<HTMLCanvasElement>) {
    const c = canvasRef.current!
    const r = c.getBoundingClientRect()
    return { x: (e.clientX - r.left) * (c.width / r.width), y: (e.clientY - r.top) * (c.height / r.height) }
  }

  function down(e: React.PointerEvent<HTMLCanvasElement>) {
    const ctx = canvasRef.current?.getContext('2d')
    if (!ctx) return
    const p = point(e)
    ctx.lineWidth = 2.5
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.strokeStyle = '#111'
    ctx.beginPath()
    ctx.moveTo(p.x, p.y)
    drawing.current = true
    canvasRef.current!.setPointerCapture(e.pointerId)
  }

  function move(e: React.PointerEvent<HTMLCanvasElement>) {
    if (!drawing.current) return
    const ctx = canvasRef.current?.getContext('2d')
    if (!ctx) return
    const p = point(e)
    ctx.lineTo(p.x, p.y)
    ctx.stroke()
    drew.current = true
  }

  function up() {
    if (!drawing.current) return
    drawing.current = false
    if (drew.current) onChange(canvasRef.current!.toDataURL('image/png'))
  }

  function clear() {
    const c = canvasRef.current
    c?.getContext('2d')?.clearRect(0, 0, c.width, c.height)
    drew.current = false
    onChange(undefined)
  }

  return (
    <div className="sigpad">
      <div className="sigpad-head">
        <span className="sigpad-label">{label}</span>
        <button type="button" className="details-toggle" onClick={clear}>{t.sigClear}</button>
      </div>
      <canvas
        ref={canvasRef}
        width={600}
        height={180}
        className="sigpad-canvas"
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={up}
        onPointerCancel={up}
        onPointerLeave={up}
        aria-label={label}
      />
      {!value && <div className="sigpad-hint">{t.sigHint}</div>}
    </div>
  )
}
