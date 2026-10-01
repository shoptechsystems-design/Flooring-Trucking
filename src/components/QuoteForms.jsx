import { useState } from 'react';

const recipients = {
  freight: 'Nathanw.logistics@gmail.com',
  flooring: 'Lilman.bigvan@gmail.com',
};

function LeadForm({ kind, formRef, flooringFields, onFlooringFieldChange }) {
  const [status, setStatus] = useState('');
  const [photoNote, setPhotoNote] = useState('After your email opens, attach your selected photos before sending.');
  const isFreight = kind === 'freight';
  const recipient = recipients[kind];

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    const subjectKind = isFreight ? 'Freight quote' : 'Free flooring estimate';
    const subject = `${subjectKind} request — Flooring For All / Lil Man Big Van`;
    const bodyLines = [];
    for (const [key, value] of new FormData(form).entries()) {
      if (key === 'Project Photos' || typeof value !== 'string' || !value.trim()) continue;
      bodyLines.push(`${key}: ${value.trim()}`);
    }
    const selectedPhotos = Array.from(form.querySelector('input[type="file"]')?.files ?? []).map((file) => file.name);
    if (selectedPhotos.length) bodyLines.push(`Photos to attach in your email app: ${selectedPhotos.join(', ')}`);
    bodyLines.push('', 'Sent from the Flooring For All DBA Lil Man Big Van website.');

    const mailto = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join('\n'))}`;
    setStatus('Your email app is opening with the request ready to send. Review the details and send the email to complete your request.');
    window.location.href = mailto;
  };

  const handleFieldChange = (event) => {
    const { name, value, files } = event.currentTarget;
    if (name === 'Project Photos') {
      const count = files?.length ?? 0;
      setPhotoNote(count
        ? `${count} photo${count === 1 ? '' : 's'} selected. Attach them in your email app before sending.`
        : 'After your email opens, attach your selected photos before sending.');
      return;
    }
    if (!isFreight && (name === 'Approximate Square Footage' || name === 'Message')) {
      onFlooringFieldChange(name, value);
    }
  };

  return (
    <form ref={formRef} className="lead-form form-light" id={isFreight ? 'freight-form' : 'flooring-form'} data-kind={kind} data-email={recipient} noValidate onSubmit={handleSubmit}>
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
          <label>Approximate square footage<input name="Approximate Square Footage" type="number" inputMode="numeric" min="1" placeholder="e.g. 850" value={flooringFields.area} onChange={handleFieldChange} /></label>
          <label>Preferred contact method<select name="Preferred Contact Method"><option>Phone</option><option>Email</option><option>Text</option></select></label>
          <label className="field-wide">Upload photos<input name="Project Photos" type="file" accept="image/*" multiple onChange={handleFieldChange} /><small>{photoNote}</small></label>
          <label className="field-wide">Additional project details<textarea name="Message" rows="3" placeholder="A little more about the space or project" value={flooringFields.message} onChange={handleFieldChange} /></label>
        </div>
      )}
      <p className="form-delivery-note">{isFreight
        ? 'Submitting opens a pre-filled email to our logistics team. Review your details and send it from your email app.'
        : 'Submitting opens a pre-filled email to our team. You can review your details and send it from your email app.'}</p>
      <button className="button button-copper form-submit" type="submit">{isFreight ? 'Get a Freight Quote' : 'Get a Free Flooring Estimate'} <span aria-hidden="true">↗</span></button>
      <p className="form-success" role="status" aria-live="polite" hidden={!status} tabIndex={status ? -1 : undefined}>{status}</p>
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
