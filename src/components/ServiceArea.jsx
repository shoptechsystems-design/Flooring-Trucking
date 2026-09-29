import { Reveal, Lines, Eyebrow } from './Ui'
import { CITIES } from '../data/site'

// Stylized (not to scale) positions of Triad cities around Winston-Salem.
const NODES = [
  { name: 'Clemmons', x: 168, y: 214, lx: -8, ly: 26, anchor: 'end' },
  { name: 'Kernersville', x: 394, y: 196, lx: 14, ly: -10, anchor: 'start' },
  { name: 'Greensboro', x: 470, y: 268, lx: 14, ly: 5, anchor: 'start' },
  { name: 'High Point', x: 372, y: 322, lx: 14, ly: 18, anchor: 'start' },
  { name: 'Lexington', x: 236, y: 348, lx: -8, ly: 28, anchor: 'end' },
]
const HUB = { x: 280, y: 176 }

export function ServiceArea() {
  return (
    <section id="area" className="area">
      <div className="wrap area-grid">
        <div>
          <Eyebrow n="05">Service area</Eyebrow>
          <Lines className="h2" lines={['Proudly Serving', { text: 'Winston-Salem & The Triad', className: 'amber-d' }]} />
          <Reveal>
            <p className="lead">
              We serve Winston-Salem, Greensboro, High Point, Kernersville, Clemmons, Lexington and surrounding communities, with regional freight service throughout North Carolina and surrounding regional markets.
            </p>
          </Reveal>
          <Reveal className="city-list">
            {CITIES.map((c) => <div key={c}>{c}</div>)}
          </Reveal>
        </div>

        <Reveal delay={0.1} className="map">
          <svg viewBox="0 0 600 440" role="img" aria-label="Stylized map of Winston-Salem and nearby Triad cities">
            <defs>
              <pattern id="mg" width="32" height="32" patternUnits="userSpaceOnUse">
                <path d="M32 0H0V32" fill="none" stroke="#23262c" strokeWidth="1" />
              </pattern>
              <radialGradient id="mglow">
                <stop offset="0" stopColor="#e0a04a" stopOpacity=".32" />
                <stop offset="1" stopColor="#e0a04a" stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect width="600" height="440" fill="#14161a" />
            <rect width="600" height="440" fill="url(#mg)" />
            <circle cx={HUB.x} cy={HUB.y} r="210" fill="url(#mglow)" />
            {[70, 130, 190].map((r) => (
              <circle key={r} cx={HUB.x} cy={HUB.y} r={r} fill="none" stroke="#e0a04a" strokeOpacity=".14" strokeDasharray="3 7" />
            ))}
            {NODES.map((n, i) => (
              <path
                key={n.name}
                className="route"
                style={{ animationDelay: `${i * 0.35}s` }}
                d={`M${HUB.x} ${HUB.y} Q ${(HUB.x + n.x) / 2 + 20} ${(HUB.y + n.y) / 2 - 24} ${n.x} ${n.y}`}
                fill="none"
                stroke="#e0a04a"
                strokeOpacity=".8"
                strokeWidth="1.6"
                strokeDasharray="5 8"
              />
            ))}
            {NODES.map((n) => (
              <g key={n.name}>
                <circle cx={n.x} cy={n.y} r="6" fill="#e0a04a" />
                <text x={n.x + n.lx} y={n.y + n.ly} textAnchor={n.anchor} className="map-t">{n.name}</text>
              </g>
            ))}
            <circle className="pulse" cx={HUB.x} cy={HUB.y} r="10" fill="#e0a04a" />
            <circle cx={HUB.x} cy={HUB.y} r="11" fill="#e0a04a" stroke="#14161a" strokeWidth="4" />
            <text x={HUB.x} y={HUB.y - 24} textAnchor="middle" className="map-hub">Winston-Salem</text>
            <text x="24" y="416" className="map-cap">REGIONAL FREIGHT · NORTH CAROLINA · STYLIZED MAP</text>
          </svg>
        </Reveal>
      </div>
    </section>
  )
}
