import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight, Brain, Cpu, Eye, Globe2, Hexagon, Network,
  ShieldCheck, TrendingUp, Waves, Zap
} from 'lucide-react';
import './about-v2.css';

const FRONTIER_POINTS = [
  { icon: Network, title: 'AI Native', desc: 'Built with intelligence at the core.' },
  { icon: Hexagon, title: 'Physical', desc: 'Designed to operate in the real world.' },
  { icon: Brain, title: 'Autonomous', desc: 'Enabling machines to act and adapt independently.' },
  { icon: Network, title: 'Connected', desc: 'Unified across devices, people, and environments.' },
  { icon: TrendingUp, title: 'Scalable', desc: 'Built to scale from systems to ecosystems.' }
];

const BUILD_CARDS = [
  { title: 'Humanoid', desc: 'Intelligent humanoid robots for real-world tasks.', image: '/assets/about/about-build-humanoid.webp', route: '/robots' },
  { title: 'Land', desc: 'Autonomous ground vehicles for complex terrains.', image: '/assets/about/about-build-land.webp', route: '/robots' },
  { title: 'Air', desc: 'Autonomous aerial systems for surveillance and logistics.', image: '/assets/about/about-build-air.webp', route: '/robots' },
  { title: 'Sea', desc: 'Intelligent marine systems for exploration and monitoring.', image: '/assets/about/about-build-sea.webp', route: '/robots' },
  { title: 'Space', desc: 'Autonomous space technologies for a bigger future.', image: '/assets/about/about-build-space.webp', route: '/robots' }
];

const APPROACH_STEPS = [
  { icon: Eye, number: '01', title: 'Perception', desc: 'Understanding the environment.' },
  { icon: Brain, number: '02', title: 'Intelligence', desc: 'Reasoning, analysis and informed decisions.' },
  { icon: Cpu, number: '03', title: 'Adaptability', desc: 'Adapting and evolving in any given scenario.' }
];

const REACH_ITEMS = [
  { label: 'Humanoid', image: '/assets/about/about-build-humanoid.webp' },
  { label: 'Land', image: '/assets/about/about-build-land.webp' },
  { label: 'Air', image: '/assets/about/about-build-air.webp' },
  { label: 'Sea', image: '/assets/about/about-build-sea.webp' },
  { label: 'Space', image: '/assets/about/about-build-space.webp' }
];

