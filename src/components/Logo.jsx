import { useId } from 'react';
import { brand } from '../content/site.js';

/**
 * AC monogram + wordmark, redrawn as SVG from the business card for the
 * website. Replace with the client's master logo file when supplied
 * (keep the gold gradient and "AC ACTION" — never "AC Action Show").
 */
export function Monogram({ className = '' }) {
  const uid = useId().replace(/:/g, '');
  const g = `gold-${uid}`;
  return (
    <svg className={`monogram ${className}`} viewBox="0 0 120 80" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={g} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#aa8548" />
          <stop offset=".42" stopColor="#e2c78c" />
          <stop offset=".55" stopColor="#f3e2b4" />
          <stop offset="1" stopColor="#a78856" />
        </linearGradient>
      </defs>
      {/* A: a tall peak with an angled inner cut */}
      <path d="M4 76 L38 4 H50 L84 76 H68 L44 24 L20 76 Z" fill={`url(#${g})`} />
      <path d="M30 76 L44 46 L58 76 Z" fill={`url(#${g})`} opacity=".75" />
      {/* C: open ring overlapping the A */}
      <path
        d="M116 22 A34 34 0 1 0 116 58 L104 51 A20 20 0 1 1 104 29 Z"
        fill={`url(#${g})`}
      />
    </svg>
  );
}

export default function Logo({ stacked = false, className = '' }) {
  return (
    <span className={`logo${stacked ? ' logo--stacked' : ''} ${className}`}>
      <Monogram />
      <span className="logo__words">
        <span className="logo__name">{brand.name}</span>
        <span className="logo__desc">{brand.descriptor}</span>
      </span>
    </span>
  );
}
