import { useLayoutEffect } from 'react';
import { getGsap, MOTION_QUERIES } from '../lib/motion.js';

/**
 * Gentle fade-up for section headings and key blocks marked `data-reveal`.
 * Applied to a small number of elements only, never to every paragraph.
 * Skipped entirely when the visitor prefers reduced motion.
 */
export function useReveals() {
  useLayoutEffect(() => {
    let mm;
    try {
      const { gsap, ScrollTrigger } = getGsap();
      mm = gsap.matchMedia();

      mm.add(MOTION_QUERIES.allowMotion, () => {
        const targets = gsap.utils.toArray('[data-reveal]');
        if (targets.length === 0) return;

        // Elements already on screen at load are left alone so nothing flickers.
        const below = targets.filter((el) => el.getBoundingClientRect().top > window.innerHeight * 0.9);
        // Opacity only (not visibility) so hidden-until-revealed content stays
        // focusable; keyboard focus reveals it immediately (see onFocus below).
        gsap.set(below, { opacity: 0, y: 24 });

        const reveal = (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
            stagger: 0.08,
            overwrite: true,
          });

        // onLeave also reveals, so elements skipped by a fast anchor jump
        // are never left hidden above the viewport.
        ScrollTrigger.batch(below, {
          start: 'top 88%',
          once: true,
          onEnter: reveal,
          onLeave: reveal,
        });

        const onFocus = (e) => {
          const block = e.target.closest?.('[data-reveal]');
          if (block) gsap.to(block, { opacity: 1, y: 0, duration: 0.2, overwrite: true });
        };
        document.addEventListener('focusin', onFocus);

        // Images or fonts can shift layout after load; recalc trigger points.
        const refresh = () => ScrollTrigger.refresh();
        window.addEventListener('load', refresh);
        return () => {
          window.removeEventListener('load', refresh);
          document.removeEventListener('focusin', onFocus);
        };
      });
    } catch (err) {
      console.warn('[Vendora] Reveal animations disabled:', err);
    }
    return () => mm && mm.revert();
  }, []);
}
