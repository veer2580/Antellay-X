import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import {
  ArrowRight, X, Play, CheckCircle2, Target, Globe, User, Sparkles, ChevronRight,
  Brain, Cpu, Layers, ShieldCheck, Cloud, Sliders, Box, Activity, Lock, Share2,
  Radio, Wrench, RefreshCw, Eye
} from 'lucide-react';
import './styles.css';
import CompanyPage from './CompanyPage';
import EcosystemPage from './EcosystemPage';
import AboutPage from './AboutPage';
import ContactPage from './ContactPage';
import LegalPage from './LegalPage';
import MissionPage from './MissionPage';
import SiteFooter from './SiteFooter';

// Page configuration
const PAGES = [
  { id: 'home', path: '/', label: 'HOME', title: 'ANTELLAY-X | Autonomy. Redefined.' },
  { id: 'about', path: '/about', label: 'ABOUT', title: 'OUR ABOUT | Antellay-X' },
  { id: 'vision', path: '/vision', label: 'VISION', title: 'OUR VISION | Antellay-X' },
  { id: 'technology', path: '/technology', label: 'TECHNOLOGY', title: 'OUR TECHNOLOGY | Antellay-X' },
  { id: 'robots', path: '/robots', label: 'ROBOTS', title: 'OUR ROBOTS | Antellay-X' },
  { id: 'ecosystem', path: '/ecosystem', label: 'ECOSYSTEM', title: 'OUR ECOSYSTEM | Antellay-X', image: '/assets/pages/ecosystem.webp' },
  { id: 'company', path: '/company', label: 'COMPANY', title: 'OUR COMPANY | Antellay-X', image: '/assets/pages/company.webp' },
  { id: 'mission', path: '/mission', label: 'MISSION', title: 'OUR MISSION | Antellay-X', image: '/assets/pages/mission.webp' },
  { id: 'contact', path: '/contact', label: 'CONTACT', title: 'CONTACT US | Antellay-X' },
];

// Interactive items metadata for detailed modals
const ROBOT_DETAILS = {
  humanoid: {
    title: 'HUMANOID ROBOTS',
    badge: 'GENERAL AUTONOMY',
    desc: 'Bipedal multi-purpose robots designed to seamlessly collaborate with humans in dynamic real-world environments.',
    specs: [
      { label: 'DEGREES OF FREEDOM', val: '44 Actuated DOF' },
      { label: 'PAYLOAD CAPACITY', val: '25 kg (55 lbs)' },
      { label: 'VISION INTELLIGENCE', val: '360° Multi-Modal SLAM' },
      { label: 'RUNTIME', val: '8 Hours Continuous' },
    ]
  },
  quadruped: {
    title: 'QUADRUPED ROBOTS',
    badge: 'ALL-TERRAIN EXPLORATION',
    desc: 'Agile four-legged platforms engineered for challenging outdoor terrains, subterranean tunnels, and industrial inspections.',
    specs: [
      { label: 'SPEED', val: '4.5 m/s' },
      { label: 'PAYLOAD CAPACITY', val: '15 kg' },
      { label: 'OBSTACLE TRAVERSAL', val: '35° Incline / 25cm Steps' },
      { label: 'PROTECTION RATING', val: 'IP67 Dust & Water' },
    ]
  },
  mobile: {
    title: 'MOBILE ROBOTS (AMR)',
    badge: 'AUTONOMOUS LOGISTICS',
    desc: 'Smart intralogistics robots navigating warehouse floors autonomously to transport goods and streamline supply chains.',
    specs: [
      { label: 'MAX LOAD', val: '1,200 kg' },
      { label: 'NAVIGATION', val: 'LiDAR + 3D Camera SLAM' },
      { label: 'BATTERY CHARGING', val: 'Autonomous Wireless Dock' },
      { label: 'DOCKING ACCURACY', val: '± 5 mm' },
    ]
  },
  manipulator: {
    title: 'MANIPULATOR ROBOTS',
    badge: 'PRECISION ENGINEERING',
    desc: 'Collaborative robotic arms delivering sub-millimeter dexterity for intricate electronics assembly and manufacturing.',
    specs: [
      { label: 'REACH', val: '1,400 mm' },
      { label: 'REPEATABILITY', val: '± 0.02 mm' },
      { label: 'TORQUE SENSORS', val: '6-Axis Force Feedback' },
      { label: 'SAFETY', val: 'ISO 10218-1 Certified' },
    ]
  },
  aerial: {
    title: 'AERIAL ROBOTS',
    badge: 'AUTONOMOUS INSPECTION',
    desc: 'Long-range unmanned aerial systems providing high-resolution LiDAR and thermal surveying beyond line of sight.',
    specs: [
      { label: 'FLIGHT TIME', val: '55 Minutes' },
      { label: 'SENSOR ARRAY', val: 'RGB + 640p Thermal + LiDAR' },
      { label: 'WINDSPEED RESISTANCE', val: 'Up to 15 m/s' },
      { label: 'COMMUNICATIONS', val: 'Dual Encrypted Sat/4G' },
    ]
  },
  underwater: {
    title: 'UNDERWATER ROBOTS (AUV)',
    badge: 'DEEP-SEA EXPLORATION',
    desc: 'Deep-ocean submersibles capable of subsea pipeline inspection, oceanic research, and extreme depth maneuvering.',
    specs: [
      { label: 'DEPTH RATING', val: '3,000 Meters' },
      { label: 'SONAR', val: 'Multi-Beam Synthetic Aperture' },
      { label: 'PROPULSION', val: 'Vector Magnetic Thrusters' },
      { label: 'HULL MATERIAL', val: 'Titanium Composite' },
    ]
  }
};

