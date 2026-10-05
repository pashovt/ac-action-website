import { useId } from 'react';

/**
 * AC Action vending machine, drawn as an inline SVG (navy cabinet, gold trim,
 * AC monogram). Inline so the hero sequence can "press" keypad buttons
 * (data-key="0..11") and drop items from the delivery bin (data-bin).
 * Illustrative only — replace with photography of the real machine later.
 */
const W = 560;
const H = 980;
const ROWS = ['bottle', 'bottle', 'can', 'bag', 'bag', 'bar'];
const COLOURS = {
  bottle: ['#6fb7c9', '#d9dfe0', '#7fbf8a', '#e3a35a'],
  can: ['#c8443a', '#3d6fb6', '#e7d36a', '#8a8f96', '#3c9a74'],
  bag: ['#d6863c', '#b23b4a', '#e9c35b', '#4f7fc2', '#6a9a4a'],
  bar: ['#5b2f7a', '#9a1f26', '#8a6a2c', '#2f5f6e'],
};

export default function MachineSvg({ className = '' }) {
  const u = useId().replace(/:/g, '');
  const id = (n) => `${n}-${u}`;
  const gx0 = 78;
  const gx1 = 372;
  const slot = (gx1 - gx0) / 5;

  return (
    <svg className={`machine ${className}`} viewBox={`0 0 ${W} ${H}`} width={W} height={H} role="img" aria-labelledby={id('t')}>
      <title id={id('t')}>Illustration of an AC Action vending machine stocked with drinks, crisps and chocolate</title>
      <defs>
        <linearGradient id={id('body')} x1="0" x2="1">
          <stop offset="0" stopColor="#070d14" />
          <stop offset=".06" stopColor="#1b2735" />
          <stop offset=".5" stopColor="#121c28" />
          <stop offset=".94" stopColor="#1a2634" />
          <stop offset="1" stopColor="#070d14" />
        </linearGradient>
        <linearGradient id={id('sheen')} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".07" />
          <stop offset=".3" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity=".35" />
        </linearGradient>
        <linearGradient id={id('gold')} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#aa8548" />
          <stop offset=".45" stopColor="#e2c78c" />
          <stop offset=".55" stopColor="#f3e2b4" />
          <stop offset="1" stopColor="#a78856" />
        </linearGradient>
        <linearGradient id={id('cab')} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#1d2a3a" />
          <stop offset="1" stopColor="#0a1119" />
        </linearGradient>
        <radialGradient id={id('glow')} cx=".5" cy="0" r="1">
          <stop offset="0" stopColor="#f3e2b4" stopOpacity=".28" />
          <stop offset=".45" stopColor="#f3e2b4" stopOpacity=".06" />
          <stop offset="1" stopColor="#f3e2b4" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={id('glass')} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".1" />
          <stop offset=".22" stopColor="#fff" stopOpacity=".02" />
          <stop offset=".23" stopColor="#fff" stopOpacity=".07" />
          <stop offset=".34" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#fff" stopOpacity=".03" />
        </linearGradient>
        <linearGradient id={id('shine')} x1="0" x2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset=".5" stopColor="#fff" stopOpacity=".35" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={id('floor')} cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#000" stopOpacity=".75" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </radialGradient>
        <symbol id={id('bottle')} overflow="visible">
          <path d="M-11 0 v-52 q0-10 7-16 v-8 h8 v8 q7 6 7 16 v52 z" />
          <rect x="-5" y="-82" width="10" height="7" rx="1.5" fill="#e9ebe4" />
          <rect x="-11" y="-40" width="22" height="18" fill="#fff" opacity=".28" />
          <rect x="-8" y="-66" width="3" height="58" fill={`url(#${id('shine')})`} opacity=".8" />
        </symbol>
        <symbol id={id('can')} overflow="visible">
          <rect x="-12" y="-46" width="24" height="46" rx="3" />
          <rect x="-12" y="-46" width="24" height="4" rx="2" fill="#d4d7d0" />
          <rect x="-12" y="-28" width="24" height="10" fill="#fff" opacity=".22" />
          <rect x="-8" y="-42" width="4" height="40" fill={`url(#${id('shine')})`} />
        </symbol>
        <symbol id={id('bag')} overflow="visible">
          <path d="M-20 0 q-3-30 0-62 h40 q3 32 0 62 z" />
          <path d="M-20 -62 h40 v5 h-40 z M-20 -5 h40 v5 h-40 z" fill="#000" opacity=".22" />
          <ellipse cx="0" cy="-32" rx="10" ry="12" fill="#fff" opacity=".25" />
          <rect x="-15" y="-55" width="5" height="48" fill={`url(#${id('shine')})`} opacity=".7" />
        </symbol>
        <symbol id={id('bar')} overflow="visible">
          <rect x="-24" y="-22" width="48" height="22" rx="2" />
          <rect x="-24" y="-14" width="48" height="6" fill="#fff" opacity=".22" />
          <rect x="-24" y="-44" width="48" height="22" rx="2" opacity=".8" />
          <rect x="-24" y="-36" width="48" height="6" fill="#fff" opacity=".18" />
        </symbol>
      </defs>

      <ellipse cx="280" cy="948" rx="270" ry="22" fill={`url(#${id('floor')})`} />

      {/* cabinet */}
      <rect x="40" y="26" width="480" height="910" rx="16" fill={`url(#${id('body')})`} />
      <rect x="40" y="26" width="480" height="910" rx="16" fill={`url(#${id('sheen')})`} />
      <rect x="40.5" y="26.5" width="479" height="909" rx="15.5" fill="none" stroke="#d5b57a" strokeOpacity=".25" />

      {/* header with AC monogram */}
      <rect x="62" y="40" width="436" height="56" rx="6" fill="#0a1119" />
      <g transform="translate(222 50) scale(.42)" fill={`url(#${id('gold')})`}>
        <path d="M4 76 L38 4 H50 L84 76 H68 L44 24 L20 76 Z" />
        <path d="M116 22 A34 34 0 1 0 116 58 L104 51 A20 20 0 1 1 104 29 Z" />
      </g>
      <text x="282" y="76" fill={`url(#${id('gold')})`} fontFamily="Montserrat Variable, Montserrat, sans-serif" fontWeight="700" fontSize="17" letterSpacing="3">
        AC ACTION
      </text>
      <rect x="86" y="88" width="388" height="3" rx="1.5" fill={`url(#${id('gold')})`} opacity=".9" />

      {/* glass window + stock */}
      <rect x="66" y="110" width="318" height="656" rx="8" fill="#04080d" />
      <rect x="72" y="116" width="306" height="644" rx="5" fill={`url(#${id('cab')})`} />
      <rect x="72" y="116" width="306" height="644" rx="5" fill={`url(#${id('glow')})`} />
      <rect x="82" y="118" width="286" height="3" rx="1.5" fill="#f3e2b4" opacity=".75" />
      {ROWS.map((kind, r) => {
        const base = 128 + (r + 1) * 103 - 14;
        return (
          <g key={r}>
            {Array.from({ length: 5 }, (_, c) => {
              const cx = gx0 + slot * c + slot / 2;
              const cols = COLOURS[kind];
              return <use key={c} href={`#${id(kind)}`} x={cx} y={base} fill={cols[(c + r) % cols.length]} />;
            })}
            <rect x={gx0 - 4} y={base} width={gx1 - gx0 + 8} height="5" fill="#8d8f86" />
            {Array.from({ length: 5 }, (_, c) => (
              <rect key={c} x={gx0 + slot * c + slot / 2 - 9} y={base + 8} width="18" height="5" rx="1.5" fill="#d5b57a" opacity=".55" />
            ))}
          </g>
        );
      })}
      <rect x="72" y="116" width="306" height="644" rx="5" fill={`url(#${id('glass')})`} />
      <rect x="66.5" y="110.5" width="317" height="655" rx="7.5" fill="none" stroke="#fff" strokeOpacity=".12" />

      {/* selection panel */}
      <rect x="394" y="110" width="110" height="656" rx="8" fill="#0d1520" />
      <rect x="404" y="124" width="90" height="82" rx="5" fill="#04080d" />
      <rect x="414" y="142" width="44" height="6" rx="3" fill="#d5b57a" opacity=".85" data-screen />
      <rect x="414" y="158" width="66" height="4" rx="2" fill="#f3f1ed" opacity=".35" />
      <rect x="414" y="170" width="54" height="4" rx="2" fill="#f3f1ed" opacity=".25" />
      <rect x="404" y="220" width="90" height="1" fill="#fff" opacity=".08" />
      {Array.from({ length: 12 }, (_, k) => {
        const i = Math.floor(k / 3);
        const j = k % 3;
        return (
          <rect
            key={k}
            data-key={k}
            className="machine__key"
            x={404 + j * 30}
            y={238 + i * 30}
            width="24"
            height="24"
            rx="5"
            fill="#25303d"
            stroke="#000"
            strokeOpacity=".5"
          />
        );
      })}

      {/* contactless reader (illustrative) */}
      <rect x="404" y="378" width="90" height="118" rx="10" fill="#060b11" stroke="#fff" strokeOpacity=".1" />
      <rect x="414" y="388" width="70" height="70" rx="8" fill="#141e2a" />
      <g fill="none" stroke="#f3f1ed" strokeLinecap="round" strokeWidth="3" opacity=".8" transform="translate(442 423)">
        <path d="M0 -10 q6 10 0 20" />
        <path d="M7 -15 q9 15 0 30" />
        <path d="M14 -20 q12 20 0 40" />
        <circle cx="-7" cy="0" r="2" fill="#f3f1ed" stroke="none" />
      </g>
      <circle cx="478" cy="484" r="3" fill="#d5b57a" />
      <rect x="420" y="524" width="58" height="8" rx="4" fill="#04080d" />
      <rect x="420" y="552" width="58" height="40" rx="6" fill="#0a1119" stroke="#fff" strokeOpacity=".06" />
      <rect x="418" y="640" width="62" height="96" rx="6" fill="#0a1119" />

      {/* delivery bin */}
      <rect x="66" y="786" width="318" height="112" rx="8" fill="#060b11" />
      <rect x="80" y="800" width="290" height="76" rx="5" fill="#111a25" data-bin />
      <rect x="80" y="800" width="290" height="38" rx="5" fill={`url(#${id('sheen')})`} />
      <rect x="170" y="852" width="110" height="10" rx="5" fill={`url(#${id('gold')})`} opacity=".7" />

      {/* vents + plinth */}
      {Array.from({ length: 7 }, (_, i) => (
        <rect key={i} x="408" y={790 + i * 12} width="84" height="4" rx="2" fill="#060b11" />
      ))}
      <rect x="40" y="912" width="480" height="24" rx="6" fill="#060b11" />
      <rect x="40" y="912" width="480" height="2" fill={`url(#${id('gold')})`} opacity=".5" />
      <rect x="58" y="936" width="40" height="10" rx="2" fill="#05080c" />
      <rect x="462" y="936" width="40" height="10" rx="2" fill="#05080c" />
    </svg>
  );
}
