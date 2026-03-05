function NavRow({ label, description, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '15px 20px',
        background: 'none',
        border: 'none',
        width: '100%',
        textAlign: 'left',
      }}
    >
      <div>
        <div style={{ fontSize: 17, color: '#000', letterSpacing: -0.2 }}>{label}</div>
        <div style={{ fontSize: 13, color: '#8E8E93', marginTop: 2 }}>{description}</div>
      </div>
      <svg width="8" height="14" viewBox="0 0 8 14" fill="none" style={{ opacity: 0.25, flexShrink: 0 }}>
        <path d="M1 1L7 7L1 13" stroke="#000" strokeWidth="1.8"
          strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  )
}

export default function HomeScreen({ navigate }) {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ height: 50, flexShrink: 0 }} />

      <div style={{ padding: '20px 20px 8px' }}>
        <h1 style={{
          fontSize: 34,
          fontWeight: 700,
          letterSpacing: -0.8,
          color: '#000',
          lineHeight: 1.05,
          margin: 0,
        }}>
          Protobase
        </h1>
        <p style={{ fontSize: 15, color: '#8E8E93', marginTop: 6, marginBottom: 0 }}>
          Mobile prototyping playground
        </p>
      </div>

      <div style={{ height: 1, background: '#F2F2F7', margin: '16px 0 0' }} />

      <div>
        <NavRow
          label="Prototype A"
          description="Feed layout"
          onClick={() => navigate('a')}
        />
        <div style={{ height: 1, background: '#F2F2F7', margin: '0 20px' }} />
        <NavRow
          label="Prototype B"
          description="Profile layout"
          onClick={() => navigate('b')}
        />
        <div style={{ height: 1, background: '#F2F2F7' }} />
      </div>
    </div>
  )
}
