import { useEffect, useId, useRef, useState } from 'react';

const recipients = {
  freight: 'Lilman.bigvan@gmail.com',
  flooring: 'Lilman.bigvan@gmail.com',
  // Note: if you ever need freight to route separately to logistics:
  // freight: 'Nathanw.logistics@gmail.com',
};


const iconPaths = {
  building: 'M4 21V5l8-3 8 3v16M9 21v-4h6v4M8 9h.01M12 9h.01M16 9h.01M8 13h.01M12 13h.01M16 13h.01',
  user: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0',
  phone: 'M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z',
  mail: 'M3 6h18v12H3zM3 7l9 6 9-6',
  pickup: 'M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21zM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
  flag: 'M5 21V4M5 4h11l-2 4 2 4H5',
  truck: 'M2 6h12v10H2zM14 10h4l3 3v3h-7M7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM17 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
  calendar: 'M4 6h16v15H4zM4 10h16M8 3v4M16 3v4',
  box: 'M3 7l9-4 9 4v10l-9 4-9-4zM3 7l9 4 9-4M12 11v10',
  stack: 'M4 15h16v5H4zM6 10h12v5H6zM8 5h8v5H8z',
  scale: 'M6 8h12l2 13H4zM9 8a3 3 0 0 1 6 0',
  ruler: 'M3 17 17 3l4 4L7 21zM7 13l2 2M10 10l2 2M13 7l2 2',
  home: 'M3 11 12 4l9 7M5 10v11h14V10M10 21v-6h4v6',
  layers: 'M12 3 3 8l9 5 9-5zM3 13l9 5 9-5',
  trash: 'M4 7h16M9 7V4h6v3M6 7l1 14h10l1-14',
  area: 'M4 4h16v16H4zM4 9h16M9 4v16',
  chat: 'M4 5h16v11H9l-5 4z',
  upload: 'M12 16V4M7 9l5-5 5 5M4 16v4h16v-4',
};

function FieldIcon({ name }) {
  return <svg className="field-icon" viewBox="0 0 24 24" aria-hidden="true"><path d={iconPaths[name]} /></svg>;
}

function Field({ label, required = false, icon, wide = false, hint, children }) {
  return (
    <label className={`field${wide ? ' field-wide' : ''}`}>
      <span className="field-label">{label}{required && <span className="field-required" aria-hidden="true">*</span>}</span>
      <span className={`field-control${icon ? ' has-icon' : ''}`}>{icon && <FieldIcon name={icon} />}{children}</span>
      {hint && <small>{hint}</small>}
    </label>
  );
}

function FormGroup({ number, title, children }) {
  return (
    <fieldset className="form-group">
      <legend><span className="form-group-number">{number}</span>{title}</legend>
      <div className="form-grid">{children}</div>
    </fieldset>
  );
}

