import { useEffect, useState } from 'react';

const recipients = {
  freight: 'Lilman.bigvan@gmail.com',
  flooring: 'Lilman.bigvan@gmail.com',
  // Note: if you ever need freight to route separately to logistics:
  // freight: 'Nathanw.logistics@gmail.com',
};

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
        <div className="form-grid">
          <label>Company name<input name="Company Name" autoComplete="organization" placeholder="Your company" /></label>
          <label>Contact name <span>*</span><input name="Contact Name" autoComplete="name" required placeholder="Your name" /></label>
          <label>Phone <span>*</span><input name="Phone" type="tel" autoComplete="tel" required placeholder="Your phone number" /></label>
          <label>Email <span>*</span><input name="Email" type="email" autoComplete="email" required placeholder="you@example.com" /></label>
          <label>Pickup location <span>*</span><input name="Pickup Location" required placeholder="City, state or ZIP" /></label>
          <label>Delivery location <span>*</span><input name="Delivery Location" required placeholder="City, state or ZIP" /></label>
          <label>Equipment needed<select name="Equipment Needed"><option>Not sure yet</option><option>26-ft box truck</option><option>Sprinter van</option><option>Need a recommendation</option></select></label>
          <label>Pickup date<input name="Pickup Date" type="date" /></label>
          <label>Commodity<input name="Commodity" placeholder="What are you shipping?" /></label>
          <label>Number of pallets / pieces<input name="Number of Pallets / Pieces" type="number" inputMode="numeric" min="1" placeholder="e.g. 4 pallets" /></label>
          <label>Weight<input name="Weight" placeholder="e.g. 1,200 lb" /></label>
          <label>Dimensions<input name="Dimensions" placeholder="L × W × H" /></label>
          <label className="field-wide">Additional details<textarea name="Additional Details" rows="3" placeholder="Anything else we should know about pickup or delivery?" /></label>
        </div>
      ) : (
        <div className="form-grid">
          <label>Name <span>*</span><input name="Name" autoComplete="name" required placeholder="Your name" /></label>
          <label>Phone <span>*</span><input name="Phone" type="tel" autoComplete="tel" required placeholder="(336) 555-0123" /></label>
          <label>Email <span>*</span><input name="Email" type="email" autoComplete="email" required placeholder="you@example.com" /></label>
          <label>Project address<input name="Project Address" autoComplete="street-address" placeholder="Street, city, ZIP" /></label>
          <label>Type of flooring<select name="Type of Flooring"><option value="">Choose one</option><option>LVP / luxury vinyl plank</option><option>Carpet</option><option>Glue-down flooring</option><option>Other / not sure yet</option></select></label>
          <label>What needs to be removed?<select name="What needs to be removed"><option value="">Choose one</option><option>Existing LVP</option><option>Carpet</option><option>Glue-down flooring</option><option>More than one flooring type</option><option>No removal needed</option><option>Not sure yet</option></select></label>
          <label>Approximate square footage<input name="Approximate Square Footage" type="number" inputMode="numeric" min="1" placeholder="e.g. 850" value={flooringFields?.area || ''} onChange={handleFieldChange} /></label>
          <label>Preferred contact method<select name="Preferred Contact Method"><option>Phone</option><option>Email</option><option>Text</option></select></label>
          <label className="field-wide">Upload photos<input name="Project Photos" type="file" accept="image/*" multiple onChange={handleFieldChange} /><small>{photoNote}</small></label>
          <label className="field-wide">Additional project details<textarea name="Message" rows="3" placeholder="A little more about the space or project" value={flooringFields?.message || ''} onChange={handleFieldChange} /></label>
        </div>
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
