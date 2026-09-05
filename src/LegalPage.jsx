import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowUpRight,
  BookOpenText,
  CalendarDays,
  Check,
  FileText,
  Mail,
  Scale,
  ShieldCheck,
  Lock
} from 'lucide-react';
import policies from './data/legalPolicies.json';
import './legal.css';

function PolicyBlock({ block }) {
  if (block.type === 'list') {
    return (
      <ul className="legal-list-items">
        {block.items.map((item, index) => (
          <li key={`${item}-${index}`} className="legal-list-item">
            <Check className="legal-check-icon" size={16} strokeWidth={2.5} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  }

  return <p>{block.text}</p>;
}

export default function LegalPage({ type = 'privacy' }) {
  const location = useLocation();
  const policy = policies.find((p) => p.slug === type) || policies[0];

  useEffect(() => {
    document.title = `${policy.title.toUpperCase()} | Antellay-X`;
    window.scrollTo(0, 0);
  }, [policy, location.pathname]);

  return (
    <main className="legal-policy-main">
      {/* Top Header Bar */}
      <div className="legal-header-bar">
        <div className="legal-header-inner">
          <Link to="/" className="legal-back-btn">
            <ArrowLeft size={16} />
            <span>Return to Home</span>
          </Link>
          <div className="legal-badge-pill">
            <Scale size={15} />
            <span>Antellay-X Legal & Governance</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="legal-hero-section">
        <div className="legal-hero-inner">
          <div className="legal-category-tag">
            <FileText size={15} />
            <span>{policy.category}</span>
          </div>
          <h1 className="legal-hero-title">{policy.title}</h1>
          <p className="legal-hero-summary">{policy.summary}</p>
          <div className="legal-metadata-badges">
            <span className="legal-badge-item">
              <CalendarDays size={14} /> Effective {policy.effectiveDate}
            </span>
            <span className="legal-badge-item">
              Version {policy.version}
            </span>
            <span className="legal-badge-item">
              Master Document Pages {policy.sourcePages}
            </span>
          </div>
        </div>
      </section>

      {/* Main Container: Sidebar + Article */}
      <div className="legal-layout-container">
        {/* Sticky Sidebar Navigation */}
        <aside className="legal-sidebar">
          <p className="legal-sidebar-heading">Document Contents</p>
          <nav aria-label={`${policy.title} sections`} className="legal-sidebar-nav">
            {policy.sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="legal-sidebar-link"
              >
                <span className="legal-sidebar-num">{section.number}.</span>
                {section.title}
              </a>
            ))}
          </nav>
        </aside>

        {/* Article Body */}
        <article className="legal-article">
          <div className="legal-notice-box">
            This policy forms an integral part of Antellay-X's Master Legal & Compliance Framework and should be read together with all applicable enterprise agreements, master service agreements, and technical statements of work.
          </div>

          <div className="legal-sections-wrapper">
            {policy.sections.map((section) => (
              <section key={section.id} id={section.id} className="legal-section-block">
                <div className="legal-section-header">
                  <span className="legal-sec-num">{section.number}</span>
                  <h2 className="legal-sec-title">{section.title}</h2>
                </div>
                <div className="legal-copy-content">
                  {section.blocks.map((block, idx) => (
                    <PolicyBlock key={idx} block={block} />
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Contact Support Card */}
          <div className="legal-contact-box">
            <div className="legal-contact-info">
              <Mail size={22} color="#2674ff" />
              <h3>Questions Regarding Legal Policies?</h3>
              <p>Contact our legal and governance team with document reference for expedited assistance.</p>
            </div>
            <a href="mailto:Space.antellay@gmail.com" className="legal-contact-btn">
              <span>Space.antellay@gmail.com</span>
              <ArrowUpRight size={15} />
            </a>
          </div>
        </article>
      </div>

      {/* Other Legal Documents Strip */}
      <section className="legal-other-docs-section">
        <div className="legal-other-docs-inner">
          <div className="legal-other-docs-header">
            <h4>Other Governance Documents</h4>
          </div>
          <div className="legal-other-cards-grid">
            {policies
              .filter((p) => p.slug !== policy.slug)
              .map((item) => (
                <Link key={item.slug} to={`/${item.slug}`} className="legal-other-card">
                  <span>{item.title}</span>
                  <ArrowUpRight size={16} />
                </Link>
              ))}
            <Link to="/contact" className="legal-other-card">
              <span>Enterprise Compliance Inquiry</span>
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
