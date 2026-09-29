import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Btn } from './Ui'
import { SITE } from '../data/site'

const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT

function Field({ f }) {
  const id = useId()
  const base = { id, name: f.name, required: f.required, autoComplete: f.autoComplete, placeholder: f.placeholder, inputMode: f.inputMode }
  let control
  if (f.type === 'select') {
    control = (
      <select {...base}>
        {f.options.map((o) => <option key={o}>{o}</option>)}
      </select>
    )
  } else if (f.type === 'textarea') {
    control = <textarea {...base} rows={4} />
  } else if (f.type === 'radio') {
    control = (
      <div className="radios">
        {f.options.map((o, i) => (
          <label key={o}>
            <input type="radio" name={f.name} value={o} defaultChecked={i === 0} />
            <span>{o}</span>
          </label>
        ))}
      </div>
    )
  } else if (f.type === 'file') {
    control = <input {...base} type="file" accept="image/*" multiple />
  } else {
    control = <input {...base} type={f.type || 'text'} />
  }
  return (
    <div className={`fld ${f.full ? 'full' : ''}`}>
      <label htmlFor={f.type === 'radio' ? undefined : id}>
        {f.label}
        {f.required && <em> *</em>}
      </label>
      {control}
    </div>
  )
}

/** Simple lead form. Set VITE_FORM_ENDPOINT to POST submissions to a form service. */
export default function LeadForm({ id, kind, title, note, fields, cta }) {
  const [state, setState] = useState('idle') // idle | sending | done | error

  async function onSubmit(e) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    data.append('form_type', kind)
    let bad = false
    form.querySelectorAll('[required]').forEach((el) => {
      const empty = !String(el.value).trim()
      el.classList.toggle('invalid', empty)
      if (empty) bad = true
    })
    if (bad) {
      form.querySelector('.invalid')?.focus()
      return
    }
    setState('sending')
    try {
      if (ENDPOINT) {
        const res = await fetch(ENDPOINT, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
        if (!res.ok) throw new Error('bad response')
      } else {
        // No endpoint configured yet: nothing is sent. See README.
        console.info('[lead form] VITE_FORM_ENDPOINT not set. Submission:', Object.fromEntries(data))
      }
      setState('done')
    } catch {
      setState('error')
    }
  }

  return (
    <div className="formcard" id={id}>
      <div className="formcard-head">
        <h3>{title}</h3>
        <p>{note}</p>
      </div>
      <AnimatePresence mode="wait">
        {state === 'done' ? (
          <motion.div key="ok" className="thanks" role="status" initial={{ opacity: 0, y: 16, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }}>
            <div className="ck">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
            </div>
            <p>Thank you! We received your request. Our team will review the details and get back to you shortly.</p>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={onSubmit} noValidate exit={{ opacity: 0 }}>
            {fields.map((f) => <Field key={f.name} f={f} />)}
            {state === 'error' && (
              <p className="form-err" role="alert">
                Something went wrong sending your request. Please call {SITE.phones[0].label} or try again.
              </p>
            )}
            <div className="submit-row">
              <Btn type="submit" variant="amber" disabled={state === 'sending'}>
                {state === 'sending' ? 'Sending...' : cta}
              </Btn>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
