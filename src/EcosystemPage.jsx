import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, BrainCircuit, Box, Eye, SlidersHorizontal, 
  Navigation, Layers3, Cloud, Globe2, ShieldCheck, Link2, 
  Sparkles, CheckCircle2, Cpu, Zap, Activity
} from 'lucide-react';
import './ecosystem.css';

const detail = (title, desc) => ({
  title, badge: 'ECOSYSTEM PLATFORM', desc,
  specs: [
    { label: 'PLATFORM', val: 'Antellay-X Unified Stack' },
    { label: 'CONNECTIVITY', val: 'Secure Edge + Cloud Mesh' },
    { label: 'DEPLOYMENT', val: 'Real-time & Scalable' },
    { label: 'STATUS', val: 'Production Ready' },
  ],
});

const capabilities = [
  ['VISION', 'Advanced perception of the physical real world.', Eye],
  ['REASONING', 'Understand, learn and make autonomous decisions.', BrainCircuit],
  ['CONTROL', 'Precise neural control for every joint and actuator.', SlidersHorizontal],
  ['AUTONOMY', 'Operate independently with adaptive swarm intelligence.', Navigation],
];

const robots = [
  ['HUMANOID ROBOTS', 'Built to interact. Built to assist in complex human environments.'],
  ['FIELD ROBOTS', 'Built for extreme terrains. Built to explore without limits.'],
  ['INDUSTRIAL ROBOTS', 'Built to automate. Built to scale precision workflows.'],
];

const benefits = [
  ['UNIFIED ECOSYSTEM', 'Seamless integration across neural hardware, operating stack and AI models.', Globe2],
  ['SECURE & TRUSTED', 'Enterprise-grade encryption, telemetry protection and zero-trust data privacy.', ShieldCheck],
  ['OPEN & SCALABLE', 'Low-latency APIs, developer SDKs and modular frameworks to build without limits.', Link2],
  ['GLOBAL IMPACT', 'Powering missions that elevate physical safety and transform future industries.', Globe2],
];

