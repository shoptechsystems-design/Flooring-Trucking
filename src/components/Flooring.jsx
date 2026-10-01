import { useMemo, useState } from 'react';

const finishTones = [
  { id: 'natural', name: 'Natural Oak', swatch: 'tone-natural' },
  { id: 'honey', name: 'Warm Honey', swatch: 'tone-honey' },
  { id: 'ash', name: 'Quiet Ash', swatch: 'tone-ash' },
  { id: 'walnut', name: 'Smoked Walnut', swatch: 'tone-walnut' },
];

const floorServices = [
  ['01', 'New LVP installation', 'Installation of luxury vinyl plank flooring in residential and commercial spaces.'],
  ['02', 'LVP removal', 'Removal of existing LVP when a space is ready to be replaced or renovated.'],
  ['03', 'Glue-down flooring removal', 'Removal of adhered flooring so the area can be reviewed for the next stage.'],
  ['04', 'Hardwood & adhered flooring removal', 'Removal of hardwood or other flooring installed with adhesive, after project-scope review.'],
  ['05', 'Carpet removal', 'Carpet removal for residential and commercial spaces.'],
  ['06', 'Flooring demolition & tear-out', 'Flooring demolition and removal before new flooring.'],
  ['07', 'Subfloor preparation', 'Prepare the existing surface so new flooring can be installed properly.'],
];

function Eyebrow({ children }) {
  return <p className="eyebrow"><span className="eyebrow-line" />{children}</p>;
}

export function FlooringServicesSection() {
  return (
    <section className="flooring-section section-pad" id="flooring" aria-labelledby="flooring-title">
      <div className="section-shell">
        <div className="flooring-intro section-heading-row">
          <div><Eyebrow>Our other service · Flooring For All</Eyebrow><h2 id="flooring-title">Flooring Services<br />from tear-out to <em>install.</em></h2></div>
          <p className="heading-aside">A separate flooring service for LVP installation, removal, flooring demolition and preparation. Tell us what is in the space and what you want to change.</p>
        </div>
        <div className="flooring-feature">
          <figure className="feature-photo flooring-photo">
            <img
              src="/manus-storage/floor-960_b1c43128.webp"
              srcSet="/manus-storage/floor-480_d83d444f.webp 480w, /manus-storage/floor-960_b1c43128.webp 960w, /manus-storage/floor-1280_37802a64.webp 1280w"
              sizes="(max-width: 620px) calc(100vw - 36px), (max-width: 900px) 45vw, (max-width: 1320px) 45vw, 620px"
              width="1280"
              height="960"
              alt="Illustrative interior featuring luxury vinyl plank flooring; not a photo of a completed Flooring For All customer project."
              loading="lazy"
              decoding="async"
            />
            <figcaption><span>ILLUSTRATIVE IMAGE · NOT A CUSTOMER PROJECT</span><b>A fresh foundation<br />for every room.</b></figcaption>
          </figure>
          <div className="flooring-details">
            <p className="body-large">From careful removal to a clean, professional installation, we handle the steps that make a floor feel finished.</p>
            <div className="flooring-service-list">
              {floorServices.map(([index, title, body]) => <article key={index}><span className="detail-index">{index}</span><div><h3>{title}</h3><p>{body}</p></div></article>)}
            </div>
            <a className="button button-copper" href="#flooring-form">Get a Free Flooring Estimate <span aria-hidden="true">↗</span></a>
          </div>
        </div>
        <div className="flooring-lower-note">
          <span className="flooring-note-icon" aria-hidden="true">✳</span>
          <p><b>A separate flooring service</b><br />Tell us about the space and what needs to come out.</p>
          <a className="text-link" href="#flooring-visualizer">Try the Flooring Visualizer <span aria-hidden="true">→</span></a>
        </div>
      </div>
    </section>
  );
}

const formatArea = (value) => new Intl.NumberFormat('en-US', { maximumFractionDigits: 1 }).format(Math.round(value * 10) / 10);

