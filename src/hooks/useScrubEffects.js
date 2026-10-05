import { useLayoutEffect } from 'react';
import { getGsap, MOTION_QUERIES } from '../lib/motion.js';

/**
 * Scroll-linked effects, all skipped under reduced motion:
 * - `[data-words]`: words brighten one by one as the block crosses the viewport.
 * - `[data-progress]`: a line grows across the process timeline, with a
 *   product (`[data-traveller]`) rolling along it.
 * - `[data-depth]`: scattered product models drift at different depths.
 * - `[data-restock]`: machine slots fill row by row; stock bar rises.
 * Default CSS shows everything in its final state, so nothing depends on this.
 */
export function useScrubEffects() {
  useLayoutEffect(() => {
    let mm;
    try {
      const { gsap } = getGsap();
      mm = gsap.matchMedia();
      mm.add(MOTION_QUERIES.allowMotion, () => {
        gsap.utils.toArray('[data-words]').forEach((block) => {
          const words = block.querySelectorAll('[data-word]');
          gsap.fromTo(
            words,
            { opacity: 0.18 },
            {
              opacity: 1,
              ease: 'none',
              stagger: 0.1,
              scrollTrigger: { trigger: block, start: 'top 80%', end: 'bottom 45%', scrub: 0.5 },
            },
          );
        });

        gsap.utils.toArray('[data-progress]').forEach((line) => {
          const rail = line.parentElement;
          const st = { trigger: rail, start: 'top 75%', end: 'bottom 55%', scrub: 0.5 };
          gsap.fromTo(line, { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: st });
          const traveller = rail.querySelector('[data-traveller]');
          if (traveller) {
            gsap.fromTo(
              traveller,
              { x: 0, rotation: 0 },
              {
                x: () => rail.offsetWidth - traveller.offsetWidth,
                rotation: 720,
                ease: 'none',
                scrollTrigger: { ...st, invalidateOnRefresh: true },
              },
            );
          }
        });

        gsap.utils.toArray('[data-depth]').forEach((el) => {
          const depth = parseFloat(el.dataset.depth) || 0.4;
          gsap.fromTo(
            el,
            { y: 90 * depth },
            {
              y: -90 * depth,
              ease: 'none',
              scrollTrigger: { trigger: el.closest('section') || el, start: 'top bottom', end: 'bottom top', scrub: 0.8 },
            },
          );
        });

        gsap.utils.toArray('[data-restock]').forEach((box) => {
          const items = box.querySelectorAll('[data-restock-item]');
          const tl = gsap.timeline({
            scrollTrigger: { trigger: box, start: 'top 85%', end: 'center 45%', scrub: 0.6 },
          });
          tl.fromTo(items, { yPercent: -70, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, ease: 'back.out(1.6)', stagger: 0.08, duration: 0.5 }, 0)
            .fromTo(box.querySelector('[data-restock-bar]'), { scaleX: 0.12 }, { scaleX: 1, ease: 'none', duration: items.length * 0.08 + 0.5 }, 0);
        });
      });
    } catch (err) {
      console.warn('[Vendora] Scroll effects disabled:', err);
    }
    return () => mm && mm.revert();
  }, []);
}
