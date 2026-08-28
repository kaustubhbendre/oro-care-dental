import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Menu, X } from 'lucide-react';
import { scrollToSection } from '../utils/scrollHelpers';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.nav
        className={`navbar ${scrolled ? 'scrolled' : ''}`}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="container nav-inner">
          {/* Logo */}
         <button type="button" onClick={() => scrollToSection('home')} className="nav-logo btn-reset">
            <div className="logo-icon">
              <span style={{ fontSize: '24px' }}>🦷</span>
            </div>
            <div className="logo-text">
              <span className="logo-title">Oro-Care</span>
              <span className="logo-sub">Dental Clinic</span>
            </div>
          </button>

          {/* Desktop Links */}
          <ul className="nav-links">
            {navLinks.map((link) => (
              <li key={link.label}>
                <button type="button" onClick={() => scrollToSection(link.href.replace('#', ''))} className="nav-link btn-reset">
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="nav-actions">
            <a href="tel:+919967869453" className="nav-phone">
              <Phone size={16} />
              <span>+91 99678 69453</span>
            </a>
            <button type="button" onClick={() => scrollToSection('appointment')} className="btn-primary nav-btn btn-reset">
              Book Your Visit
            </button>
          </div>

          {/* Hamburger */}
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            <ul>
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <button type="button" onClick={() => { setMenuOpen(false); scrollToSection(link.href.replace('#', '')); }} className="btn-reset mobile-nav-link">
                    {link.label}
                  </button>
                </motion.li>
              ))}
            </ul>
            <button type="button" onClick={() => { setMenuOpen(false); scrollToSection('appointment'); }} className="btn-primary btn-reset">
              Book Your Visit
            </button>
            <a href="tel:+919967869453" className="mobile-phone">
              <Phone size={16} /> +91 99678 69453
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .navbar {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 1000;
          padding: 16px 0;
          background: rgba(238, 247, 246, 0.9);
          backdrop-filter: blur(12px);
          transition: all 0.4s ease;
        }
        .navbar.scrolled {
          background: rgba(255,255,255,0.97);
          backdrop-filter: blur(20px);
          padding: 10px 0;
          box-shadow: 0 2px 30px rgba(10,74,110,0.1);
        }
        .nav-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
        }
        .nav-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
        }
        .logo-icon {
          width: 44px; height: 44px;
          background: linear-gradient(135deg, var(--ocean), var(--teal));
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          font-size: 22px;
          box-shadow: 0 4px 15px rgba(0,180,216,0.3);
        }
        .logo-text {
          display: flex;
          flex-direction: column;
          line-height: 1.1;
        }
        .logo-title {
          font-family: var(--font-display);
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--ocean-dark);
        }
        .logo-sub {
          font-size: 0.7rem;
          color: var(--teal);
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .nav-links {
          display: flex;
          align-items: center;
          gap: 4px;
          list-style: none;
        }
        .btn-reset {
          background: none;
          border: none;
          padding: 0;
          font: inherit;
          cursor: pointer;
          text-decoration: none;
        }
        .nav-link {
          padding: 8px 14px;
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--text-mid);
          border-radius: var(--radius-full);
          transition: var(--transition);
          position: relative;
        }
        .nav-link:hover {
          color: var(--ocean);
          background: rgba(10,74,110,0.07);
        }
        .nav-actions {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-left: auto;
          flex-shrink: 0;
        }
        .nav-phone {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--ocean);
          transition: var(--transition);
        }
        .nav-phone:hover { color: var(--teal); }
        .nav-btn {
          padding: 10px 22px !important;
          font-size: 0.85rem !important;
          background: var(--ocean) !important;
          color: var(--white) !important;
          opacity: 1 !important;
        }
        .hamburger {
          display: none;
          color: var(--ocean-dark);
          padding: 8px;
        }
        .mobile-menu {
          position: fixed;
          top: 0; right: 0;
          width: 280px; height: 100vh;
          background: var(--white);
          z-index: 999;
          padding: 80px 32px 40px;
          display: flex;
          flex-direction: column;
          gap: 32px;
          box-shadow: -10px 0 40px rgba(10,74,110,0.15);
        }
        .mobile-menu ul {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .mobile-menu ul a {
          display: block;
          padding: 12px 16px;
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--text-dark);
          border-radius: var(--radius-sm);
          transition: var(--transition);
        }
        .mobile-nav-link {
          display: block;
          width: 100%;
          text-align: left;
          padding: 12px 16px;
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--text-dark);
          border-radius: var(--radius-sm);
          transition: var(--transition);
        }
        .mobile-menu ul a:hover {
          background: rgba(10,74,110,0.07);
          color: var(--ocean);
        }
        .mobile-phone {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--text-mid);
          font-size: 0.9rem;
          font-weight: 500;
        }
        @media (max-width: 1000px) {
          .nav-links li:not(:last-child) { display: none; }
        }
        @media (max-width: 768px) {
          .nav-links, .nav-phone { display: none; }
          .hamburger { display: flex; }
          .nav-btn { display: none; }
        }
        @media (max-width: 480px) {
          .logo-sub { display: none; }
        }
      `}</style>
    </>
  );
}