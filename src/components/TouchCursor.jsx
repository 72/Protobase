import { useState, useEffect } from 'react'

export default function TouchCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [pressed, setPressed] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY })
      setVisible(true)
    }
    const onDown = () => setPressed(true)
    const onUp = () => setPressed(false)
    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    document.documentElement.addEventListener('mouseleave', onLeave)
    document.documentElement.addEventListener('mouseenter', onEnter)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      document.documentElement.removeEventListener('mouseenter', onEnter)
    }
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        left: pos.x - 20,
        top: pos.y - 20,
        width: 40,
        height: 40,
        borderRadius: '50%',
        background: 'rgba(0, 0, 0, 0.16)',
        pointerEvents: 'none',
        zIndex: 99999,
        opacity: visible ? 1 : 0,
        transform: `scale(${pressed ? 0.78 : 1})`,
        transition: 'transform 0.12s ease, opacity 0.2s ease',
        mixBlendMode: 'multiply',
      }}
    />
  )
}
