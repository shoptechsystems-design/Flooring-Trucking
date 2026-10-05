function Eyebrow({ children, light = false }) {
  return <p className={`eyebrow${light ? ' eyebrow-light' : ''}`}><span className="eyebrow-line" />{children}</p>;
}

function FreightButton({ href = '#freight-form', children = 'Get a Freight Quote' }) {
  return <a className="button button-copper" href={href}>{children} <span aria-hidden="true">↗</span></a>;
}

function VehicleSvg({ van = false }) {
  return (
    <svg viewBox="0 0 64 48" aria-hidden="true">
      {van ? <path d="M6 12h35v23H6zM41 19h10l8 9v7H41zM46 22v6h11" /> : <path d="M5 7h35v28H5zM40 17h11l9 10v8H40zM45 20v8h13" />}
      <circle cx="17" cy="39" r="5" /><circle cx="50" cy="39" r="5" />
    </svg>
  );
}

export function PinIcon() {
  return <svg className="line-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></svg>;
}

export function PhoneIcon() {
  return <svg className="line-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" /></svg>;
}

function ShieldIcon() {
  return <svg className="line-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6z" /><path d="m9 12 2 2 4-4" /></svg>;
}

export function HeroSection() {
  return (
    <section className="hero section-shell hero-transport" id="home" aria-labelledby="hero-title">
      <div className="hero-copy">
        <Eyebrow>Professional transportation company · Winston-Salem, NC</Eyebrow>
        <h1 id="hero-title">Local freight.<br /><span>Regional reach.</span></h1>
        <p className="hero-lede">Box truck and Sprinter van transportation for local, regional, expedited and dedicated freight. Based in Winston-Salem, North Carolina.</p>
        <div className="hero-actions">
          <FreightButton />
          <a className="button button-outline button-call" href="tel:+13369556193"><PhoneIcon /> Call 336-955-6193</a>
        </div>
        <p className="hero-credentials"><ShieldIcon /><b>Licensed carrier</b><span>USDOT 4327224 · MC-1689088</span></p>
        <div className="hero-specs" aria-label="Equipment specifications">
          <div className="hero-spec">
            <span className="hero-spec-icon" aria-hidden="true"><VehicleSvg /></span>
            <div>
              <h2>26-Ft Box Truck</h2>
              <ul><li>26 feet long</li><li>Door opening: 96″ W × 96″ H</li></ul>
              <p>Box truck transportation for local, regional, expedited and dedicated freight.</p>
            </div>
          </div>
          <div className="hero-spec">
            <span className="hero-spec-icon" aria-hidden="true"><VehicleSvg van /></span>
            <div>
              <h2>Sprinter Van</h2>
              <ul><li>Cargo length: 126″</li><li>Cargo width: 55″</li><li>Cargo height: 72″</li></ul>
              <p>Sprinter van transportation for smaller and expedited freight.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="hero-visual" data-depth-scene>
        <div className="visual-backplate" aria-hidden="true" />
        <div className="hero-photo-frame hero-dual-frame">
          <div className="hero-vehicle-pane hero-pane-truck">
            <img
              src="/images/lil-man-big-van-box-truck.jpg"
              width="1600"
              height="1200"
              sizes="(max-width: 620px) calc(100vw - 50px), (max-width: 900px) min(calc(100vw - 64px), 680px), (max-width: 1120px) 42vw, min(44vw, 620px)"
              alt="Lil Man Big Van's 26-foot box truck, marked MC#1689088 and DOT#4327224, parked in Winston-Salem, NC."
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
          </div>
          <div className="hero-pane-divider" aria-hidden="true" />
          <div className="hero-vehicle-pane hero-pane-van">
            <img
              src="/images/lil-man-big-van-sprinter-hd.jpg"
              width="1200"
              height="900"
              sizes="(max-width: 620px) calc(100vw - 50px), (max-width: 900px) min(calc(100vw - 64px), 680px), (max-width: 1120px) 42vw, min(44vw, 620px)"
              alt="Lil Man Big Van's Sprinter van for smaller and expedited freight."
              loading="eager"
              decoding="async"
            />
          </div>
        </div>
        <div className="visual-stamp" aria-label="Local and regional transportation"><span>LOCAL</span><i aria-hidden="true" /><span>REGIONAL</span></div>
        <div className="float-card float-card-top"><span className="float-icon" aria-hidden="true"><VehicleSvg /></span><span><b>26 FT BOX TRUCK</b><small>96″ W × 96″ H door</small></span></div>
        <div className="float-card float-card-bottom"><span className="float-icon transport-van-icon" aria-hidden="true"><VehicleSvg van /></span><span><b>SPRINTER VAN</b><small>126″ L cargo area</small></span></div>
      </div>
      <a className="scroll-cue" href="#equipment"><span>Explore equipment</span><i aria-hidden="true">↓</i></a>
    </section>
  );
}