// Vision Page 10 Industry Applications
const VISION_INDUSTRIES = [
  {
    id: 'manufacturing',
    title: 'MANUFACTURING',
    category: 'industrial',
    subtitle: 'Smarter factories. Autonomous production.',
    image: '/assets/vision/ind_manufacturing.webp',
    badge: 'INDUSTRIAL AUTOMATION',
    desc: 'High-throughput robotic automation for factory floors. Delivering sub-millimeter collaborative assembly and zero-defect quality control.',
    specs: [
      { label: 'EFFICIENCY GAIN', val: '+45% Throughput' },
      { label: 'PRECISION', val: '± 0.02 mm' },
      { label: 'OPERATION', val: '24/7 Autonomous' },
      { label: 'SAFETY RATING', val: 'ISO 10218-1' },
    ]
  },
  {
    id: 'healthcare',
    title: 'HEALTHCARE',
    category: 'health',
    subtitle: 'Precision care. Assisting. Healing. Saving.',
    image: '/assets/vision/ind_healthcare.webp',
    badge: 'MEDICAL ROBOTICS',
    desc: 'Surgical micromanipulators and clinical transport robots assisting surgeons and nurses in life-saving procedures.',
    specs: [
      { label: 'SURGICAL ACCURACY', val: 'Sub-Micron' },
      { label: 'STERILIZATION', val: 'Medical Grade IP68' },
      { label: 'LATENCY', val: '< 2ms Real-Time' },
      { label: 'FDA STATUS', val: 'Class II Ready' },
    ]
  },
  {
    id: 'logistics',
    title: 'LOGISTICS',
    category: 'industrial',
    subtitle: 'Moving everything. Anywhere. Anytime.',
    image: '/assets/vision/ind_logistics.webp',
    badge: 'SUPPLY CHAIN FLEET',
    desc: 'Autonomous mobile robots (AMRs) navigating high-density warehouse aisles with predictive AI routing.',
    specs: [
      { label: 'PAYLOAD', val: 'Up to 1,500 kg' },
      { label: 'MAPPING', val: 'LiDAR + 3D SLAM' },
      { label: 'BATTERY SWAP', val: 'Auto-Dock 3 Min' },
      { label: 'FLEET SCALE', val: '500+ Coordinated' },
    ]
  },
  {
    id: 'agriculture',
    title: 'AGRICULTURE',
    category: 'frontier',
    subtitle: 'Cultivating the future. Sustainable. Efficient. Smarter.',
    image: '/assets/vision/ind_agriculture.webp',
    badge: 'AGRI-TECH AUTONOMY',
    desc: 'Autonomous tractors and harvesting drones optimizing crop yields, precision weeding, and soil moisture telemetry.',
    specs: [
      { label: 'FIELD COVERAGE', val: '50 Hectares / Day' },
      { label: 'CHEMICAL REDUCTION', val: '-80% Herbicide' },
      { label: 'TERRAIN', val: 'All-Weather Mud & Soil' },
      { label: 'GPS ACCURACY', val: 'RTK Centimeter' },
    ]
  },
  {
    id: 'construction',
    title: 'CONSTRUCTION',
    category: 'industrial',
    subtitle: 'Building better. Safer. Faster. Smarter.',
    image: '/assets/vision/ind_construction.webp',
    badge: 'HEAVY MACHINERY AI',
    desc: 'Autonomous excavators, 3D structure scanning, and robotic bricklaying for high-speed infrastructure development.',
    specs: [
      { label: 'CYCLE SPEED', val: '2.5x Human Standard' },
      { label: 'HAZARD REDUCTION', val: '99% Fewer Accidents' },
      { label: 'SENSORS', val: 'Dual Thermal & Radar' },
      { label: 'REMOTE CONTROL', val: 'Encrypted Low-Latency' },
    ]
  },
  {
    id: 'retail',
    title: 'RETAIL',
    category: 'health',
    subtitle: 'Enhancing experiences. Intelligent. Personalized.',
    image: '/assets/vision/ind_retail.webp',
    badge: 'STORE INTELLIGENCE',
    desc: 'Real-time shelf stock audits, automated restocking carts, and interactive customer service assistants.',
    specs: [
      { label: 'AUDIT SPEED', val: '10k Items / Hour' },
      { label: 'STOCKOUT DROP', val: '-60% Lost Sales' },
      { label: 'INTERACTION', val: 'Natural Multi-Lingual AI' },
      { label: 'MOBILITY', val: 'Crowd-Safe Obstacle SLAM' },
    ]
  },
  {
    id: 'hospitality',
    title: 'HOSPITALITY',
    category: 'health',
    subtitle: 'Redefining service. Welcoming the future.',
    image: '/assets/vision/ind_hospitality.webp',
    badge: 'SERVICE ROBOTICS',
    desc: 'Autonomous hotel room delivery, concierge guidance, and restaurant assistance creating seamless guest journeys.',
    specs: [
      { label: 'ELEVATOR INTEGRATION', val: 'IoT Automated Call' },
      { label: 'DELIVERY TIME', val: '< 6 Minutes Avg' },
      { label: 'COMPARTMENT', val: 'Thermal Isolated Lock' },
      { label: 'QUIET OPERATION', val: '< 38 dB' },
    ]
  },
  {
    id: 'defense',
    title: 'DEFENSE & SECURITY',
    category: 'frontier',
    subtitle: 'Protecting futures. Autonomous. Reliable.',
    image: '/assets/vision/ind_defense.webp',
    badge: 'SECURITY & TACTICAL',
    desc: 'Unmanned ground and aerial vehicles for high-risk perimeter patrol, bomb disposal, and disaster reconnaissance.',
    specs: [
      { label: 'ENCRYPTION', val: 'AES-256 Military Grade' },
      { label: 'RUN TIME', val: '12 Hours Continuous' },
      { label: 'NIGHT VISION', val: 'Long-Wave Thermal' },
      { label: 'FAIL-SAFE', val: 'Self-Destruct / Zero-Leak' },
    ]
  },
  {
    id: 'marine',
    title: 'MARINE & OCEAN',
    category: 'frontier',
    subtitle: 'Exploring beyond limits. Deep. Smart. Resilient.',
    image: '/assets/vision/ind_marine.webp',
    badge: 'SUBSEA EXPLORATION',
    desc: 'Autonomous underwater vehicles (AUVs) exploring trenches, offshore energy structures, and maritime ecology.',
    specs: [
      { label: 'DEPTH RATING', val: '4,000 Meters' },
      { label: 'HULL INTEGRITY', val: 'Titanium Composite' },
      { label: 'SONAR', val: 'High-Res Synthetic Aperture' },
      { label: 'PROPULSION', val: 'Brushless Magnetic Drive' },
    ]
  },
  {
    id: 'space',
    title: 'SPACE EXPLORATION',
    category: 'frontier',
    subtitle: 'Robots beyond Earth. Exploring the unknown.',
    image: '/assets/vision/ind_space.webp',
    badge: 'PLANETARY AUTONOMY',
    desc: 'Lunar and planetary excavators, satellite maintenance arms, and autonomous habitat construction robots.',
    specs: [
      { label: 'TEMPERATURE', val: '-180°C to +120°C' },
      { label: 'RADIATION SHIELD', val: 'Tungsten-Coated MCU' },
      { label: 'AUTONOMY LEVEL', val: 'Full Disconnected AI' },
      { label: 'DEPLOYMENT', val: 'Lunar & Mars Class' },
    ]
  }
];

// Timeline Milestones
const TIMELINE_MILESTONES = [
  {
    year: '2024',
    phase: 'Foundation',
    summary: 'Building core technologies and robotic intelligence platforms.',
    details: 'Completed neural motor foundation model v1, multi-spectral perception engine, and initial hardware architectures.'
  },
  {
    year: '2026',
    phase: 'Expansion',
    summary: 'Expanding robot portfolios across key industries.',
    details: 'Commercial rollout across automotive manufacturing, logistics sorting hubs, and pilot agricultural fleets worldwide.'
  },
  {
    year: '2028',
    phase: 'Scale',
    summary: 'Scaling production and global deployments.',
    details: 'Gigafactory robotic assembly lines online, 10,000+ units in active operation, automated fleet swarm synchronizer active.'
  },
  {
    year: '2030',
    phase: 'Integration',
    summary: 'Robots seamlessly integrated into everyday life and industries.',
    details: 'Full cross-environment interoperability between humanoid, land, sea, and aerial fleets with zero human intervention.'
  },
  {
    year: '2035',
    phase: 'Our Vision Realized',
    summary: 'Every type of robot. Every industry. A better world.',
    details: 'Universal physical autonomy realized. 1 million robots amplifying human potential across Earth and off-world habitats.'
  }
];

// Technology Page Data
const TECH_PILLARS = [
  {
    id: 'ai',
    title: 'AI & AUTONOMY',
    icon: Brain,
    desc: 'Advanced perception, decision-making and autonomous control in dynamic real-world environments.'
  },
  {
    id: 'robotics',
    title: 'ROBOTICS ENGINEERING',
    icon: Sliders,
    desc: 'Modular, scalable and rugged hardware platforms built for performance, safety and reliability.'
  },
  {
    id: 'perception',
    title: 'PERCEPTION SYSTEMS',
    icon: Box,
    desc: 'Multi-modal sensing with vision, depth, lidar, radar and tactile intelligence for complete situational awareness.'
  },
  {
    id: 'compute',
    title: 'COMPUTE & EDGE AI',
    icon: Cpu,
    desc: 'High-performance compute, real-time inference and edge intelligence for mission-critical performance.'
  },
  {
    id: 'cloud',
    title: 'CLOUD & CONNECTIVITY',
    icon: Cloud,
    desc: 'Secure connectivity, fleet management, data orchestration and continuous software updates at scale.'
  },
  {
    id: 'safety',
    title: 'SAFETY & RELIABILITY',
    icon: ShieldCheck,
    desc: 'Built-in safety, fail-safe systems and rigorous testing for human-robot collaboration and real-world trust.'
  }
];

const TECH_STACK_LAYERS = [
  {
    id: 'intelligence',
    name: 'INTELLIGENCE LAYER',
    subtitle: 'AI Models, Reasoning, Planning',
    desc: 'State-of-the-art vision-language-action (VLA) foundation models combined with deep reinforcement learning policies and real-time hierarchical planners.'
  },
  {
    id: 'software',
    name: 'SOFTWARE LAYER',
    subtitle: 'Autonomy, Perception, Simulation',
    desc: 'GPU-accelerated SLAM, photorealistic Isaac Sim digital twin environments, low-latency trajectory optimization, and multi-sensor spatial calibration.'
  },
  {
    id: 'systems',
    name: 'SYSTEMS LAYER',
    subtitle: 'Compute, Connectivity, Middleware',
    desc: 'Deterministic real-time Linux kernels, zero-copy high-bandwidth ROS2 middleware, CAN-FD buses, and hardware-accelerated neural tensor pipelines.'
  },
  {
    id: 'hardware',
    name: 'HARDWARE LAYER',
    subtitle: 'Robots, Sensors, Actuators',
    desc: 'Custom high-torque cycloidal actuators, solid-state LiDAR, multi-spectral stereoscopic depth cameras, tactile arrays, and titanium composite loadframes.'
  }
];

