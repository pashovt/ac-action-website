import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let registered = false;

/** Registers ScrollTrigger once and returns the gsap instance. */
export function getGsap() {
  if (!registered && typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
  return { gsap, ScrollTrigger };
}

/** Media queries shared by every motion hook. Keep in sync with tokens.css. */
export const MOTION_QUERIES = {
  cinematic: '(min-width: 1024px) and (min-height: 640px) and (prefers-reduced-motion: no-preference)',
  gentle: '(max-width: 1023.98px), (max-height: 639.98px)',
  allowMotion: '(prefers-reduced-motion: no-preference)',
};
