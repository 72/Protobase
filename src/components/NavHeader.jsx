export default function NavHeader({ title, canGoBack, onBack }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: 44,
      position: 'relative',
      flexShrink: 0,
      borderBottom: '1px solid #F2F2F7',
    }}>
      {canGoBack && (
        <button
          onClick={onBack}
          style={{
            position: 'absolute',
            left: 4,
            display: 'flex',
            alignItems: 'center',
            gap: 3,
            background: 'none',
            border: 'none',
            color: '#000',
            padding: '8px 12px',
            fontSize: 17,
          }}
        >
          <svg width="10" height="17" viewBox="0 0 10 17" fill="none">
            <path d="M8.5 1.5L1.5 8.5L8.5 15.5"
              stroke="currentColor" strokeWidth="1.8"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back
        </button>
      )}
      <span style={{ fontSize: 17, fontWeight: 600, letterSpacing: -0.2 }}>{title}</span>
    </div>
  )
}