const KEY_TECHNOLOGIES = [
  {
    id: 'foundation',
    title: 'FOUNDATION MODELS',
    desc: 'Domain-specific models trained for real-world robotics.',
    image: '/assets/technology/tech_1_foundation.webp',
    badge: 'CORE NEURAL ENGINE',
    specs: [
      { label: 'ARCHITECTURE', val: 'Multi-Modal VLA' },
      { label: 'PARAMETERS', val: '14 Billion Dense' },
      { label: 'INFERENCE SPEED', val: '4.2 ms / Step' },
      { label: 'TRAINING TOKENS', val: '5 Trillion Tokens' }
    ]
  },
  {
    id: 'simulation',
    title: 'DIGITAL TWIN & SIMULATION',
    desc: 'Test, train and validate in photorealistic virtual environments.',
    image: '/assets/technology/tech_2_digital_twin.webp',
    badge: 'VIRTUAL PROVING GROUND',
    specs: [
      { label: 'PHYSICS ACCURACY', val: 'Sub-Millimeter' },
      { label: 'SIM SPEED', val: '10,000x Real-Time' },
      { label: 'DOMAIN RANDOMIZATION', val: '100+ Environmental Vars' },
      { label: 'PLATFORM', val: 'Cloud Distributed GPU' }
    ]
  },
  {
    id: 'motion',
    title: 'FORCE & MOTION CONTROL',
    desc: 'Precision control for delicate and high-performance operations.',
    image: '/assets/technology/tech_3_force_control.webp',
    badge: 'MECHATRONIC CONTROL',
    specs: [
      { label: 'FEEDBACK LOOP', val: '1,000 Hz Real-Time' },
      { label: 'FORCE SENSING', val: '6-Axis Sub-Newton' },
      { label: 'COMPLIANCE', val: 'Variable Impedance' },
      { label: 'ACTUATION', val: 'High-Density Direct Drive' }
    ]
  },
  {
    id: 'swarm',
    title: 'SWARM & FLEET INTELLIGENCE',
    desc: 'Coordinate robots and systems to achieve more together at scale.',
    image: '/assets/technology/tech_4_swarm.webp',
    badge: 'MULTI-AGENT COORDINATION',
    specs: [
      { label: 'SCALE', val: '10,000+ Synchronized' },
      { label: 'COLLISION AVOIDANCE', val: 'Decentralized Vector Field' },
      { label: 'MESH LATENCY', val: '< 10 ms Peer-to-Peer' },
      { label: 'FALLBACK', val: 'Autonomous Disconnected Ops' }
    ]
  },
  {
    id: 'security',
    title: 'SECURE BY DESIGN',
    desc: 'Security, privacy and resilience built into every layer.',
    image: '/assets/technology/tech_5_security.webp',
    badge: 'ENTERPRISE DEFENSE',
    specs: [
      { label: 'ENCRYPTION', val: 'AES-256 GCM + TPM 2.0' },
      { label: 'AUTHENTICATION', val: 'Mutual TLS Everywhere' },
      { label: 'FIRMWARE', val: 'Signed Hardware Root of Trust' },
      { label: 'COMPLIANCE', val: 'SOC2 Type II & ISO 27001' }
    ]
  }
];

// Robots Page Fleet Applications
const FLEET_ROBOTS = [
  {
    id: 'humanoid',
    title: 'HUMANOID ROBOTS',
    desc: 'Designed to work alongside humans in dynamic environments.',
    image: '/assets/robots/fleet_1_humanoid.webp',
    details: ROBOT_DETAILS.humanoid
  },
  {
    id: 'quadruped',
    title: 'QUADRUPED ROBOTS',
    desc: 'Agile, rugged, ready for the most challenging terrains.',
    image: '/assets/robots/fleet_2_quadruped.webp',
    details: ROBOT_DETAILS.quadruped
  },
  {
    id: 'mobile',
    title: 'MOBILE ROBOTS',
    desc: 'Autonomous navigation. Smart logistics. Seamless operations.',
    image: '/assets/robots/fleet_3_mobile.webp',
    details: ROBOT_DETAILS.mobile
  },
  {
    id: 'manipulator',
    title: 'MANIPULATOR ROBOTS',
    desc: 'Precision in every movement. Built for complex industrial tasks.',
    image: '/assets/robots/fleet_4_manipulator.webp',
    details: ROBOT_DETAILS.manipulator
  },
  {
    id: 'aerial',
    title: 'AERIAL ROBOTS',
    desc: 'See beyond. Act faster. Autonomous in the air and beyond.',
    image: '/assets/robots/fleet_5_aerial.webp',
    details: ROBOT_DETAILS.aerial
  },
  {
    id: 'underwater',
    title: 'UNDERWATER ROBOTS',
    desc: 'Explore. Inspect. Operate. Built for deep and extreme conditions.',
    image: '/assets/robots/fleet_6_underwater.webp',
    details: ROBOT_DETAILS.underwater
  }
];

const ROBOTS_CAPABILITIES = [
  {
    id: 'ai',
    title: 'AI-POWERED INTELLIGENCE',
    icon: Brain,
    desc: 'Perceive, understand and make decisions in real time.'
  },
  {
    id: 'sensing',
    title: 'ADVANCED SENSING SYSTEMS',
    icon: Radio,
    desc: 'Vision, depth, lidar, touch and beyond.'
  },
  {
    id: 'dexterity',
    title: 'DEXTERITY & PRECISION',
    icon: Cpu,
    desc: 'Human-like dexterity with millimeter precision.'
  },
  {
    id: 'safety',
    title: 'SAFETY BY DESIGN',
    icon: ShieldCheck,
    desc: 'Built-in safety, fail-safes and continuous self-monitoring.'
  },
  {
    id: 'fleet',
    title: 'FLEET MANAGEMENT',
    icon: Cloud,
    desc: 'Monitor, update and scale your robots fleet seamlessly.'
  },
  {
    id: 'modular',
    title: 'MODULAR & SCALABLE',
    icon: Box,
    desc: 'One platform. Endless possibilities.'
  }
];

const PRECISION_METRICS = [
  { val: '500+', label: 'ENGINEERS & ROBOTICISTS' },
  { val: '10K+', label: 'ROBOTS IN DEVELOPMENT' },
  { val: '50+', label: 'PATENTS & IP FILED' },
  { val: '100+', label: 'TEST SCENARIOS' },
  { val: '0', label: 'COMPROMISE ON QUALITY & SAFETY', isZero: true }
];


// ====================================================
// 3D & INTERACTIVE ANIMATION COMPONENTS
// ====================================================

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    const elements = document.querySelectorAll('.reveal-item');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}

function TiltCard({ children, className = '', maxAngle = 12, glare = true, style = {}, onClick }) {
  const [tiltStyle, setTiltStyle] = useState({});
  const [glareStyle, setGlareStyle] = useState({});
  const cardRef = React.useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxAngle;
    const rotateY = ((x - centerX) / centerX) * maxAngle;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.03, 1.03, 1.03)`,
      transition: 'transform 0.1s ease-out'
    });

    if (glare) {
      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;
      setGlareStyle({
        background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.25) 0%, transparent 65%)`,
        opacity: 1
      });
    }
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
    });
    setGlareStyle({ opacity: 0 });
  };

  return (
    <div
      ref={cardRef}
      className={`tilt-card-wrapper ${className}`}
      style={{ ...style, ...tiltStyle }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <div className="tilt-card-inner">
        {children}
        {glare && <div className="tilt-specular-glare" style={glareStyle} />}
      </div>
    </div>
  );
}

