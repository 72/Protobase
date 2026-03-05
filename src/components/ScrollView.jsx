import { useRef, useEffect } from 'react'

/**
 * Drop-in scroll container that supports:
 * - Mouse wheel (native, via overflow-y: scroll)
 * - Mouse drag with momentum (simulates phone touch-scroll)
 * - Touch drag with momentum (real touch devices)
 */
export default function ScrollView({ children, style, className }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current

    let dragging = false
    let startY = 0
    let lastY = 0
    let lastTime = 0
    let moved = false
    let velocity = 0
    let rafId = null
    const samples = []

    const stop = () => {
      if (rafId) { cancelAnimationFrame(rafId); rafId = null }
      velocity = 0
    }

    const applyMomentum = () => {
      if (Math.abs(velocity) < 0.5) { stop(); return }
      el.scrollTop += velocity
      velocity *= 0.95
      rafId = requestAnimationFrame(applyMomentum)
    }

    const onMove = (e) => {
      if (!dragging) return
      const now = performance.now()
      const dt = now - lastTime
      const dy = lastY - e.clientY

      if (!moved && Math.abs(e.clientY - startY) > 4) moved = true
      if (!moved) return

      samples.push({ dy, dt: Math.max(dt, 1) })
      if (samples.length > 6) samples.shift()

      el.scrollTop += dy
      lastY = e.clientY
      lastTime = now
    }

    const onUp = () => {
      if (!dragging) return
      dragging = false
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)

      if (samples.length > 0) {
        const totalDy = samples.reduce((s, p) => s + p.dy, 0)
        const totalDt = samples.reduce((s, p) => s + p.dt, 0)
        velocity = Math.max(-60, Math.min(60, (totalDy / totalDt) * 16))
      }
      samples.length = 0

      if (moved) rafId = requestAnimationFrame(applyMomentum)
    }

    const onDown = (e) => {
      stop()
      dragging = true
      startY = e.clientY
      lastY = e.clientY
      lastTime = performance.now()
      moved = false
      samples.length = 0
      window.addEventListener('pointermove', onMove)
      window.addEventListener('pointerup', onUp)
    }

    el.addEventListener('pointerdown', onDown)

    return () => {
      stop()
      el.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
  }, [])

  return (
    <div
      ref={ref}
      className={`no-scrollbar${className ? ' ' + className : ''}`}
      style={{ overflowY: 'scroll', touchAction: 'none', ...style }}
    >
      {children}
    </div>
  )
}
