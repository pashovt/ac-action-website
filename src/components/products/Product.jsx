import { useId } from 'react';

/**
 * Unbranded product "models": drawn SVGs with lighting gradients so they read
 * as small 3D objects. Types: can, bottle, crisps, chocolate, bowl (takeaway poke bowl).
 * Purely decorative — always rendered with aria-hidden by the caller.
 */
const VARIANTS = {
  can: {
    coral: ['#b8402a', '#f07a5c', '#8a2c1c'],
    teal: ['#1f6f6a', '#4fb3a6', '#164f4b'],
    lime: ['#7e9a17', '#c6f432', '#5d7210'],
  },
  crisps: {
    amber: ['#c9781c', '#f2b54a', '#9a5a12'],
    blue: ['#2c58a0', '#6b9be0', '#1d3e75'],
    red: ['#a82a2a', '#e0584a', '#7a1c1c'],
  },
  chocolate: {
    purple: ['#4b2a6b', '#7d55a6', '#331b4b'],
    red: ['#9a1f26', '#d8453c', '#6d1419'],
    gold: ['#8a6a2c', '#d5b57a', '#5e4718'],
  },
};

export default function Product({ type, variant, className = '' }) {
  const uid = useId().replace(/:/g, '');
  const id = (n) => `${n}-${uid}`;
  const common = { className: `product product--${type} ${className}`, 'aria-hidden': true, focusable: 'false' };

  if (type === 'can') {
    const [dark, light, deep] = VARIANTS.can[variant || 'coral'];
    return (
      <svg viewBox="0 0 64 116" {...common}>
        <defs>
          <linearGradient id={id('body')} x1="0" x2="1">
            <stop offset="0" stopColor={deep} />
            <stop offset=".28" stopColor={light} />
            <stop offset=".42" stopColor="#fff" stopOpacity=".85" />
            <stop offset=".5" stopColor={light} />
            <stop offset="1" stopColor={dark} />
          </linearGradient>
          <linearGradient id={id('metal')} x1="0" x2="1">
            <stop offset="0" stopColor="#6d716b" />
            <stop offset=".35" stopColor="#f1f2ed" />
            <stop offset=".6" stopColor="#b9bcb5" />
            <stop offset="1" stopColor="#5d605b" />
          </linearGradient>
        </defs>
        <ellipse cx="32" cy="111" rx="26" ry="4" fill="#000" opacity=".35" />
        <path d="M8 16 Q8 10 14 8 H50 Q56 10 56 16 V100 Q56 106 50 108 H14 Q8 106 8 100 Z" fill={`url(#${id('body')})`} />
        <rect x="8" y="44" width="48" height="26" fill="#f3efe4" opacity=".92" />
        <rect x="8" y="44" width="48" height="26" fill={`url(#${id('body')})`} opacity=".18" />
        <circle cx="32" cy="57" r="7" fill={dark} opacity=".9" />
        <rect x="8" y="73" width="48" height="2" fill="#fff" opacity=".35" />
        <path d="M10 10 Q10 4 18 3 H46 Q54 4 54 10 L50 14 H14 Z" fill={`url(#${id('metal')})`} />
        <ellipse cx="32" cy="8" rx="20" ry="4" fill={`url(#${id('metal')})`} />
        <ellipse cx="32" cy="8" rx="15" ry="2.6" fill="#8d918a" />
        <rect x="27" y="5.5" width="10" height="3" rx="1.5" fill="#d9dbd5" />
        <path d="M10 104 Q10 110 18 111 H46 Q54 110 54 104 Z" fill={`url(#${id('metal')})`} />
      </svg>
    );
  }

  if (type === 'bottle') {
    return (
      <svg viewBox="0 0 54 140" {...common}>
        <defs>
          <linearGradient id={id('glass')} x1="0" x2="1">
            <stop offset="0" stopColor="#5f9fbf" stopOpacity=".85" />
            <stop offset=".3" stopColor="#cfe8f2" stopOpacity=".75" />
            <stop offset=".45" stopColor="#ffffff" stopOpacity=".9" />
            <stop offset=".6" stopColor="#9fd0e4" stopOpacity=".7" />
            <stop offset="1" stopColor="#3f7f9f" stopOpacity=".9" />
          </linearGradient>
          <linearGradient id={id('water')} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#7cc3e0" stopOpacity=".35" />
            <stop offset="1" stopColor="#2f7aa0" stopOpacity=".55" />
          </linearGradient>
          <linearGradient id={id('cap')} x1="0" x2="1">
            <stop offset="0" stopColor="#7a8f20" />
            <stop offset=".4" stopColor="#d4ff4a" />
            <stop offset="1" stopColor="#5d7210" />
          </linearGradient>
        </defs>
        <ellipse cx="27" cy="135" rx="21" ry="3.5" fill="#000" opacity=".3" />
        <path d="M20 14 H34 V24 Q34 30 42 38 Q47 44 47 54 V124 Q47 132 39 133 H15 Q7 132 7 124 V54 Q7 44 12 38 Q20 30 20 24 Z" fill={`url(#${id('glass')})`} />
        <path d="M9 60 H45 V124 Q45 130 38 131 H16 Q9 130 9 124 Z" fill={`url(#${id('water')})`} />
        <path d="M7 70 H47 M7 96 H47 M7 112 H47" stroke="#fff" strokeOpacity=".45" strokeWidth="1.2" />
        <rect x="7" y="74" width="40" height="18" fill="#f3efe4" opacity=".9" />
        <rect x="13" y="81" width="20" height="3" rx="1.5" fill="#2f7aa0" opacity=".7" />
        <path d="M13 46 Q11 80 13 120" stroke="#fff" strokeOpacity=".75" strokeWidth="3" strokeLinecap="round" fill="none" />
        <rect x="18" y="3" width="18" height="12" rx="2.5" fill={`url(#${id('cap')})`} />
        <path d="M20 6 V13 M24 6 V13 M28 6 V13 M32 6 V13" stroke="#000" strokeOpacity=".2" />
      </svg>
    );
  }

  if (type === 'crisps') {
    const [dark, light, deep] = VARIANTS.crisps[variant || 'amber'];
    const zig = (y, dir) =>
      Array.from({ length: 9 }, (_, i) => `${8 + i * 9},${y + (i % 2 ? dir * 4 : 0)}`).join(' ');
    return (
      <svg viewBox="0 0 96 124" {...common}>
        <defs>
          <linearGradient id={id('foil')} x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor={light} />
            <stop offset=".45" stopColor={dark} />
            <stop offset="1" stopColor={deep} />
          </linearGradient>
          <radialGradient id={id('sheen')} cx=".3" cy=".3" r=".6">
            <stop offset="0" stopColor="#fff" stopOpacity=".55" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx="48" cy="119" rx="34" ry="4" fill="#000" opacity=".3" />
        <path d="M8 14 Q4 62 10 110 H86 Q92 62 88 14 Z" fill={`url(#${id('foil')})`} />
        <polygon points={`${zig(14, -1)} 88,14 88,6 8,6`} fill={light} />
        <polygon points={`${zig(110, 1)} 88,110 88,116 8,116`} fill={deep} />
        <path d="M8 14 Q4 62 10 110 H86 Q92 62 88 14 Z" fill={`url(#${id('sheen')})`} />
        <ellipse cx="48" cy="62" rx="22" ry="18" fill="#f3efe4" opacity=".92" />
        <path d="M36 66 Q42 52 52 58 Q60 50 62 64 Q54 72 44 70 Z" fill="#e9b85a" />
        <path d="M40 64 Q46 58 54 62" stroke="#c48a2c" strokeWidth="1.2" fill="none" />
        <rect x="30" y="88" width="36" height="4" rx="2" fill="#fff" opacity=".5" />
        <path d="M18 22 Q14 60 18 100" stroke="#fff" strokeOpacity=".35" strokeWidth="4" strokeLinecap="round" fill="none" />
      </svg>
    );
  }

  if (type === 'chocolate') {
    // Wrapped bar, one end torn open to show the segmented chocolate.
    const [dark, light, deep] = VARIANTS.chocolate[variant || 'purple'];
    return (
      <svg viewBox="0 0 150 64" {...common}>
        <defs>
          <linearGradient id={id('wrap')} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor={light} />
            <stop offset=".45" stopColor={dark} />
            <stop offset="1" stopColor={deep} />
          </linearGradient>
          <linearGradient id={id('choc')} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#8a5a3a" />
            <stop offset="1" stopColor="#4a2c1a" />
          </linearGradient>
          <linearGradient id={id('foil')} x1="0" x2="1">
            <stop offset="0" stopColor="#9da3a6" />
            <stop offset=".5" stopColor="#f2f3ee" />
            <stop offset="1" stopColor="#8f9598" />
          </linearGradient>
        </defs>
        <ellipse cx="75" cy="60" rx="66" ry="3.5" fill="#000" opacity=".3" />
        {/* exposed chocolate segments */}
        <rect x="104" y="12" width="40" height="40" rx="3" fill={`url(#${id('choc')})`} />
        <g stroke="#3a2214" strokeWidth="1.4" opacity=".8">
          <path d="M117 12 V52 M130 12 V52 M104 32 H144" />
        </g>
        <g fill="#fff" opacity=".18">
          <rect x="106" y="14" width="9" height="16" rx="1.5" />
          <rect x="119" y="14" width="9" height="16" rx="1.5" />
          <rect x="132" y="14" width="9" height="16" rx="1.5" />
        </g>
        {/* torn foil edge */}
        <path d="M100 10 l4 3 -3 4 4 4 -4 4 4 4 -4 4 4 4 -4 4 4 4 -3 4 -2 4 H96 V10 Z" fill={`url(#${id('foil')})`} />
        {/* wrapper */}
        <path d="M6 10 H102 l-3 6 3 6 -3 6 3 6 -3 6 3 6 -3 6 3 6 H6 Q2 54 2 50 V14 Q2 10 6 10 Z" fill={`url(#${id('wrap')})`} />
        <rect x="2" y="10" width="8" height="44" fill={deep} opacity=".5" />
        <rect x="24" y="22" width="56" height="20" rx="10" fill="#f3efe4" opacity=".92" />
        <rect x="34" y="29" width="36" height="6" rx="3" fill={dark} opacity=".85" />
        <path d="M10 15 H96" stroke="#fff" strokeOpacity=".45" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    );
  }

  // Takeaway poke bowl: kraft tub, clear domed lid, visible ingredients.
  return (
    <svg viewBox="0 0 140 104" {...common}>
      <defs>
        <linearGradient id={id('kraft')} x1="0" x2="1">
          <stop offset="0" stopColor="#9c7244" />
          <stop offset=".35" stopColor="#d6aa72" />
          <stop offset="1" stopColor="#8a6238" />
        </linearGradient>
        <linearGradient id={id('lid')} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity=".55" />
          <stop offset="1" stopColor="#ffffff" stopOpacity=".08" />
        </linearGradient>
      </defs>
      <ellipse cx="70" cy="99" rx="54" ry="4.5" fill="#000" opacity=".3" />
      <path d="M14 52 L24 94 Q26 98 32 98 H108 Q114 98 116 94 L126 52 Z" fill={`url(#${id('kraft')})`} />
      <rect x="40" y="66" width="60" height="16" rx="3" fill="#f3efe4" opacity=".9" />
      <rect x="48" y="72" width="30" height="3" rx="1.5" fill="#7e9a17" />
      <ellipse cx="70" cy="52" rx="56" ry="11" fill="#efe9dc" />
      {/* rice */}
      <ellipse cx="70" cy="50" rx="50" ry="8" fill="#fbf8f0" />
      {/* salmon cubes */}
      <g fill="#f08a6a">
        <rect x="30" y="43" width="9" height="7" rx="1.5" />
        <rect x="40" y="40" width="9" height="7" rx="1.5" />
        <rect x="35" y="47" width="9" height="6" rx="1.5" />
      </g>
      {/* avocado */}
      <g fill="#9cc65a" stroke="#5c7f2a" strokeWidth="1">
        <path d="M84 44 q8 -6 16 0 q-8 4 -16 0z" />
        <path d="M86 49 q8 -6 16 0 q-8 4 -16 0z" />
      </g>
      {/* edamame + cucumber + sesame */}
      <g fill="#6fa83a">
        <circle cx="58" cy="44" r="3" />
        <circle cx="63" cy="47" r="3" />
        <circle cx="56" cy="50" r="3" />
      </g>
      <g fill="#dfe9c8" stroke="#6b8f3a" strokeWidth="1.2">
        <circle cx="74" cy="44" r="4" />
        <circle cx="76" cy="51" r="4" />
      </g>
      <g fill="#2b2b2b">
        <circle cx="66" cy="42" r=".9" />
        <circle cx="70" cy="49" r=".9" />
        <circle cx="48" cy="45" r=".9" />
        <circle cx="94" cy="51" r=".9" />
      </g>
      {/* clear domed lid */}
      <path d="M12 52 Q14 18 70 14 Q126 18 128 52 Z" fill={`url(#${id('lid')})`} stroke="#fff" strokeOpacity=".7" strokeWidth="1.5" />
      <path d="M26 40 Q34 24 58 20" stroke="#fff" strokeOpacity=".8" strokeWidth="3" strokeLinecap="round" fill="none" />
      <ellipse cx="70" cy="52" rx="58" ry="5" fill="none" stroke="#fff" strokeOpacity=".6" strokeWidth="2" />
    </svg>
  );
}
