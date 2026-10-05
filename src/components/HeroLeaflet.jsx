import { useRef } from 'react';
import { brand, hero, decor } from '../content/site.js';
import { useLeaflet } from '../hooks/useLeaflet.js';
import { trackEvent } from '../lib/analytics.js';
import { Monogram } from './Logo.jsx';
import Stripes from './Stripes.jsx';
import Floaters from './products/Floaters.jsx';
import Product from './products/Product.jsx';

/**
 * Panel 1 — the cover. The site opens like the A5 leaflet it replaces:
 * on desktop the cover swings open on scroll (3D CSS transforms driven by
 * GSAP ScrollTrigger) to show three inside panels. Everywhere else the
 * closed cover is shown as a still image. The leaflet is decorative
 * (aria-hidden); the real heading and copy sit beside it.
 */
export default function HeroLeaflet() {
  const rootRef = useRef(null);
  useLeaflet(rootRef);

  return (
    <section id="top" className="hero" ref={rootRef} aria-labelledby="hero-title">
      <Stripes corner="tr" className="hero__stripes" />
      <Stripes corner="bl" className="hero__stripes" />
      <Floaters items={decor.hero} />

      <div className="hero__inner container">
        <div className="hero__copy" data-hero-copy>
          <p className="eyebrow">{hero.kicker}</p>
          <h1 id="hero-title" className="hero__title">
            {hero.heading}
          </h1>
          <p className="hero__lead">{hero.lead}</p>
          <div className="hero__actions">
            <a
              className="btn btn--gold btn--lg"
              href={hero.primaryCta.href}
              onClick={() => trackEvent('primary_cta_click', { location: 'hero' })}
            >
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

        <div className="leaflet-stage" aria-hidden="true" data-leaflet-stage>
          <div className="leaflet" data-leaflet>
            {/* Middle inside panel (static) */}
            <div className="leaflet__panel leaflet__panel--mid">
              <InsidePanel item={hero.inside[1]} index="03">
                <div className="mini-products">
                  <Product type="crisps" variant="amber" />
                  <Product type="chocolate" variant="purple" />
                  <Product type="can" variant="coral" />
                </div>
              </InsidePanel>
            </div>

            {/* Right flap: back face shows the tagline, front face the third inside panel */}
            <div className="leaflet__flap leaflet__flap--right" data-flap-right>
              <div className="leaflet__face leaflet__face--front">
                <InsidePanel item={hero.inside[2]} index="04">
                  <ul className="mini-list">
                    <li>Warehouses</li>
                    <li>Call centres</li>
                    <li>High-rise buildings</li>
                    <li>Office spaces</li>
                  </ul>
                </InsidePanel>
              </div>
              <div className="leaflet__face leaflet__face--back leaflet__face--tagline">
                <Stripes corner="br" />
                <p>{brand.tagline}</p>
              </div>
            </div>

            {/* Left flap: back face is the cover (seen when closed), front is the first inside panel */}
            <div className="leaflet__flap leaflet__flap--left" data-flap-left>
              <div className="leaflet__face leaflet__face--front">
                <InsidePanel item={hero.inside[0]} index="02">
                  <p className="mini-quote">“{brand.intro}”</p>
                </InsidePanel>
              </div>
              <div className="leaflet__face leaflet__face--back leaflet__cover">
                <Stripes corner="tl" />
                <Stripes corner="br" />
                <Monogram className="leaflet__mono" />
                <p className="leaflet__name">{brand.name}</p>
                <p className="leaflet__desc">{brand.descriptor}</p>
                <span className="leaflet__rule" />
                <p className="leaflet__strap">{brand.strapline.join(' · ')}</p>
              </div>
            </div>
          </div>
          <span className="leaflet__shadow" />
        </div>
      </div>

      <p className="hero__cue" aria-hidden="true" data-hero-cue>
        Scroll to open
      </p>
    </section>
  );
}

function InsidePanel({ item, index, children }) {
  return (
    <div className="inside">
      <span className="inside__index">{index}</span>
      <p className="inside__title">{item.title}</p>
      <p className="inside__body">{item.body}</p>
      {children}
    </div>
  );
}
