import { useState } from 'react';
import { faq } from '../content/site.js';
import SectionHead from './SectionHead.jsx';

/** Disclosure-button accordion. Multiple items may be open at once. */
export default function Faq() {
  const [open, setOpen] = useState(() => new Set([0]));

  const toggle = (i) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <section id={faq.id} className="section faq" aria-labelledby="faq-title">
      <div className="container faq__layout">
        <SectionHead id="faq-title" eyebrow={faq.eyebrow} heading={faq.heading} />
        <div className="accordion" data-reveal>
          {faq.items.map((item, i) => {
            const isOpen = open.has(i);
            return (
              <div className={`accordion__item${isOpen ? ' is-open' : ''}`} key={item.q}>
                <h3 className="accordion__heading">
                  <button
                    type="button"
                    className="accordion__trigger"
                    id={`faq-q-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    onClick={() => toggle(i)}
                  >
                    <span>{item.q}</span>
                    <span className="accordion__icon" aria-hidden="true" />
                  </button>
                </h3>
                <div
                  id={`faq-a-${i}`}
                  role="region"
                  aria-labelledby={`faq-q-${i}`}
                  className="accordion__panel"
                  hidden={!isOpen}
                >
                  <p>{item.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
