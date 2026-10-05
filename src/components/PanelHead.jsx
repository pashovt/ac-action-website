/** Section heading styled like a leaflet panel: panel number, eyebrow, title. */
export default function PanelHead({ id, panel, eyebrow, heading, intro, className = '' }) {
  return (
    <div className={`panel-head ${className}`} data-reveal>
      <p className="eyebrow">
        {panel ? (
          <span className="panel-head__num" aria-hidden="true">
            {panel} / 06
          </span>
        ) : null}
        {eyebrow}
      </p>
      <h2 id={id} className="section-title">
        {heading}
      </h2>
      {intro ? <p className="section-intro">{intro}</p> : null}
    </div>
  );
}
