import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, BrainCircuit, Box, Eye, SlidersHorizontal, Navigation, Layers3, Cloud, Globe2, ShieldCheck, Link2 } from 'lucide-react';
import './ecosystem.css';

const detail = (title, desc) => ({
  title, badge: 'ECOSYSTEM PLATFORM', desc,
  specs: [
    { label: 'PLATFORM', val: 'Antellay-X Unified Stack' },
    { label: 'CONNECTIVITY', val: 'Secure Edge + Cloud' },
    { label: 'DEPLOYMENT', val: 'Real-time & Scalable' },
    { label: 'STATUS', val: 'Production Ready' },
  ],
});

const capabilities = [
  ['VISION', 'Advanced perception of the real world.', Eye],
  ['REASONING', 'Understand, learn and make the right decisions.', BrainCircuit],
  ['CONTROL', 'Precise control for every movement and action.', SlidersHorizontal],
  ['AUTONOMY', 'Operate independently with adaptive intelligence.', Navigation],
];

const robots = [
  ['HUMANOID ROBOTS', 'Built to interact. Built to assist.'],
  ['FIELD ROBOTS', 'Built for extreme environments. Built to explore.'],
  ['INDUSTRIAL ROBOTS', 'Built to automate. Built to scale.'],
];

const benefits = [
  ['UNIFIED ECOSYSTEM', 'Seamless integration across hardware, software and AI.', Globe2],
  ['SECURE & TRUSTED', 'Enterprise-grade security and data privacy.', ShieldCheck],
  ['OPEN & SCALABLE', 'APIs, tools and frameworks to build without limits.', Link2],
  ['GLOBAL IMPACT', 'Powering missions that transform the world.', Globe2],
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
      <section className="ecosystem-hero" aria-labelledby="ecosystem-title">
        <div className="ecosystem-hero-copy">
          <p className="ecosystem-eyebrow">OUR ECOSYSTEM</p>
          <h1 id="ecosystem-title">One Intelligence.<br />Infinite <span>Ecosystem.</span></h1>
          <p>The Antellay-X ecosystem unifies intelligence, software, connectivity and robotics to power every mission, in every environment.</p>
          <button className="ecosystem-pill" onClick={() => document.getElementById('ecosystem-architecture')?.scrollIntoView({ behavior: 'smooth' })}>EXPLORE ECOSYSTEM <ArrowRight size={18} /></button>
        </div>
      </section>

      <section className="ecosystem-architecture" id="ecosystem-architecture" aria-label="Antellay-X intelligence architecture">
        <button className="ecosystem-brand-node" onClick={() => navigate('/')}>ANTELLAY-<span>X</span></button>
        <div className="ecosystem-connector top" aria-hidden="true" />
        <div className="ecosystem-core-row">
          <button className="ecosystem-node" onClick={() => open('AI CORE', 'The intelligence at the heart of every decision.')}><BrainCircuit /><strong>AI CORE</strong><small>The intelligence at the heart<br />of every decision.</small></button>
          <button className="ecosystem-node" onClick={() => open('ANTELLAY-X OS', 'The unified operating system for all robots and systems.')}><Box /><strong>ANTELLAY-X OS</strong><small>The unified operating system<br />for all robots and systems.</small></button>
        </div>
        <div className="ecosystem-connector middle" aria-hidden="true" />
        <div className="ecosystem-capability-row">
          {capabilities.map(([title, text, Icon]) => <button className="ecosystem-node capability" key={title} onClick={() => open(title, text)}><Icon /><strong>{title}</strong><small>{text}</small></button>)}
        </div>
        <button className="ecosystem-edge-node" onClick={() => open('ANTELLAY-X EDGE', 'Real-time processing. Local intelligence. Low latency.')}><Layers3 /><span><strong>ANTELLAY-X EDGE</strong><small>Real-time processing. Local intelligence. Low latency.</small></span></button>
        <div className="ecosystem-bottom-row">
          <button className="ecosystem-node wide" onClick={() => open('DIGITAL TWIN', 'Virtual replicas for simulation, testing and optimization.')}><Box /><span><strong>DIGITAL TWIN</strong><small>Virtual replicas for simulation,<br />testing and optimization.</small></span></button>
          <button className="ecosystem-node wide" onClick={() => open('MISSION CONTROL', 'Monitor. Manage. Orchestrate. Every robot. Every mission.')}><SlidersHorizontal /><span><strong>MISSION CONTROL</strong><small>Monitor. Manage. Orchestrate.<br />Every robot. Every mission.</small></span></button>
        </div>
      </section>

      <section className="ecosystem-fleet" aria-label="Connected robot ecosystem">
        <button className="ecosystem-cloud" onClick={() => open('ANTELLAY-X CLOUD', 'Secure, scalable intelligence and global updates for every connected machine.')}><Cloud /><span><strong>ANTELLAY-X CLOUD</strong><small>Secure. Scalable. Connected.<br />Data, intelligence and updates at global scale.</small></span></button>
        <div className="ecosystem-robot-grid">
          {robots.map(([title, text], index) => <button className="ecosystem-robot-card" key={title} onClick={() => navigate('/robots')}><span className={`ecosystem-robot-image image-${index}`} /><span className="ecosystem-robot-copy"><strong>{title}</strong><i /><small>{text}</small><ArrowRight size={17} /></span></button>)}
        </div>
        <div className="ecosystem-benefit-row">
          {benefits.map(([title, text, Icon]) => <button key={title} onClick={() => open(title, text)}><Icon /><span><strong>{title}</strong><small>{text}</small></span></button>)}
        </div>
      </section>

      <section className="ecosystem-closing" aria-label="Explore ecosystem">
        <div className="ecosystem-closing-brand">ANTELLAY-<span>X</span><small>INTELLIGENT ROBOTICS.<br />LIMITLESS FUTURE.</small></div>
        <p>One ecosystem. Infinite possibilities.<br />Together, we are building the future<br />of intelligent machines.</p>
        <button onClick={() => navigate('/technology')}>EXPLORE ECOSYSTEM <ArrowRight size={18} /></button>
      </section>
    </main>
  );
}