export function EquipmentSection() {
  return (
    <section className="freight-section section-pad" id="freight" aria-labelledby="freight-title">
      <span className="anchor-target" id="equipment" aria-hidden="true" />
      <div className="section-shell">
        <div className="freight-head section-heading-row">
          <div><Eyebrow>Equipment options</Eyebrow><h2 id="freight-title">Capacity for the load.<br /><em>Fit for the route.</em></h2></div>
          <p className="heading-aside">Tell us what you’re moving, where it’s going and when. We’ll review the shipment details and the equipment request with you.</p>
        </div>
        <div className="freight-showcase equipment-showcase">
          <div className="vehicle-grid">
            <article className="vehicle-card vehicle-box tilt-card">
              <span className="vehicle-label">26-FOOT BOX TRUCK · HIGH CAPACITY</span>
              <div className="vehicle-icon" aria-hidden="true"><VehicleSvg /></div>
              <h3>26-ft box truck</h3>
              <dl className="vehicle-specs">
                <div><dt>Box length</dt><dd>26 ft</dd></div>
                <div><dt>Door opening</dt><dd>96″ W × 96″ H</dd></div>
              </dl>
              <p>Box truck transportation for local, regional, expedited and dedicated freight, including palletized shipments.</p>
              <a href="#freight-form" className="text-link">Ask about box-truck capacity <span aria-hidden="true">→</span></a>
            </article>
            <article className="vehicle-card vehicle-van tilt-card">
              <span className="vehicle-label">SPRINTER VAN · FLEXIBLE OPTION</span>
              <div className="vehicle-icon" aria-hidden="true"><VehicleSvg van /></div>
              <h3>Sprinter van</h3>
              <dl className="vehicle-specs">
                <div><dt>Cargo length</dt><dd>126″</dd></div>
                <div><dt>Cargo width</dt><dd>55″</dd></div>
                <div><dt>Cargo height</dt><dd>72″</dd></div>
              </dl>
              <p>Sprinter van transportation for smaller and expedited freight.</p>
              <a href="#freight-form" className="text-link">Ask about Sprinter capacity <span aria-hidden="true">→</span></a>
            </article>
          </div>
        </div>
        <div className="freight-capabilities"><span>Local &amp; regional</span><span>Palletized shipments</span><span>Expedited transportation</span><span>Dedicated loads</span><span>Equipment fit by shipment</span></div>
        <div className="equipment-action"><p>Not sure which option fits? Share the pickup, delivery and load details.</p><FreightButton>Request a Freight Quote</FreightButton></div>
      </div>
    </section>
  );
}

