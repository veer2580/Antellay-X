import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, Mail, Phone } from 'lucide-react';
import './footer.css';

const NAV_PAGES = [
  { path: '/vision',     label: 'Vision' },
  { path: '/technology', label: 'Technology' },
  { path: '/robots',     label: 'Robots' },
  { path: '/ecosystem',  label: 'Ecosystem' },
  { path: '/company',    label: 'Company' },
  { path: '/mission',    label: 'Mission' },
  { path: '/about',      label: 'About' },
  { path: '/contact',    label: 'Contact' },
];

const LEGAL_PAGES = [
  { path: '/privacy', label: 'Privacy Policy' },
  { path: '/terms',   label: 'Terms of Service' },
];

export default function SiteFooter({ onOpenContact }) {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="site-mega-footer" aria-label="Site Footer">
      {/* ── Rotating Earth Background Video ── */}
      <div className="footer-earth-bg-container" aria-hidden="true">
        <video
          className="footer-earth-video"
          src="/assets/videos/earth-rotation.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="footer-earth-overlay" />
      </div>

      <div className="slim-footer-inner">

        {/* ── Top Row: Brand + Nav Links ── */}
        <div className="slim-footer-top">

          {/* Brand column */}
          <div className="slim-brand-col">
            <Link to="/" className="mega-brand-logo" onClick={scrollToTop}>
              ANTELLAY - <span className="brand-x">X</span>
            </Link>
            <span className="mega-brand-tagline">AUTONOMY. REDEFINED.</span>
            <p className="mega-brand-desc">
              Pioneering the physical AI era. Unifying robotic intelligence,
              perception, and neural actuation across land, air, sea, and space.
            </p>

            <div className="mega-brand-contact-list">
              <a href="mailto:Space.antellay@gmail.com" className="mega-brand-contact-item">
                <Mail size={14} />
                <span>Space.antellay@gmail.com</span>
              </a>
              <a href="tel:+919784626443" className="mega-brand-contact-item">
                <Phone size={14} />
                <span>+91 97846 26443</span>
              </a>
            </div>

            <div className="mega-social-links">
              <a href="https://x.com" target="_blank" rel="noreferrer" className="mega-social-btn" aria-label="Antellay-X on X">X</a>
              <a href="https://www.linkedin.com/company/a-n-t-e-l-l-a-y-x/posts/?feedView=all" target="_blank" rel="noreferrer" className="mega-social-btn" aria-label="Antellay-X on LinkedIn">in</a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="mega-social-btn" aria-label="Antellay-X on YouTube">▶</a>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="mega-social-btn" aria-label="Antellay-X on GitHub">gh</a>
            </div>
          </div>

          {/* Links column 1 */}
          <div className="slim-nav-col">
            <ul className="slim-nav-list">
              {NAV_PAGES.slice(0, 5).map((p) => (
                <li key={p.path}>
                  <Link to={p.path} className="slim-nav-link" onClick={scrollToTop}>
                    <span className="nav-link-dot" />
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links column 2 */}
          <div className="slim-nav-col">
            <ul className="slim-nav-list">
              {NAV_PAGES.slice(5).map((p) => (
                <li key={p.path}>
                  <Link to={p.path} className="slim-nav-link" onClick={scrollToTop}>
                    <span className="nav-link-dot" />
                    {p.label}
                  </Link>
                </li>
              ))}
              {LEGAL_PAGES.map((p) => (
                <li key={p.path}>
                  <Link to={p.path} className="slim-nav-link" onClick={scrollToTop}>
                    <span className="nav-link-dot" />
                    {p.label}
                  </Link>
                </li>
              ))}
              <li>
                <button type="button" className="slim-nav-link" onClick={onOpenContact}>
                  <span className="nav-link-dot" />
                  Contact Us
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="mega-footer-bottom">
          <div className="mega-copyright">
            © {new Date().getFullYear()}{' '}
            <a
              href="https://www.linkedin.com/company/a-n-t-e-l-l-a-y-x/posts/?feedView=all"
              target="_blank"
              rel="noreferrer"
              className="mega-labs-link"
            >
              ANTELLAY Labs
            </a>
            . All Rights Reserved. A Celebso Group Company.
          </div>

          <div className="mega-bottom-links">
            <Link to="/privacy" onClick={scrollToTop}>Privacy</Link>
            <Link to="/terms" onClick={scrollToTop}>Terms</Link>
            <button type="button" className="mega-back-to-top" onClick={scrollToTop}>
              Top <ArrowUp size={13} />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