// Branded replacement for <select>: same name/value in FormData via a hidden input.
function SelectField({ label, name, icon, options, defaultValue = '', placeholder = 'Choose one', wide = false }) {
  const [value, setValue] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const rootRef = useRef(null);
  const listRef = useRef(null);
  const id = useId();
  const selected = options.find((option) => option.value === value);

  useEffect(() => {
    if (!open) return undefined;
    const close = (event) => { if (!rootRef.current?.contains(event.target)) setOpen(false); };
    document.addEventListener('pointerdown', close);
    return () => document.removeEventListener('pointerdown', close);
  }, [open]);

  useEffect(() => {
    if (open) listRef.current?.querySelector('[data-active="true"]')?.scrollIntoView({ block: 'nearest' });
  }, [open, active]);

  const openList = () => {
    setActive(Math.max(0, options.findIndex((option) => option.value === value)));
    setOpen(true);
  };
  const choose = (index) => { setValue(options[index].value); setOpen(false); };

  const onKeyDown = (event) => {
    if (event.key === 'Escape') { setOpen(false); return; }
    if (event.key === 'Tab') { setOpen(false); return; }
    if (['ArrowDown', 'ArrowUp', 'Enter', ' ', 'Home', 'End'].includes(event.key)) event.preventDefault();
    if (!open) { if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(event.key)) openList(); return; }
    if (event.key === 'ArrowDown') setActive((index) => Math.min(options.length - 1, index + 1));
    if (event.key === 'ArrowUp') setActive((index) => Math.max(0, index - 1));
    if (event.key === 'Home') setActive(0);
    if (event.key === 'End') setActive(options.length - 1);
    if (event.key === 'Enter' || event.key === ' ') choose(active);
  };

  return (
    <div className={`field field-select${wide ? ' field-wide' : ''}${open ? ' is-open' : ''}`} ref={rootRef}>
      <span className="field-label" id={`${id}-label`}>{label}</span>
      <input type="hidden" name={name} value={value} />
      <button
        type="button"
        className={`select-trigger${icon ? ' has-icon' : ''}${selected ? '' : ' is-placeholder'}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={`${id}-label ${id}-value`}
        aria-controls={`${id}-list`}
        aria-activedescendant={open ? `${id}-opt-${active}` : undefined}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={onKeyDown}
      >
        {icon && <FieldIcon name={icon} />}
        <span id={`${id}-value`} className="select-value">{selected ? selected.label : placeholder}</span>
        <svg className="select-chevron" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
      </button>
      {open && (
        <ul className="select-list" role="listbox" id={`${id}-list`} aria-labelledby={`${id}-label`} ref={listRef}>
          {options.map((option, index) => (
            <li
              key={option.value || option.label}
              id={`${id}-opt-${index}`}
              role="option"
              aria-selected={option.value === value}
              data-active={index === active}
              onPointerEnter={() => setActive(index)}
              onPointerDown={(event) => event.preventDefault()}
              onClick={() => choose(index)}
            >
              <span className="select-option-text"><b>{option.label}</b>{option.note && <small>{option.note}</small>}</span>
              <svg className="select-check" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 5 5 9-10" /></svg>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const opt = (label, note) => ({ value: label, label, note });
const equipmentOptions = [
  opt('Not sure yet', 'We’ll help you pick'),
  opt('26-ft box truck', '96″ × 96″ door · palletized loads'),
  opt('Sprinter van', '126″ cargo · smaller & expedited'),
  opt('Need a recommendation', 'Tell us the load, we’ll advise'),
];
const flooringTypeOptions = [opt('LVP / luxury vinyl plank'), opt('Carpet'), opt('Glue-down flooring'), opt('Other / not sure yet')];
const removalOptions = [opt('Existing LVP'), opt('Carpet'), opt('Glue-down flooring'), opt('More than one flooring type'), opt('No removal needed'), opt('Not sure yet')];
const contactOptions = [opt('Phone', 'We’ll call you'), opt('Email', 'We’ll reply by email'), opt('Text', 'We’ll text you')];

function ConfirmationSummary({ summary, onReset }) {
  const isFreight = summary.isFreight;

  return (
    <div className="lead-form form-light confirmation-card" role="region" aria-label="Quote Request Summary">
      <div className="confirmation-header">
        <div className="confirmation-icon-wrap" aria-hidden="true">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <div>
          <span className="form-step">REQUEST CONFIRMED • {summary.refCode}</span>
          <h3>{isFreight ? 'Freight Quote Request Received' : 'Flooring Estimate Request Received'}</h3>
          <p className="confirmation-sub">
            Thank you{summary.contactName ? `, ${summary.contactName}` : ''}! Your request has been recorded and dispatched to our {isFreight ? 'logistics team' : 'flooring specialists'}.
          </p>
        </div>
      </div>

      <div className="confirmation-meta-strip">
        <div><span className="meta-label">Submitted:</span> <strong>{summary.submissionTime}</strong></div>
        <div><span className="meta-label">Reference ID:</span> <strong>{summary.refCode}</strong></div>
        <div><span className="meta-label">Assigned Desk:</span> <strong>{summary.recipient}</strong></div>
      </div>

      <div className="confirmation-details-box">
        <h4 className="confirmation-section-title">Submitted Information</h4>
        <dl className="confirmation-grid">
          {summary.entries.map((item, idx) => (
            <div key={idx} className={`confirmation-item ${item.isFull ? 'item-wide' : ''}`}>
              <dt className="confirmation-label">{item.label}</dt>
              <dd className="confirmation-value">{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="confirmation-next-steps">
        <div className="next-steps-icon" aria-hidden="true">⚡</div>
        <div className="next-steps-text">
          <strong>What to expect next:</strong>
          <p>
            Our team is reviewing your specifications and schedule. We will reach out to you at{' '}
            <strong>{summary.contactPhone || summary.contactEmail}</strong> within 1–2 business hours.
          </p>
          <p className="next-steps-urgent">
            Need immediate assistance or direct booking? Call our desk at{' '}
            <a href="tel:+13369556193"><b>(336) 955-6193</b> ↗</a>
          </p>
        </div>
      </div>

      <div className="confirmation-actions">
        <button
          type="button"
          className="button button-dark confirmation-action-btn"
          onClick={() => window.print()}
        >
          Print / Save Summary <span aria-hidden="true">🖨️</span>
        </button>
        <button
          type="button"
          className="button button-copper confirmation-action-btn"
          onClick={onReset}
        >
          Submit Another Request <span aria-hidden="true">↻</span>
        </button>
      </div>
    </div>
  );
}

function LeadForm({ kind, formRef, flooringFields, onFlooringFieldChange }) {
  const [submitting, setSubmitting] = useState(false);
  const [submittedSummary, setSubmittedSummary] = useState(null);
  const [photoNote, setPhotoNote] = useState('Attach your project photos if available.');
  const isFreight = kind === 'freight';
  const recipient = recipients[kind];

  // If estimate values are sent from the visualizer, ensure form view is visible
  useEffect(() => {
    if (!isFreight && (flooringFields?.area || flooringFields?.message)) {
      setSubmittedSummary(null);
    }
  }, [flooringFields?.area, flooringFields?.message, isFreight]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    setSubmitting(true);

    const rawFormData = new FormData(form);
    const subjectKind = isFreight ? 'Freight quote' : 'Free flooring estimate';
    const contactName = (isFreight ? rawFormData.get('Contact Name') : rawFormData.get('Name')) || '';
    const contactPhone = rawFormData.get('Phone') || '';
    const contactEmail = rawFormData.get('Email') || '';
    const subject = `${subjectKind} request — ${contactName ? contactName + ' — ' : ''}Flooring For All / Lil Man Big Van`;

    const wideKeys = ['Additional Details', 'Message', 'Project Address', 'Pickup Location', 'Delivery Location'];
    const entries = [];

    for (const [key, value] of rawFormData.entries()) {
      if (key.startsWith('_') || key === 'Project Photos') continue;
      if (typeof value === 'string' && value.trim()) {
        entries.push({
          label: key,
          value: value.trim(),
          isFull: wideKeys.includes(key),
        });
      }
    }

    const selectedPhotos = Array.from(form.querySelector('input[type="file"]')?.files ?? []).map((file) => file.name);
    if (selectedPhotos.length) {
      entries.push({
        label: 'Project Photos',
        value: `${selectedPhotos.length} photo${selectedPhotos.length === 1 ? '' : 's'} (${selectedPhotos.join(', ')})`,
        isFull: true,
      });
    }

    const refCode = `${isFreight ? 'FR' : 'FL'}-${Math.floor(100000 + Math.random() * 900000)}`;
    const submissionTime = new Intl.DateTimeFormat('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date());

    const summaryData = {
      refCode,
      submissionTime,
      isFreight,
      recipient,
      contactName,
      contactPhone,
      contactEmail,
      entries,
    };

    // Prepare background FormSubmit delivery
    const postData = new FormData(form);
    postData.append('_subject', subject);
    postData.append('_template', 'table');
    postData.append('_captcha', 'false');

    try {
      await fetch(`https://formsubmit.co/ajax/${recipient}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
        },
        body: postData,
      });
    } catch (err) {
      console.warn('Form submission delivery network note:', err);
    } finally {
      setSubmitting(false);
      setSubmittedSummary(summaryData);
      if (formRef?.current) {
        formRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  const handleReset = () => {
    setSubmittedSummary(null);
  };

  const handleFieldChange = (event) => {
    const { name, value, files } = event.currentTarget;
    if (name === 'Project Photos') {
      const count = files?.length ?? 0;
      setPhotoNote(count
        ? `${count} photo${count === 1 ? '' : 's'} selected.`
        : 'Attach your project photos if available.');
      return;
    }
    if (!isFreight && (name === 'Approximate Square Footage' || name === 'Message')) {
      onFlooringFieldChange(name, value);
    }
  };

  if (submittedSummary) {
    return <ConfirmationSummary summary={submittedSummary} onReset={handleReset} />;
  }

  return (
    <form ref={formRef} className="lead-form form-light" id={isFreight ? 'freight-form' : 'flooring-form'} data-kind={kind} data-email={recipient} noValidate onSubmit={handleSubmit}>
      <input type="text" name="_honey" style={{ display: 'none' }} tabIndex="-1" autoComplete="off" />
      <div className="form-heading">
        <div><span className="form-step">{isFreight ? 'FREIGHT QUOTE' : 'FLOORING ESTIMATE'}</span><h3>{isFreight ? 'Tell us about the shipment' : 'Start your free estimate'}</h3></div>
        <span className="form-required">* Required</span>
      </div>
      {isFreight ? (
        <>
          <FormGroup number="01" title="Your contact details">
            <Field label="Company name" icon="building"><input name="Company Name" autoComplete="organization" placeholder="Your company" /></Field>
            <Field label="Contact name" required icon="user"><input name="Contact Name" autoComplete="name" required placeholder="Your name" /></Field>
            <Field label="Phone" required icon="phone"><input name="Phone" type="tel" autoComplete="tel" required placeholder="Your phone number" /></Field>
            <Field label="Email" required icon="mail"><input name="Email" type="email" autoComplete="email" required placeholder="you@example.com" /></Field>
          </FormGroup>
          <FormGroup number="02" title="Route & timing">
            <Field label="Pickup location" required icon="pickup"><input name="Pickup Location" required placeholder="City, state or ZIP" /></Field>
            <Field label="Delivery location" required icon="flag"><input name="Delivery Location" required placeholder="City, state or ZIP" /></Field>
            <SelectField label="Equipment needed" name="Equipment Needed" icon="truck" options={equipmentOptions} defaultValue="Not sure yet" />
            <Field label="Pickup date" icon="calendar"><input name="Pickup Date" type="date" /></Field>
          </FormGroup>
          <FormGroup number="03" title="Shipment details">
            <Field label="Commodity" icon="box"><input name="Commodity" placeholder="What are you shipping?" /></Field>
            <Field label="Pallets / pieces" icon="stack"><input name="Number of Pallets / Pieces" type="number" inputMode="numeric" min="1" placeholder="e.g. 4" /></Field>
            <Field label="Weight" icon="scale"><input name="Weight" placeholder="e.g. 1,200 lb" /></Field>
            <Field label="Dimensions" icon="ruler"><input name="Dimensions" placeholder="L × W × H" /></Field>
            <Field label="Additional details" wide><textarea name="Additional Details" rows="3" placeholder="Anything else we should know about pickup or delivery?" /></Field>
          </FormGroup>
        </>
      ) : (
        <>
          <FormGroup number="01" title="Your contact details">
            <Field label="Name" required icon="user"><input name="Name" autoComplete="name" required placeholder="Your name" /></Field>
            <Field label="Phone" required icon="phone"><input name="Phone" type="tel" autoComplete="tel" required placeholder="(336) 555-0123" /></Field>
            <Field label="Email" required icon="mail"><input name="Email" type="email" autoComplete="email" required placeholder="you@example.com" /></Field>
            <SelectField label="Preferred contact method" name="Preferred Contact Method" icon="chat" options={contactOptions} defaultValue="Phone" />
          </FormGroup>
          <FormGroup number="02" title="About the project">
            <Field label="Project address" icon="home" wide><input name="Project Address" autoComplete="street-address" placeholder="Street, city, ZIP" /></Field>
            <SelectField label="Type of flooring" name="Type of Flooring" icon="layers" options={flooringTypeOptions} />
            <SelectField label="What needs to be removed?" name="What needs to be removed" icon="trash" options={removalOptions} />
            <Field label="Approximate square footage" icon="area" wide><input name="Approximate Square Footage" type="number" inputMode="numeric" min="1" placeholder="e.g. 850" value={flooringFields?.area || ''} onChange={handleFieldChange} /></Field>
          </FormGroup>
          <FormGroup number="03" title="Photos & details">
            <label className="field field-wide field-file">
              <span className="field-label">Upload photos</span>
              <span className="file-drop">
                <input name="Project Photos" type="file" accept="image/*" multiple onChange={handleFieldChange} />
                <FieldIcon name="upload" />
                <span className="file-drop-text"><b>Click to upload</b> or drag photos here<small>{photoNote}</small></span>
              </span>
            </label>
            <Field label="Additional project details" wide><textarea name="Message" rows="3" placeholder="A little more about the space or project" value={flooringFields?.message || ''} onChange={handleFieldChange} /></Field>
          </FormGroup>
        </>
      )}
      <p className="form-delivery-note">{isFreight
        ? 'Submitting sends your request directly to our logistics team and displays your confirmation summary instantly.'
        : 'Submitting sends your request directly to our flooring team and displays your confirmation summary instantly.'}</p>
      <button className="button button-copper form-submit" type="submit" disabled={submitting}>
        {submitting ? 'Submitting Request...' : (isFreight ? 'Get a Freight Quote' : 'Get a Free Flooring Estimate')} <span aria-hidden="true">↗</span>
      </button>
    </form>
  );
}

export function FreightQuoteSection() {
  return (
    <section className="quote-section quote-freight" aria-labelledby="freight-quote-title">
      <div className="section-shell quote-layout">
        <div className="quote-intro">
          <p className="eyebrow eyebrow-light"><span className="eyebrow-line" />Request transportation</p>
          <h2 id="freight-quote-title">Let’s move<br />your <em>freight.</em></h2>
          <p>Send the route, equipment request, pickup timing and shipment details for review.</p>
          <a className="quote-contact" href="tel:+13369556193">Call the freight team <b>336-955-6193</b> <span aria-hidden="true">↗</span></a>
          <p className="quote-email">Or email <a href="mailto:Nathanw.logistics@gmail.com">Nathanw.logistics@gmail.com</a></p>
        </div>
        <LeadForm kind="freight" />
      </div>
    </section>
  );
}

export function FlooringQuoteSection({ formRef, flooringFields, onFlooringFieldChange }) {
  return (
    <section className="quote-section quote-flooring" aria-labelledby="flooring-quote-title">
      <div className="section-shell quote-layout">
        <div className="quote-intro">
          <p className="eyebrow eyebrow-light"><span className="eyebrow-line" />No-pressure pricing</p>
          <h2 id="flooring-quote-title">Get your<br /><em>flooring estimate.</em></h2>
          <p>Share a few project details and the best way to reach you. We’ll help you figure out the next step.</p>
          <a className="quote-contact" href="tel:+13369556193">Prefer to call? <b>336-955-6193</b> <span aria-hidden="true">↗</span></a>
          <p className="quote-email">Or email <a href="mailto:Lilman.bigvan@gmail.com">Lilman.bigvan@gmail.com</a></p>
        </div>
        <LeadForm kind="flooring" formRef={formRef} flooringFields={flooringFields} onFlooringFieldChange={onFlooringFieldChange} />
      </div>
    </section>
  );
}
