import { service } from '../content/site.js';
import PanelHead from './PanelHead.jsx';
import CoverageMap from './CoverageMap.jsx';
import PostcodeChecker from './PostcodeChecker.jsx';

/** Panel 5 — how it works (numbered steps) and the 15-mile service area. */
export default function Service({ onUsePostcode }) {
  const { coverage } = service;
  return (
    <section id={service.id} className="section service" aria-labelledby="service-title">
      <div className="container">
        <PanelHead id="service-title" panel={service.panel} eyebrow={service.eyebrow} heading={service.heading} />
        <ol className="steps">
          {service.steps.map((s, i) => (
            <li className="step" key={s.title} data-reveal>
              <span className="step__num" aria-hidden="true">
                {i + 1}
              </span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </li>
          ))}
        </ol>
        <p className="service__note" data-reveal>
          {service.serviceNote}
        </p>

        <div className="coverage" id="coverage" data-reveal>
          <div className="coverage__text">
            <h3>{coverage.heading}</h3>
            <p>{coverage.body}</p>
            <ul className="coverage__list">
              {coverage.places
                .filter((p) => p.miles > 0)
                .map((p) => (
                  <li key={p.name}>{p.name}</li>
                ))}
            </ul>
            <p className="coverage__more">…and surrounding areas within around 15 miles.</p>
            <PostcodeChecker onUsePostcode={onUsePostcode} />
          </div>
          <CoverageMap places={coverage.places} />
        </div>
      </div>
    </section>
  );
}
