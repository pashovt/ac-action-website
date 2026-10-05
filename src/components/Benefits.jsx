import { benefits, photos } from '../content/site.js';
import PanelHead from './PanelHead.jsx';

/** Panel 4 — benefits checklist (brochure style) and the four sectors. */
export default function Benefits() {
  return (
    <section id={benefits.id} className="section benefits theme-light" aria-labelledby="benefits-title">
      <div className="container">
        <div className="benefits__top">
          <PanelHead id="benefits-title" panel={benefits.panel} eyebrow={benefits.eyebrow} heading={benefits.heading} intro={benefits.intro} />
          <ul className="checklist">
            {benefits.items.map((b) => (
              <li key={b.title} data-reveal>
                <span className="checklist__tick" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M6 12.5l4 4 8-9" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span>
                  <strong>{b.title}</strong>
                  {b.body}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <h3 className="sectors__heading" data-reveal>
          {benefits.sectorsHeading}
        </h3>
        <ul className="sectors">
          {benefits.sectors.map((s) => {
            const p = photos[s.photo];
            return (
              <li className="sector" key={s.title} data-reveal>
                <img src={p.src} width={p.width} height={p.height} alt={p.alt} loading="lazy" decoding="async" />
                <div className="sector__text">
                  <h4>{s.title}</h4>
                  <p>{s.body}</p>
                </div>
              </li>
            );
          })}
        </ul>
        <p className="sectors__credit">Illustrative photography.</p>
      </div>
    </section>
  );
}
