import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Target, Rocket, Users, ShieldCheck, Settings } from 'lucide-react';
import './company.css';

const VALUES = [
  { icon: Target, label: 'Intelligence with Purpose' },
  { icon: Rocket, label: 'Relentless Innovation' },
  { icon: Users, label: 'Human-Centric Design' },
  { icon: ShieldCheck, label: 'Integrity & Trust' },
  { icon: Settings, label: 'Impact at Scale' },
];

const MILESTONES = [
  { year: '2021', title: 'The Beginning', text: 'The idea. The team. The first prototype.' },
  { year: '2022', title: 'Foundation', text: 'Core AI models, platform architecture, and early breakthroughs.' },
  { year: '2023–2024', title: 'Building Momentum', text: 'Expanding capabilities, partnering globally, shipping real robots.' },
  { year: '2025 & Beyond', title: 'Global Impact', text: 'Scaling across industries and redefining what robots can do.' },
];


const PARTNERS = ['SEQUOIA', 'TIGERGLOBAL', 'LIGHTSPEED', 'SOFTBANK VISION FUND', 'NVIDIA', 'MICROSOFT FOR STARTUPS', 'ACTAI VENTURES'];

export default function CompanyPage({ onOpenContact }) {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'OUR COMPANY | Antellay-X';
    window.scrollTo(0, 0);
  }, []);

  const goToStory = () => document.getElementById('company-story')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <main className="company-live-page">
      <section className="company-live-hero" aria-labelledby="company-title">
        <div className="company-hero-copy">
          <p className="company-eyebrow">OUR COMPANY</p>
          <h1 id="company-title">Building the Future<br />of <span>Intelligent Robotics.</span></h1>
          <i aria-hidden="true" />
          <p className="company-hero-body">Antellay-X is an AI robotics company on a mission to build intelligent machines that augment humanity and solve real-world challenges at scale.</p>
          <button className="company-pill company-pill-dark" onClick={goToStory}>OUR STORY <ArrowRight size={17} /></button>
        </div>
      </section>

      <section className="company-principles" aria-label="Mission, vision and values">
        <button className="company-principle" onClick={() => navigate('/mission')}>
          <span className="company-eyebrow">OUR MISSION</span>
          <strong>Create intelligent robots for every industry and every environment.</strong>
          <ArrowRight size={18} />
        </button>
        <button className="company-principle" onClick={() => navigate('/vision')}>
          <span className="company-eyebrow">OUR VISION</span>
          <strong>A world where intelligent machines empower humanity without limits.</strong>
          <ArrowRight size={18} />
        </button>
        <div className="company-values">
          <p className="company-eyebrow">OUR VALUES</p>
          {VALUES.map(({ icon: Icon, label }) => (
            <button key={label} onClick={onOpenContact}><Icon size={22} /><span>{label}</span></button>
          ))}
        </div>
      </section>

      <section className="company-story" id="company-story" aria-labelledby="story-title">
        <div className="company-story-intro">
          <p className="company-eyebrow">OUR STORY</p>
          <h2 id="story-title">From an Idea to an<br />Intelligent Robotics Company.</h2>
          <i aria-hidden="true" />
          <p>Antellay-X was founded by a team of engineers, roboticists, and AI researchers with a shared belief—robots should understand, adapt and act with intelligence.</p>
          <p>Today, we are building a unified robotics ecosystem that combines AI, robotics, software and cloud to create the most advanced robots for every industry.</p>
          <button className="company-text-link" onClick={() => navigate('/mission')}>READ OUR JOURNEY <ArrowRight size={18} /></button>
        </div>
        <div className="company-timeline">
          {MILESTONES.map((item, index) => (
            <button className="company-milestone" key={item.year} onClick={onOpenContact}>
              <span className="company-node" aria-hidden="true" />
              <span className="company-year">{item.year}</span>
              <strong>{item.title}</strong>
              <span>{item.text}</span>
              <span className={`company-milestone-photo company-milestone-photo-${index}`} aria-hidden="true" />
            </button>
          ))}
        </div>
      </section>


      <section className="company-partners" aria-labelledby="partners-title">
        <p className="company-eyebrow">BACKED BY BELIEF</p>
        <h2 id="partners-title">Partners and investors<br />who share our vision.</h2>
        <div className="company-partner-row">
          {PARTNERS.map((partner) => <button key={partner} onClick={onOpenContact}>{partner}</button>)}
        </div>
      </section>

      <section className="company-cta" aria-labelledby="company-cta-title">
        <div className="company-cta-copy">
          <h2 id="company-cta-title">We are building more than robots.<br />We are building <span>the future.</span></h2>
          <p>Join us in creating a world where intelligent machines empower humanity and solve real-world challenges.</p>
          <button className="company-pill company-pill-light" onClick={() => navigate('/mission')}>JOIN OUR MISSION <ArrowRight size={18} /></button>
        </div>
      </section>

      <footer className="company-live-footer">
        <Link className="company-footer-brand" to="/">ANTELLAY-<span>X</span></Link>
        <nav aria-label="Company footer links">
          <button onClick={onOpenContact}>CAREERS</button>
          <button onClick={onOpenContact}>NEWS</button>
          <button onClick={onOpenContact}>INVESTORS</button>
          <button onClick={onOpenContact}>CONTACT</button>
        </nav>
        <div className="company-footer-socials">
          <button onClick={onOpenContact} aria-label="X social profile">𝕏</button>
          <button onClick={onOpenContact} aria-label="LinkedIn profile">in</button>
          <button onClick={onOpenContact} aria-label="YouTube channel">▶</button>
        </div>
      </footer>
    </main>
  );
}
