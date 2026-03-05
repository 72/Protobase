import NavHeader from '../components/NavHeader'

const stats = [
  { label: 'Following', value: '284' },
  { label: 'Followers', value: '1.4k' },
  { label: 'Posts', value: '38' },
]

const recentPosts = [
  'The best interfaces disappear.',
  'Constraints breed creativity.',
  'Ship it, then refine.',
]

export default function ScreenB({ goBack, canGoBack }) {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ height: 50, flexShrink: 0 }} />
      <NavHeader title="Profile" canGoBack={canGoBack} onBack={goBack} />

      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 34 }}>
        {/* Profile header */}
        <div style={{ padding: '24px 20px 20px', display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{
            width: 72, height: 72,
            borderRadius: '50%',
            background: '#000',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <span style={{ fontSize: 28, fontWeight: 700, color: '#fff' }}>J</span>
          </div>
          <div>
            <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: -0.4 }}>Jamie Rivera</div>
            <div style={{ fontSize: 14, color: '#8E8E93', marginTop: 2 }}>@jamie.r</div>
          </div>
        </div>

        {/* Bio */}
        <div style={{ padding: '0 20px 20px' }}>
          <p style={{ fontSize: 15, color: '#000', margin: 0, lineHeight: 1.5, letterSpacing: -0.1 }}>
            Designer & builder. Interested in the intersection of motion and meaning.
          </p>
        </div>

        {/* Stats */}
        <div style={{
          display: 'flex',
          borderTop: '1px solid #F2F2F7',
          borderBottom: '1px solid #F2F2F7',
        }}>
          {stats.map((s, i) => (
            <div key={s.label} style={{
              flex: 1,
              padding: '14px 0',
              textAlign: 'center',
              borderRight: i < stats.length - 1 ? '1px solid #F2F2F7' : 'none',
            }}>
              <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: -0.4 }}>{s.value}</div>
              <div style={{ fontSize: 12, color: '#8E8E93', marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Follow button */}
        <div style={{ padding: '16px 20px' }}>
          <button style={{
            width: '100%',
            padding: '11px 0',
            background: '#000',
            color: '#fff',
            border: 'none',
            borderRadius: 10,
            fontSize: 15,
            fontWeight: 600,
            letterSpacing: -0.2,
          }}>
            Follow
          </button>
        </div>

        {/* Recent posts */}
        <div style={{ borderTop: '1px solid #F2F2F7' }}>
          <div style={{ padding: '14px 20px 6px' }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#8E8E93', letterSpacing: 0.4, textTransform: 'uppercase' }}>
              Recent
            </span>
          </div>
          {recentPosts.map((text, i) => (
            <div key={i}>
              <div style={{ padding: '13px 20px', fontSize: 15, letterSpacing: -0.1, lineHeight: 1.4 }}>
                {text}
              </div>
              {i < recentPosts.length - 1 && (
                <div style={{ height: 1, background: '#F2F2F7', margin: '0 20px' }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
