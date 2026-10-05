import { useLayoutEffect } from 'react';
import { getGsap } from '../lib/motion.js';

/**
 * Drives the left progress rail from native scroll. Markers are placed at
 * their section's real position (recomputed on every ScrollTrigger refresh,
 * so the pinned hero is accounted for); the can rolls only when motion is
 * allowed. Cleans up its trigger and listeners on unmount.
 */
export function useScrollRail(ref) {
  useLayoutEffect(() => {
    const nav = ref.current;
    if (!nav) return undefined;
    let trigger;
    let onRefresh;
    try {
      const { ScrollTrigger } = getGsap();
      const can = nav.querySelector('[data-rail-can]');
      const fill = nav.querySelector('[data-rail-fill]');
      const markers = [...nav.querySelectorAll('[data-rail-marker]')];
      const roll = window.matchMedia('(prefers-reduced-motion: no-preference)');
      let fracs = markers.map((_, i) => i / (markers.length - 1));

      const place = () => {
        const max = ScrollTrigger.maxScroll(window) || 1;
        fracs = markers.map((m) => {
          const el = document.getElementById(m.dataset.railMarker);
          if (!el) return 0;
          const top = el.getBoundingClientRect().top + window.scrollY;
          return Math.min(1, Math.max(0, top / max));
        });
        markers.forEach((m, i) => {
          m.style.top = `${fracs[i] * 100}%`;
        });
      };

      const update = (p) => {
        const h = nav.querySelector('.rail__track').clientHeight;
        if (can) can.style.transform = `translate(-50%, ${p * h}px) rotate(${roll.matches ? p * 1440 : 0}deg)`;
        if (fill) fill.style.transform = `scaleY(${p})`;
        let active = 0;
        fracs.forEach((f, i) => {
          if (p + 0.002 >= f) active = i;
        });
        markers.forEach((m, i) => m.classList.toggle('is-active', i === active));
      };

      onRefresh = () => {
        place();
        update(trigger ? trigger.progress : 0);
      };
      ScrollTrigger.addEventListener('refresh', onRefresh);
      trigger = ScrollTrigger.create({ start: 0, end: 'max', onUpdate: (self) => update(self.progress) });
      onRefresh();
    } catch (err) {
      console.warn('[AC Action] Scroll rail disabled:', err);
    }
    return () => {
      trigger?.kill();
      if (onRefresh) getGsap().ScrollTrigger.removeEventListener('refresh', onRefresh);
    };
  }, [ref]);
}
