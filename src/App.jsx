import { useState } from 'react';
import Header from './components/Header.jsx';
import HeroMachine from './components/HeroMachine.jsx';
import About from './components/About.jsx';
import Range from './components/Range.jsx';
import Benefits from './components/Benefits.jsx';
import Service from './components/Service.jsx';
import Faq from './components/Faq.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import ScrollRail from './components/ScrollRail.jsx';
import { useReveals } from './hooks/useReveals.js';
import { useScrubEffects } from './hooks/useScrubEffects.js';

/** Six leaflet panels as six sections: cover, about, range, benefits, service, contact. */
export default function App() {
  const [preferredSiteType] = useState('');
  const [preferredPostcode, setPreferredPostcode] = useState('');
  useReveals();
  useScrubEffects();
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main" tabIndex={-1}>
        <HeroMachine />
        <About />
        <Range />
        <Benefits />
        <Service onUsePostcode={setPreferredPostcode} />
        <Faq />
        <Contact preferredSiteType={preferredSiteType} preferredPostcode={preferredPostcode} />
      </main>
      <Footer />
      <ScrollRail />
    </>
  );
}
