import { useRef } from 'react';
import { rail } from '../content/site.js';
import { useScrollRail } from '../hooks/useScrollRail.js';
import Product from './products/Product.jsx';

/**
 * Left-hand progress rail (desktop): a gold line that fills as the page
 * scrolls, a can that rolls down it, and a marker per leaflet panel that
 * links to its section. Markers sit at each section's real scroll position.
 */
export default function ScrollRail() {
  const ref = useRef(null);
  useScrollRail(ref);
  return (
    <nav className="rail" aria-label="Page sections" ref={ref}>
      <span className="rail__track" aria-hidden="true">
        <span className="rail__fill" data-rail-fill />
      </span>
      <span className="rail__can" aria-hidden="true" data-rail-can>
        <Product type="can" variant="coral" />
      </span>
      <ol className="rail__markers">
        {rail.map((r, i) => (
          <li key={r.id} data-rail-marker={r.id} style={{ top: `${(i / (rail.length - 1)) * 100}%` }}>
            <a href={`#${r.id}`}>
              <span className="rail__dot" aria-hidden="true" />
              <span className="rail__num" aria-hidden="true">
                0{i + 1}
              </span>
              <span className="rail__label">{r.label}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
