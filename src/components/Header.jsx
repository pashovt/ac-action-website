import { useEffect, useRef, useState } from 'react';
import { nav } from '../content/site.js';
import { trackEvent } from '../lib/analytics.js';
import Logo from './Logo.jsx';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const mq = window.matchMedia('(min-width: 960px)');
    const onMq = (e) => e.matches && setOpen(false);
    document.addEventListener('keydown', onKey);
    mq.addEventListener('change', onMq);
    menuRef.current?.querySelector('a')?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      mq.removeEventListener('change', onMq);
    };
  }, [open]);

  const close = () => setOpen(false);
  const ctaClick = () => {
    trackEvent('primary_cta_click', { location: 'header' });
    close();
  };

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}${open ? ' is-open' : ''}`}>
      <div className="site-header__inner container">
        <a className="site-header__brand" href="#top" aria-label="AC Action, back to top" onClick={close}>
          <Logo />
        </a>
        <nav className="site-nav" aria-label="Primary">
          <ul>
            {nav.links.map((l) => (
              <li key={l.href}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <a className="btn btn--gold btn--sm site-header__cta" href={nav.cta.href} onClick={ctaClick}>
          {nav.cta.label}
        </a>
        <button
          ref={toggleRef}
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="visually-hidden">{open ? 'Close menu' : 'Open menu'}</span>
          <span className="menu-toggle__bars" aria-hidden="true" />
        </button>
      </div>
      <div id="mobile-menu" ref={menuRef} className="mobile-menu" hidden={!open}>
        <nav aria-label="Mobile">
          <ul>
            {nav.links.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={close}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a className="btn btn--gold btn--block" href={nav.cta.href} onClick={ctaClick}>
            {nav.cta.label}
          </a>
        </nav>
      </div>
    </header>
  );
}
