import { useEffect, useId, useRef, useState } from 'react';
import { enquiry, decor, contact } from '../content/site.js';
import { trackEvent } from '../lib/analytics.js';
import Floaters from './products/Floaters.jsx';
import { EMPTY_ENQUIRY, MAX_MESSAGE, submitEnquiry, validateEnquiry } from '../lib/enquiry.js';
import PanelHead from './PanelHead.jsx';
import Stripes from './Stripes.jsx';

const FIELD_ORDER = ['name', 'email', 'business', 'postcode', 'siteType', 'dailyUsers', 'message'];

/** Panel 6 — contact details and the enquiry form (form logic: src/lib/enquiry.js). */
export default function Contact({ preferredSiteType = '', preferredPostcode = '' }) {
  const [values, setValues] = useState(EMPTY_ENQUIRY);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);
  const formRef = useRef(null);
  const resultRef = useRef(null);
  const uid = useId();

  // A location CTA can pre-select the site type (only if not chosen yet).
  useEffect(() => {
    if (preferredSiteType) {
      setValues((v) => (v.siteType ? v : { ...v, siteType: preferredSiteType }));
    }
  }, [preferredSiteType]);

  // The postcode checker can hand its postcode to the form.
  useEffect(() => {
    if (preferredPostcode) {
      setValues((v) => ({ ...v, postcode: preferredPostcode }));
      setResult(null);
    }
  }, [preferredPostcode]);

  useEffect(() => {
    if (result) resultRef.current?.focus();
  }, [result]);

  const onChange = (e) => {
    const { name, value } = e.target;
    const next = { ...values, [name]: value };
    setValues(next);
    // After a first attempt, re-validate live so errors clear as they're fixed.
    if (submitted) setErrors(validateEnquiry(next));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    const found = validateEnquiry(values);
    setErrors(found);
    const first = FIELD_ORDER.find((k) => found[k]);
    if (first) {
      formRef.current?.elements.namedItem(first)?.focus();
      return;
    }
    setResult(await submitEnquiry(values));
    trackEvent('enquiry_preview', { siteType: values.siteType || 'unknown' });
  };

  const onEdit = () => {
    setResult(null);
    requestAnimationFrame(() => formRef.current?.elements.namedItem('name')?.focus());
  };

  const onReset = () => {
    setValues(EMPTY_ENQUIRY);
    setErrors({});
    setSubmitted(false);
    setResult(null);
  };

  const field = (name) => {
    const id = `${uid}-${name}`;
    const errId = `${id}-error`;
    const err = errors[name];
    return {
      id,
      name,
      value: values[name],
      onChange,
      'aria-invalid': err ? true : undefined,
      'aria-describedby': err ? errId : undefined,
      errId,
      err,
    };
  };

  const label = (key) => enquiry.siteTypes.find((o) => o.value === key)?.label || '—';
  const usersLabel = (key) => enquiry.dailyUsers.find((o) => o.value === key)?.label || 'Not given';

  return (
    <section id={enquiry.id} className="section enquiry theme-light" aria-labelledby="enquiry-title">
      <Floaters items={decor.contact} />
      <Stripes corner="tr" className="section__stripes" />
      <div className="container enquiry__layout">
        <div className="enquiry__aside">
          <PanelHead id="enquiry-title" panel={enquiry.panel} eyebrow={enquiry.eyebrow} heading={enquiry.heading} intro={enquiry.intro} />
          <ContactCards />
          <div className="enquiry__ask" data-reveal>
            <p className="label">What we'll ask</p>
            <ul>
              {enquiry.whatWeAsk.map((w) => (
                <li key={w}>{w}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="enquiry__card" data-reveal>
          {result ? (
            <div className="enquiry__result" ref={resultRef} tabIndex={-1} role="status" aria-live="polite">
              <p className="enquiry__result-badge">Preview only</p>
              <h3 className="enquiry__result-title">{enquiry.resultHeading}</h3>
              <p className="enquiry__result-body">{enquiry.resultBody}</p>
              <dl className="summary">
                <SummaryRow term="Contact name" value={result.summary.name} />
                <SummaryRow term="Work email" value={result.summary.email} />
                <SummaryRow term="Business / site" value={result.summary.business} />
                <SummaryRow term="Site postcode" value={result.summary.postcode} />
                <SummaryRow term="Site type" value={label(result.summary.siteType)} />
                <SummaryRow term="Approximate daily users" value={usersLabel(result.summary.dailyUsers)} />
                <SummaryRow term="Additional information" value={result.summary.message || 'None'} />
              </dl>
              <div className="enquiry__result-actions">
                <button type="button" className="btn btn--outline-dark" onClick={onEdit}>
                  Edit enquiry
                </button>
                <button type="button" className="btn btn--text" onClick={onReset}>
                  Clear and start again
                </button>
              </div>
            </div>
          ) : (
            <form ref={formRef} className="form" noValidate onSubmit={onSubmit}>
              <div className="form__grid">
                <TextField label="Contact name" autoComplete="name" {...field('name')} required />
                <TextField label="Work email" type="email" autoComplete="email" inputMode="email" {...field('email')} required />
                <TextField label="Business / site name" autoComplete="organization" {...field('business')} required />
                <TextField
                  label="Site postcode"
                  autoComplete="postal-code"
                  autoCapitalize="characters"
                  {...field('postcode')}
                  required
                  className="form__field--short"
                />
                <SelectField label="Site type" options={enquiry.siteTypes} {...field('siteType')} required />
                <SelectField label="Approximate daily users" options={enquiry.dailyUsers} {...field('dailyUsers')} optional />
                <TextAreaField
                  label="Additional information"
                  {...field('message')}
                  optional
                  hint="For example, opening hours or where a machine might go."
                  maxLength={MAX_MESSAGE}
                />
              </div>

              <div className="form__footer">
                <button type="submit" className="btn btn--navy btn--lg">
                  {enquiry.submitLabel}
                </button>
                <p className="form__demo-note">
                  <span className="form__demo-dot" aria-hidden="true" />
                  {enquiry.demoNote}
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function FieldShell({ id, label, required, optional, hint, err, errId, className = '', children }) {
  const hintId = hint ? `${id}-hint` : undefined;
  return (
    <div className={`form__field ${className}${err ? ' has-error' : ''}`}>
      <label className="form__label" htmlFor={id}>
        {label}
        {required ? <span className="form__req"> (required)</span> : null}
        {optional ? <span className="form__opt"> (optional)</span> : null}
      </label>
      {hint ? (
        <p className="form__hint" id={hintId}>
          {hint}
        </p>
      ) : null}
      {children(hintId)}
      {err ? (
        <p className="form__error" id={errId}>
          <span aria-hidden="true">!</span> {err}
        </p>
      ) : null}
    </div>
  );
}

function describedBy(...ids) {
  const list = ids.filter(Boolean).join(' ');
  return list || undefined;
}

function TextField({ errId, err, label, required, optional, hint, className, ...input }) {
  return (
    <FieldShell {...{ id: input.id, label, required, optional, hint, err, errId, className }}>
      {(hintId) => (
        <input
          className="form__input"
          type="text"
          {...input}
          aria-required={required || undefined}
          aria-describedby={describedBy(hintId, input['aria-describedby'])}
        />
      )}
    </FieldShell>
  );
}

function SelectField({ errId, err, label, required, optional, hint, className, options, ...input }) {
  return (
    <FieldShell {...{ id: input.id, label, required, optional, hint, err, errId, className }}>
      {(hintId) => (
        <div className="form__select-wrap">
          <select
            className="form__input form__select"
            {...input}
            aria-required={required || undefined}
            aria-describedby={describedBy(hintId, input['aria-describedby'])}
          >
            {options.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      )}
    </FieldShell>
  );
}

function TextAreaField({ errId, err, label, required, optional, hint, className = '', ...input }) {
  return (
    <FieldShell {...{ id: input.id, label, required, optional, hint, err, errId, className: `form__field--full ${className}` }}>
      {(hintId) => (
        <textarea
          className="form__input form__textarea"
          rows={4}
          {...input}
          aria-describedby={describedBy(hintId, input['aria-describedby'])}
        />
      )}
    </FieldShell>
  );
}

function SummaryRow({ term, value }) {
  return (
    <div className="summary__row">
      <dt>{term}</dt>
      <dd>{value}</dd>
    </div>
  );
}

/**
 * Phone and email. Empty values in content/site.js (contact) render as
 * "to be confirmed" text rather than dead links.
 */
function ContactCards() {
  return (
    <ul className="contact-cards" data-reveal>
      <li>
        <span className="contact-cards__label">Phone</span>
        {contact.phone ? (
          <a href={`tel:${contact.phone.replace(/\s+/g, '')}`} onClick={() => trackEvent('contact_phone_click')}>
            {contact.phone}
          </a>
        ) : (
          <span className="contact-cards__tbc">Number to be confirmed</span>
        )}
      </li>
      <li>
        <span className="contact-cards__label">Email</span>
        {contact.email ? (
          <a href={`mailto:${contact.email}`} onClick={() => trackEvent('contact_email_click')}>
            {contact.email}
          </a>
        ) : (
          <span className="contact-cards__tbc">Address to be confirmed</span>
        )}
      </li>
      <li>
        <span className="contact-cards__label">Area</span>
        <span>{contact.areaLine}</span>
      </li>
    </ul>
  );
}
