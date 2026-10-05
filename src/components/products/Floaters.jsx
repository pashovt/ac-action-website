import Product from './Product.jsx';

/**
 * Scatters product models around a section. Each item gently bobs (CSS) and
 * drifts with scroll at its own depth (GSAP, via data-depth in useScrubEffects).
 * Positions are percentages of the section; `mobile: false` hides an item on
 * small screens. Decorative only.
 */
export default function Floaters({ items, className = '' }) {
  return (
    <div className={`floaters ${className}`} aria-hidden="true">
      {items.map((it, i) => (
        <div
          key={i}
          className={`floater${it.mobile === false ? ' floater--desktop' : ''}`}
          data-depth={it.depth ?? 0.4}
          style={{
            top: it.top,
            left: it.left,
            right: it.right,
            bottom: it.bottom,
            '--w': it.size || '5rem',
            '--r': `${it.rotate || 0}deg`,
            '--dur': `${it.duration || 7}s`,
            '--delay': `${it.delay ?? i * -1.3}s`,
          }}
        >
          <div className="floater__bob">
            <Product type={it.type} variant={it.variant} />
          </div>
        </div>
      ))}
    </div>
  );
}