export function FlooringVisualizer({ onUseEstimate }) {
  const [selectedTone, setSelectedTone] = useState('natural');
  const [length, setLength] = useState('12');
  const [width, setWidth] = useState('14');
  const [waste, setWaste] = useState('10');
  const [coverage, setCoverage] = useState('');
  const [liveMessage, setLiveMessage] = useState('');
  const selectedToneData = finishTones.find((tone) => tone.id === selectedTone) ?? finishTones[0];

  const estimate = useMemo(() => {
    const lengthFt = length.trim() ? Number(length) : Number.NaN;
    const widthFt = width.trim() ? Number(width) : Number.NaN;
    const wastePercent = Math.min(20, Math.max(0, Number(waste) || 0));
    const dimensionsValid = Number.isFinite(lengthFt) && Number.isFinite(widthFt)
      && lengthFt > 0 && widthFt > 0 && lengthFt <= 1000 && widthFt <= 1000;
    if (!dimensionsValid) return null;

    const roomArea = lengthFt * widthFt;
    const plannedArea = roomArea * (1 + wastePercent / 100);
    const hasCoverage = Boolean(coverage.trim());
    const coverageSqFt = hasCoverage ? Number(coverage) : Number.NaN;
    const coverageStepValid = !hasCoverage || Math.abs(coverageSqFt * 10 - Math.round(coverageSqFt * 10)) < 1e-8;
    const coverageValid = !hasCoverage || (Number.isFinite(coverageSqFt) && coverageSqFt >= 1 && coverageSqFt <= 1000 && coverageStepValid);
    const cartons = hasCoverage && coverageValid ? Math.ceil(plannedArea / coverageSqFt) : null;
    return { length: lengthFt, width: widthFt, waste: wastePercent, roomArea, plannedArea, coverage: coverageSqFt, cartons, coverageValid, tone: selectedToneData.name };
  }, [length, width, waste, coverage, selectedToneData.name]);

  const announceEstimate = () => {
    if (!estimate) {
      setLiveMessage('Enter a positive room length and width in feet to calculate a planning estimate.');
      return;
    }
    const cartonText = !estimate.coverageValid
      ? 'Check the package coverage value to calculate cartons.'
      : estimate.cartons === null
        ? 'Enter package coverage if you want an optional carton count.'
        : `Estimated cartons: ${estimate.cartons}.`;
    setLiveMessage(`${estimate.tone} illustrative tone. Room area ${formatArea(estimate.roomArea)} square feet; with ${estimate.waste}% planning allowance, ${formatArea(estimate.plannedArea)} square feet to plan. ${cartonText}`);
  };

  const handleUseEstimate = () => {
    if (!estimate) return;
    onUseEstimate(estimate);
    setLiveMessage('Your planning notes are in the flooring estimate form. Review and edit them before requesting your quote.');
  };

  const handleReset = () => {
    setLength('12');
    setWidth('14');
    setWaste('10');
    setCoverage('');
    setSelectedTone('natural');
    setLiveMessage('Planning example reset to 12 by 14 feet with a 10% material allowance.');
    document.getElementById('visualizer-length')?.focus();
  };

  return (
    <section className="flooring-visualizer-section" id="flooring-visualizer" aria-labelledby="visualizer-title">
      <div className="section-shell">
        <div className="visualizer-heading section-heading-row">
          <div><Eyebrow>A more useful first step</Eyebrow><h2 id="visualizer-title">See a new floor<br />in a new <em>light.</em></h2></div>
          <p className="heading-aside">Preview a few wood tones, measure your room and get a simple materials-planning estimate. No product guesswork and no made-up prices.</p>
        </div>
        <div className="visualizer-card" data-flooring-visualizer>
          <div className="visualizer-preview">
            <div className="visualizer-preview-topline"><span><i aria-hidden="true" />LIVE ROOM PREVIEW</span><span>ILLUSTRATIVE FINISH</span></div>
            <div className="visualizer-room" data-floor-tone={selectedTone} role="img" aria-label={`Illustrative three-dimensional room with a ${selectedToneData.name} LVP floor; visual tone only, not an exact product sample.`}>
              <div className="room-wall" aria-hidden="true" />
              <div className="room-window" aria-hidden="true" />
              <div className="room-sunlight" aria-hidden="true" />
              <div className="room-baseboard" aria-hidden="true" />
              <div className="room-floor" aria-hidden="true" />
              <div className="room-planter" aria-hidden="true"><i /><i /><i /><b /></div>
              <span className="room-finish-label"><small>SELECTED LOOK</small><b>{selectedToneData.name}</b></span>
            </div>
            <p className="visualizer-preview-note">Color and grain are mood previews—not exact flooring samples or a product catalog.</p>
          </div>

          <div className="visualizer-panel">
            <div className="visualizer-panel-heading"><p>MAKE IT YOURS</p><h3>Choose a look.<br />Measure your room.</h3></div>
            <fieldset className="visualizer-fieldset">
              <legend>Preview a wood tone <small>Illustrative</small></legend>
              <div className="visualizer-tone-options" role="group" aria-label="Choose an illustrative LVP flooring tone">
                {finishTones.map((tone) => (
                  <button className={`tone-choice${selectedTone === tone.id ? ' is-selected' : ''}`} key={tone.id} type="button" data-floor-tone={tone.id} data-tone-name={tone.name} aria-pressed={selectedTone === tone.id} onClick={() => { setSelectedTone(tone.id); setLiveMessage(`${tone.name} selected as an illustrative finish tone.`); }}>
                    <span className={`tone-swatch ${tone.swatch}`} aria-hidden="true" /><span>{tone.name}</span>
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="visualizer-dimensions">
              <div className="visualizer-subheading"><h4>Room dimensions</h4><p>Example: 12 × 14 ft. Edit to match your room.</p></div>
              <div className="visualizer-input-row">
                <label>Length <span>(ft)</span><input id="visualizer-length" type="number" inputMode="decimal" min="0.1" max="1000" step="0.1" value={length} aria-label="Room length in feet" onChange={(event) => setLength(event.target.value)} onBlur={announceEstimate} /></label>
                <label>Width <span>(ft)</span><input id="visualizer-width" type="number" inputMode="decimal" min="0.1" max="1000" step="0.1" value={width} aria-label="Room width in feet" onChange={(event) => setWidth(event.target.value)} onBlur={announceEstimate} /></label>
              </div>
            </div>

            <label className="visualizer-range-label" htmlFor="visualizer-waste">
              <span>Material allowance <output id="visualizer-waste-value" htmlFor="visualizer-waste">{waste}%</output></span>
              <input id="visualizer-waste" type="range" min="0" max="20" step="1" value={waste} onChange={(event) => setWaste(event.target.value)} onBlur={announceEstimate} />
              <small>Adjust the planning allowance from 0% to 20%.</small>
            </label>
            <label className="visualizer-coverage-label" htmlFor="visualizer-coverage">Coverage per carton <span>(sq ft, optional)</span>
              <input id="visualizer-coverage" type="number" inputMode="decimal" min="1" max="1000" step="0.1" placeholder="Check your product packaging" value={coverage} onChange={(event) => setCoverage(event.target.value)} onBlur={announceEstimate} />
              <small>Enter the coverage listed on the product box to estimate carton count.</small>
            </label>

            <div className="visualizer-results" role="group" aria-label="Flooring material planning estimate">
              <article><span>Room area</span><strong><output id="visualizer-room-area">{estimate ? formatArea(estimate.roomArea) : '—'}</output></strong><small>sq ft</small></article>
              <article className="visualizer-result-highlight"><span>With allowance</span><strong><output id="visualizer-order-area">{estimate ? formatArea(estimate.plannedArea) : '—'}</output></strong><small>sq ft to plan</small></article>
              <article><span>Cartons</span><strong className="carton-count"><output id="visualizer-cartons">{!estimate ? '—' : !coverage.trim() ? 'Add coverage' : estimate.coverageValid ? String(estimate.cartons) : 'Check value'}</output></strong><small>product-dependent</small></article>
            </div>
            <p className="visualizer-live sr-only" id="visualizer-live" aria-live="polite" aria-atomic="true">{liveMessage}</p>
            <button className="button button-copper visualizer-use-button" id="visualizer-use-estimate" type="button" disabled={!estimate} onClick={handleUseEstimate}>Use this in my flooring request <span aria-hidden="true">↗</span></button>
            <button className="visualizer-reset" id="visualizer-reset" type="button" onClick={handleReset}>Reset example</button>
            <p className="visualizer-disclaimer">Planning aid only—not a quote or guaranteed order quantity. Product coverage, layout, subfloor and installation requirements vary. We’ll confirm project details before pricing.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