// Header
function SS1Header({ onOpenDrawer }) {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/about', label: 'ABOUT' },
    { path: '/vision', label: 'VISION' },
    { path: '/technology', label: 'TECHNOLOGY' },
    { path: '/robots', label: 'ROBOTS' },
    { path: '/ecosystem', label: 'ECOSYSTEM' },
    { path: '/company', label: 'COMPANY' },
    { path: '/contact', label: 'CONTACT' },
  ];

  return (
    <header className={`ss1-header-wrapper ${scrolled ? 'scrolled' : ''}`}>
      <div className="ss1-header-inner">
        <Link to="/" className="ss1-brand">
          ANTELLAY - <span className="brand-x">X</span>
        </Link>

        <nav className="ss1-nav">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`ss1-nav-link ${isActive ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="ss1-actions">
          <Link
            to="/mission"
            className={`ss1-access-btn ${location.pathname === '/mission' ? 'active' : ''}`}
          >
            ACCESS <ArrowRight size={13} strokeWidth={2.5} />
          </Link>

          <button
            className="ss1-menu-btn"
            onClick={onOpenDrawer}
            aria-label="Open Navigation Menu"
          >
            <span className="ss1-menu-bar" />
            <span className="ss1-menu-bar" />
            <span className="ss1-menu-bar" />
          </button>
        </div>
      </div>
    </header>
  );
}

// Nav Drawer
function NavDrawer({ isOpen, onClose, onOpenContact }) {
  const location = useLocation();
  if (!isOpen) return null;

  return (
    <>
      <div className="drawer-backdrop" onClick={onClose} />
      <div className="nav-drawer">
        <button className="drawer-close-btn" onClick={onClose} aria-label="Close menu">
          <X size={24} />
        </button>

        <Link to="/" onClick={onClose} className="ss1-brand" style={{ marginBottom: '28px' }}>
          ANTELLAY - <span className="brand-x">X</span>
        </Link>

        <div className="drawer-links">
          {PAGES.map((p) => (
            <Link
              key={p.id}
              to={p.path}
              className={`drawer-link ${location.pathname === p.path ? 'active' : ''}`}
              onClick={onClose}
            >
              <span>{p.label}</span>
              <ArrowRight size={14} style={{ opacity: 0.5 }} />
            </Link>
          ))}
        </div>

        <div className="drawer-footer">
          <button
            className="ss1-access-btn"
            style={{ width: '100%', justifyContent: 'center' }}
            onClick={() => { onClose(); onOpenContact(); }}
          >
            REQUEST ACCESS / DEMO
          </button>
        </div>
      </div>
    </>
  );
}

// Video Modal
function VideoModal({ isOpen, onClose, onNavigateMission }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <div className="film-screen">
          <div className="film-radar-pulse">
            <Play size={34} fill="#fff" />
          </div>
          <div className="film-soundwave">
            <span /><span /><span /><span /><span /><span />
          </div>
        </div>

        <h2>ANTELLAY-X / FILM</h2>
        <p>Autonomy, intelligence and robotics engineered for the physical world. One intelligence, every environment.</p>

        <button
          className="modal-cta-btn"
          onClick={() => { onClose(); onNavigateMission(); }}
        >
          EXPLORE THE MISSION <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}

// Detail Modal
function DetailModal({ data, onClose, onAction }) {
  if (!data) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="detail-modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        {data.badge && <span className="detail-badge">{data.badge}</span>}
        <h3>{data.title}</h3>
        <p>{data.desc}</p>

        {data.specs && (
          <div className="spec-list">
            {data.specs.map((s, idx) => (
              <div key={idx} className="spec-item">
                <label>{s.label}</label>
                <span>{s.val}</span>
              </div>
            ))}
          </div>
        )}

        <button
          className="modal-cta-btn"
          onClick={() => { onClose(); onAction(); }}
        >
          INQUIRE ABOUT THIS SYSTEM <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}

// Contact Modal
function ContactModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('https://formsubmit.co/ajax/Space.antellay@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          Name: formData.name,
          Email: formData.email,
          Company: formData.company || 'N/A',
          Message: formData.message,
          _subject: `New Antellay-X Access Inquiry from ${formData.name}`,
          _template: 'table'
        })
      });
    } catch (err) {
      console.warn('Inquiry notice:', err);
    } finally {
      setLoading(false);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', company: '', message: '' });
        onClose();
      }, 2500);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="detail-modal-box" style={{ maxWidth: '520px' }} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <span className="detail-badge">ANTELLAY-X ACCESS</span>
        <h3>Connect with Our Team</h3>
        <p>Inquire about robotics deployments, platform access, enterprise partnerships, or career opportunities.</p>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '30px 0' }}>
            <CheckCircle2 size={48} color="#2674ff" style={{ margin: '0 auto 16px' }} />
            <h4>Inquiry Received</h4>
            <p style={{ marginTop: '8px' }}>Our robotics operations team will reach out to you within 24 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <input
              type="text"
              required
              placeholder="Your Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              style={{ padding: '12px 14px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', color: '#fff' }}
            />
            <input
              type="email"
              required
              placeholder="Work Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              style={{ padding: '12px 14px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', color: '#fff' }}
            />
            <input
              type="text"
              placeholder="Organization / Company"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              style={{ padding: '12px 14px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', color: '#fff' }}
            />
            <textarea
              rows={3}
              placeholder="How can we partner with you?"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              style={{ padding: '12px 14px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', color: '#fff' }}
            />
            <button type="submit" className="modal-cta-btn" style={{ justifyContent: 'center', marginTop: '6px' }}>
              SUBMIT INQUIRY <ArrowRight size={14} />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

// 1. HOME PAGE
function HomePage({ onOpenVideo, onOpenDetail, onOpenContact }) {
  const navigate = useNavigate();
  useScrollReveal();
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    document.title = 'ANTELLAY-X | Autonomy. Redefined.';
    window.scrollTo(0, 0);
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div 
      className="landing-stage"
      onMouseMove={handleMouseMove}
      style={{
        '--mouse-x': `${mousePos.x}px`,
        '--mouse-y': `${mousePos.y}px`
      }}
    >
      {/* SECTION 1: HERO */}
      <section className="landing-sec sec-hero reveal-item reveal-visible" aria-label="Hero Section">
        <img
          src="/assets/landing/sec1_hero_v2.webp"
          alt="Antellay-X Humanoid Robot"
          className="landing-sec-img"
          loading="eager"
        />
        <div className="landing-content-layer hero-layer">
          <div className="hero-copy-box">
            <h1 className="hero-brand-title">
              A N T E L L A Y - <span className="brand-x">X</span>
            </h1>
            <p className="hero-tagline">AUTONOMY. REDEFINED.</p>
            <div className="hero-btn-group">
              <button
                className="hero-btn-primary"
                onClick={() => navigate('/vision')}
                title="Explore Antellay-X Vision"
              >
                EXPLORE <ArrowRight size={15} />
              </button>
              <button
                className="hero-btn-video"
                onClick={onOpenVideo}
                title="Watch Film"
              >
                <span>WATCH FILM</span>
                <span className="play-icon-wrap"><Play size={13} fill="currentColor" /></span>
              </button>
            </div>
          </div>
          <div className="hero-scroll-indicator" aria-hidden="true">
            <span className="scroll-label">SCROLL</span>
            <div className="scroll-line-wrap">
              <span className="scroll-dot" />
              <span className="scroll-line" />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: ONE INTELLIGENCE. EVERY ENVIRONMENT. */}
      <section className="landing-sec sec-environments reveal-item" aria-label="Environments Fleet">
        <img
          src="/assets/landing/sec2_environments_v2.webp"
          alt="Antellay-X Fleet Across Earth and Space"
          className="landing-sec-img"
          loading="lazy"
        />
        <div className="landing-content-layer environments-layer">
          <div className="env-header-box">
            <h2>
              ONE INTELLIGENCE.<br />
              EVERY ENVIRONMENT.
            </h2>
            <div className="blue-accent-bar" />
            <p>The world is our domain.</p>
            <button
              className="coded-arrow-btn env-cta"
              onClick={() => navigate('/robots')}
            >
              EXPLORE FLEET <ArrowRight size={15} />
            </button>
          </div>

          <div className="env-fleet-row">
            <button
              className="env-fleet-item"
              onClick={() => onOpenDetail(ROBOT_DETAILS.humanoid)}
              title="Inspect Humanoid Robot Specs"
            >
              <span className="fleet-item-label">HUMANOID</span>
              <span className="fleet-specs-pill">SPECS →</span>
            </button>
            <button
              className="env-fleet-item"
              onClick={() => onOpenDetail(ROBOT_DETAILS.quadruped)}
              title="Inspect Land Vehicle Specs"
            >
              <span className="fleet-item-label">LAND</span>
              <span className="fleet-specs-pill">SPECS →</span>
            </button>
            <button
              className="env-fleet-item"
              onClick={() => onOpenDetail(ROBOT_DETAILS.aerial)}
              title="Inspect Air Robot Specs"
            >
              <span className="fleet-item-label">AIR</span>
              <span className="fleet-specs-pill">SPECS →</span>
            </button>
            <button
              className="env-fleet-item"
              onClick={() => onOpenDetail(ROBOT_DETAILS.underwater)}
              title="Inspect Sea Robot Specs"
            >
              <span className="fleet-item-label">SEA</span>
              <span className="fleet-specs-pill">SPECS →</span>
            </button>
            <button
              className="env-fleet-item"
              onClick={() => navigate('/robots')}
              title="Explore Space Platform"
            >
              <span className="fleet-item-label">SPACE</span>
              <span className="fleet-specs-pill">SPECS →</span>
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 3: HALO ROBOT BANNER */}
      <section className="landing-sec landing-halo-banner reveal-item" aria-label="Halo Robot Showcase">
        <div className="halo-glow-ambient" aria-hidden="true" />
        <img
          src="/assets/landing/halo_robot_banner_v2.webp"
          alt="Antellay-X Halo Robot"
          className="landing-sec-img"
          loading="lazy"
        />
        <div className="landing-content-layer halo-layer">
          <div className="halo-text-box">
            <h2 className="halo-brand-title">
              A N T E L L A Y - <span className="brand-x">X</span>
            </h2>
            <p className="halo-brand-sub">A U T O N O M Y .   R E D E F I N E D .</p>
          </div>
        </div>
      </section>

      {/* SECTION 4: BUILT TO UNDERSTAND THE PHYSICAL WORLD (CUBE) */}
      <section className="landing-sec sec-cube reveal-item" aria-label="Neural Intelligence Cube">
        <img
          src="/assets/landing/sec3_cube_v2.webp"
          alt="Antellay-X Neural Compute Cube"
          className="landing-sec-img"
          loading="lazy"
        />
        <div className="landing-content-layer cube-layer">
          <div className="side-copy-box">
            <h2>
              BUILT TO UNDERSTAND<br />
              THE PHYSICAL WORLD.
            </h2>
            <div className="blue-accent-bar" />
            <p className="highlight-tagline">PRECISION. POWER. PURPOSE. PEACE.</p>
            <p className="highlight-sub">This is the new era of autonomy-X.</p>
            <button
              className="coded-arrow-btn"
              onClick={() => navigate('/technology')}
            >
              DISCOVER TECHNOLOGY <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 5: DESIGNED WITHOUT COMPROMISE */}
      <section className="landing-sec sec-compromise reveal-item" aria-label="Robotics Design Without Compromise">
        <img
          src="/assets/landing/sec4_compromise_v2.webp"
          alt="Antellay-X Bionic Humanoid Chassis"
          className="landing-sec-img"
          loading="lazy"
        />
        <div className="landing-content-layer compromise-layer">
          <div className="compromise-copy-box">
            <h2>
              DESIGNED WITHOUT<br />
              COMPROMISE.
            </h2>
            <div className="blue-accent-bar" />
            <p>
              Advanced vision. Human-like dexterity. Intelligence without limits, potential without end.
            </p>
            <button
              className="coded-arrow-btn"
              onClick={() => navigate('/robots')}
            >
              EXPLORE ROBOTS <ArrowRight size={15} />
            </button>
          </div>

          <div className="compromise-stepper" aria-label="Robotic feature phases">
            {['01', '02', '03', '04'].map((num, idx) => (
              <button
                key={num}
                className={`stepper-item ${activeStep === idx ? 'active' : ''}`}
                onClick={() => setActiveStep(idx)}
              >
                <span className="stepper-dot" />
                <span className="stepper-num">{num}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: BUILT FOR THE REAL WORLD (FACTORY) */}
      <section className="landing-sec sec-factory reveal-item" aria-label="Industrial Assembly & Automation">
        <img
          src="/assets/landing/sec5_factory_v2.webp"
          alt="Antellay-X Robot in Manufacturing Factory"
          className="landing-sec-img"
          loading="lazy"
        />
        <div className="landing-content-layer factory-layer">
          <div className="side-copy-box">
            <h2>
              BUILT FOR<br />
              THE REAL WORLD.
            </h2>
            <div className="blue-accent-bar" />
            <p className="factory-tagline">Rugged. Adaptable. Relentless.</p>
            <p className="factory-sub">Made to solve problems.</p>
            <button
              className="coded-arrow-btn"
              onClick={() => navigate('/technology')}
            >
              SEE AUTOMATION <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 7: ONE INTELLIGENCE. INFINITE POSSIBILITIES. (GLOBE) */}
      <section className="landing-sec sec-globe reveal-item" aria-label="Global Planetary Intelligence">
        <img
          src="/assets/landing/sec6_globe_v2.webp"
          alt="Connected Autonomous Mesh Across Earth"
          className="landing-sec-img"
          loading="lazy"
        />
        <div className="landing-content-layer globe-layer">
          <div className="side-copy-box">
            <h2>
              ONE INTELLIGENCE.<br />
              INFINITE POSSIBILITIES.
            </h2>
            <div className="blue-accent-bar" />
            <p className="globe-tagline">Connected. Autonomous. Limitless.</p>
            <p className="globe-sub">The future is unified.</p>
            <button
              className="coded-arrow-btn"
              onClick={() => navigate('/ecosystem')}
            >
              EXPLORE ECOSYSTEM <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 8: THE FUTURE IS PHYSICAL (DUBAI SKYLINE) */}
      <section className="landing-sec sec-dubai reveal-item" aria-label="Physical Intelligence Vision">
        <img
          src="/assets/landing/sec7_dubai_v2.webp"
          alt="Antellay-X Robot Standing in Futuristic City at Sunset"
          className="landing-sec-img"
          loading="lazy"
        />
        <div className="landing-content-layer dubai-layer">
          <div className="dubai-left-box">
            <h2>
              THE FUTURE<br />
              IS PHYSICAL.
            </h2>
            <div className="blue-accent-bar" />
            <button
              className="dubai-pill-btn"
              onClick={() => navigate('/mission')}
            >
              DEFINE THE FUTURE <ArrowRight size={15} />
            </button>
          </div>
          <div className="dubai-right-brand">
            <span>A N T E L L A Y - <span className="brand-x">X</span></span>
          </div>
        </div>
      </section>
    </div>
  );
}

// 2. VISION PAGE
function VisionPage({ onOpenDetail, onOpenContact }) {
  const navigate = useNavigate();
  useScrollReveal();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [activeCap, setActiveCap] = useState(0);
  const [activeTimelineYear, setActiveTimelineYear] = useState('2024');

  useEffect(() => {
    document.title = 'OUR VISION | Antellay-X';
    window.scrollTo(0, 0);
  }, []);

  const filteredIndustries = VISION_INDUSTRIES.filter((ind) => {
    if (selectedFilter === 'all') return true;
    return ind.category === selectedFilter;
  });

  const activeMilestone = TIMELINE_MILESTONES.find(m => m.year === activeTimelineYear) || TIMELINE_MILESTONES[0];
  const activeMilestoneIndex = TIMELINE_MILESTONES.findIndex(m => m.year === activeTimelineYear);
  const progressPercent = (activeMilestoneIndex / (TIMELINE_MILESTONES.length - 1)) * 100;

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="vision-container">
      <section className="vision-hero">
        <div className="vision-hero-content">
          <span className="vision-tag">OUR VISION</span>
          <h1 className="vision-hero-title">
            A WORLD <br />
            BUILT WITH <br />
            <span className="blue-accent glow-text-blue shimmer-text-blue">ROBOTS.</span>
          </h1>
          <p className="vision-hero-desc">
            By 2035, Antellay-X will build every type of robot the world needs—empowering every industry, enhancing lives, and shaping the future.
          </p>
          <div className="vision-hero-actions">
            <button
              className="vision-btn-primary"
              onClick={() => scrollToSection('capabilities-sec')}
            >
              EXPLORE CAPABILITIES <ArrowRight size={14} />
            </button>
            <button
              className="vision-btn-outline"
              onClick={onOpenContact}
            >
              REQUEST ACCESS
            </button>
          </div>
        </div>

        <div className="vision-hero-robot-wrap hero-robot-3d-wrap">
          <div className="hero-robot-backlight-glow" />
          <img
            src="/assets/vision/vision_hero_robot.webp"
            alt="Antellay-X Vision Humanoid Robot"
            className="vision-hero-robot-img hero-robot-3d-img"
            loading="eager"
          />
        </div>
      </section>

      <section id="capabilities-sec" className="vision-capabilities">
        <div className="capabilities-layout">
          <div className="capabilities-left">
            <span className="vision-tag">OUR CAPABILITIES</span>
            <h2>
              Every Task. Every Industry. Every Life. <br />
              <span className="blue-text">Robots.</span>
            </h2>
            <p>
              We are building a world where intelligent machines are designed to amplify the incredible humans to solve, evolve, and elevate across the industrial humanity.
            </p>
            <button
              className="capabilities-link-btn"
              onClick={() => scrollToSection('industries-sec')}
            >
              DISCOVER OUR CAPABILITIES <ArrowRight size={15} />
            </button>
          </div>

          <div className="capabilities-cards-row">
            <div
              className={`cap-card ${activeCap === 0 ? 'active' : ''}`}
              onClick={() => setActiveCap(0)}
            >
              <div className="cap-icon-wrap">
                <Target size={24} />
              </div>
              <h4>EVERY TYPE</h4>
              <p>Building every type of robot for every real-world need.</p>
            </div>

            <div
              className={`cap-card ${activeCap === 1 ? 'active' : ''}`}
              onClick={() => setActiveCap(1)}
            >
              <div className="cap-icon-wrap">
                <Globe size={24} />
              </div>
              <h4>EVERY INDUSTRY</h4>
              <p>Transforming every industry with intelligent, robust robots.</p>
            </div>

            <div
              className={`cap-card ${activeCap === 2 ? 'active' : ''}`}
              onClick={() => setActiveCap(2)}
            >
              <div className="cap-icon-wrap">
                <User size={24} />
              </div>
              <h4>EVERY LIFE</h4>
              <p>Powering lives and unlocking human potential safely.</p>
            </div>

            <div
              className={`cap-card ${activeCap === 3 ? 'active' : ''}`}
              onClick={() => setActiveCap(3)}
            >
              <div className="cap-icon-wrap">
                <Sparkles size={24} />
              </div>
              <h4>BY 2035</h4>
              <p>Our commitment. Our mission. Our promise to the world.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="industries-sec" className="vision-industries">
        <div className="industries-header">
          <h2>One Vision. Infinite Impact.</h2>
          <div className="industry-filters">
            <button
              className={`industry-filter-pill ${selectedFilter === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedFilter('all')}
            >
              ALL INDUSTRIES ({VISION_INDUSTRIES.length})
            </button>
            <button
              className={`industry-filter-pill ${selectedFilter === 'industrial' ? 'active' : ''}`}
              onClick={() => setSelectedFilter('industrial')}
            >
              INDUSTRIAL
            </button>
            <button
              className={`industry-filter-pill ${selectedFilter === 'health' ? 'active' : ''}`}
              onClick={() => setSelectedFilter('health')}
            >
              SERVICES & CARE
            </button>
            <button
              className={`industry-filter-pill ${selectedFilter === 'frontier' ? 'active' : ''}`}
              onClick={() => setSelectedFilter('frontier')}
            >
              FRONTIER
            </button>
          </div>
        </div>

        <div className="industry-grid">
          {filteredIndustries.map((ind, idx) => (
            <TiltCard
              key={ind.id}
              className={`reveal-item stagger-${(idx % 5) + 1}`}
              maxAngle={14}
              onClick={() => onOpenDetail(ind)}
            >
              <div className="industry-card card-3d-hover">
                <div className="industry-card-img-wrap">
                  <img
                    src={ind.image}
                    alt={ind.title}
                    className="industry-card-img"
                    loading="lazy"
                  />
                  <div className="industry-card-hover-overlay">
                    <span>SPECS & DETAILS →</span>
                  </div>
                </div>
                <div className="industry-card-content">
                  <h3>{ind.title}</h3>
                  <p>{ind.subtitle}</p>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>

        <div className="industries-cta-wrap">
          <button
            className="and-more-pill-btn"
            onClick={onOpenContact}
          >
            AND MANY MORE... <ArrowRight size={14} />
          </button>
        </div>
      </section>

      <section className="vision-timeline-section">
        <div className="timeline-header">
          <span className="vision-tag">OUR JOURNEY TO 2035</span>
          <h2>Building the Future. Step by Step.</h2>
        </div>

        <div className="timeline-track-container">
          <div className="timeline-track-line">
            <div
              className="timeline-track-progress"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="timeline-nodes-row">
            {TIMELINE_MILESTONES.map((m) => {
              const isActive = m.year === activeTimelineYear;
              return (
                <div
                  key={m.year}
                  className={`timeline-step ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveTimelineYear(m.year)}
                >
                  <div className="timeline-dot" />
                  <div className="timeline-year">{m.year}</div>
                  <div className="timeline-phase">{m.phase}</div>
                  <div className="timeline-desc">{m.summary}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="timeline-card-detail">
          <div className="timeline-card-detail-left">
            <h4>Phase {activeMilestoneIndex + 1}: {activeMilestone.phase} ({activeMilestone.year})</h4>
            <p>{activeMilestone.details}</p>
          </div>
          <button
            className="vision-btn-primary"
            style={{ padding: '10px 22px', fontSize: '10px', whiteSpace: 'nowrap' }}
            onClick={onOpenContact}
          >
            INQUIRE DEPLOYMENT <ChevronRight size={13} />
          </button>
        </div>
      </section>

      <section
        className="vision-banner-section"
        style={{ backgroundImage: `url('/assets/vision/vision_banner.webp')` }}
      >
        <div className="vision-banner-overlay" />
        <div className="vision-banner-content">
          <div className="vision-banner-text">
            <h3>
              THE FUTURE IS NOT SOMETHING WE WAIT FOR. <br />
              THE FUTURE IS SOMETHING <span className="blue-accent">WE BUILD.</span>
            </h3>
            <button
              className="vision-btn-primary"
              onClick={() => navigate('/mission')}
            >
              JOIN OUR MISSION <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

// 3. TECHNOLOGY PAGE
function TechnologyPage({ onOpenVideo, onOpenDetail, onOpenContact }) {
  const navigate = useNavigate();
  useScrollReveal();
  const [activeLayer, setActiveLayer] = useState('intelligence');
  const [activePillar, setActivePillar] = useState('ai');

  useEffect(() => {
    document.title = 'OUR TECHNOLOGY | Antellay-X';
    window.scrollTo(0, 0);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const selectedLayerData = TECH_STACK_LAYERS.find(l => l.id === activeLayer) || TECH_STACK_LAYERS[0];

  return (
    <div className="tech-container">
      <section className="tech-hero">
        <div className="tech-hero-content">
          <span className="vision-tag">OUR TECHNOLOGY</span>
          <h1 className="tech-hero-title">
            INTELLIGENCE. <br />
            ENGINEERED. <br />
            <span className="blue-accent glow-text-blue shimmer-text-blue">REAL-WORLD READY.</span>
          </h1>
          <p className="tech-hero-desc">
            Antellay-X technology combines advanced robotics, AI, and systems engineering to build robots that perceive, reason, adapt and perform in the real world.
          </p>
          <div className="tech-hero-actions">
            <button
              className="vision-btn-primary"
              onClick={() => scrollToSection('tech-pillars-sec')}
            >
              EXPLORE OUR TECH <ArrowRight size={14} />
            </button>
            <button
              className="vision-btn-outline"
              onClick={onOpenVideo}
            >
              WATCH OVERVIEW <Play size={13} style={{ fill: '#000' }} />
            </button>
          </div>
        </div>

        <div className="tech-hero-robot-wrap hero-robot-3d-wrap">
          <div className="hero-robot-backlight-glow" />
          <img
            src="/assets/vision/vision_hero_robot.webp"
            alt="Antellay-X Advanced Robotics Intelligence"
            className="tech-hero-robot-img hero-robot-3d-img"
            loading="eager"
          />
        </div>
      </section>

      <section id="tech-pillars-sec" className="tech-pillars-section">
        <div className="tech-pillars-header">
          <div className="tech-pillars-header-left">
            <span className="vision-tag">THE TECHNOLOGY PILLARS</span>
            <h2>
              Built on Deep Tech. <br />
              <span className="blue-text">Designed for Every World.</span>
            </h2>
          </div>
          <div className="tech-pillars-header-right">
            <p>
              A unified technology stack that powers every Antellay-X robot across industries and environments.
            </p>
          </div>
        </div>

        <div className="pillars-grid">
          {TECH_PILLARS.map((p, idx) => {
            const IconComp = p.icon;
            const isActive = activePillar === p.id;
            return (
              <TiltCard key={p.id} maxAngle={12} className={`reveal-item stagger-${(idx % 6) + 1}`}>
                <div
                  className={`pillar-card card-3d-hover ${isActive ? 'active' : ''}`}
                  onClick={() => setActivePillar(p.id)}
                >
                  <div className="pillar-icon-wrap">
                    <IconComp size={22} />
                  </div>
                  <h4>{p.title}</h4>
                  <p>{p.desc}</p>
                </div>
              </TiltCard>
            );
          })}
        </div>
      </section>

      <section className="tech-stack-section">
        <div className="tech-stack-layout">
          <div className="tech-stack-left">
            <span className="vision-tag">OUR TECHNOLOGY STACK</span>
            <h2>
              From Intelligence <br />
              to <span className="blue-text">Action.</span>
            </h2>
            <p>
              A full-stack robotics platform that connects perception, intelligence, and execution seamlessly.
            </p>

            <div className="tech-stack-layers">
              {TECH_STACK_LAYERS.map((layer) => {
                const isActive = activeLayer === layer.id;
                return (
                  <div
                    key={layer.id}
                    className={`stack-layer-item ${isActive ? 'active' : ''}`}
                    onClick={() => setActiveLayer(layer.id)}
                  >
                    <div className="stack-layer-item-left">
                      <div className="stack-layer-dot" />
                      <div>
                        <div className="stack-layer-name">{layer.name}</div>
                        <div className="stack-layer-desc">{layer.subtitle}</div>
                      </div>
                    </div>
                    <ChevronRight size={16} color={isActive ? '#2674ff' : '#94a3b8'} />
                  </div>
                );
              })}
            </div>

            <div style={{ marginTop: '20px', padding: '16px', background: '#ffffff', borderRadius: '8px', border: '1px solid rgba(38,116,255,0.2)' }}>
              <span style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '1.5px', color: '#2674ff', textTransform: 'uppercase' }}>
                {selectedLayerData.name} ARCHITECTURE
              </span>
              <p style={{ fontSize: '12px', color: '#555', marginTop: '6px', lineHeight: '1.5' }}>
                {selectedLayerData.desc}
              </p>
            </div>
          </div>

          <div className="tech-stack-right">
            <img
              src="/assets/technology/tech_stack_graphic.webp"
              alt="Antellay-X Multi-Layer Architecture Stack"
              className="tech-stack-img"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <section className="tech-cards-section">
        <div className="tech-cards-header">
          <span className="vision-tag">KEY TECHNOLOGIES</span>
          <h2>The Innovation Behind Every Robot.</h2>
        </div>

        <div className="tech-grid">
          {KEY_TECHNOLOGIES.map((tech, idx) => (
            <TiltCard key={tech.id} maxAngle={14} className={`reveal-item stagger-${(idx % 5) + 1}`} onClick={() => onOpenDetail(tech)}>
              <div className="tech-feature-card card-3d-hover">
                <div className="tech-feature-card-img-wrap">
                  <img
                    src={tech.image}
                    alt={tech.title}
                    className="tech-feature-card-img"
                    loading="lazy"
                  />
                  <div className="tech-feature-card-overlay">
                    <span>TECH SPECS →</span>
                  </div>
                </div>
                <div className="tech-feature-card-content">
                  <h3>{tech.title}</h3>
                  <p>{tech.desc}</p>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>

        <div className="industries-cta-wrap">
          <button
            className="and-more-pill-btn"
            onClick={() => onOpenDetail(KEY_TECHNOLOGIES[0])}
          >
            VIEW ALL TECHNOLOGIES <ArrowRight size={14} />
          </button>
        </div>
      </section>

      <section className="tech-impact-section">
        <div className="tech-impact-layout">
          <div className="tech-impact-left">
            <span className="vision-tag">DESIGNED FOR REAL IMPACT</span>
            <h2>
              One Platform. <br />
              Infinite Possibilities<span className="blue-dot">.</span>
            </h2>
          </div>

          <div className="tech-impact-cols-row">
            <div className="tech-impact-col">
              <h3>Modular</h3>
              <p>Plug & Play Hardware</p>
            </div>
            <div className="tech-impact-col">
              <h3>Scalable</h3>
              <p>From One Robot to Thousands</p>
            </div>
            <div className="tech-impact-col">
              <h3>Adaptable</h3>
              <p>Built for Any Industry, Any Environment</p>
            </div>
            <div className="tech-impact-col">
              <h3>Future-Ready</h3>
              <p>Designed to Evolve with Technology</p>
            </div>
          </div>
        </div>
      </section>

      <section className="tech-banner-section">
        <img
          src="/assets/technology/tech_earth_banner.webp"
          alt="Technology with Purpose. Building a Better Tomorrow."
          className="tech-banner-img"
        />
        <div
          className="hotspot"
          style={{
            position: 'absolute',
            top: '44%',
            left: '42%',
            width: '20%',
            height: '15%',
            cursor: 'pointer',
            borderRadius: '999px'
          }}
          onClick={() => navigate('/robots')}
          title="Explore Our Robots"
        />
      </section>
    </div>
  );
}

// 4. ROBOTS PAGE
function RobotsPage({ onOpenVideo, onOpenDetail, onOpenContact }) {
  const navigate = useNavigate();
  useScrollReveal();
  const [activeCap, setActiveCap] = useState('ai');

  useEffect(() => {
    document.title = 'OUR ROBOTS | Antellay-X';
    window.scrollTo(0, 0);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="robots-container">
      <section className="robots-hero">
        <div className="robots-hero-content">
          <span className="vision-tag">OUR ROBOTS</span>
          <h1 className="robots-hero-title">
            ROBOTS FOR <br />
            EVERY <span className="blue-accent glow-text-blue shimmer-text-blue">WORLD.</span>
          </h1>
          <div className="robots-hero-sub">
            INTELLIGENT ROBOTICS. LIMITLESS FUTURE.
          </div>
          <p className="robots-hero-desc">
            From humanoids to autonomous machines, we build robots that sense, think, learn and act in the real world.
          </p>
          <div className="robots-hero-actions">
            <button
              className="vision-btn-primary"
              onClick={() => scrollToSection('robots-fleet-sec')}
            >
              EXPLORE OUR ROBOTS <ArrowRight size={14} />
            </button>
            <button
              className="vision-btn-outline"
              onClick={onOpenVideo}
            >
              WATCH OVERVIEW <Play size={13} style={{ fill: '#000' }} />
            </button>
          </div>
        </div>

        <div className="robots-hero-img-wrap hero-robot-3d-wrap">
          <div className="hero-robot-backlight-glow" />
          <img
            src="/assets/robots/robots_hero.webp"
            alt="Antellay-X Humanoid Robot Profile"
            className="robots-hero-img hero-robot-3d-img"
            loading="eager"
          />
        </div>
      </section>

      <section id="robots-fleet-sec" className="robots-fleet-section">
        <div className="robots-fleet-header">
          <div className="robots-fleet-header-left">
            <span className="vision-tag">BUILT FOR EVERY NEED</span>
            <h2>
              One Platform. <br />
              <span className="blue-text">Infinite Capabilities.</span>
            </h2>
          </div>
          <div className="robots-fleet-header-right">
            <p>
              Our robots are purpose-built to operate in diverse environments and industries with unmatched intelligence, adaptability and reliability.
            </p>
          </div>
        </div>

        <div className="fleet-grid">
          {FLEET_ROBOTS.map((robot, idx) => (
            <TiltCard
              key={robot.id}
              maxAngle={14}
              className={`reveal-item stagger-${(idx % 6) + 1}`}
              onClick={() => onOpenDetail(robot.details)}
            >
              <div className="fleet-card card-3d-hover">
                <div className="fleet-card-img-wrap">
                  <img
                    src={robot.image}
                    alt={robot.title}
                    className="fleet-card-img"
                    loading="lazy"
                  />
                </div>
                <div className="fleet-card-content">
                  <h3>{robot.title}</h3>
                  <p>{robot.desc}</p>
                  <span className="fleet-card-arrow">
                    <ArrowRight size={16} />
                  </span>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>

        <div className="industries-cta-wrap">
          <button
            className="and-more-pill-btn"
            onClick={() => onOpenDetail(ROBOT_DETAILS.humanoid)}
          >
            VIEW ALL ROBOTS <ArrowRight size={14} />
          </button>
        </div>
      </section>

      <section className="robots-cap-section">
        <div className="robots-cap-header">
          <div>
            <span className="vision-tag">ENGINEERED TO EXCEL</span>
            <h2>
              Advanced Capabilities. <br />
              <span className="blue-text">Real-World Impact.</span>
            </h2>
          </div>
          <button
            className="and-more-pill-btn"
            style={{ padding: '9px 24px', fontSize: '10.5px' }}
            onClick={() => onOpenDetail(ROBOT_DETAILS.humanoid)}
          >
            VIEW ALL ROBOTS <ArrowRight size={13} />
          </button>
        </div>

        <div className="robots-cap-grid">
          {ROBOTS_CAPABILITIES.map((cap) => {
            const IconComp = cap.icon;
            const isActive = activeCap === cap.id;
            return (
              <div
                key={cap.id}
                className={`robot-cap-card ${isActive ? 'active' : ''}`}
                onClick={() => setActiveCap(cap.id)}
              >
                <div className="robot-cap-icon-wrap">
                  <IconComp size={22} />
                </div>
                <h4>{cap.title}</h4>
                <p>{cap.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="robots-precision-section">
        <img
          src="/assets/robots/robots_factory.webp"
          alt="Antellay-X Manufacturing Facility"
          className="precision-bg-img"
        />
        <div className="precision-content">
          <span className="vision-tag" style={{ color: '#60a5fa' }}>BUILT WITH PRECISION</span>
          <h2>Where Innovation Meets Engineering.</h2>
          <p>
            State-of-the-art manufacturing, rigorous testing and relentless refinement — every robot is built to perform, every time.
          </p>
        </div>

        <div className="precision-metrics-row">
          {PRECISION_METRICS.map((m, idx) => (
            <div key={idx} className="precision-metric-col">
              <div className={`precision-metric-val ${m.isZero ? 'blue-val' : ''}`}>{m.val}</div>
              <div className="precision-metric-label">{m.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="robots-nextgen-section">
        <div className="nextgen-left">
          <h2>
            The Next Generation of <span className="blue-accent">Robotics</span> is Here.
          </h2>
          <p>
            Intelligent machines built to augment human potential and solve real-world challenges at scale.
          </p>
          <button
            className="hotspot pill"
            style={{
              background: '#ffffff',
              color: '#000000',
              padding: '11px 28px',
              fontSize: '11px',
              fontWeight: '700',
              letterSpacing: '2px',
              borderRadius: '999px',
              border: 'none',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}
            onClick={() => navigate('/mission')}
          >
            EXPLORE OUR ROBOTS <ArrowRight size={13} strokeWidth={2.5} />
          </button>
        </div>

        <div className="nextgen-right">
          <img
            src="/assets/robots/robots_head_profile.webp"
            alt="Next Generation Robot Profile"
            className="nextgen-head-img hero-robot-3d-img"
          />
        </div>
      </section>
    </div>
  );
}

// 5. REMAINING STATIC PAGES (Ecosystem, Company, Mission)
function PageView({ pageIndex, onOpenVideo, onOpenDetail, onOpenContact }) {
  const page = PAGES[pageIndex];
  const navigate = useNavigate();

  useEffect(() => {
    document.title = page.title;
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <div className="page-stage">
      <img
        src={page.image}
        alt={page.title}
        className="page-image"
        loading="eager"
      />

      <div className="hotspot-overlay">
        {page.id === 'ecosystem' && (
          <>
            <div
              className="hotspot pill"
              style={{ top: '22.3%', left: '8.8%', width: '17%', height: '2.2%' }}
              onClick={() => window.scrollTo({ top: 500, behavior: 'smooth' })}
            >
              <span className="hotspot-tooltip">EXPLORE ARCHITECTURE</span>
            </div>

            <div
              className="hotspot pill"
              style={{ top: '94.2%', left: '66%', width: '18%', height: '2.2%' }}
              onClick={() => navigate('/mission')}
            >
              <span className="hotspot-tooltip">JOIN THE ECOSYSTEM →</span>
            </div>
          </>
        )}

        {page.id === 'company' && (
          <>
            <div
              className="hotspot pill"
              style={{ top: '17.7%', left: '8.8%', width: '12%', height: '2.2%' }}
              onClick={() => window.scrollTo({ top: 480, behavior: 'smooth' })}
            >
              <span className="hotspot-tooltip">READ OUR STORY</span>
            </div>

            <div
              className="hotspot"
              style={{ top: '48.7%', left: '8.8%', width: '15%', height: '1.9%' }}
              onClick={() => window.scrollTo({ top: 720, behavior: 'smooth' })}
            >
              <span className="hotspot-tooltip">EXPLORE LEADERSHIP TEAM</span>
            </div>

            <div
              className="hotspot pill"
              style={{ top: '92.9%', left: '8.8%', width: '16%', height: '2.1%' }}
              onClick={() => navigate('/mission')}
            >
              <span className="hotspot-tooltip">JOIN OUR MISSION →</span>
            </div>
          </>
        )}

        {page.id === 'mission' && (
          <>
            <div
              className="hotspot pill"
              style={{ top: '25.5%', left: '9.2%', width: '15.5%', height: '2.2%' }}
              onClick={() => window.scrollTo({ top: 550, behavior: 'smooth' })}
            >
              <span className="hotspot-tooltip">EXPLORE OUR FACILITY</span>
            </div>

            <div
              className="hotspot pill"
              style={{ top: '25.5%', left: '27.5%', width: '14%', height: '2.2%' }}
              onClick={onOpenVideo}
            >
              <span className="hotspot-tooltip">WATCH FACILITY TOUR</span>
            </div>

            <div
              className="hotspot pill"
              style={{ top: '93.5%', left: '74.5%', width: '14.5%', height: '2.3%' }}
              onClick={onOpenContact}
            >
              <span className="hotspot-tooltip">PARTNER / JOIN OUR MISSION</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// Main App
function App() {
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [detailModalData, setDetailModalData] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="main-wrapper">
        <SS1Header onOpenDrawer={() => setDrawerOpen(true)} />

        <Routes>
          <Route path="/" element={
            <HomePage
              onOpenVideo={() => setVideoModalOpen(true)}
              onOpenDetail={(d) => setDetailModalData(d)}
              onOpenContact={() => setContactModalOpen(true)}
            />
          } />
          <Route path="/vision" element={
            <VisionPage
              onOpenDetail={(d) => setDetailModalData(d)}
              onOpenContact={() => setContactModalOpen(true)}
            />
          } />
          <Route path="/technology" element={
            <TechnologyPage
              onOpenVideo={() => setVideoModalOpen(true)}
              onOpenDetail={(d) => setDetailModalData(d)}
              onOpenContact={() => setContactModalOpen(true)}
            />
          } />
          <Route path="/robots" element={
            <RobotsPage
              onOpenVideo={() => setVideoModalOpen(true)}
              onOpenDetail={(d) => setDetailModalData(d)}
              onOpenContact={() => setContactModalOpen(true)}
            />
          } />
          <Route path="/ecosystem" element={
            <EcosystemPage
              onOpenDetail={(d) => setDetailModalData(d)}
            />
          } />
          <Route path="/company" element={
            <CompanyPage
              onOpenContact={() => setContactModalOpen(true)}
            />
          } />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<LegalPage type="privacy" />} />
          <Route path="/terms" element={<LegalPage type="terms" />} />
          <Route path="/mission" element={
            <MissionPage
              onOpenVideo={() => setVideoModalOpen(true)}
              onOpenContact={() => setContactModalOpen(true)}
            />
          } />
          <Route path="*" element={
            <HomePage
              onOpenVideo={() => setVideoModalOpen(true)}
              onOpenDetail={(d) => setDetailModalData(d)}
              onOpenContact={() => setContactModalOpen(true)}
            />
          } />
        </Routes>

        <SiteFooter onOpenContact={() => setContactModalOpen(true)} />

        <NavDrawer
          isOpen={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          onOpenContact={() => setContactModalOpen(true)}
        />

        <VideoModal
          isOpen={videoModalOpen}
          onClose={() => setVideoModalOpen(false)}
          onNavigateMission={() => window.location.pathname = '/mission'}
        />

        <DetailModal
          data={detailModalData}
          onClose={() => setDetailModalData(null)}
          onAction={() => setContactModalOpen(true)}
        />

        <ContactModal
          isOpen={contactModalOpen}
          onClose={() => setContactModalOpen(false)}
        />
      </div>
    </BrowserRouter>
  );
}

const rootElement = document.getElementById('root');
const reactRoot = window.__ANTELLAY_REACT_ROOT__ || createRoot(rootElement);
window.__ANTELLAY_REACT_ROOT__ = reactRoot;
reactRoot.render(<App />);