export default function AboutPage() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'ABOUT US | Antellay-X';
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="about-v2">
      {/* 1. Hero Section (SS3 Banner) */}
      <section className="about-section about-hero-wrap" aria-label="Our Mission">
        <div className="about-standard-container">
          <h1 className="sr-only">We Are Building Intelligence For The Physical World - Antellay-X</h1>
          <div className="hero-banner-card" onClick={() => navigate('/vision')} role="button" tabIndex={0}>
            <img 
              src="/assets/about/about-hero-ss3.jpg" 
              alt="Our Mission - We Are Building Intelligence For The Physical World. Antellay-X" 
              className="hero-banner-image"
              loading="eager"
            />
          </div>
        </div>
      </section>

      {/* 2. Why Antellay-X (Frontier Card) */}
      <section className="about-section about-frontier-wrap">
        <div className="about-standard-container">
          <div className="frontier-card">
            <div className="frontier-copy">
              <span className="about-v2-tag">Why Antellay-X</span>
              <h2>
                The Physical World <br />
                Is The <strong>Next Frontier.</strong>
              </h2>
              <div className="blue-line" />
              <div className="frontier-list">
                {FRONTIER_POINTS.map((point) => {
                  const Icon = point.icon;
                  return (
                    <button key={point.title} type="button" onClick={() => navigate('/technology')}>
                      <Icon size={28} />
                      <span>
                        <strong>{point.title}</strong>
                        <small>{point.desc}</small>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
            <img src="/assets/about/about-frontier-robot-clean.jpg" alt="Antellay-X robot in the physical world" />
          </div>
        </div>
      </section>

      {/* 3. Our Approach */}
      <section className="about-section about-approach-wrap">
        <div className="about-standard-container">
          <div className="about-approach">
            <div className="approach-left">
              <span className="about-v2-tag">Our Approach</span>
              <div className="blue-line" />
              <h2>
                Perceive. <br />
                Decide. <br />
                <strong>Adapt.</strong>
              </h2>
              <p>We combine advanced perception, intelligent decision-making, and adaptive systems to solve real-world challenges with precision.</p>
            </div>
            <img src="/assets/about/about-cube-clear.webp" alt="Antellay-X intelligence cube" />
            <div className="approach-steps">
              {APPROACH_STEPS.map((step) => {
                const Icon = step.icon;
                return (
                  <button key={step.number} type="button" onClick={() => navigate('/technology')}>
                    <span className="step-icon"><Icon size={28} /></span>
                    <span className="step-text">
                      <strong>{step.number}</strong>
                      <b>{step.title}</b>
                      <small>{step.desc}</small>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 4. What We Build */}
      <section className="about-section about-build-wrap">
        <div className="about-standard-container">
          <div className="about-build-header">
            <span className="about-v2-tag">What We Build</span>
            <h2>Advanced Robotics for a <strong>Smarter Tomorrow.</strong></h2>
          </div>
          <div className="build-v2-grid">
            {BUILD_CARDS.map((card) => (
              <button key={card.title} type="button" onClick={() => navigate(card.route)}>
                <img src={card.image} alt={`${card.title} robotics platform`} loading="lazy" />
                <span>
                  <strong>{card.title}</strong>
                  <small>{card.desc}</small>
                  <ArrowRight size={20} />
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Founder Card */}
      <section className="about-section about-founder-wrap">
        <div className="about-standard-container">
          <div className="about-founder-v2">
            <img src="/assets/about/about-founder-card.webp" alt="Veer Singh, founder of Antellay-X" />
            <div>
              <span className="about-v2-tag">Founder</span>
              <h2>The Vision Behind Antellay-X</h2>
              <div className="blue-line" />
              <h3>Veer Singh</h3>
              <p className="role">Founder & Vision Architect</p>
              <blockquote>
                “We are moving from artificial intelligence that answers questions to
                intelligence that understands the world and acts within it.”
              </blockquote>
              <p className="signature">Veer Singh</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Vision Section (SS4 Banner) */}
      <section className="about-section about-vision-dark-banner" aria-label="Our Vision">
        <div className="about-standard-container">
          <h2 className="sr-only">Our Vision - One Intelligence. Every Environment.</h2>
          <div className="vision-banner-card" onClick={() => navigate('/vision')} role="button" tabIndex={0}>
            <img 
              src="/assets/about/about-vision-ss4.webp" 
              alt="Our Vision - One Intelligence. Every Environment. Unified intelligence layer for autonomous machines." 
              className="vision-banner-image"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* 7. Our Reach */}
      <section className="about-section about-reach-wrap">
        <div className="about-standard-container">
          <div className="about-reach">
            <div className="reach-copy">
              <span className="about-v2-tag">Our Reach</span>
              <div className="blue-line" />
              <h2>
                Intelligence <br />
                Beyond <strong>Screens.</strong>
              </h2>
              <p>
                We believe the next generation of AI will actively live in every industry,
                in real scenarios and the physical world, where impact is measurable.
              </p>
            </div>
            <div className="reach-timeline">
              {REACH_ITEMS.map((item) => (
                <button key={item.label} type="button" onClick={() => navigate('/robots')}>
                  <img src={item.image} alt={item.label} loading="lazy" />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. Built For Impact */}
      <section className="about-section about-impact-wrap">
        <div className="about-standard-container">
          <div className="about-impact">
            <div>
              <span className="about-v2-tag">Built For Impact</span>
              <h2>Shaping The Future Of <strong>Intelligent Robotics.</strong></h2>
              <p>From advanced research to real-world deployment, we deliver robotics solutions that create lasting impact.</p>
            </div>
            <div className="impact-stats">
              <button type="button" onClick={() => navigate('/company')}><Globe2 size={32} /><strong>500+</strong><span>Engineers & Roboticists</span></button>
              <button type="button" onClick={() => navigate('/robots')}><Zap size={32} /><strong>10K+</strong><span>Robots In Development</span></button>
              <button type="button" onClick={() => navigate('/company')}><ShieldCheck size={32} /><strong>50+</strong><span>Patents & IP Filed</span></button>
              <button type="button" onClick={() => navigate('/technology')}><Waves size={32} /><strong>100+</strong><span>Test Scenarios</span></button>
              <button type="button" onClick={() => navigate('/contact')}><ShieldCheck size={32} /><strong>0</strong><span>Compromise On Quality & Safety</span></button>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Footer */}
      <footer className="about-footer-v2-wrap">
        <div className="about-standard-container">
          <div className="about-footer-v2">
            <Link to="/" className="about-footer-brand">ANTELLAY-<strong>X</strong></Link>
            <nav>
              <Link to="/vision">Vision</Link>
              <Link to="/technology">Technology</Link>
              <Link to="/robots">Robots</Link>
              <Link to="/ecosystem">Ecosystem</Link>
              <Link to="/company">Company</Link>
              <Link to="/contact">Contact</Link>
            </nav>
            <Link to="/contact" className="about-footer-cta">Start A Conversation <ArrowRight size={15} /></Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
