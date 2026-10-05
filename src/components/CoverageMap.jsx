/**
 * Illustrative radius map: Nottingham at the centre, rings at 5/10/15 miles
 * and nearby places plotted by approximate bearing and distance. Not to scale
 * for navigation — the text list beside it carries the same information.
 */
export default function CoverageMap({ places }) {
  const R = 160; // px for 15 miles
  const C = 180;
  const pos = (angle, miles) => {
    const a = ((angle - 90) * Math.PI) / 180;
    const r = (miles / 15) * R;
    return [C + r * Math.cos(a), C + r * Math.sin(a)];
  };
  return (
    <figure className="coverage__map">
      <svg viewBox="0 0 360 360" role="img" aria-labelledby="map-title">
        <title id="map-title">Illustrative map of the service area: around 15 miles from Nottingham city centre.</title>
        <defs>
          <radialGradient id="map-glow">
            <stop offset="0" stopColor="#c7a569" stopOpacity=".28" />
            <stop offset="1" stopColor="#c7a569" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx={C} cy={C} r={R} fill="url(#map-glow)" />
        {[5, 10, 15].map((m) => (
          <circle
            key={m}
            className={`map-ring map-ring--${m}`}
            cx={C}
            cy={C}
            r={(m / 15) * R}
            fill="none"
            stroke="#c7a569"
            strokeOpacity={m === 15 ? 0.9 : 0.3}
            strokeWidth={m === 15 ? 1.6 : 1}
            strokeDasharray={m === 15 ? '6 6' : undefined}
          />
        ))}
        <text x={C} y={C - R - 6} textAnchor="middle" className="map-label map-label--ring">
          15 MILES
        </text>
        {places.map((p) => {
          const [x, y] = pos(p.angle, p.miles);
          const centre = p.miles === 0;
          const right = x >= C;
          return (
            <g key={p.name} className={centre ? 'map-place map-place--centre' : 'map-place'}>
              <circle cx={x} cy={y} r={centre ? 6 : 3.2} />
              {centre ? <circle cx={x} cy={y} r="12" className="map-pulse" /> : null}
              <text x={centre ? x : x + (right ? 7 : -7)} y={centre ? y - 18 : y + 4} textAnchor={centre ? 'middle' : right ? 'start' : 'end'} className="map-label">
                {p.name}
              </text>
            </g>
          );
        })}
      </svg>
      <figcaption>Illustrative map — not to scale.</figcaption>
    </figure>
  );
}