const services = [
  {
    number: '01 / LOCAL & REGIONAL', eyebrow: 'Local & regional freight', title: <>From the Triad<br />to regional lanes.</>,
    body: 'Transportation for local and regional deliveries, with pickup and delivery details reviewed for each load.',
    tags: ['Winston-Salem', 'Triad', 'Regional routes'], link: 'Get a Freight Quote', href: '#freight-form', variant: 'truck',
  },
  {
    number: '02 / EXPEDITED', eyebrow: 'Expedited transportation', title: <>Time-sensitive<br />freight.</>,
    body: 'Ask about box-truck or Sprinter-van options for smaller shipments and time-sensitive transportation.',
    tags: ['Expedited', 'Sprinter van', 'Box truck'], link: 'Share your timeline', href: '#freight-form', variant: 'bolt',
  },
  {
    number: '03 / DEDICATED LOADS', eyebrow: 'Dedicated freight', title: <>Capacity for<br />your load.</>,
    body: 'Share the shipment size, pickup, delivery and timing so the transportation request can be reviewed against the load.',
    tags: ['Dedicated loads', 'Load details', 'Route review'], link: 'Discuss a dedicated load', href: '#freight-form', variant: 'load',
  },
];

function ServiceIcon({ variant }) {
  if (variant === 'load') return <svg viewBox="0 0 64 48"><path d="M7 9h50v29H7zM16 17h32M16 24h22M16 31h27" /><circle cx="14" cy="39" r="4" /><circle cx="50" cy="39" r="4" /></svg>;
  return <svg viewBox="0 0 64 48"><path d="M5 8h32v26H5zM37 17h12l10 10v7H37zM42 20v8h12" />{variant === 'bolt' && <path d="m28 15-8 12h8l-3 9 12-15h-9z" />}<circle cx="18" cy="37" r="5" /><circle cx="49" cy="37" r="5" /></svg>;
}

