import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Lock, ShieldCheck } from 'lucide-react';

const LEGAL_COPY = {
  privacy: {
    eyebrow: 'PRIVACY POLICY',
    title: 'Your data stays protected.',
    intro: 'Antellay-X uses contact information only to respond to requests, schedule meetings and improve the robotics services we provide.',
    points: [
      'We collect only the information you submit through contact, access and meeting forms.',
      'We use that information for communication, support, partnership review and security.',
      'We do not sell personal information or share it for unrelated advertising.',
      'You can request access, correction or deletion of your information at any time.'
    ]
  },
  terms: {
    eyebrow: 'TERMS OF USE',
    title: 'Clear rules for using this site.',
    intro: 'By using the Antellay-X website, you agree to use the experience responsibly and only for lawful business, research or informational purposes.',
    points: [
      'Website content is provided for product, company and technology information.',
      'Logos, visuals, text and interface elements remain the property of Antellay-X.',
      'Do not misuse forms, interfere with the site or attempt unauthorized access.',
      'Feature descriptions may change as products, robots and programs evolve.'
    ]
  }
};

export default function LegalPage({ type = 'privacy' }) {
  const location = useLocation();
  const page = LEGAL_COPY[type] || LEGAL_COPY.privacy;

  useEffect(() => {
    document.title = `${page.eyebrow} | Antellay-X`;
    window.scrollTo(0, 0);
  }, [page, location.pathname]);

  return (
    <main className="legal-page">
      <section className="legal-hero">
        <span className="contact-tag">{page.eyebrow}</span>
        <h1>{page.title}</h1>
        <p>{page.intro}</p>
      </section>

      <section className="legal-panel">
        <div className="legal-icon">
          {type === 'terms' ? <ShieldCheck size={30} /> : <Lock size={30} />}
        </div>
        <div className="legal-list">
          {page.points.map((point) => (
            <div key={point} className="legal-row">
              <span />
              <p>{point}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="legal-cta">
        <h2>Need more details?</h2>
        <Link to="/contact">
          CONTACT US <ArrowRight size={14} />
        </Link>
      </section>
    </main>
  );
}