export default function EcosystemPage({ onOpenDetail }) {
  const navigate = useNavigate();
  const open = (title, text) => onOpenDetail(detail(title, text));

  useEffect(() => {
    document.title = 'OUR ECOSYSTEM | Antellay-X';
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="ecosystem-live-page">
      {/* 1. HERO SECTION */}
      <section className="ecosystem-hero" aria-labelledby="ecosystem-title">
        <div className="ecosystem-hero-copy">
          <div className="ecosystem-eyebrow-pill">
            <Sparkles size={13} />
            <span>OUR ECOSYSTEM</span>
          </div>
          <h1 id="ecosystem-title">
            One Intelligence.<br />
            Infinite <span className="blue-accent">Ecosystem.</span>
          </h1>
          <p>
            The Antellay-X ecosystem unifies physical intelligence, neural software, edge connectivity and autonomous robotics to power every mission, in every environment.
          </p>
          <div className="ecosystem-hero-actions">
            <button 
              className="ecosystem-pill" 
              onClick={() => document.getElementById('ecosystem-architecture')?.scrollIntoView({ behavior: 'smooth' })}
            >
              EXPLORE ARCHITECTURE <ArrowRight size={16} />
            </button>
            <button 
              className="ecosystem-pill-secondary"
              onClick={() => navigate('/robots')}
            >
              VIEW FLEET
            </button>
          </div>
        </div>
      </section>

      {/* 2. ARCHITECTURE DIAGRAM SECTION */}
      <section className="ecosystem-architecture" id="ecosystem-architecture" aria-label="Antellay-X intelligence architecture">
        <div className="architecture-header">
          <span className="arch-badge">UNIFIED SYSTEM STACK</span>
          <h2>Layered Architecture for Physical Autonomy</h2>
          <p>Click any platform node to inspect specifications, compute latency, and neural connectivity.</p>
        </div>

        <button className="ecosystem-brand-node" onClick={() => navigate('/')}>
          <span className="brand-title">ANTELLAY - <span className="brand-x">X</span></span>
          <span className="brand-sub">CORE NEURAL FOUNDATION</span>
        </button>

        <div className="ecosystem-connector top" aria-hidden="true" />

        <div className="ecosystem-core-row">
          <button className="ecosystem-node" onClick={() => open('AI CORE', 'The intelligence at the heart of every physical decision.')}>
            <div className="node-icon-wrap"><BrainCircuit /></div>
            <strong>AI CORE</strong>
            <small>The foundation intelligence at the heart of every robotic decision.</small>
            <span className="node-inspect-hint">INSPECT SPECS →</span>
          </button>
          <button className="ecosystem-node" onClick={() => open('ANTELLAY-X OS', 'The unified operating system for all robots and autonomous systems.')}>
            <div className="node-icon-wrap"><Box /></div>
            <strong>ANTELLAY-X OS</strong>
            <small>The unified real-time OS running on all fleets and robots.</small>
            <span className="node-inspect-hint">INSPECT SPECS →</span>
          </button>
        </div>

        <div className="ecosystem-connector middle" aria-hidden="true" />

        <div className="ecosystem-capability-row">
          {capabilities.map(([title, text, Icon]) => (
            <button className="ecosystem-node capability" key={title} onClick={() => open(title, text)}>
              <div className="node-icon-wrap"><Icon /></div>
              <strong>{title}</strong>
              <small>{text}</small>
              <span className="node-inspect-hint">DETAILS →</span>
            </button>
          ))}
        </div>

        <button className="ecosystem-edge-node" onClick={() => open('ANTELLAY-X EDGE', 'Real-time processing. Local intelligence. Sub-millisecond latency.')}>
          <div className="edge-icon-box"><Layers3 /></div>
          <div className="edge-text">
            <strong>ANTELLAY-X EDGE COMPUTE</strong>
            <small>Distributed neuromorphic acceleration. Local intelligence. Sub-millisecond actuation.</small>
          </div>
          <span className="edge-tag">0.8ms LATENCY</span>
        </button>

        <div className="ecosystem-bottom-row">
          <button className="ecosystem-node wide" onClick={() => open('DIGITAL TWIN', 'Virtual physics replicas for simulation, stress testing and real-time fleet synchronization.')}>
            <div className="node-icon-wrap"><Box /></div>
            <div className="node-wide-content">
              <strong>DIGITAL TWIN</strong>
              <small>Virtual physics replicas for continuous simulation, synthetic training and fleet testing.</small>
            </div>
            <span className="node-inspect-hint">SPECS →</span>
          </button>
          <button className="ecosystem-node wide" onClick={() => open('MISSION CONTROL', 'Monitor, manage, orchestrate and command every robot across every global deployment.')}>
            <div className="node-icon-wrap"><SlidersHorizontal /></div>
            <div className="node-wide-content">
              <strong>MISSION CONTROL</strong>
              <small>Unified command dashboard to monitor, manage, and orchestrate fleets globally.</small>
            </div>
            <span className="node-inspect-hint">SPECS →</span>
          </button>
        </div>
      </section>

      {/* 3. FLEET & CLOUD SECTION */}
      <section className="ecosystem-fleet" aria-label="Connected robot ecosystem">
        <button 
          className="ecosystem-cloud" 
          onClick={() => open('ANTELLAY-X CLOUD', 'Secure, scalable intelligence and global telemetry synchronization for every connected machine.')}
        >
          <div className="ecosystem-cloud-icon-box">
            <Cloud size={34} />
          </div>
          <div className="ecosystem-cloud-content">
            <div className="ecosystem-cloud-topline">
              <span className="cloud-badge">GLOBAL MESH NETWORK</span>
              <span className="cloud-status-pill"><span className="cloud-dot" /> 99.999% FLEET UPTIME</span>
            </div>
            <strong>ANTELLAY-X CLOUD</strong>
            <small>Secure. Scalable. Connected. Real-time telemetry, model updates, and fleet intelligence at global scale.</small>
          </div>
          <div className="ecosystem-cloud-action">
            <span>SYNC MESH</span>
            <ArrowRight size={16} />
          </div>
        </button>

        <div className="ecosystem-robot-grid">
          {robots.map(([title, text], index) => (
            <button 
              className="ecosystem-robot-card" 
              key={title} 
              onClick={() => navigate('/robots')}
            >
              <div className={`ecosystem-robot-image image-${index}`} />
              <div className="ecosystem-robot-copy">
                <span className="ecosystem-robot-badge">FLEET SERIES 0{index + 1}</span>
                <strong>{title}</strong>
                <i className="accent-bar" />
                <small>{text}</small>
                <span className="ecosystem-robot-cta">
                  EXPLORE FLEET <ArrowRight size={14} />
                </span>
              </div>
            </button>
          ))}
        </div>

        <div className="ecosystem-benefit-row">
          {benefits.map(([title, text, Icon]) => (
            <button 
              key={title} 
              className="ecosystem-benefit-card" 
              onClick={() => open(title, text)}
            >
              <div className="benefit-icon-box">
                <Icon size={22} />
              </div>
              <div className="benefit-copy">
                <strong>{title}</strong>
                <small>{text}</small>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* 4. CLOSING BANNER SECTION */}
      <section className="ecosystem-closing" aria-label="Explore ecosystem">
        <div className="ecosystem-closing-brand">
          <span className="closing-logo">ANTELLAY - <span className="brand-x">X</span></span>
          <small>INTELLIGENT ROBOTICS. LIMITLESS FUTURE.</small>
        </div>
        <div className="ecosystem-closing-copy">
          <h3>One ecosystem. Infinite possibilities.</h3>
          <p>Together, we are engineering the definitive future of unified autonomous physical intelligence.</p>
        </div>
        <button className="ecosystem-closing-btn" onClick={() => navigate('/technology')}>
          EXPLORE TECHNOLOGY <ArrowRight size={16} />
        </button>
      </section>
    </main>
  );
}
