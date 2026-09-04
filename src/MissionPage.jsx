import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, Play, CheckCircle2, Factory, Cpu, Users, Box, Globe, 
  Brain, UserCheck, Sparkles, Infinity as InfinityIcon, Shield, HeartPulse, 
  Truck, Orbit, Sprout, Building2
} from 'lucide-react';
import './mission.css';

export default function MissionPage({ onOpenVideo, onOpenContact }) {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'OUR MISSION | Antellay-X';
    window.scrollTo(0, 0);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="mission-page">
      {/* ====================================================
          1. HERO SECTION
          ==================================================== */}
      <section className="mission-hero">
        <div className="mission-hero-bg">
          <img 
            src="/assets/mission/mission_hero_factory.webp" 
            alt="Antellay-X Robotics Manufacturing Facility" 
            loading="eager"
          />
        </div>
        <div className="mission-hero-overlay" />

        <div className="mission-hero-container">
          <span className="mission-tag">OUR MISSION</span>
          <h1 className="mission-hero-title">
            BUILDING INTELLIGENCE. <br />
            <span className="blue-accent">TRANSFORMING THE WORLD.</span>
          </h1>
          <p className="mission-hero-desc">
            At Antellay-X, our mission is to build intelligent robots that augment humanity and solve real-world challenges at scale.
          </p>

          <div className="mission-hero-actions">
            <button 
              className="mission-btn-dark"
              onClick={() => scrollToSection('mission-pillars-sec')}
            >
              EXPLORE OUR MISSION <ArrowRight size={14} />
            </button>
            <button 
              className="mission-btn-ghost"
              onClick={onOpenVideo}
            >
              <Play size={12} fill="#ffffff" /> WATCH FILM
            </button>
          </div>
        </div>
      </section>

      {/* ====================================================
          2. METRICS STRIP
          ==================================================== */}
      <section className="mission-metrics-strip">
        <div className="mission-metrics-container">
          <div className="mission-metric-card">
            <div className="mission-metric-icon">
              <Factory size={22} />
            </div>
            <div className="mission-metric-text">
              <span className="mission-metric-val">1M+ SQ FT</span>
              <span className="mission-metric-lbl">Advanced Manufacturing Facility</span>
            </div>
          </div>

          <div className="mission-metric-card">
            <div className="mission-metric-icon">
              <Cpu size={22} />
            </div>
            <div className="mission-metric-text">
              <span className="mission-metric-val">100K+</span>
              <span className="mission-metric-lbl">Robots Designed Annually</span>
            </div>
          </div>

          <div className="mission-metric-card">
            <div className="mission-metric-icon">
              <Users size={22} />
            </div>
            <div className="mission-metric-text">
              <span className="mission-metric-val">500+</span>
              <span className="mission-metric-lbl">Engineers & Roboticists</span>
            </div>
          </div>

          <div className="mission-metric-card">
            <div className="mission-metric-icon">
              <Box size={22} />
            </div>
            <div className="mission-metric-text">
              <span className="mission-metric-val">50+</span>
              <span className="mission-metric-lbl">Robot Platforms in Development</span>
            </div>
          </div>

          <div className="mission-metric-card">
            <div className="mission-metric-icon">
              <Globe size={22} />
            </div>
            <div className="mission-metric-text">
              <span className="mission-metric-val">2035</span>
              <span className="mission-metric-lbl">Our Vision Year for Global Impact</span>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          3. MISSION PILLARS SECTION
          ==================================================== */}
      <section id="mission-pillars-sec" className="mission-pillars-section">
        <div className="mission-pillars-layout">
          <div className="mission-pillars-left">
            <span className="mission-tag">OUR MISSION PILLARS</span>
            
            <div className="mission-pillars-grid">
              <div className="mission-pillar-card">
                <div className="mission-pillar-icon">
                  <Brain size={28} />
                </div>
                <h3 className="mission-pillar-title">INTELLIGENCE</h3>
                <p className="mission-pillar-desc">
                  Build robots with advanced perception, reasoning and adaptability to act in the real world.
                </p>
              </div>

              <div className="mission-pillar-card">
                <div className="mission-pillar-icon">
                  <UserCheck size={28} />
                </div>
                <h3 className="mission-pillar-title">HUMANITY</h3>
                <p className="mission-pillar-desc">
                  Create machines that work alongside humans and enhance lives, not replace them.
                </p>
              </div>

              <div className="mission-pillar-card">
                <div className="mission-pillar-icon">
                  <Globe size={28} />
                </div>
                <h3 className="mission-pillar-title">IMPACT</h3>
                <p className="mission-pillar-desc">
                  Solve real-world challenges across industries and environments that matter most.
                </p>
              </div>

              <div className="mission-pillar-card">
                <div className="mission-pillar-icon">
                  <InfinityIcon size={28} />
                </div>
                <h3 className="mission-pillar-title">INFINITE POTENTIAL</h3>
                <p className="mission-pillar-desc">
                  Push the boundaries of robotics to unlock possibilities that shape the future of humanity.
                </p>
              </div>
            </div>
          </div>

          {/* Right Promise Card */}
          <div className="mission-promise-card">
            <div className="mission-promise-bg">
              <img 
                src="/assets/mission/mission_promise_robot.webp" 
                alt="Antellay-X Robot" 
                loading="lazy"
              />
            </div>
            <div className="mission-promise-overlay" />

            <div className="mission-promise-content">
              <span className="mission-promise-tag">OUR PROMISE</span>
              <div className="mission-promise-bullets">
                <div className="mission-promise-bullet">Real Intelligence.</div>
                <div className="mission-promise-bullet">Real Impact.</div>
                <div className="mission-promise-bullet">Real Future.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          4. BUILT AT SCALE - WHERE INNOVATION MEETS MANUFACTURING
          ==================================================== */}
      <section id="facility-sec" className="mission-scale-section">
        <div className="mission-scale-container">
          <div className="mission-scale-info">
            <span className="mission-tag">BUILT AT SCALE</span>
            <h2 className="mission-scale-title">
              Where Innovation Meets Manufacturing.
            </h2>
            <p className="mission-scale-desc">
              Our state-of-the-art facilities integrate AI, robotics, precision engineering and automated production to build the next generation of intelligent machines.
            </p>

            <span className="mission-facility-highlights-title">FACILITY HIGHLIGHTS</span>
            <div className="mission-checklist">
              <div className="mission-check-item">
                <CheckCircle2 size={18} className="mission-check-icon" />
                <span>AI-Powered Design & Simulation</span>
              </div>
              <div className="mission-check-item">
                <CheckCircle2 size={18} className="mission-check-icon" />
                <span>Precision Manufacturing Lines</span>
              </div>
              <div className="mission-check-item">
                <CheckCircle2 size={18} className="mission-check-icon" />
                <span>Advanced Robotics Assembly</span>
              </div>
              <div className="mission-check-item">
                <CheckCircle2 size={18} className="mission-check-icon" />
                <span>Rigorous Testing & Validation</span>
              </div>
              <div className="mission-check-item">
                <CheckCircle2 size={18} className="mission-check-icon" />
                <span>Global Quality Standards</span>
              </div>
            </div>
          </div>

          {/* Facility Media Gallery Grid */}
          <div className="mission-gallery-grid">
            <div className="mission-gallery-item main">
              <img 
                src="/assets/mission/mission_facility_main.webp" 
                alt="Antellay-X Assembly Floor" 
                loading="lazy"
              />
              <span className="mission-gallery-tag">ASSEMBLY FLOOR</span>
            </div>

            <div className="mission-gallery-item">
              <img 
                src="/assets/mission/mission_facility_assembly.webp" 
                alt="Assembly Lines" 
                loading="lazy"
              />
              <span className="mission-gallery-tag">ASSEMBLY LINES</span>
            </div>

            <div className="mission-gallery-item">
              <img 
                src="/assets/mission/mission_facility_precision.webp" 
                alt="Precision Engineering" 
                loading="lazy"
              />
              <span className="mission-gallery-tag">PRECISION ENGINEERING</span>
            </div>

            <div className="mission-gallery-bottom-row">
              <div className="mission-gallery-item">
                <img 
                  src="/assets/mission/mission_facility_testing.webp" 
                  alt="Testing & Validation" 
                  loading="lazy"
                />
                <span className="mission-gallery-tag">TESTING & VALIDATION</span>
              </div>

              <div className="mission-gallery-item">
                <img 
                  src="/assets/mission/mission_facility_software.webp" 
                  alt="AI & Software Integration" 
                  loading="lazy"
                />
                <span className="mission-gallery-tag">AI & SOFTWARE INTEGRATION</span>
              </div>

              <div className="mission-gallery-item">
                <img 
                  src="/assets/mission/mission_facility_components.webp" 
                  alt="Component Manufacturing" 
                  loading="lazy"
                />
                <span className="mission-gallery-tag">COMPONENT MANUFACTURING</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          5. ONE MISSION. ENDLESS POSSIBILITIES (DARK SECTION)
          ==================================================== */}
      <section className="mission-domains-section">
        <div className="mission-domains-container">
          <div className="mission-domains-header">
            <span className="mission-tag">ONE MISSION. ENDLESS POSSIBILITIES.</span>
            <h2>From Factories to Fields, Oceans to Space.</h2>
            <p>
              Our robots are built to make a difference everywhere, driving productivity, safety, and sustainable growth across essential industries worldwide.
            </p>
          </div>

          <div className="mission-domains-grid">
            <div className="mission-domain-card" onClick={() => navigate('/vision')}>
              <div className="mission-domain-icon">
                <Building2 size={24} />
              </div>
              <h3 className="mission-domain-title">INDUSTRY</h3>
              <span className="mission-domain-sub">Productivity & Safety</span>
            </div>

            <div className="mission-domain-card" onClick={() => navigate('/vision')}>
              <div className="mission-domain-icon">
                <HeartPulse size={24} />
              </div>
              <h3 className="mission-domain-title">HEALTHCARE</h3>
              <span className="mission-domain-sub">Care & Support</span>
            </div>

            <div className="mission-domain-card" onClick={() => navigate('/vision')}>
              <div className="mission-domain-icon">
                <Truck size={24} />
              </div>
              <h3 className="mission-domain-title">LOGISTICS</h3>
              <span className="mission-domain-sub">Speed & Efficiency</span>
            </div>

            <div className="mission-domain-card" onClick={() => navigate('/vision')}>
              <div className="mission-domain-icon">
                <Shield size={24} />
              </div>
              <h3 className="mission-domain-title">DEFENSE</h3>
              <span className="mission-domain-sub">Protection & Strength</span>
            </div>

            <div className="mission-domain-card" onClick={() => navigate('/vision')}>
              <div className="mission-domain-icon">
                <Orbit size={24} />
              </div>
              <h3 className="mission-domain-title">SPACE</h3>
              <span className="mission-domain-sub">Exploration & Beyond</span>
            </div>

            <div className="mission-domain-card" onClick={() => navigate('/vision')}>
              <div className="mission-domain-icon">
                <Sprout size={24} />
              </div>
              <h3 className="mission-domain-title">AGRICULTURE</h3>
              <span className="mission-domain-sub">Sustainability & Growth</span>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          6. BOTTOM MISSION BANNER / CTA
          ==================================================== */}
      <section className="mission-cta-section">
        <div className="mission-cta-banner">
          <div className="mission-cta-robot-col">
            <img 
              src="/assets/mission/mission_cta_robot.webp" 
              alt="Antellay-X Humanoid Robot Head" 
              className="mission-cta-robot-img"
              loading="lazy"
            />
          </div>

          <div className="mission-cta-quote-col">
            <h3>
              The future is not something we wait for. <br />
              It's something <span className="blue-text">we build.</span>
            </h3>
          </div>

          <div className="mission-cta-action-col">
            <p>
              Join us in building intelligent machines that transform industries and elevate human potential.
            </p>
            <button 
              className="mission-btn-white"
              onClick={onOpenContact}
            >
              JOIN OUR MISSION <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
