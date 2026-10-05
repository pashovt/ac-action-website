import { brand, contact, footer } from '../content/site.js';
import Logo from './Logo.jsx';
import Stripes from './Stripes.jsx';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <Stripes corner="tr" className="site-footer__stripes" />
      <div className="container">
        <p className="site-footer__tagline">{brand.tagline}</p>
        <div className="site-footer__row">
          <div>
            <Logo />
            <p className="site-footer__area">{contact.areaLine}</p>
          </div>
          <nav aria-label="Footer">
            <ul className="site-footer__links">
              {footer.links.map((l) => (
                <li key={l.href}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="site-footer__meta">
          <p>
            © {year} {brand.legalName}. All rights reserved.
          </p>
          <p className="site-footer__strap">{brand.strapline.join(' · ')}</p>
        </div>
      </div>
    </footer>
  );
}
