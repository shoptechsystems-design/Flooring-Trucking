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

export function HeroSection() {
  return (
    <section className="hero section-shell hero-transport" id="home" aria-labelledby="hero-title">
      <div className="hero-copy">
        <Eyebrow>Professional transportation company · Winston-Salem, NC</Eyebrow>
        <h1 id="hero-title">Local freight.<br /><span>Regional reach.</span></h1>
        <p className="hero-lede">Box truck and Sprinter van transportation for local, regional, expedited and dedicated freight. Based in Winston-Salem, North Carolina.</p>
        <div className="hero-actions">
          <FreightButton />
          <a className="button button-outline" href="tel:+18176784346">Call 817-678-4346 <span aria-hidden="true">↗</span></a>
        </div>
        <div className="hero-footnote">
          <span className="hero-footnote-icon" aria-hidden="true">⌖</span>
          <span>Local knowledge. Regional capacity.<br /><b>26-ft yellow box truck + Sprinter van options</b></span>
        </div>
      </div>
      <div className="hero-visual">
        <div className="visual-backplate" aria-hidden="true" />
        <div className="hero-photo-frame">
          <img
            src="/manus-storage/async-images/88czKL4eumaobPy5b8YvaF/image-1.webp"
            width="1024"
            height="768"
            sizes="(max-width: 620px) calc(100vw - 50px), (max-width: 900px) min(calc(100vw - 64px), 680px), (max-width: 1120px) 42vw, min(44vw, 620px)"
            alt="Illustrative concept render of an unbranded yellow 26-foot box truck; not a photo of the client's fleet."
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
          <span className="photo-caption"><span className="caption-mark" aria-hidden="true" /> Illustrative vehicle — not client fleet photo.</span>
        </div>
        <div className="visual-stamp" aria-label="Local and regional transportation"><span>LOCAL</span><i aria-hidden="true" /><span>REGIONAL</span></div>
        <div className="float-card float-card-top"><span className="float-icon" aria-hidden="true">▰</span><span><b>26 FT BOX TRUCK</b><small>Yellow truck option</small></span></div>
        <div className="float-card float-card-bottom"><span className="float-icon transport-van-icon" aria-hidden="true">▱</span><span><b>SPRINTER VAN</b><small>Smaller &amp; time-sensitive loads</small></span></div>
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
              <span className="vehicle-label">26-FOOT BOX TRUCK · YELLOW</span>
              <div className="vehicle-icon" aria-hidden="true"><VehicleSvg /></div>
              <h3>Yellow 26-foot box truck</h3>
              <p>For large-capacity freight, palletized shipments, local and regional deliveries, expedited transportation and dedicated loads.</p>
              <a href="#freight-form" className="text-link">Ask about box-truck capacity <span aria-hidden="true">→</span></a>
            </article>
            <article className="vehicle-card vehicle-van tilt-card">
              <span className="vehicle-label">SPRINTER VAN · FLEXIBLE OPTION</span>
              <div className="vehicle-icon" aria-hidden="true"><VehicleSvg van /></div>
              <h3>Sprinter van</h3>
              <p>For expedited freight, smaller and time-sensitive shipments, and local and regional transportation.</p>
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
        <div className="section-heading section-heading-row">
          <div><Eyebrow>Straightforward from here</Eyebrow><h2 id="process-title">Clear next steps.<br /><em>Before the move.</em></h2></div>
          <p className="heading-aside">Keep the conversation focused on the route, the shipment and the equipment being requested.</p>
        </div>
        <div className="process-grid process-grid-transport">
          {processSteps.map(([number, title, step, body]) => (
            <div className="process-track process-track-freight" key={number}>
              <h3><span className="process-icon" aria-hidden="true">{number}</span>{title}</h3>
              <ol><li><span className="process-number">{number}</span><div><b>{step}</b><p>{body}</p></div></li></ol>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AboutSection() {
  const proof = [
    ['⌖', '01 / HOME BASE', 'Winston-Salem, NC', 'Transportation from a local Triad base, with regional freight service available by route.'],
    ['▰', '02 / EQUIPMENT', 'Two equipment options', 'A 26-foot yellow box truck and a Sprinter van option for different shipment needs.'],
    ['↗', '03 / NEXT STEP', 'Talk through the load', 'Use the freight quote form or call 817-678-4346 to share shipment details.'],
  ];
  return (
    <section className="why-section section-pad transport-about" id="about" aria-labelledby="why-title">
      <div className="section-shell">
        <div className="section-heading section-heading-row">
          <div><Eyebrow>About Lil Man Big Van</Eyebrow><h2 id="why-title">Winston-Salem roots.<br /><em>Freight first.</em></h2></div>
          <p className="heading-aside">Flooring For All DBA Lil Man Big Van is based in Winston-Salem, North Carolina. This section leads with transportation; Flooring Services is presented separately below.</p>
        </div>
        <div className="why-grid transport-proof-grid">
          {proof.map(([icon, index, title, body]) => <article className="why-card" key={index}><span className="why-icon" aria-hidden="true">{icon}</span><span className="why-index">{index}</span><h3>{title}</h3><p>{body}</p></article>)}
        </div>
      </div>
    </section>
  );
}

const communities = ['Winston-Salem', 'Greensboro', 'High Point', 'Kernersville', 'Clemmons', 'Lexington', 'Surrounding communities'];

export function ServiceAreaSection() {
  return (
    <section className="service-area-section section-pad" id="service-area" aria-labelledby="area-title">
      <div className="section-shell area-layout">
        <div className="area-copy">
          <Eyebrow>Freight from the Piedmont Triad</Eyebrow>
          <h2 id="area-title">Based in Winston-Salem.<br /><em>Moving around the Triad.</em></h2>
          <p>Local and regional transportation from Winston-Salem, serving the Triad and surrounding communities. Share routes outside the area for a freight-service review.</p>
          <div className="area-chips">{communities.map((place) => <span key={place}>{place}</span>)}</div>
        </div>
        <div className="area-map" role="img" aria-label="Schematic map of service communities in the Winston-Salem and Triad area; not to scale">
          <span className="map-kicker">THE PIEDMONT TRIAD <i>·</i> NORTH CAROLINA</span>
          <svg viewBox="0 0 620 410" className="map-lines" aria-hidden="true">
            <path d="M178 114L303 168L386 216L468 119M303 168L274 250L177 286M303 168L372 295M178 114L177 286M386 216L372 295" />
            <circle cx="178" cy="114" r="4" /><circle cx="303" cy="168" r="4" /><circle cx="386" cy="216" r="4" /><circle cx="468" cy="119" r="4" /><circle cx="274" cy="250" r="4" /><circle cx="177" cy="286" r="4" /><circle cx="372" cy="295" r="4" />
          </svg>
          <span className="map-pin pin-ws"><i /><b>Winston-Salem</b><small>HOME BASE</small></span>
          <span className="map-pin pin-greensboro"><i /><b>Greensboro</b></span>
          <span className="map-pin pin-highpoint"><i /><b>High Point</b></span>
          <span className="map-pin pin-kernersville"><i /><b>Kernersville</b></span>
          <span className="map-pin pin-clemmons"><i /><b>Clemmons</b></span>
          <span className="map-pin pin-lexington"><i /><b>Lexington</b></span>
          <span className="map-legend"><i /> Triad service communities</span>
          <small className="map-disclaimer">Schematic map · not to scale</small>
        </div>
      </div>
    </section>
  );
}