export function FreightServicesSection() {
  return (
    <section className="service-selector section-pad transport-services" id="services" aria-labelledby="services-title">
      <span className="anchor-target" id="transportation" aria-hidden="true" />
      <div className="section-shell">
        <div className="section-heading section-heading-row">
          <div><Eyebrow>Freight services</Eyebrow><h2 id="services-title">The route, the load,<br /><em>the right approach.</em></h2></div>
          <p className="heading-aside">A transportation-first operation serving Winston-Salem, the Triad and regional freight lanes. Start with the shipment details and the route.</p>
        </div>
        <div className="service-grid service-grid-transport">
          {services.map((service) => (
            <article key={service.number} className={`service-card service-card-freight tilt-card${service.variant === 'bolt' ? ' service-card-expedited' : ''}${service.variant === 'load' ? ' service-card-dedicated' : ''}`}>
              <div className="card-topline"><span className="service-number">{service.number}</span><span className="card-arrow" aria-hidden="true">↗</span></div>
              <div className="service-card-icon truck-icon" aria-hidden="true"><ServiceIcon variant={service.variant} /></div>
              <p className="eyebrow">{service.eyebrow}</p>
              <h3>{service.title}</h3>
              <p>{service.body}</p>
              <ul className="service-tags">{service.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
              <a className="text-link" href={service.href}>{service.link} <span aria-hidden="true">→</span></a>
            </article>
          ))}
        </div>
        <div className="selector-note"><span className="note-rule" aria-hidden="true" />Transportation first. Clear details before the move.</div>
      </div>
    </section>
  );
}

const processSteps = [
  ['01', 'Share the load', 'Send the details', 'Pickup, delivery, timing, shipment size and any equipment request.'],
  ['02', 'Review the fit', 'Discuss the route', 'Review the requested box truck or Sprinter van option against the shipment.'],
  ['03', 'Confirm details', 'Agree the plan', 'Confirm the pickup and delivery details before moving ahead.'],
];

export function ProcessSection() {
  return (
    <section className="process-section section-pad trucking-process" aria-labelledby="process-title">
      <div className="section-shell">
        <div className="section-heading section-heading-center">
          <Eyebrow>Straightforward from here</Eyebrow>
          <h2 id="process-title">Clear next steps.<br /><em>Before the move.</em></h2>
          <p className="heading-aside">Three steps from your first message to a confirmed pickup.</p>
        </div>
        <ol className="process-timeline">
          {processSteps.map(([number, title, step, body]) => (
            <li key={number}>
              <span className="timeline-dot" aria-hidden="true">{number}</span>
              <h3>{title}</h3>
              <b>{step}</b>
              <p>{body}</p>
            </li>
          ))}
        </ol>
        <div className="process-action"><FreightButton>Start with step 01</FreightButton></div>
      </div>
    </section>
  );
}

const areaFacts = [
  [<PinIcon />, 'Home base', 'Winston-Salem, NC'],
  [<VehicleSvg />, 'Equipment', '26-ft box truck & Sprinter van'],
  [<ShieldIcon />, 'Licensed carrier', 'USDOT 4327224 · MC-1689088'],
];

const mapRoutes = [
  'M178 114L303 168L386 216L468 119',
  'M303 168L274 250L177 286',
  'M303 168L372 295',
  'M178 114L177 286',
  'M386 216L372 295',
];

const mapPins = [
  ['pin-ws', 'Winston-Salem', 'HOME BASE'],
  ['pin-greensboro', 'Greensboro'],
  ['pin-highpoint', 'High Point'],
  ['pin-kernersville', 'Kernersville'],
  ['pin-clemmons', 'Clemmons'],
  ['pin-lexington', 'Lexington'],
];

const communities =['Winston-Salem', 'Greensboro', 'High Point', 'Kernersville', 'Clemmons', 'Lexington', 'Surrounding communities'];

export function ServiceAreaSection() {
  return (
    <section className="service-area-section section-pad" id="service-area" aria-labelledby="area-title">
      <span className="anchor-target" id="about" aria-hidden="true" />
      <div className="section-shell area-layout">
        <div className="area-copy">
          <Eyebrow>About Lil Man Big Van</Eyebrow>
          <h2 id="area-title">Based in Winston-Salem.<br /><em>Moving around the Triad.</em></h2>
          <p>Flooring For All DBA Lil Man Big Van is a Winston-Salem, NC carrier running local and regional freight across the Triad and surrounding communities. Have a route outside the area? Send it over and we’ll review it.</p>
          <ul className="area-facts">
            {areaFacts.map(([icon, label, value]) => <li key={label}><span className="area-fact-icon" aria-hidden="true">{icon}</span><span><small>{label}</small><b>{value}</b></span></li>)}
          </ul>
          <div className="area-chips">{communities.map((place) => <span key={place}>{place}</span>)}</div>
        </div>
        <div className="area-map area-map-3d" data-depth-scene role="img" aria-label="Schematic map of service communities in the Winston-Salem and Triad area; not to scale">
          <span className="map-kicker">THE PIEDMONT TRIAD <i>·</i> NORTH CAROLINA</span>
          <div className="map-plane" aria-hidden="true">
            <svg viewBox="0 0 620 410" className="map-lines">
              <path d="M178 114L303 168L386 216L468 119M303 168L274 250L177 286M303 168L372 295M178 114L177 286M386 216L372 295" />
              {mapRoutes.map((route, index) => <path key={route} className="map-route" d={route} pathLength="1" style={{ '--d': index }} />)}
              <circle cx="178" cy="114" r="4" /><circle cx="303" cy="168" r="4" /><circle cx="386" cy="216" r="4" /><circle cx="468" cy="119" r="4" /><circle cx="274" cy="250" r="4" /><circle cx="177" cy="286" r="4" /><circle cx="372" cy="295" r="4" />
            </svg>
            {mapPins.map(([className, name, note], index) => (
              <span key={name} className={`map-pin ${className}`} style={{ '--d': index }}><i /><b>{name}</b>{note && <small>{note}</small>}</span>
            ))}
          </div>
          <span className="map-legend"><i /> Triad service communities</span>
          <small className="map-disclaimer">Schematic map · not to scale</small>
        </div>
      </div>
    </section>
  );
}
