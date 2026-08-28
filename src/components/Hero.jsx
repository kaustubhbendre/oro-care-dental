// src/components/Hero.jsx
import { motion } from 'framer-motion';
import { Phone, MapPin, Star, ChevronDown, CalendarCheck } from 'lucide-react';
import { scrollToAppointment, scrollToSection } from '../utils/scrollHelpers';

const floatVariants = {
  initial: { opacity: 0, y: 40 },
  animate: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: [0.4, 0, 0.2, 1] }
  })
};

export default function Hero() {
  return (
    <section id="home" className="hero">
      {/* Animated background blobs */}
      <div className="hero-bg">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
        <div className="grid-overlay" />
      </div>

      <div className="container hero-inner">
        {/* Left Content */}
        <div className="hero-content">
          <div>
            <motion.span className="section-tag">Trusted by over 164K patients</motion.span>
          </div>

          <motion.h1
            className="heading-xl hero-title"
            custom={1} variants={floatVariants} initial="initial" animate="animate"
          >
            Your Smile,<br />
            <span className="gradient-text">Our Passion</span>
          </motion.h1>

          <motion.p
            className="hero-desc"
            custom={2} variants={floatVariants} initial="initial" animate="animate"
          >
            Expert dental care with a gentle touch. Dr. Shashank Kumar and the Oro-Care team 
            are committed to giving you the smile you deserve — using the latest techniques 
            in a warm, welcoming environment.
          </motion.p>

          <motion.div
            className="hero-actions"
            custom={3} variants={floatVariants} initial="initial" animate="animate"
          >
            <button type="button" onClick={scrollToAppointment} className="btn-primary hero-cta">
              <CalendarCheck size={18} />
              Schedule a Visit
            </button>
            <a href="tel:+919967869453" className="btn-outline">
              <Phone size={18} />
              Call Us
            </a>
          </motion.div>

          <motion.div
            className="hero-badges"
            custom={4} variants={floatVariants} initial="initial" animate="animate"
          >
            <div className="badge">
              <div className="badge-stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="#c9a84c" color="#c9a84c" />
                ))}
              </div>
              <span><strong>5.0</strong> Rating · 140 Reviews</span>
            </div>
            <div className="badge-divider" />
            <div className="badge">
              <MapPin size={16} color="var(--teal)" />
              <span>Andheri East, Mumbai</span>
            </div>
          </motion.div>
        </div>

        {/* Right Visual */}
        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="visual-card main-card">
            <div className="visual-icon">
              <span className="visual-mark-title">OC</span>
            </div>
            <div className="card-info">
              <p className="card-name">Dr. Shashank Kumar</p>
              <p className="card-qual">BDS (Mum) · CCOS (Delhi)</p>
              <p className="card-reg">Reg. No. A-20141</p>
            </div>
          </div>

          {/* Floating stat cards */}
          <motion.div
            className="stat-card stat-1"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="stat-num">15+</span>
            <span className="stat-label">Years Experience</span>
          </motion.div>

          <motion.div
            className="stat-card stat-2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          >
            <span className="stat-num">5000+</span>
            <span className="stat-label">Happy Patients</span>
          </motion.div>

          <motion.div
            className="stat-card stat-3"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          >
            <span className="stat-label">Latest Technology</span>
          </motion.div>

          {/* Decorative ring */}
          <div className="deco-ring ring-1" />
          <div className="deco-ring ring-2" />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        type="button"
        onClick={() => scrollToSection('services')}
        className="scroll-indicator"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span>Explore</span>
        <ChevronDown size={20} />
      </motion.button>

      <style>{`
        .hero {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding-top: 80px;
          position: relative;
          overflow: hidden;
        }
        .hero-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
        }
        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.5;
          animation: blob 8s ease-in-out infinite;
        }
        .blob-1 {
          width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(0,180,216,0.3), transparent);
          top: -200px; right: -100px;
          animation-delay: 0s;
        }
        .blob-2 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(10,74,110,0.2), transparent);
          bottom: -100px; left: -100px;
          animation-delay: 3s;
        }
        .blob-3 {
          width: 300px; height: 300px;
          background: radial-gradient(circle, rgba(201,168,76,0.15), transparent);
          top: 50%; left: 40%;
          animation-delay: 5s;
        }
        .grid-overlay {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(10,74,110,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(10,74,110,0.04) 1px, transparent 1px);
          background-size: 50px 50px;
        }
        .hero-inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
          position: relative;
          z-index: 1;
          padding: 80px 24px;
        }
        .hero-content {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .hero-title {
          letter-spacing: -0.02em;
        }
        .hero .section-tag::before {
          width: 36px;
          height: 3px;
          background: var(--teal);
          opacity: 1;
        }
        .gradient-text {
          background: linear-gradient(135deg, var(--ocean), var(--teal));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hero-desc {
          font-size: 1.05rem;
          color: var(--text-mid);
          line-height: 1.75;
          max-width: 480px;
        }
        .hero-actions {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }
        .hero-cta {
          font-size: 1rem !important;
          padding: 16px 36px !important;
        }
        .hero-badges {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }
        .badge {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.85rem;
          color: var(--text-mid);
          font-weight: 500;
        }
        .badge-stars {
          display: flex;
          gap: 2px;
        }
        .badge-divider {
          width: 1px;
          height: 20px;
          background: rgba(10,74,110,0.15);
        }
        /* Visual */
        .hero-visual {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 480px;
        }
        .main-card {
          background: linear-gradient(135deg, var(--ocean-dark), var(--ocean));
          border-radius: var(--radius-xl);
          padding: 40px 48px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          box-shadow: var(--shadow-lg), 0 0 60px rgba(0,180,216,0.2);
          z-index: 2;
          position: relative;
        }
        .visual-icon {
          width: 108px;
          height: 108px;
          border-radius: 20px;
          background: rgba(255,255,255,0.15);
          display: grid;
          place-items: center;
          position: relative;
          color: rgba(255,255,255,0.98);
          animation: floatBob 3s ease-in-out infinite;
          box-shadow: inset 0 0 0 1px rgba(255,255,255,0.18);
        }
        .visual-mark-title {
          position: relative;
          z-index: 1;
          font-size: 1.65rem;
          font-weight: 700;
          letter-spacing: 0.04em;
        }
        .card-info {
          text-align: center;
          color: var(--white);
        }
        .card-name {
          font-family: var(--font-display);
          font-size: 1.3rem;
          font-weight: 700;
          margin-bottom: 4px;
        }
        .card-qual {
          font-size: 0.85rem;
          color: rgba(255,255,255,0.7);
          margin-bottom: 2px;
        }
        .card-reg {
          font-size: 0.78rem;
          color: var(--teal);
          letter-spacing: 0.05em;
        }
        .stat-card {
          position: absolute;
          background: var(--white);
          border-radius: var(--radius-md);
          padding: 14px 20px;
          display: flex;
          flex-direction: column;
          gap: 2px;
          box-shadow: var(--shadow-md);
          border: 1px solid rgba(10,74,110,0.08);
          z-index: 3;
        }
        .stat-1 { top: 30px; right: 0; }
        .stat-2 { bottom: 50px; left: 0; }
        .stat-3 { top: 50%; right: 0; transform: translateY(-50%); }
        .stat-num {
          font-family: var(--font-display);
          font-size: 1.4rem;
          font-weight: 700;
          color: var(--ocean);
          line-height: 1;
        }
        .stat-emoji { font-size: 1.6rem; }
        .stat-label {
          font-size: 0.75rem;
          color: var(--text-light);
          font-weight: 500;
        }
        .deco-ring {
          position: absolute;
          border-radius: 50%;
          border: 2px dashed rgba(0,180,216,0.2);
          animation: rotate-slow 20s linear infinite;
        }
        .ring-1 { width: 320px; height: 320px; }
        .ring-2 {
          width: 420px; height: 420px;
          border-style: dotted;
          animation-direction: reverse;
          animation-duration: 30s;
        }
        .scroll-indicator {
          position: absolute;
          bottom: 32px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          color: var(--text-light);
          font-size: 0.75rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          z-index: 10;
          transition: var(--transition);
        }
        .scroll-indicator:hover { color: var(--ocean); }
        @media (max-width: 900px) {
          .hero-inner {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 40px;
          }
          .hero-desc { max-width: 100%; margin: 0 auto; }
          .hero-actions { justify-content: center; }
          .hero-badges { justify-content: center; }
          .hero-visual { height: 320px; }
          .stat-card { display: none; }
          .deco-ring { display: none; }
          .section-tag { justify-content: center; }
        }
      `}</style>
    </section>
  );
}
