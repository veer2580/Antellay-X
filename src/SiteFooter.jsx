import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowUpRight, Mail, Phone, ArrowUp, Send, CheckCircle2, ShieldCheck,
  ExternalLink, Globe2, Cpu, Bot, Rocket, Layers, FileText
} from 'lucide-react';
import './footer.css';

export default function SiteFooter({ onOpenContact }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 4000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-mega-footer" aria-label="Site Mega Footer">
      <div className="mega-footer-inner">
        {/* ====================================================
            1. NEWSLETTER & PLATFORM UPDATES STRIP
            ==================================================== */}
        <div className="mega-footer-newsletter-box">
          <div className="mega-newsletter-info">
            <h4>STAY AT THE FOREFRONT OF PHYSICAL AI</h4>
            <p>
              Receive technical briefings, robotic flight logs, platform releases, and autonomous deployment announcements directly in your inbox.
            </p>
          </div>

          {subscribed ? (
            <div className="mega-newsletter-success">
              <CheckCircle2 size={18} />
              <span>Thank you. You have been added to the Antellay-X engineering dispatches.</span>
            </div>
          ) : (
            <form className="mega-newsletter-form" onSubmit={handleSubscribe}>
              <input
                type="email"
                required
                placeholder="Enter your work email address..."
                className="mega-newsletter-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" className="mega-newsletter-btn">
                SUBSCRIBE <Send size={12} />
              </button>
            </form>
          )}
        </div>

        {/* ====================================================
            2. MAIN 5-COLUMN MEGA GRID
            ==================================================== */}
        <div className="mega-footer-grid">
          {/* Column 1: Brand & Direct Contacts */}
          <div className="mega-brand-col">
            <Link to="/" className="mega-brand-logo" onClick={scrollToTop}>
              ANTELLAY - <span className="brand-x">X</span>
            </Link>
            <span className="mega-brand-tagline">AUTONOMY. REDEFINED.</span>
            <p className="mega-brand-desc">
              Pioneering the physical AI era. Unifying robotic intelligence, perception, and neural actuation across land, air, sea, and space.
            </p>

            <div className="mega-brand-contact-list">
              <a href="mailto:Space.antellay@gmail.com" className="mega-brand-contact-item">
                <Mail size={15} />
                <span>Space.antellay@gmail.com</span>
              </a>
              <a href="tel:+919784626443" className="mega-brand-contact-item">
                <Phone size={15} />
                <span>+91 97846 26443</span>
              </a>
            </div>

            <div className="mega-social-links">
              <a href="https://x.com" target="_blank" rel="noreferrer" className="mega-social-btn" aria-label="Antellay-X on X">
                X
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="mega-social-btn" aria-label="Antellay-X on LinkedIn">
                in
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="mega-social-btn" aria-label="Antellay-X on YouTube">
                ▶
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="mega-social-btn" aria-label="Antellay-X on GitHub">
                gh
              </a>
            </div>
          </div>

          {/* Column 2: Robotics & Fleet */}
          <div className="mega-nav-col">
            <h4 className="mega-col-title">Robotics & Fleet</h4>
            <ul className="mega-nav-links">
              <li>
                <Link to="/robots" className="mega-nav-link" onClick={scrollToTop}>
                  Humanoid Robotics <span className="mega-nav-badge">Flagship</span>
                </Link>
              </li>
              <li>
                <Link to="/robots" className="mega-nav-link" onClick={scrollToTop}>
                  Terrestrial Rovers
                </Link>
              </li>
              <li>
                <Link to="/robots" className="mega-nav-link" onClick={scrollToTop}>
                  Aerial Autonomous Systems
                </Link>
              </li>
              <li>
                <Link to="/robots" className="mega-nav-link" onClick={scrollToTop}>
                  Deep-Sea Exploration
                </Link>
              </li>
              <li>
                <Link to="/robots" className="mega-nav-link" onClick={scrollToTop}>
                  Orbital Satellite Platforms
                </Link>
              </li>
              <li>
                <Link to="/robots" className="mega-nav-link" onClick={scrollToTop}>
                  Autonomous Core AI
                </Link>
              </li>
              <li>
                <button type="button" className="mega-nav-link" onClick={onOpenContact}>
                  Custom Fleet Inquiry <ArrowUpRight size={12} />
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Technology & AI */}
          <div className="mega-nav-col">
            <h4 className="mega-col-title">Technology & AI</h4>
            <ul className="mega-nav-links">
              <li>
                <Link to="/technology" className="mega-nav-link" onClick={scrollToTop}>
                  Spatial AI & Perception
                </Link>
              </li>
              <li>
                <Link to="/technology" className="mega-nav-link" onClick={scrollToTop}>
                  Neural Motor Control
                </Link>
              </li>
              <li>
                <Link to="/technology" className="mega-nav-link" onClick={scrollToTop}>
                  Edge Inference Compute
                </Link>
              </li>
              <li>
                <Link to="/ecosystem" className="mega-nav-link" onClick={scrollToTop}>
                  Unified Autonomy Stack
                </Link>
              </li>
              <li>
                <Link to="/ecosystem" className="mega-nav-link" onClick={scrollToTop}>
                  Swarm Orchestration Protocol
                </Link>
              </li>
              <li>
                <Link to="/technology" className="mega-nav-link" onClick={scrollToTop}>
                  Multi-Sensor Telemetry
                </Link>
              </li>
              <li>
                <Link to="/technology" className="mega-nav-link" onClick={scrollToTop}>
                  Simulation & Digital Twins
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Company & Missions */}
          <div className="mega-nav-col">
            <h4 className="mega-col-title">Company & Missions</h4>
            <ul className="mega-nav-links">
              <li>
                <Link to="/about" className="mega-nav-link" onClick={scrollToTop}>
                  About Antellay-X
                </Link>
              </li>
              <li>
                <Link to="/vision" className="mega-nav-link" onClick={scrollToTop}>
                  Our Vision & Horizon
                </Link>
              </li>
              <li>
                <Link to="/mission" className="mega-nav-link" onClick={scrollToTop}>
                  Our Mission & Facility <span className="mega-nav-badge">1M+ Sq Ft</span>
                </Link>
              </li>
              <li>
                <Link to="/company" className="mega-nav-link" onClick={scrollToTop}>
                  Company & Leadership
                </Link>
              </li>
              <li>
                <Link to="/ecosystem" className="mega-nav-link" onClick={scrollToTop}>
                  Global Ecosystem
                </Link>
              </li>
              <li>
                <button type="button" className="mega-nav-link" onClick={onOpenContact}>
                  Careers <span className="mega-nav-badge">Hiring</span>
                </button>
              </li>
              <li>
                <button type="button" className="mega-nav-link" onClick={onOpenContact}>
                  Investors & Partnerships
                </button>
              </li>
            </ul>
          </div>

          {/* Column 5: Resources & Governance */}
          <div className="mega-nav-col">
            <h4 className="mega-col-title">Resources & Legal</h4>
            <ul className="mega-nav-links">
              <li>
                <Link to="/contact" className="mega-nav-link" onClick={scrollToTop}>
                  Contact Operations
                </Link>
              </li>
              <li>
                <button type="button" className="mega-nav-link" onClick={onOpenContact}>
                  Platform Whitepapers
                </button>
              </li>
              <li>
                <button type="button" className="mega-nav-link" onClick={onOpenContact}>
                  Developer API Access
                </button>
              </li>
              <li>
                <Link to="/privacy" className="mega-nav-link" onClick={scrollToTop}>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="mega-nav-link" onClick={scrollToTop}>
                  Terms of Service
                </Link>
              </li>
              <li>
                <button type="button" className="mega-nav-link" onClick={onOpenContact}>
                  Safety & Ethics Standards
                </button>
              </li>
              <li>
                <button type="button" className="mega-nav-link" onClick={onOpenContact}>
                  Enterprise Support
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* ====================================================
            3. BOTTOM STATUS & COPYRIGHT BAR
            ==================================================== */}
        <div className="mega-footer-bottom">
          <div className="mega-copyright">
            © {new Date().getFullYear()} ANTELLAY Labs. All Rights Reserved. A Celebso Group Company.
          </div>


          <div className="mega-bottom-links">
            <Link to="/privacy" onClick={scrollToTop}>Privacy</Link>
            <Link to="/terms" onClick={scrollToTop}>Terms</Link>
            <Link to="/contact" onClick={scrollToTop}>Contact</Link>
            <button type="button" className="mega-back-to-top" onClick={scrollToTop}>
              Top <ArrowUp size={13} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
