// src/components/Contact.jsx
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MapPin, Phone, Mail, Clock, ArrowRight } from 'lucide-react';

const hours = [
  { day: 'Monday – Friday', time: '10:00 AM – 9:00 PM' },
  { day: 'Saturday', time: '10:00 AM – 9:00 PM' },
  { day: 'Sunday', time: 'Closed' },
];

export default function Contact() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <>
      <section id="contact" className="contact-section">
        <div className="container contact-grid" ref={ref}>
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="section-tag">Find Us</span>
            <h2 className="heading-lg">Visit Our Clinic</h2>
            <p className="contact-desc">
              We're conveniently located in Andheri East, easily accessible by road and 
              metro. Parking is available at the building.
            </p>

            <div className="info-cards">
              <a href="https://maps.google.com/?q=Oro+Care+Dental+Clinic+Andheri+East+Mumbai" target="_blank" rel="noopener noreferrer" className="info-card">
                <div className="info-icon"><MapPin size={22} /></div>
                <div>
                  <p className="info-title">Address</p>
                  <p className="info-val">G-17/B, Ganeshwadi CHS Ltd., Bldg. No. 5,<br />Near Akruti Star, MIDC Central Road,<br />Andheri (E), Mumbai – 400 093</p>
                </div>
              </a>

              <a href="tel:+919967869453" className="info-card">
                <div className="info-icon"><Phone size={22} /></div>
                <div>
                  <p className="info-title">Phone</p>
                  <p className="info-val">+91 99678 69453</p>
                </div>
              </a>

              <a href="mailto:kaustubhbendre0@gmal.com" className="info-card">
                <div className="info-icon"><Mail size={22} /></div>
                <div>
                  <p className="info-title">Email</p>
                  <p className="info-val">kaustubhbendre0@gmal.com</p>
                </div>
              </a>

              <div className="info-card">
                <div className="info-icon"><Clock size={22} /></div>
                <div>
                  <p className="info-title">Working Hours</p>
                  {hours.map(h => (
                    <p key={h.day} className="info-val hours-row">
                      <span>{h.day}</span>
                      <span className={h.time === 'Closed' ? 'closed' : ''}>{h.time}</span>
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            className="map-container"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <iframe
              title="Oro-Care Dental Clinic Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.0!2d72.8777!3d19.1197!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c90ca9d46b83%3A0x7b5f455949c70d4d!2sOro-Care%20Dental%20Clinic!5e0!3m2!1sen!2sin!4v1"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <a
              href="https://maps.google.com/?q=Oro+Care+Dental+Clinic+MIDC+Andheri+East+Mumbai"
              target="_blank"
              rel="noopener noreferrer"
              className="directions-btn"
            >
              Get Directions <ArrowRight size={16} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-inner">
          <div className="footer-brand">
            <div className="footer-logo">
              <span>OC</span>
              <div>
                <p className="footer-name">Oro-Care Dental Clinic</p>
                <p className="footer-tagline">Where Smiles Are Made</p>
              </div>
            </div>
            <p className="footer-desc">
              Expert dental care with compassion. Dr. Shashank Kumar — BDS (Mum), CCOS (Delhi).
            </p>
          </div>

          <div className="footer-links">
            <p className="footer-heading">Quick Links</p>
            {['Home', 'Services', 'About', 'Reviews', 'Contact'].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} className="footer-link">{l}</a>
            ))}
          </div>

          <div className="footer-links">
            <p className="footer-heading">Services</p>
            {['Teeth Whitening', 'Root Canal', 'Implants', 'Veneers', 'Cleaning'].map(s => (
              <a key={s} href="#services" className="footer-link">{s}</a>
            ))}
          </div>

          <div className="footer-contact-col">
            <p className="footer-heading">Contact</p>
            <p className="footer-addr">G-17/B, Ganeshwadi CHS, Bldg 5, MIDC Central Rd, Andheri (E), Mumbai 400093</p>
            <a href="tel:+919967869453" className="footer-link">+91 99678 69453</a>
            <a href="mailto:kaustubhbendre0@gmal.com" className="footer-link">kaustubhbendre0@gmal.com</a>
            <a href="#appointment" className="btn-primary footer-cta">Book Appointment</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Oro-Care Dental Clinic. All rights reserved. | Reg. No. A-20141</p>
        </div>
      </footer>

      <style>{`
        .contact-section {
          padding: 100px 0;
          background: var(--cream);
        }
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: start;
        }
        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }
        .contact-desc {
          color: var(--text-mid);
          line-height: 1.7;
        }
        .info-cards {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .info-card {
          display: flex;
          gap: 16px;
          align-items: flex-start;
          padding: 20px;
          background: var(--white);
          border-radius: var(--radius-md);
          border: 1px solid rgba(10,74,110,0.06);
          transition: var(--transition);
        }
        a.info-card:hover {
          border-color: var(--teal);
          box-shadow: var(--shadow-sm);
          transform: translateX(4px);
        }
        .info-icon {
          width: 44px; height: 44px;
          background: rgba(0,180,216,0.1);
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--ocean);
          flex-shrink: 0;
        }
        .info-title {
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-light);
          margin-bottom: 4px;
        }
        .info-val {
          font-size: 0.9rem;
          color: var(--text-dark);
          line-height: 1.5;
        }
        .hours-row {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          padding: 3px 0;
          border-bottom: 1px dashed rgba(10,74,110,0.07);
        }
        .hours-row:last-child { border-bottom: none; }
        .closed { color: var(--error) !important; }
        .map-container {
          height: 500px;
          border-radius: var(--radius-xl);
          overflow: hidden;
          box-shadow: var(--shadow-lg);
          position: relative;
        }
        .directions-btn {
          position: absolute;
          bottom: 16px; left: 50%;
          transform: translateX(-50%);
          background: var(--ocean);
          color: var(--white);
          padding: 10px 24px;
          border-radius: var(--radius-full);
          font-size: 0.88rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 8px;
          box-shadow: var(--shadow-md);
          transition: var(--transition);
          white-space: nowrap;
        }
        .directions-btn:hover {
          background: var(--ocean-light);
          transform: translateX(-50%) translateY(-2px);
        }
        /* Footer */
        .footer {
          background: var(--ocean-dark);
          color: var(--white);
          padding: 64px 0 0;
        }
        .footer-inner {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1.5fr;
          gap: 48px;
          padding-bottom: 48px;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        .footer-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
          font-size: 1.8rem;
        }
        .footer-name {
          font-family: var(--font-display);
          font-size: 1.05rem;
          font-weight: 700;
        }
        .footer-tagline {
          font-size: 0.72rem;
          color: var(--teal);
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .footer-desc {
          color: rgba(255,255,255,0.55);
          font-size: 0.88rem;
          line-height: 1.65;
        }
        .footer-heading {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--teal);
          margin-bottom: 16px;
        }
        .footer-link {
          display: block;
          color: rgba(255,255,255,0.6);
          font-size: 0.88rem;
          margin-bottom: 8px;
          transition: var(--transition);
        }
        .footer-link:hover { color: var(--white); }
        .footer-addr {
          color: rgba(255,255,255,0.55);
          font-size: 0.85rem;
          line-height: 1.6;
          margin-bottom: 12px;
        }
        .footer-contact-col {
          display: flex;
          flex-direction: column;
        }
        .footer-cta {
          margin-top: 16px;
          text-align: center;
          justify-content: center;
        }
        .footer-bottom {
          text-align: center;
          padding: 20px;
          color: rgba(255,255,255,0.35);
          font-size: 0.78rem;
        }
        @media (max-width: 1000px) {
          .footer-inner { grid-template-columns: 1fr 1fr; gap: 32px; }
        }
        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr; }
          .map-container { height: 350px; }
        }
        @media (max-width: 560px) {
          .footer-inner { grid-template-columns: 1fr; gap: 24px; }
        }
      `}</style>
    </>
  );
}