import { useLayoutEffect } from 'react';
import { getGsap, MOTION_QUERIES } from '../lib/motion.js';

// Delivery-bin opening in the machine SVG's own coordinates (viewBox 560 x 980).
const BIN = { x: 225, y: 830, w: 560, h: 980 };

/**
 * Desktop hero: pins the section (native scroll, scrubbed), glides the machine
 * to centre, then for each callout presses its keypad button, drops its item
 * out of the delivery bin and flies it to its point before the callout draws.
 *
 * Positions are measured from layout (offsetLeft/Top, SVG geometry), never
 * from on-screen boxes, so they stay correct while elements are transformed.
 * Everything is applied after GSAP initialises and reverted by mm.revert().
 */
export function useMachineSequence(rootRef) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    let mm;
    try {
      const { gsap } = getGsap();
      mm = gsap.matchMedia();
      mm.add(MOTION_QUERIES.cinematic, () => {
        const q = (s) => root.querySelector(s);
        const machine = q('[data-hero-machine]');
        const frame = q('[data-machine-frame]');
        const svg = frame?.querySelector('svg');
        const copy = q('[data-hero-copy]');
        const callouts = gsap.utils.toArray(root.querySelectorAll('[data-callout]'));
        if (!machine || !frame || !svg || callouts.length === 0) return undefined;

        root.classList.add('is-cinematic');

        // Layout offset of el inside ancestor, ignoring transforms.
        const offsetIn = (el, ancestor) => {
          let x = 0;
          let y = 0;
          let n = el;
          while (n && n !== ancestor) {
            x += n.offsetLeft;
            y += n.offsetTop;
            n = n.offsetParent;
          }
          return { x, y };
        };
        const toCentre = () => {
          const m = offsetIn(machine, root);
          return root.clientWidth / 2 - (m.x + machine.offsetWidth / 2);
        };
        // Vector from an item's resting centre back to the bin (frame coords).
        const fromBin = (callout, item) => {
          const scale = svg.clientWidth / BIN.w;
          const binX = BIN.x * scale;
          const binY = BIN.y * scale;
          // Callouts are vertically centred with translateY(-50%).
          const cx = callout.offsetLeft + item.offsetLeft + item.offsetWidth / 2;
          const cy = callout.offsetTop - callout.offsetHeight / 2 + item.offsetTop + item.offsetHeight / 2;
          return { x: binX - cx, y: binY - cy };
        };

        callouts.forEach((c) => {
          gsap.set(c.querySelector('[data-callout-dot]'), { scale: 0 });
          gsap.set(c.querySelector('[data-callout-line]'), { scaleX: 0 });
          gsap.set(c.querySelector('[data-callout-label]'), { autoAlpha: 0, y: 14 });
          gsap.set(c.querySelector('[data-callout-item]'), { autoAlpha: 0 });
        });

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: root,
            start: 'top top',
            end: '+=150%',
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        tl.to(copy, { autoAlpha: 0, x: -60, duration: 0.6 }, 0)
          .to(q('[data-hero-cue]'), { autoAlpha: 0, duration: 0.2 }, 0)
          .to(machine, { x: toCentre, duration: 0.8, ease: 'power1.inOut' }, 0);

        callouts.forEach((c, i) => {
          const t = 0.95 + i * 0.85;
          const key = svg.querySelector(`[data-key="${c.dataset.key}"]`);
          const screen = svg.querySelector('[data-screen]');
          const item = c.querySelector('[data-callout-item]');
          const left = c.classList.contains('callout--left');

          // 1. Button press + screen flash.
          if (key) {
            tl.to(key, { fill: '#d5b57a', scale: 0.84, svgOrigin: `${+key.getAttribute('x') + 12} ${+key.getAttribute('y') + 12}`, duration: 0.08 }, t)
              .to(key, { fill: '#25303d', scale: 1, duration: 0.12 }, t + 0.14);
          }
          if (screen) tl.to(screen, { opacity: 0.3, duration: 0.05, yoyo: true, repeat: 1 }, t);

          // 2. Item drops out of the bin and arcs to its point.
          tl.fromTo(
            item,
            { x: () => fromBin(c, item).x, y: () => fromBin(c, item).y, scale: 0.35, rotation: left ? 25 : -25, autoAlpha: 0 },
            { autoAlpha: 1, duration: 0.05 },
            t + 0.18,
          )
            .to(item, { x: 0, duration: 0.45, ease: 'power2.out' }, t + 0.2)
            .to(item, { y: 0, duration: 0.45, ease: 'power3.inOut' }, t + 0.2)
            .to(item, { scale: 1, rotation: left ? -10 : 12, duration: 0.45, ease: 'back.out(1.6)' }, t + 0.2);

          // 3. Callout draws in.
          tl.to(c.querySelector('[data-callout-dot]'), { scale: 1, duration: 0.12, ease: 'back.out(3)' }, t + 0.5)
            .to(c.querySelector('[data-callout-line]'), { scaleX: 1, duration: 0.25, ease: 'power2.out' }, t + 0.55)
            .to(c.querySelector('[data-callout-label]'), { autoAlpha: 1, y: 0, duration: 0.25, ease: 'power2.out' }, t + 0.65);
        });
        tl.to({}, { duration: 0.4 });

        return () => root.classList.remove('is-cinematic');
      });
    } catch (err) {
      console.warn('[AC Action] Machine sequence disabled:', err);
    }
    return () => mm && mm.revert();
  }, [rootRef]);
}
