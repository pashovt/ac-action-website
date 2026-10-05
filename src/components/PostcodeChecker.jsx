import { useId, useRef, useState } from 'react';
import { checker } from '../content/site.js';
import { checkPostcode, isPostcodeLike } from '../lib/postcode.js';
import { trackEvent } from '../lib/analytics.js';

/**
 * "Are we in your area?" checker. In range → invite to discuss the site;
 * out of range or lookup problems → direct to the enquiry form. In every case
 * the CTA carries the postcode into the form.
 */
export default function PostcodeChecker({ onUsePostcode }) {
  const [value, setValue] = useState('');
  const [state, setState] = useState({ status: 'idle', postcode: '' });
  const [error, setError] = useState('');
  const abortRef = useRef(null);
  const uid = useId();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isPostcodeLike(value)) {
      setError('Enter a UK postcode, for example NG1 5FF.');
      setState({ status: 'idle', postcode: '' });
      return;
    }
    setError('');
    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    setState({ status: 'loading', postcode: '' });
    try {
      const result = await checkPostcode(value, { signal: ctrl.signal });
      setState(result);
      trackEvent('postcode_check', { result: result.status });
    } catch {
      /* superseded by a newer check */
    }
  };

  const messages = {
    in: checker.inRange,
    out: checker.outRange,
    notfound: checker.notFound,
    failed: checker.failed,
  };
  const done = ['in', 'out', 'notfound', 'failed'].includes(state.status);

  return (
    <div className="checker">
      <h3 className="checker__heading">{checker.heading}</h3>
      <p className="checker__intro">{checker.intro}</p>
      <form className="checker__form" onSubmit={onSubmit} noValidate>
        <label className="visually-hidden" htmlFor={`${uid}-pc`}>
          {checker.label}
        </label>
        <input
          id={`${uid}-pc`}
          className="checker__input"
          name="checker-postcode"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={checker.placeholder}
          autoComplete="postal-code"
          autoCapitalize="characters"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${uid}-err` : undefined}
        />
        <button className="btn btn--gold" type="submit" disabled={state.status === 'loading'}>
          {state.status === 'loading' ? 'Checking…' : checker.button}
        </button>
      </form>
      {error ? (
        <p className="checker__error" id={`${uid}-err`}>
          {error}
        </p>
      ) : null}
      <div className="checker__result" role="status" aria-live="polite">
        {done ? (
          <div className={`checker__outcome checker__outcome--${state.status === 'in' ? 'in' : 'out'}`}>
            <p>{messages[state.status]}</p>
            <a className="btn btn--gold btn--sm" href="#contact" onClick={() => onUsePostcode?.(state.postcode)}>
              {state.status === 'in' ? checker.inRangeCta : checker.outRangeCta}
            </a>
          </div>
        ) : null}
      </div>
      <p className="checker__privacy">{checker.privacy}</p>
    </div>
  );
}
