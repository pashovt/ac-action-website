import { range } from '../content/site.js';
import PanelHead from './PanelHead.jsx';
import Product from './products/Product.jsx';

/** Panel 3 — three product ranges, each with its own animated product models. */
export default function Range() {
  return (
    <section id={range.id} className="section range" aria-labelledby="range-title">
      <div className="container">
        <PanelHead id="range-title" panel={range.panel} eyebrow={range.eyebrow} heading={range.heading} intro={range.intro} />
        <ul className="range__grid">
          {range.categories.map((c) => (
            <li className="range-card" key={c.title} data-reveal>
              <div className="range-card__stage" aria-hidden="true">
                <span className="range-card__glow" />
                {c.products.map((p, i) => (
                  <div className="range-card__product" key={i} style={{ '--i': i }}>
                    <Product type={p.type} variant={p.variant} />
                  </div>
                ))}
              </div>
              <h3 className="range-card__title">{c.title}</h3>
              <p>{c.body}</p>
            </li>
          ))}
        </ul>
        <p className="range__note" data-reveal>
          {range.note}
        </p>
      </div>
    </section>
  );
}
