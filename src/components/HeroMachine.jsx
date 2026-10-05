import { useRef } from 'react';
import { hero } from '../content/site.js';
import { useMachineSequence } from '../hooks/useMachineSequence.js';
import { trackEvent } from '../lib/analytics.js';
import Stripes from './Stripes.jsx';
import MachineSvg from './MachineSvg.jsx';
import Product from './products/Product.jsx';

/**
 * Panel 1 — the AC Action vending machine.
 * Desktop with motion: the machine glides to centre, then for each point a
 * keypad button is pressed, an item drops out of the delivery bin and flies
 * to its point, and the callout draws in (useMachineSequence).
 * Static layout (mobile, reduced motion, no JS): copy, machine and the three
 * points as a list. Callouts are decorative duplicates (aria-hidden).
 */
export default function HeroMachine() {
  const rootRef = useRef(null);
  useMachineSequence(rootRef);

  return (
    <section id="top" className="hero" ref={rootRef} aria-labelledby="hero-title">
      <Stripes corner="tr" className="hero__stripes" />
      <Stripes corner="bl" className="hero__stripes" />

      <div className="hero__inner container">
        <div className="hero__copy" data-hero-copy>
          <p className="eyebrow">{hero.kicker}</p>
          <h1 id="hero-title" className="hero__title">
            {hero.heading}
          </h1>
          <p className="hero__lead">{hero.lead}</p>
          <div className="hero__actions">
            <a className="btn btn--gold btn--lg" href={hero.primaryCta.href} onClick={() => trackEvent('primary_cta_click', { location: 'hero' })}>
              {hero.primaryCta.label}
            </a>
            <a className="btn btn--outline btn--lg" href={hero.secondaryCta.href}>
              {hero.secondaryCta.label}
            </a>
          </div>
          <ul className="hero__chips" aria-label="What we stock">
            {hero.chips.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>

        <figure className="hero__machine" data-hero-machine>
          <div className="hero__machine-frame" data-machine-frame>
            <MachineSvg />
            <div className="callouts" aria-hidden="true">
              {hero.callouts.map((c, i) => (
                <div
                  key={c.kicker}
                  className={`callout callout--${c.side}`}
                  style={{ '--x': `${c.x}%`, '--y': `${c.y}%` }}
                  data-callout
                  data-key={c.key}
                >
                  <span className="callout__item" data-callout-item>
                    <Product type={c.item.type} variant={c.item.variant} />
                  </span>
                  <span className="callout__dot" data-callout-dot />
                  <span className="callout__line" data-callout-line />
                  <span className="callout__label" data-callout-label>
                    <span className="callout__kicker">
                      0{i + 1} / {c.kicker}
                    </span>
                    <span className="callout__text">{c.text}</span>
                    <span className="callout__note">{c.note}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
          <figcaption className="hero__caption">Illustration — not a specific machine.</figcaption>
        </figure>

        <ol className="hero__points" aria-label="At a glance">
          {hero.callouts.map((c, i) => (
            <li key={c.kicker}>
              <span className="hero__points-num" aria-hidden="true">
                0{i + 1}
              </span>
              <span>
                <strong>{c.text}</strong> {c.note}
              </span>
            </li>
          ))}
        </ol>
      </div>

      <p className="hero__cue" aria-hidden="true" data-hero-cue>
        Scroll
      </p>
    </section>
  );
}
