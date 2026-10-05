import { useLayoutEffect } from 'react';
import { getGsap, MOTION_QUERIES } from '../lib/motion.js';

/**
 * Desktop hero: pins the cover section (native scroll, scrubbed) and opens
 * the leaflet — left flap first, then the right — while the leaflet glides
 * to the centre and the hero copy steps aside. The closed leaflet is the CSS
 * default, so without GSAP (mobile, reduced motion, failure) it stays a still
 * cover. All changes are reverted by mm.revert() (Strict Mode safe).
 */
export function useLeaflet(rootRef) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    let mm;
    try {
      const { gsap } = getGsap();
      mm = gsap.matchMedia();
      mm.add(MOTION_QUERIES.cinematic, () => {
        const q = (s) => root.querySelector(s);
        const stage = q('[data-leaflet-stage]');
        const copy = q('[data-hero-copy]');
        const left = q('[data-flap-left]');
        const right = q('[data-flap-right]');
        if (!stage || !left || !right) return undefined;

        root.classList.add('is-pinned');
        // The fold angle lives in a CSS variable (--fold: 180deg = closed),
        // which avoids GSAP decomposing a 180deg rotateY matrix ambiguously.
        // fromTo gives the tween an explicit start (it can't read the CSS default).
        // Distance from the stage's resting place to the section centre.
        const toCentre = () => {
          const r = stage.getBoundingClientRect();
          const s = root.getBoundingClientRect();
          return s.left + s.width / 2 - (r.left + r.width / 2);
        };

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: root,
            start: 'top top',
            end: '+=130%',
            pin: true,
            scrub: 0.7,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        tl.to(copy, { autoAlpha: 0, x: -60, duration: 0.6 }, 0)
          .to(q('[data-hero-cue]'), { autoAlpha: 0, duration: 0.2 }, 0)
          .to(stage, { x: toCentre, scale: 1.04, duration: 0.8, ease: 'power1.inOut' }, 0)
          .fromTo(left, { '--fold': '180deg' }, { '--fold': '0deg', duration: 0.9, ease: 'power2.inOut' }, 0.35)
          .fromTo(right, { '--fold': '180deg' }, { '--fold': '0deg', duration: 0.9, ease: 'power2.inOut' }, 1.05)
          .to({}, { duration: 0.4 });

        return () => root.classList.remove('is-pinned');
      });
    } catch (err) {
      console.warn('[AC Action] Leaflet sequence disabled:', err);
    }
    return () => mm && mm.revert();
  }, [rootRef]);
}
