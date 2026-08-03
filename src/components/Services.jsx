// src/components/Services.jsx
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const services = [
  {
    title: 'Root Canal Treatment',
    image: '/images/services/root-canal.jpg',
    description: 'Gentle root canal care to save your tooth and ease discomfort with modern comfort-focused techniques.',
  },
  {
    title: 'Teeth Whitening',
    image: '/images/services/teeth-whitening.jpg',
    description: 'Brighten your smile safely with professional whitening that looks natural and fresh.',
  },
  {
    title: 'Braces & Aligners',
    // Place AI-generated or sourced image at public/images/services/braces-aligners.jpg
    image: '/images/services/braces-aligners.jpg',
    description: 'Comfortable braces and clear aligners that gently straighten teeth while fitting your lifestyle.',
  },
  {
    title: 'Dental Implants',
    // Place AI-generated or sourced image at public/images/services/dental-implants.jpg
    image: '/images/services/dental-implants.jpg',
    description: 'Natural-feeling implants that restore missing teeth and bring back your confident smile.',
  },
  {
    title: 'Cosmetic Dentistry',
    image: '/images/services/cosmetic-dentistry.jpg',
    description: 'Personalized cosmetic treatments like veneers and smile design to refresh your look.',
  },
  {
    title: 'Oral Surgery',
    image: '/images/services/oral-surgery.jpg',
    description: 'Careful oral surgery with thoughtful planning and a focus on your comfort every step of the way.',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.4, 0, 0.2, 1] }
  })
};

export default function Services() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="services" className="services-section">
      <div className="container">
        <div className="section-header" ref={ref}>
          <motion.span
            className="section-tag"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            Your Care Options
          </motion.span>
          <motion.h2
            className="heading-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Gentle Dental Care for Every Smile
          </motion.h2>
          <motion.p
            className="section-desc"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            From gentle checkups to smile-transforming treatments, everything is designed 
            to help you feel confident and cared for.
          </motion.p>
        </div>

        <div className="services-grid">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              className="service-card"
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08)' }}
            >
              <img 
                src={service.image} 
                alt={service.title} 
                className="service-image"
              />
              <div className="service-content">
                <h3 className="service-title">{service.title}</h3>
                <p className="service-desc">{service.description}</p>
                <a href="#appointment" className="service-link">
                  Request a Consultation →
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .services-section {
          padding: 100px 0;
          background: var(--white);
          position: relative;
        }
        .services-section::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--teal), transparent);
        }
        .section-header {
          text-align: center;
          margin-bottom: 60px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }
        .section-desc {
          color: var(--text-mid);
          font-size: 1.05rem;
          max-width: 520px;
          line-height: 1.7;
        }
        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .service-card {
          background: #ffffff;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          display: flex;
          flex-direction: column;
          cursor: pointer;
        }
        .service-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
        }
        .service-image {
          width: 100%;
          height: 240px;
          object-fit: cover;
          display: block;
        }
        .service-content {
          padding: 28px 24px 32px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .service-title {
          font-family: var(--font-display);
          font-size: 1.35rem;
          font-weight: 700;
          color: var(--ocean-dark);
          margin: 0;
        }
        .service-desc {
          font-size: 0.98rem;
          color: var(--text-mid);
          line-height: 1.8;
          margin: 0;
          flex: 1;
        }
        .service-link {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--teal);
          text-decoration: none;
          transition: color 0.2s ease;
          align-self: flex-start;
        }
        .service-link:hover {
          color: var(--ocean);
        }
        @media (max-width: 900px) {
          .services-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 560px) {
          .services-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
