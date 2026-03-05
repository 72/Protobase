import NavHeader from '../components/NavHeader'
import ScrollView from '../components/ScrollView'

const CONTACTS = [
  { letter: 'A', names: ['Aiko Tanaka', 'Alex Turner', 'Amara Osei', 'Andre Dubois', 'Anya Petrova'] },
  { letter: 'B', names: ['Beatriz Lima', 'Bianca Flores', 'Blake Morrison', 'Bo Zhang'] },
  { letter: 'C', names: ['Carlos Mendez', 'Chloe Park', 'Clara Jensen', 'Connor Walsh'] },
  { letter: 'D', names: ['Dana Lee', 'David Kim', 'Diana Ruiz', 'Dmitri Volkov'] },
  { letter: 'E', names: ['Elena Rodriguez', 'Elijah Okafor', 'Emma Svensson', 'Ethan Brooks'] },
  { letter: 'F', names: ['Fatima Al-Hassan', 'Felix Wagner', 'Finn Larsen'] },
  { letter: 'G', names: ['Grace Nakamura', 'Guillermo Santos', 'Guo Wei'] },
  { letter: 'H', names: ['Hannah Johansson', 'Hiroshi Tanaka', 'Hugo Bernard'] },
  { letter: 'I', names: ['Isabel Costa', 'Ivan Novak'] },
  { letter: 'J', names: ['Jade Thompson', 'James Liu', 'Jess Müller', 'Ji-ho Park', 'Jonas Weber'] },
  { letter: 'K', names: ['Karan Patel', 'Kira Novak', 'Kwame Asante'] },
  { letter: 'L', names: ['Layla Ahmed', 'Leo Fernandez', 'Liam Chen', 'Lucia Romano'] },
  { letter: 'M', names: ['Marco Rossi', 'Maya Singh', 'Mei-Ling Wu', 'Mia Chen', 'Milan Kovač'] },
  { letter: 'N', names: ['Nadia Kowalski', 'Nala Diop', 'Noah Williams'] },
  { letter: 'O', names: ['Oliver Grant', 'Olivia Watanabe', 'Omar Hassan'] },
  { letter: 'P', names: ['Pablo Moreno', 'Priya Sharma'] },
  { letter: 'R', names: ['Rachel Kim', 'Ravi Mehta', 'Rin Yamamoto'] },
  { letter: 'S', names: ['Samuel Okafor', 'Sara Nielsen', 'Seo-yeon Choi', 'Sofia Larsson'] },
  { letter: 'T', names: ['Tae-yang Park', 'Tariq Hassan', 'Thijs van Dijk'] },
  { letter: 'V', names: ['Valentina Cruz', 'Victor Lebedev'] },
  { letter: 'W', names: ['Wei Zhang', 'William Scott'] },
  { letter: 'Y', names: ['Yuki Inoue', 'Yusuf Adebayo'] },
  { letter: 'Z', names: ['Zara Ibrahim', 'Zoe Mitchell'] },
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
      <span style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>
        {name[0]}
      </span>
    </div>
  )
}

export default function ScreenC({ goBack, canGoBack }) {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ height: 50, flexShrink: 0 }} />
      <NavHeader title="Contacts" canGoBack={canGoBack} onBack={goBack} />

      <ScrollView style={{ flex: 1, paddingBottom: 34 }}>
        {CONTACTS.map(({ letter, names }) => (
          <div key={letter}>
            {/* Section header */}
            <div style={{
              padding: '6px 20px 4px',
              background: '#F7F7F7',
              borderBottom: '1px solid #F2F2F7',
            }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#8E8E93', letterSpacing: 0.2 }}>
                {letter}
              </span>
            </div>

            {/* Contacts in section */}
            {names.map((name, i) => (
              <div key={name}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 20px' }}>
                  <Avatar name={name} />
                  <span style={{ fontSize: 16, letterSpacing: -0.2 }}>{name}</span>
                </div>
                {i < names.length - 1 && (
                  <div style={{ height: 1, background: '#F2F2F7', margin: '0 20px 0 68px' }} />
                )}
              </div>
            ))}
          </div>
        ))}
      </ScrollView>
    </div>
  )
}
