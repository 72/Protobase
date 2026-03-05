import { useState, useRef } from 'react'
import TouchCursor from './components/TouchCursor'
import StatusBar from './components/StatusBar'
import HomeScreen from './screens/HomeScreen'
import ScreenA from './screens/ScreenA'
import ScreenB from './screens/ScreenB'
import ScreenC from './screens/ScreenC'

const SCREEN_MAP = { home: HomeScreen, a: ScreenA, b: ScreenB, c: ScreenC }
const DURATION = 320
const EASE = 'cubic-bezier(0.4, 0, 0.2, 1)'

export default function App() {
  const [stack, setStack] = useState([{ id: 'home', key: 0 }])
  const [phase, setPhase] = useState('idle') // 'idle' | 'forward' | 'back'
  const timerRef = useRef(null)
  const keyRef = useRef(1)

  const navigate = (id) => {
    if (phase !== 'idle') return
    setStack(s => [...s, { id, key: keyRef.current++ }])
    setPhase('forward')
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setPhase('idle'), DURATION)
  }

  const goBack = () => {
    if (phase !== 'idle' || stack.length <= 1) return
    setPhase('back')
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      setStack(s => s.slice(0, -1))
      setPhase('idle')
    }, DURATION)
  }

  const getStyle = (index) => {
    const len = stack.length
    const isTop = index === len - 1
    const isSecond = index === len - 2

    if (phase === 'idle') {
      return {
        transform: isTop ? 'translateX(0%)' : 'translateX(-28%)',
        zIndex: index + 1,
      }
    }

    if (phase === 'forward') {
      if (isTop)    return { animation: `slideInFromRight ${DURATION}ms ${EASE} both`, zIndex: len }
      if (isSecond) return { animation: `slideToBack ${DURATION}ms ${EASE} both`, zIndex: len - 1 }
      return { transform: 'translateX(-28%)', zIndex: index + 1 }
    }

    if (phase === 'back') {
      if (isTop)    return { animation: `slideOutToRight ${DURATION}ms ${EASE} both`, zIndex: len }
      if (isSecond) return { animation: `slideFromBack ${DURATION}ms ${EASE} both`, zIndex: len - 1 }
      return { transform: 'translateX(-28%)', zIndex: index + 1 }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EBEBEB]">
      <TouchCursor />
      <div
        className="relative overflow-hidden bg-white"
        style={{
          width: 393,
          height: 852,
          borderRadius: 36,
          boxShadow: '0 32px 80px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.06)',
        }}
      >
        {stack.map((screen, index) => {
          const Component = SCREEN_MAP[screen.id]
          return (
            <div
              key={screen.key}
              className="absolute inset-0 bg-white"
              style={getStyle(index)}
            >
              <Component navigate={navigate} goBack={goBack} canGoBack={index > 0} />
            </div>
          )
        })}

        {/* Persistent status bar — always above the screen stack */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          zIndex: 200, background: '#fff',
          pointerEvents: 'none',
        }}>
          <StatusBar />
        </div>

        {/* Persistent home indicator — iOS system bar */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: 34, zIndex: 200, background: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          pointerEvents: 'none',
        }}>
          <div style={{
            width: 134, height: 5,
            background: 'rgba(0,0,0,0.2)',
            borderRadius: 3,
          }} />
        </div>
      </div>
    </div>
  )
}
