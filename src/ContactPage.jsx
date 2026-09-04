import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Briefcase, Building2, Calendar, ChevronLeft, ChevronRight,
  Mail, MapPin, Phone, Send, ShieldCheck, TrendingUp, Users
} from 'lucide-react';
import './contact-v2.css';

const CONTACT_EMAIL = 'Space.antellay@gmail.com';
const CONTACT_PHONE = '+91 97846 26443';

const TIME_SLOTS = ['10:00 AM', '11:00 AM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'];

const CONNECT_LINKS = [
  { icon: Users, title: 'General Inquiries', email: 'Space.antellay@gmail.com' },
  { icon: Building2, title: 'Partnerships', email: 'Space.antellay@gmail.com' },
  { icon: TrendingUp, title: 'Investors', email: 'Space.antellay@gmail.com' },
  { icon: Briefcase, title: 'Careers', email: 'Space.antellay@gmail.com' }
];

const OFFICES = [
  {
    city: 'New York, USA',
    address: '123 Innovation Drive\nNew York, NY 10001\nUnited States',
    image: '/assets/contact/office_ny.webp',
    map: 'https://www.google.com/maps/search/New+York+NY'
  },
  {
    city: 'London, UK',
    address: '10 Queen Street\nLondon, EC4N 1TX\nUnited Kingdom',
    image: '/assets/contact/office_london.webp',
    map: 'https://www.google.com/maps/search/London+EC4N+1TX'
  },
  {
    city: 'Dubai, UAE',
    address: 'Office 2101, JAFZA One\nJebel Ali Free Zone\nDubai, UAE',
    image: '/assets/contact/office_dubai.webp',
    map: 'https://www.google.com/maps/search/JAFZA+One+Dubai'
  },
  {
    city: 'Singapore',
    address: '8 Marina View\n#15-03 Asia Square Tower 1\nSingapore 018960',
    image: '/assets/contact/office_singapore.webp',
    map: 'https://www.google.com/maps/search/8+Marina+View+Singapore'
  },
  {
    city: 'Bangalore, India',
    address: 'Prestige Tech Park\nMarathahalli Outer Ring Road\nBangalore, 560103',
    image: '/assets/contact/office_bangalore.webp',
    map: 'https://www.google.com/maps/search/Prestige+Tech+Park+Bangalore'
  }
];

const QUICK_LINKS = [
  ['Vision', '/vision'],
  ['Technology', '/technology'],
  ['Robots', '/robots'],
  ['Ecosystem', '/ecosystem'],
  ['Company', '/company'],
  ['Contact', '/contact']
];

