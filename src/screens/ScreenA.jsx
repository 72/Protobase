import NavHeader from '../components/NavHeader'
import ScrollView from '../components/ScrollView'

const posts = [
  { id: 1, handle: 'mia.chen', time: '2m', text: 'Shipping something small but meaningful today. The details matter.' },
  { id: 2, handle: 'jordan_k', time: '14m', text: 'Spent three hours on a transition that lasts 300ms. Worth it.' },
  { id: 3, handle: 'alex.w', time: '1h', text: 'Minimal isn\'t about removing things. It\'s about keeping only what earns its place.' },
  { id: 4, handle: 'priya.d', time: '2h', text: 'Good design is invisible. Great design is unforgettable.' },
  { id: 5, handle: 'sam_r', time: '4h', text: 'Motion is meaning. Every animation should have a reason.' },
]

function Avatar({ name }) {
  return (
    <div style={{
      width: 36, height: 36,
      borderRadius: '50%',
      background: '#000',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0,
    }}>
      <span style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>
        {name[0].toUpperCase()}
      </span>
    </div>
  )
}

function Post({ handle, time, text }) {
  return (
    <div style={{ padding: '14px 16px', display: 'flex', gap: 12 }}>
      <Avatar name={handle} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 4 }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: '#000' }}>{handle}</span>
          <span style={{ fontSize: 13, color: '#8E8E93' }}>{time}</span>
        </div>
        <p style={{ fontSize: 15, color: '#000', margin: 0, lineHeight: 1.45, letterSpacing: -0.1 }}>
          {text}
        </p>
        <div style={{ display: 'flex', gap: 16, marginTop: 10 }}>
          {['♡', '↺', '✈'].map(icon => (
            <button key={icon} style={{
              background: 'none', border: 'none',
              fontSize: 16, color: '#8E8E93', padding: 0,
            }}>
              {icon}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function ScreenA({ goBack, canGoBack }) {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ height: 50, flexShrink: 0 }} />
      <NavHeader title="Feed" canGoBack={canGoBack} onBack={goBack} />
      <ScrollView style={{ flex: 1, paddingBottom: 34 }}>
        {posts.map((post, i) => (
          <div key={post.id}>
            <Post {...post} />
            {i < posts.length - 1 && (
              <div style={{ height: 1, background: '#F2F2F7', margin: '0 16px' }} />
            )}
          </div>
        ))}
      </ScrollView>
    </div>
  )
}
