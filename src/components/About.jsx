// src/components/About.jsx
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { CheckCircle2, Star } from 'lucide-react';

const stats = [
  { num: 15, suffix: '+', label: 'Years Experience' },
  { num: 164, suffix: 'K+', label: 'Happy Patients' },
  { num: 5000, suffix: '+', label: 'Smile Transformations' },
  { num: 5, suffix: '.0', label: 'Star Rating' },
];

const highlights = [
  'BDS from Mumbai — Bachelor of Dental Surgery',
  'CCOS from Delhi — Certified in Cosmetic & Oral Surgery',
  'Reg. No. A-20141 · Fully Licensed & Insured',
  'Advanced training in painless procedures',
  'Personal treatment plan for every patient',
  'State-of-the-art equipment & sterilization',
];

export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });
  const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="about-grid" ref={ref}>
          {/* Left - Visual */}
          <motion.div
            className="about-visual"
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="doc-card">
              <div className="doc-avatar">
                <span>Dr</span>
              </div>
              <div className="doc-badge">
                <div className="badge-icon" />
                <div>
                  <p className="badge-title">Top Rated</p>
                  <p className="badge-sub">Mumbai Dentist 2024</p>
                </div>
              </div>
              <div className="experience-tag">
                <span className="exp-num">15+</span>
                <span className="exp-text">Years of Excellence</span>
              </div>
            </div>

            {/* Reviews snippet */}
            <div className="review-snippet">
              <p className="review-quote">
                "The doctor is expert at his work and will make you feel comfortable."
              </p>
              <div className="reviewer">
                <div className="reviewer-avatar">P</div>
                <div>
                  <p className="reviewer-name">Patient Review</p>
                  <div className="reviewer-stars">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill="#c9a84c" color="#c9a84c" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <div className="about-content">
            <motion.span
              className="section-tag"
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              Meet Your Dentist
            </motion.span>

            <motion.h2
              className="heading-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              Dr. Shashank Kumar
            </motion.h2>

            <motion.p
              className="about-intro"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              With over 15 years of dedicated service, Dr. Shashank Kumar is one of 
              Mumbai's most trusted dentists. His philosophy is simple: every patient 
              deserves a personalized treatment plan, compassionate care, and a smile 
              they're proud of.
            </motion.p>

            <motion.ul
              className="highlights-list"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {highlights.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.07 }}
                >
                  <CheckCircle2 size={18} color="var(--teal)" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </motion.ul>

            <motion.a
              href="#appointment"
              className="btn-primary"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              Book a Consultation
            </motion.a>
          </div>
        </div>

        {/* Stats row */}
        <div className="stats-row" ref={statsRef}>
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              className="stat-item"
              initial={{ opacity: 0, y: 30 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <div className="stat-number">
                {statsInView && (
                  <CountUp end={s.num} duration={2.5} delay={i * 0.1} />
                )}
                <span>{s.suffix}</span>
              </div>
              <p className="stat-label-text">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .about-section {
          padding: 100px 0;
          background: var(--cream);
          position: relative;
          overflow: hidden;
        }
        .about-section::before {
          content: '';
          position: absolute;
          width: 400px; height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0,180,216,0.08), transparent);
          top: -100px; right: -100px;
        }
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 80px;
          align-items: center;
          margin-bottom: 80px;
        }
        .about-visual {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .doc-card {
          background: linear-gradient(135deg, var(--ocean-dark), var(--ocean));
          border-radius: var(--radius-xl);
          padding: 48px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
          position: relative;
          overflow: hidden;
        }
        .doc-card::before {
          content: '';
          position: absolute;
          top: -50%; right: -50%;
          width: 200%; height: 200%;
          background: radial-gradient(circle at top right, rgba(0,180,216,0.2), transparent 60%);
        }
        .doc-avatar {
          width: 120px; height: 120px;
          background: rgba(255,255,255,0.15);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 64px;
          animation: floatBob 3s ease-in-out infinite;
          border: 3px solid rgba(255,255,255,0.2);
        }
        .doc-badge {
          display: flex;
          align-items: center;
          gap: 12px;
          background: rgba(255,255,255,0.1);
          border-radius: var(--radius-md);
          padding: 12px 20px;
          width: 100%;
          font-size: 1.5rem;
        }
        .badge-icon {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: var(--teal);
          box-shadow: 0 0 0 4px rgba(0,180,216,0.12);
        }
        .badge-title {
          color: var(--white);
          font-weight: 600;
          font-size: 0.9rem;
        }
        .badge-sub {
          color: rgba(255,255,255,0.6);
          font-size: 0.78rem;
        }
        .experience-tag {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .exp-num {
          font-family: var(--font-display);
          font-size: 2rem;
          font-weight: 700;
          color: var(--gold);
        }
        .exp-text {
          font-size: 0.85rem;
          color: rgba(255,255,255,0.7);
        }
        .review-snippet {
          background: var(--white);
          border-radius: var(--radius-lg);
          padding: 24px;
          box-shadow: var(--shadow-md);
          border-left: 4px solid var(--teal);
        }
        .review-quote {
          font-family: var(--font-accent);
          font-style: italic;
          font-size: 1rem;
          color: var(--text-dark);
          line-height: 1.6;
          margin-bottom: 16px;
        }
        .reviewer {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .reviewer-avatar {
          width: 36px; height: 36px;
          background: var(--ocean);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--white);
          font-weight: 700;
          font-size: 0.9rem;
        }
        .reviewer-name {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-dark);
        }
        .reviewer-stars {
          color: var(--gold);
          font-size: 0.85rem;
        }
        .about-content {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .about-intro {
          font-size: 1.05rem;
          color: var(--text-mid);
          line-height: 1.75;
        }
        .highlights-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .highlights-list li {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 0.92rem;
          color: var(--text-dark);
        }
        .highlights-list li svg {
          flex-shrink: 0;
          margin-top: 2px;
        }
        /* Stats */
        .stats-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          background: linear-gradient(135deg, var(--ocean-dark), var(--ocean));
          border-radius: var(--radius-xl);
          padding: 48px 40px;
          position: relative;
          overflow: hidden;
        }
        .stats-row::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
          background-size: 30px 30px;
        }
        .stat-item {
          text-align: center;
          position: relative;
          z-index: 1;
        }
        .stat-number {
          font-family: var(--font-display);
          font-size: 2.8rem;
          font-weight: 700;
          color: var(--white);
          line-height: 1;
          margin-bottom: 8px;
        }
        .stat-number span {
          color: var(--gold);
        }
        .stat-label-text {
          font-size: 0.85rem;
          color: rgba(255,255,255,0.65);
          font-weight: 500;
          letter-spacing: 0.04em;
        }
        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr; gap: 40px; }
          .stats-row { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) {
          .stats-row { grid-template-columns: repeat(2, 1fr); padding: 32px 20px; }
          .stat-number { font-size: 2rem; }
        }
      `}</style>
    </section>
  );
}
