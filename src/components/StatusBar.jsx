import { useState, useEffect } from 'react'

export default function StatusBar() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const timeStr = time.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '14px 24px 0',
      height: 50,
      flexShrink: 0,
    }}>
      <span style={{ fontSize: 15, fontWeight: 600, letterSpacing: -0.2 }}>{timeStr}</span>
      <div style={{ display: 'flex', gap: 7, alignItems: 'center' }}>
        {/* Signal bars */}
        <svg width="17" height="12" viewBox="0 0 17 12" fill="#000">
          <rect x="0"    y="7"   width="3" height="5"  rx="0.8" />
          <rect x="4.7"  y="4.5" width="3" height="7.5" rx="0.8" />
          <rect x="9.4"  y="2"   width="3" height="10" rx="0.8" />
          <rect x="14.1" y="0"   width="3" height="12" rx="0.8" opacity="0.25" />
        </svg>
        {/* Wifi */}
        <svg width="16" height="12" viewBox="0 0 16 12" fill="#000">
          <circle cx="8" cy="11" r="1.4" />
          <path d="M4.8 7.8C5.7 6.9 6.8 6.4 8 6.4c1.2 0 2.3.5 3.2 1.4l1.2-1.2C11.2 5.4 9.7 4.7 8 4.7c-1.7 0-3.2.7-4.4 1.9l1.2 1.2z" />
          <path d="M2 5C3.7 3.3 5.7 2.4 8 2.4c2.3 0 4.3.9 5.8 2.4l1.2-1.2C13.2 1.9 10.8 1 8 1 5.2 1 2.8 2 1 3.8L2 5z" opacity="0.3" />
        </svg>
        {/* Battery */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{
            width: 25, height: 12,
            border: '1.5px solid rgba(0,0,0,0.35)',
            borderRadius: 3.5,
            padding: 2,
            display: 'flex',
            alignItems: 'stretch',
          }}>
            <div style={{ width: '76%', background: '#000', borderRadius: 1.5 }} />
          </div>
          <div style={{
            width: 2, height: 5,
            background: 'rgba(0,0,0,0.35)',
            borderRadius: '0 1px 1px 0',
            marginLeft: 1,
          }} />
        </div>
      </div>
    </div>
  )
}