function getMonthDays(year, month) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPreviousMonth = new Date(year, month, 0).getDate();
  const cells = [];

  for (let i = firstDay - 1; i >= 0; i -= 1) {
    cells.push({ day: daysInPreviousMonth - i, muted: true });
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push({ day, muted: false });
  }

  while (cells.length < 42) {
    cells.push({ day: cells.length - firstDay - daysInMonth + 1, muted: true });
  }

  return cells;
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: '',
    agree: false
  });
  const [submitted, setSubmitted] = useState(false);
  const [selectedDate, setSelectedDate] = useState({ year: 2026, month: 4, day: 20 });
  const [selectedTime, setSelectedTime] = useState('01:00 PM');

  const calendarCells = useMemo(
    () => getMonthDays(selectedDate.year, selectedDate.month),
    [selectedDate.year, selectedDate.month]
  );

  useEffect(() => {
    document.title = 'CONTACT US | Antellay-X';
    window.scrollTo(0, 0);
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitForm = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch('https://formsubmit.co/ajax/Space.antellay@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          Name: formData.fullName,
          Email: formData.email,
          Company: formData.company || 'N/A',
          Phone: formData.phone || 'N/A',
          Subject: formData.subject,
          Message: formData.message,
          _subject: `New Antellay-X Contact Message: ${formData.subject} (from ${formData.fullName})`,
          _template: 'table'
        })
      });
    } catch (err) {
      console.warn('FormSubmit network notice:', err);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
      window.setTimeout(() => {
        setSubmitted(false);
        setFormData({
          fullName: '',
          email: '',
          company: '',
          phone: '',
          subject: '',
          message: '',
          agree: false
        });
      }, 3500);
    }
  };

  const changeMonth = (direction) => {
    setSelectedDate((current) => {
      const next = new Date(current.year, current.month + direction, 1);
      return { year: next.getFullYear(), month: next.getMonth(), day: 1 };
    });
  };

  const scheduleMeeting = () => {
    const month = String(selectedDate.month + 1).padStart(2, '0');
    const day = String(selectedDate.day).padStart(2, '0');
    const subject = encodeURIComponent(`Antellay-X meeting request - ${selectedDate.year}-${month}-${day} ${selectedTime}`);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}`;
  };

  return (
    <div className="contact-container">
      <section className="contact-hero" aria-label="Contact Antellay-X">
        <div className="contact-hero-copy">
          <span className="contact-tag">GET IN TOUCH</span>
          <h1>
            Let's Build the <br />
            Future, <span>Together.</span>
          </h1>
          <p>Have a question, partnership idea, or investment inquiry? We'd love to hear from you.</p>

          <div className="contact-hero-methods">
            <a href={`mailto:${CONTACT_EMAIL}`} className="contact-method">
              <span><Mail size={22} /></span>
              <strong>Email Us</strong>
              <small>{CONTACT_EMAIL}</small>
            </a>
            <a href={`tel:${CONTACT_PHONE.replace(/\s/g, '')}`} className="contact-method">
              <span><Phone size={22} /></span>
              <strong>Call Us</strong>
              <small>{CONTACT_PHONE}</small>
            </a>
          </div>
        </div>

        <div className="contact-hero-art" aria-hidden="true">
          <img src="/assets/contact/contact_hero_crop.webp" alt="" loading="eager" />
        </div>
      </section>

      <section className="contact-workspace">
        <div className="contact-form-panel">
          <span className="contact-tag">SEND US A MESSAGE</span>
          <h2>We're here to help.</h2>
          <p>Fill out the form below and our team will get back to you as soon as possible.</p>

          {submitted ? (
            <div className="contact-success" role="status">
              <ShieldCheck size={38} />
              <h3>Message Sent</h3>
              <p>Our robotics team has received your message and will respond within 24 hours.</p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={submitForm}>
              <div className="contact-form-grid">
                <input required placeholder="Full Name" value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} />
                <input required type="email" placeholder="Email Address" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
              </div>
              <input placeholder="Company / Organization" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} />
              <div className="contact-form-grid">
                <input type="tel" placeholder="Phone Number" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                <input required placeholder="Subject" value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} />
              </div>
              <textarea required rows={5} placeholder="How can we help you?" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} />
              <label className="contact-agree">
                <input required type="checkbox" checked={formData.agree} onChange={(e) => setFormData({ ...formData, agree: e.target.checked })} />
                <span>I agree to the <Link to="/privacy">Privacy Policy</Link> and <Link to="/terms">Terms of Use</Link>.</span>
              </label>
              <button type="submit" className="contact-black-btn" disabled={isSubmitting}>
                <Send size={14} /> {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
              </button>
            </form>
          )}
        </div>

        <div className="contact-scheduler-panel">
          <span className="contact-tag">SCHEDULE A MEETING</span>
          <h2>Book a Meeting with Our Team</h2>
          <p>Select a date and time that works for you. We'll confirm your meeting and connect with you.</p>

          <div className="scheduler-card">
            <div className="calendar-box">
              <div className="calendar-title">
                <strong>Select Date</strong>
                <div>
                  <button type="button" onClick={() => changeMonth(-1)} aria-label="Previous month"><ChevronLeft size={16} /></button>
                  <button type="button" onClick={() => changeMonth(1)} aria-label="Next month"><ChevronRight size={16} /></button>
                </div>
              </div>
              <p>{new Date(selectedDate.year, selectedDate.month).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
              <div className="calendar-grid">
                {['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'].map((day) => <span key={day}>{day}</span>)}
                {calendarCells.map((cell, index) => (
                  <button
                    key={`${cell.day}-${index}`}
                    type="button"
                    disabled={cell.muted}
                    className={selectedDate.day === cell.day && !cell.muted ? 'selected' : ''}
                    onClick={() => setSelectedDate({ ...selectedDate, day: cell.day })}
                  >
                    {cell.day}
                  </button>
                ))}
              </div>
              <div className="timezone-row">
                <MapPin size={13} />
                <span>Time zone: Asia/Kolkata (UTC +05:30)</span>
              </div>
            </div>

            <div className="time-box">
              <strong>Select Time</strong>
              {TIME_SLOTS.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  className={selectedTime === slot ? 'selected' : ''}
                  onClick={() => setSelectedTime(slot)}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          <button type="button" className="schedule-submit" onClick={scheduleMeeting}>
            <Calendar size={14} /> SCHEDULE MEETING
          </button>
          <p className="contact-safe-note"><ShieldCheck size={13} /> Your information is secure and will never be shared.</p>
        </div>
      </section>

      <section className="connect-strip">
        <span className="contact-tag">OTHER WAYS TO CONNECT</span>
        <div className="connect-grid">
          {CONNECT_LINKS.map((item) => {
            const Icon = item.icon;
            return (
              <a key={item.email} href={`mailto:${item.email}`} className="connect-item">
                <Icon size={25} />
                <span>
                  <strong>{item.title}</strong>
                  <small>{item.email}</small>
                </span>
              </a>
            );
          })}
        </div>
      </section>

      <section className="contact-dark-cta">
        <div>
          <h2>
            Let's Create the Future of Robotics. <br />
            <span>Together.</span>
          </h2>
        </div>
        <p>Whether you're exploring a partnership, have a project in mind, or just want to say hello, we're always open to new conversations.</p>
        <button type="button" onClick={scheduleMeeting}>
          SCHEDULE A MEETING <ArrowRight size={14} />
        </button>
        <img src="/assets/contact/contact_banner_robot.webp" alt="" aria-hidden="true" />
      </section>

    </div>
  );
}
