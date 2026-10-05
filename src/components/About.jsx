import { about } from '../content/site.js';
import PanelHead from './PanelHead.jsx';
import Stripes from './Stripes.jsx';

export default function About() {
  return (
    <section id={about.id} className="section about theme-light" aria-labelledby="about-title">
      <Stripes corner="tr" className="section__stripes" />
      <div className="container about__grid">
        <div>
          <PanelHead id="about-title" panel={about.panel} eyebrow={about.eyebrow} heading={about.heading} />
          <div className="about__body" data-reveal>
            {about.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
        <ol className="about__points">
          {about.points.map((pt, i) => (
            <li key={pt.title} data-reveal>
              <span className="about__num" aria-hidden="true">
                0{i + 1}
              </span>
              <h3>{pt.title}</h3>
              <p>{pt.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
